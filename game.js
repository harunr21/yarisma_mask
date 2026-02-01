/**
 * MASK OF DESTINY - Ana Oyun Motoru
 * ACT tabanlı soru sistemi, stat yönetimi ve kazanma/kaybetme kontrolleri
 * 4 ACT x 7 Soru = 28 soru, her soru için 5 alternatif
 */

class GameState {
    constructor() {
        this.stats = {
            signal: 25,     // Kazanma koşulu: %100'e ulaş (25'ten başlar - WIN dışı sonlara ulaşabilmek için)
            mask: 80,       // 0'a düşerse GAME OVER (80'den başlar - daha fazla risk)
            suspicion: 45,  // %100 olursa LİNÇ - GAME OVER (45'ten başlar - tüm sonlara ulaşılabilir)
            energy: 65      // Kaynak, 0'a düşerse hareket edemezsin
        };

        this.day = 1;
        this.isGameOver = false;
        this.endReason = null;
        this.collectedMasks = []; // Toplanan maskeler

        // ACT tabanlı ilerleme sistemi
        this.currentAct = 1;           // Şu anki bölüm (1-4)
        this.currentQuestionInAct = 1; // Bölüm içindeki soru numarası (1-7)
        this.totalQuestionsAnswered = 0;

        // Mevcut soru
        this.currentQuestion = null;
    }

    /**
     * Sonraki soruyu al
     * Her ACT'te 7 soru var, her soru için 5 alternatif
     */
    getNextQuestion() {
        // Oyun bitti mi kontrol et
        if (this.isGameOver) return null;

        // ACT 4'ün 7. sorusundan sonra oyun biter
        if (this.currentAct > 4) {
            this.checkGameEnd();
            return null;
        }

        // Soru havuzundan rastgele alternatif seç
        const question = getRandomQuestion(this.currentAct, this.currentQuestionInAct);

        if (!question) {
            console.error(`Soru bulunamadı: ACT ${this.currentAct}, Soru ${this.currentQuestionInAct}`);
            return null;
        }

        // Soruyu kart formatına dönüştür (mevcut UI ile uyumlu olması için)
        this.currentQuestion = {
            id: question.id,
            title: `Bölüm ${this.currentAct} - Soru ${this.currentQuestionInAct}`,
            description: question.scene,
            emoji: this.getActEmoji(this.currentAct),
            actName: QUESTION_POOL[this.currentAct].name,
            choices: question.choices
        };

        return this.currentQuestion;
    }

    /**
     * ACT'e göre emoji döndür
     */
    getActEmoji(act) {
        const emojis = {
            1: '🛸', // Enkaz ve İlk Taklit
            2: '🌆', // Şehir Seni Öğreniyor
            3: '🤝', // Yakınlık ve Güven
            4: '🚀'  // Son Düzlük
        };
        return emojis[act] || '❓';
    }

    /**
     * Mevcut kart al (UI uyumluluğu için)
     */
    getNextCard() {
        return this.getNextQuestion();
    }

    // Enerji seviyesine göre sonraki karar gününü hesapla
    getDaysUntilNextCard(energy) {
        if (energy <= 10) return 10;
        if (energy <= 20) return 9;
        if (energy <= 30) return 8;
        if (energy <= 40) return 7;
        if (energy <= 50) return 6;
        if (energy <= 60) return 5;
        if (energy <= 70) return 4;
        if (energy <= 80) return 3;
        if (energy <= 90) return 2;
        return 1;
    }

    // Günlük pasif etkileri uygula
    applyDailyPassives() {
        // PASİF GÜNLÜK ETKİLER - DENGELİ
        // Yaşam enerjisi -= 0.15 (yavaşlatıldı)
        // Maske -= 0.35 (yavaşlatıldı - Mask Mastery mümkün olsun)
        // Şüphe += 0.25 (yavaşlatıldı - Silent Escape mümkün olsun)
        // Sinyal += 0.20 (yarıya indirildi - WIN dışı sonlar mümkün olsun)

        this.stats.energy = Math.max(0, this.stats.energy - 0.15);
        this.stats.mask = Math.max(0, this.stats.mask - 0.35);
        this.stats.signal = Math.min(100, this.stats.signal + 0.20);
        this.stats.suspicion = Math.min(100, this.stats.suspicion + 0.25);
    }

    applyChoice(direction) {
        if (!this.currentQuestion || this.isGameOver) return null;

        const choice = direction === 'left'
            ? this.currentQuestion.choices.left
            : this.currentQuestion.choices.right;

        // Seçim öncesi değerleri kaydet
        const beforeStats = { ...this.stats };

        // 1. ÖNCE: Karar anındaki enerjiye göre bekleme süresini hesapla
        const daysToWait = this.getDaysUntilNextCard(this.stats.energy);

        // 2. GÜNLERİ İLERLET: Arkaplanda önce günler akar, pasif etkiler işler
        for (let i = 0; i < daysToWait; i++) {
            this.day++;
            this.applyDailyPassives();

            // Her gün sonunda oyunun bitip bitmediğini kontrol et
            this.checkGameEnd();
            if (this.isGameOver) break;
        }

        const changes = {};
        const effects = choice.effects;
        let earnedMask = null;
        let maskEffects = {};

        // 3. DAHA SONRA: Soru efektlerini uygula (Eğer oyun bitmediyse)
        if (!this.isGameOver) {
            // Soru efektlerini uygula - TÜM statları kontrol et (0 dahil)
            for (const [stat, value] of Object.entries(effects)) {
                const oldValue = this.stats[stat];
                // Sadece 0 olmayan değerleri uygula
                if (value !== 0) {
                    this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + value));
                }
                // Tüm statların değişimini kaydet (pasif + soru efekti toplam)
                const totalChange = this.stats[stat] - beforeStats[stat];
                if (totalChange !== 0 || value !== 0) {
                    changes[stat] = {
                        oldValue: beforeStats[stat],
                        newValue: this.stats[stat],
                        change: value, // Soru efekti
                        totalChange: totalChange // Pasif + soru efekti toplam
                    };
                }
            }

            // Maske ödülü kontrolü
            if (choice.award) {
                // Sadece daha önce kazanılmadıysa VE toplam maske sayısı 3'ten az ise kazanılabilir
                if (!this.collectedMasks.includes(choice.award) && this.collectedMasks.length < 3) {
                    this.collectedMasks.push(choice.award);
                    earnedMask = choice.award;

                    // YENİ: Maske kazanıldığında anlık stat etkileri - DENGELİ
                    const beforeMaskStats = { ...this.stats };

                    if (earnedMask === 'İletişim Maskesi') {
                        // Sinyal artışı azaltıldı, WIN'e otomatik yönlendirmesin
                        this.stats.signal = Math.min(100, this.stats.signal + 12);
                    } else if (earnedMask === 'Güven Maskesi') {
                        // Şüphe azalması azaltıldı
                        this.stats.suspicion = Math.max(0, this.stats.suspicion - 40);
                    } else if (earnedMask === 'Bakım Maskesi') {
                        // Maske artışı dengeli
                        this.stats.mask = Math.min(100, this.stats.mask + 20);
                    } else if (earnedMask === 'Sessizlik Maskesi') {
                        // Şüphe azalması artırıldı, sinyal kaybı azaltıldı
                        this.stats.suspicion = Math.max(0, this.stats.suspicion - 30);
                        this.stats.signal = Math.max(0, this.stats.signal - 10);
                    } else if (earnedMask === 'Kimlik Maskesi') {
                        // YENİ: Kimlik Maskesi artık bonus veriyor
                        this.stats.suspicion = Math.min(100, this.stats.suspicion + 15);
                        this.stats.energy = Math.min(100, this.stats.energy + 10);
                    }

                    // Maske etkilerini kaydet
                    for (const stat of ['signal', 'mask', 'suspicion', 'energy']) {
                        const effect = this.stats[stat] - beforeMaskStats[stat];
                        if (effect !== 0) {
                            maskEffects[stat] = effect;
                        }
                    }

                    // UI'ın bu büyük değişimi görmesi için changes objesini güncelle
                    for (const stat of ['signal', 'mask', 'suspicion', 'energy']) {
                        const totalChange = this.stats[stat] - beforeStats[stat];
                        if (totalChange !== 0) {
                            if (!changes[stat]) {
                                changes[stat] = {
                                    oldValue: beforeStats[stat],
                                    newValue: this.stats[stat],
                                    change: effects[stat] || 0
                                };
                            }
                            changes[stat].newValue = this.stats[stat];
                            changes[stat].totalChange = totalChange;
                        }
                    }
                }
            }

            // Efektlerden sonra tekrar kontrol
            this.checkGameEnd();
        }

        // Soru sayacını güncelle
        this.totalQuestionsAnswered++;

        // Sonraki soruya geç
        this.currentQuestionInAct++;
        if (this.currentQuestionInAct > 7) {
            // ACT tamamlandı, sonraki ACT'e geç
            this.currentAct++;
            this.currentQuestionInAct = 1;

            // Tüm ACT'ler tamamlandıysa oyunu bitir
            if (this.currentAct > 4 && !this.isGameOver) {
                this.checkFinalEnding();
            }
        }

        return {
            choice,
            changes,
            maskEffects,
            effects, // Soru efeklerini de döndür
            day: this.day,
            isGameOver: this.isGameOver,
            endReason: this.endReason,
            currentAct: this.currentAct,
            currentQuestionInAct: this.currentQuestionInAct,
            totalQuestionsAnswered: this.totalQuestionsAnswered,
            earnedMask: earnedMask,
            collectedMasks: this.collectedMasks
        };
    }

    /**
     * Tüm sorular bittiğinde final sonunu belirle
     * YENİDEN DENGELENMİŞ ÇAKIŞMASIZ SON KOŞULLARI:
     * 1. S >= 100 -> Rescue (🛸)                                          [Yüksek Sinyal]
     * 2. 70 <= S <= 99 && 30 <= Ş <= 60 && İletişim Maskesi -> Bridge (🌌) [Orta-Yüksek S, Orta Ş]
     * 3. S <= 55 && Ş <= 50 && Güven Maskesi -> Earth Stay (🏡)           [Düşük S, Düşük Ş]
     * 4. 45 <= S <= 75 && Ş <= 35 && Sessizlik Maskesi -> Silent Escape (🤫) [Orta S, Çok Düşük Ş]
     * 5. S <= 80 && Ş >= 60 && Kimlik Maskesi -> Registered Ghost (🪪)    [Düşük-Orta S, Yüksek Ş]
     * 6. S <= 70 && M >= 75 && 35 <= Ş <= 65 && Bakım Maskesi -> Mask Mastery (🎭) [Düşük-Orta S, Yüksek M, Orta Ş]
     */
    checkFinalEnding() {
        // 1. ANAGEMİ GELDİ (Kesin Kurtuluş) - Sinyal 100'e ulaştı
        if (this.stats.signal >= 100) {
            this.isGameOver = true;
            this.endReason = 'win';
            return;
        }

        // MASKE KONTROLÜ - Önce maskeleri tanımla
        const hasCommunicationMask = this.collectedMasks.includes('İletişim Maskesi');
        const hasTrustMask = this.collectedMasks.includes('Güven Maskesi');
        const hasSilenceMask = this.collectedMasks.includes('Sessizlik Maskesi');
        const hasIdentityMask = this.collectedMasks.includes('Kimlik Maskesi');
        const hasMaintenanceMask = this.collectedMasks.includes('Bakım Maskesi');

        // ÖNCELİK SIRASI: En spesifik koşullardan en genel koşullara

        // 6. MASKESİZ MASKE (Mask Mastery) - En spesifik: Maske değeri çok önemli
        if (this.stats.signal <= 70 && this.stats.mask >= 75 &&
            this.stats.suspicion >= 35 && this.stats.suspicion <= 65 &&
            hasMaintenanceMask) {
            this.isGameOver = true;
            this.endReason = 'maskless_mask';
            return;
        }

        // 4. SESSİZ KAÇIŞ (Silent Escape) - Çok düşük şüphe gerekli
        if (this.stats.signal >= 45 && this.stats.signal <= 75 &&
            this.stats.suspicion <= 35 && hasSilenceMask) {
            this.isGameOver = true;
            this.endReason = 'silent_escape';
            return;
        }

        // 2. İKİ DÜNYANIN KÖPRÜSÜ (Bridge) - Yüksek sinyal, orta şüphe
        if (this.stats.signal >= 70 && this.stats.signal <= 99 &&
            this.stats.suspicion >= 30 && this.stats.suspicion <= 60 &&
            hasCommunicationMask) {
            this.isGameOver = true;
            this.endReason = 'bridge';
            return;
        }

        // 5. KAYITLI HAYALET (Registered Ghost) - Yüksek şüphe
        if (this.stats.signal <= 80 && this.stats.suspicion >= 60 && hasIdentityMask) {
            this.isGameOver = true;
            this.endReason = 'registered_ghost';
            return;
        }

        // 3. DÜNYA'DA YENİ BİR HAYAT (Earth Stay) - Düşük sinyal ve şüphe
        if (this.stats.signal <= 55 && this.stats.suspicion <= 50 && hasTrustMask) {
            this.isGameOver = true;
            this.endReason = 'earth_permanent';
            return;
        }

        // ========== VARSAYILAN SONLAR (Eğer yukarıdakiler tutmazsa) ==========

        // Tüm sorular tamamlandı ama hiçbir özel sona ulaşılamadı
        if (this.stats.signal >= 60) {
            // Sinyal yeterince yüksek ama 100 değil - belirsiz son
            this.isGameOver = true;
            this.endReason = 'uncertain';
        } else if (this.stats.mask >= 65) {
            // Maske sağlam, sinyal düşük - Dünya'da kaldı (geçici)
            this.isGameOver = true;
            this.endReason = 'stayed_on_earth';
        } else {
            // Maske zayıf ve sinyal düşük - belirsiz son
            this.isGameOver = true;
            this.endReason = 'uncertain';
        }
    }

    checkGameEnd() {
        // SON 1: Kazanma - Sinyal %100 = Kesin Kurtuluş (Anagemi gelir)
        if (this.stats.signal >= 100) {
            this.isGameOver = true;
            this.endReason = 'win';
            return;
        }

        // SON 2: Kaybetme - Maske 0 = Kesin Ölüm
        if (this.stats.mask <= 0) {
            this.isGameOver = true;
            this.endReason = 'mask_destroyed';
            return;
        }

        // SON 5a: Kaybetme - Şüphe %100
        if (this.stats.suspicion >= 100) {
            this.isGameOver = true;
            this.endReason = 'caught';
            return;
        }

        // SON 5b: Kaybetme - Enerji 0
        if (this.stats.energy <= 0) {
            this.isGameOver = true;
            this.endReason = 'energy_depleted';
            return;
        }
    }

    getEndMessage() {
        switch (this.endReason) {
            // SON 1: Kesin Kurtuluş - Sinyal 100
            case 'win':
                return {
                    title: 'ANAGEMİ GELDİ!',
                    icon: '🛸',
                    description: `Tebrikler! ${this.day} günde ve ${this.totalQuestionsAnswered} kararla sinyal gücünü maksimuma çıkardın. Anagemin seni kurtarmaya geldi! Gökyüzünde parlayan ışık, seni eve götürecek geminin işareti. Artık özgürsün!`,
                    isWin: true,
                    endingType: 'rescue'
                };

            // SON 3: Köprü Sonu - İki dünyada yaşam hakkı
            case 'bridge':
                return {
                    title: 'İKİ DÜNYANIN KÖPRÜSÜ',
                    icon: '🌌',
                    description: `Muhteşem! ${this.day} günde İletişim Maskesi sayesinde insanlar ve kendi türün arasında bir köprü kurdun. Artık hem Dünya'da hem de kendi gezegeninde yaşama hakkın var. Elçi olarak iki türü birleştireceksin!`,
                    isWin: true,
                    endingType: 'bridge'
                };

            // SON 4: Dünya'da Kalıcı Yaşam - Güven Maskesi ile
            case 'earth_permanent':
                return {
                    title: 'DÜNYA\'DA YENİ BİR HAYAT',
                    icon: '🏡',
                    description: `${this.day} günde Güven Maskesi sayesinde insanların güvenini kazandın. Artık Dünya senin yeni evin. Masken sadece bir kılık değil, gerçek kimliğin oldu. Burada kalıcı ve mutlu bir hayat seni bekliyor!`,
                    isWin: true,
                    endingType: 'earth_permanent'
                };

            // Alternatif son: Dünya'da kaldı (ama kalıcı değil)
            case 'stayed_on_earth':
                return {
                    title: 'DÜNYA\'DA KALDIN',
                    icon: '🌍',
                    description: `${this.day} gün ve ${this.totalQuestionsAnswered} kararın sonunda, sinyal yeterli güce ulaşamadı. Masken sağlam kaldı ama güven maskesini kazanamadın. Dünya'da kalıyorsun... ama ne zamana kadar?`,
                    isWin: false,
                    endingType: 'stayed'
                };

            // Belirsiz son
            // ========== YENİ GİZLİ SONLAR ==========

            // SON 5: Kayıtlı Hayalet - Kimlik Maskesi
            case 'registered_ghost':
                return {
                    title: 'KAYITLI HAYALET',
                    icon: '🪪',
                    description: `${this.day}. günde sisteme karıştın. Kontrol noktalarında görevli kimliğine bakıyor, sonra seni geçiriyor. Kameralar seni görüyor ama alarm vermiyor—çünkü sistem seni "tanıyor." Uzaylı olduğun gerçeği kaybolmadı; sadece veri katmanının altında yaşıyorsun. Artık saklanmıyorsun... kayıtlısın.`,
                    isWin: true,
                    endingType: 'registered_ghost'
                };

            // SON 6: Maskesiz Maske - Bakım Maskesi
            case 'maskless_mask':
                return {
                    title: 'MASKESİZ MASKE',
                    icon: '🎭',
                    description: `${this.day} gün boyunca maskeye hakim oldun. Artık maskeyi "takmak zorunda" olduğun için değil, "seçtiğin" için kullanıyorsun. Bir gün maskeyi çıkarırsın ve ölüm gelmez—çünkü maske artık gizlemek için değil, dengelemek içindir. Maskeyi kontrol ettiğinde, maske seni kontrol edemez.`,
                    isWin: true,
                    endingType: 'maskless_mask'
                };

            // SON 7: Sessiz Kaçış - Sessizlik Maskesi
            case 'silent_escape':
                return {
                    title: 'SESSİZ KAÇIŞ',
                    icon: '🤫',
                    description: `${this.day} gece geçti. Seni kimse "yakalamadı" çünkü kimse seni gerçekten "görmedi." Sokak lambaları titremedi, sirenler çalmadı. Müttefiğin bile seni görmedi; sadece varlığını hissetti. Kendi gezegenin seni bulmadı—ama Dünya da seni yok edemedi. Bazı kurtuluşlar, sessiz olur.`,
                    isWin: true,
                    endingType: 'silent_escape'
                };

            // Belirsiz son
            case 'uncertain':
                return {
                    title: 'BELİRSİZ SON',
                    icon: '❓',
                    description: `${this.day} gün geçti. Ne eve dönebildin ne de burada kalmayı başardın. Masken zayıfladı, geleceğin belirsiz...`,
                    isWin: false,
                    endingType: 'uncertain'
                };

            // SON 2: Kesin Ölüm - Maske 0
            case 'mask_destroyed':
                return {
                    title: 'MASKE ÇÜRÜDÜ',
                    icon: '💀',
                    description: `${this.day}. günde masken tamamen çürüdü. Gerçek formun ortaya çıktı ve insanlar panikle kaçıştı. Artık saklanacak yer yok...`,
                    isWin: false,
                    endingType: 'death'
                };

            // SON 5a: Şüphe 100 - Yakalandın
            case 'caught':
                return {
                    title: 'YAKALANDIN!',
                    icon: '🚨',
                    description: `${this.day}. günde şüpheler doruk noktasına ulaştı. İnsanlar seni yakaladı! Artık kaçış yok...`,
                    isWin: false,
                    endingType: 'caught'
                };

            // SON 5b: Enerji 0 - Tükeniş
            case 'energy_depleted':
                return {
                    title: 'ENERJİN TÜKENDİ',
                    icon: '⚡',
                    description: `${this.day}. günde enerjin tamamen tükendi. Hareket edemez hale geldin. Masken yavaşça çürümeye başlıyor...`,
                    isWin: false,
                    endingType: 'energy_depleted'
                };
            default:
                return {
                    title: 'OYUN BİTTİ',
                    icon: '👾',
                    description: 'Bilinmeyen bir nedenle oyun sona erdi.',
                    isWin: false
                };
        }
    }

    /**
     * Mevcut ilerleme bilgisini döndür
     */
    getProgress() {
        return {
            currentAct: this.currentAct,
            currentQuestionInAct: this.currentQuestionInAct,
            totalQuestionsAnswered: this.totalQuestionsAnswered,
            totalQuestions: 28, // 4 ACT x 7 soru
            actName: this.currentAct <= 4 ? QUESTION_POOL[this.currentAct].name : 'Tamamlandı',
            collectedMasks: this.collectedMasks
        };
    }

    reset() {
        this.stats = {
            signal: 25,     // DENGELİ: 25'ten başlar
            mask: 80,       // DENGELİ: 80'den başlar
            suspicion: 45,  // DENGELİ: 45'ten başlar
            energy: 65      // DENGELİ: 65'ten başlar
        };
        this.day = 1;
        this.isGameOver = false;
        this.endReason = null;
        this.collectedMasks = [];

        // ACT tabanlı ilerleme sıfırla
        this.currentAct = 1;
        this.currentQuestionInAct = 1;
        this.totalQuestionsAnswered = 0;
        this.currentQuestion = null;

        // Görülen alternatifleri sıfırla
        if (typeof resetSeenAlternatives === 'function') {
            resetSeenAlternatives();
        }

        // YENİ: Maske dağılımını rastgele oluştur
        if (typeof initializeMaskDistribution === 'function') {
            initializeMaskDistribution();
        }
    }
}

// Global oyun durumu
let gameState = new GameState();
