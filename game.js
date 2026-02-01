/**
 * MASK OF DESTINY - Ana Oyun Motoru
 * ACT tabanlı soru sistemi, stat yönetimi ve kazanma/kaybetme kontrolleri
 * 4 ACT x 7 Soru = 28 soru, her soru için 5 alternatif
 */

class GameState {
    constructor() {
        this.stats = {
            signal: 0,      // Kazanma koşulu: %100'e ulaş
            mask: 100,      // 0'a düşerse GAME OVER
            suspicion: 35,   // %100 olursa LİNÇ - GAME OVER (35'ten başlar - sonlara ulaşmayı kolaylaştırır)
            energy: 71      // Kaynak, 0'a düşerse hareket edemezsin
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
        // PASİF GÜNLÜK ETKİLER
        // Yaşam enerjisi -= 0.2
        // Maske -= 0.5
        // Şüphe += 0.3 (yavaş artış)
        // Sinyal += 0.4 (daha hızlı artış - WIN sonuna ulaşmayı kolaylaştırır)

        this.stats.energy = Math.max(0, this.stats.energy - 0.2);
        this.stats.mask = Math.max(0, this.stats.mask - 0.5);
        this.stats.signal = Math.min(100, this.stats.signal + 0.4);
        this.stats.suspicion = Math.min(100, this.stats.suspicion + 0.3);
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
                if (!this.collectedMasks.includes(choice.award)) {
                    this.collectedMasks.push(choice.award);
                    earnedMask = choice.award;

                    // YENİ: Maske kazanıldığında anlık stat etkileri
                    if (earnedMask === 'İletişim Maskesi') {
                        this.stats.signal = Math.min(100, this.stats.signal + 25);
                    } else if (earnedMask === 'Güven Maskesi') {
                        this.stats.suspicion = Math.max(0, this.stats.suspicion - 50);
                    } else if (earnedMask === 'Bakım Maskesi') {
                        this.stats.mask = Math.min(100, this.stats.mask + 30);
                    } else if (earnedMask === 'Sessizlik Maskesi') {
                        this.stats.suspicion = Math.max(0, this.stats.suspicion - 25);
                        this.stats.signal = Math.max(0, this.stats.signal - 25);
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
     * SON 1: sinyal = 100 → Kesin kurtuluş (anagemi gelir)
     * SON 2: maske = 0 → Kesin ölüm (checkGameEnd'de kontrol edilir)
     * SON 3: sinyal >= 75, şüphe <= 55, İletişim Maskesi → Köprü (iki dünyada yaşam)
     * SON 4: sinyal <= 75, şüphe <= 45, Güven Maskesi → Dünya'da kalıcı yaşam
     * SON 5: şüphe = 100 veya enerji = 0 → Game Over (checkGameEnd'de kontrol edilir)
     * 
     * YENİ GİZLİ SONLAR:
     * SON 5: Kimlik Maskesi + şüphe >= 70 + sinyal < 100 → Kayıtlı Hayalet (sisteme karıştın)
     * SON 6: Bakım Maskesi + maske >= 80 + sinyal < 100 → Maskesiz Maske (maskeyi kontrol ettin)
     * SON 7: Sessizlik Maskesi + şüphe <= 30 + sinyal < 85 → Sessiz Kaçış (iz bırakmadan çözdün)
     */
    checkFinalEnding() {
        // SON 1: Sinyal %100'e ulaştıysa: Kesin Kurtuluş - Anagemi gelir
        if (this.stats.signal >= 100) {
            this.isGameOver = true;
            this.endReason = 'win';
            return;
        }

        // SON 3: Köprü Sonu - İnsanlar ve uzaylılar arasında köprü
        // Koşullar: sinyal >= 75, şüphe <= 55, İletişim Maskesi kazanılmış
        const hasCommunicationMask = this.collectedMasks.includes('İletişim Maskesi');
        if (this.stats.signal >= 75 && this.stats.suspicion <= 55 && hasCommunicationMask) {
            this.isGameOver = true;
            this.endReason = 'bridge';
            return;
        }

        // SON 4: Dünya'da Kalıcı Yaşam
        // Koşullar: sinyal <= 75, şüphe <= 45, Güven Maskesi kazanılmış
        const hasTrustMask = this.collectedMasks.includes('Güven Maskesi');
        if (this.stats.signal <= 75 && this.stats.suspicion <= 45 && hasTrustMask) {
            this.isGameOver = true;
            this.endReason = 'earth_permanent';
            return;
        }

        // ========== YENİ GİZLİ SONLAR ==========

        // SON 5: Kayıtlı Hayalet - Kimlik Maskesi ile sisteme karıştın
        // Koşullar: Kimlik Maskesi + şüphe >= 70 (yüksek şüpheyi yönetti) + sinyal < 100
        const hasIdentityMask = this.collectedMasks.includes('Kimlik Maskesi');
        if (hasIdentityMask && this.stats.suspicion >= 70 && this.stats.signal < 100) {
            this.isGameOver = true;
            this.endReason = 'registered_ghost';
            return;
        }

        // SON 6: Maskesiz Maske - Bakım Maskesi ile maskeyi kontrol ettin
        // Koşullar: Bakım Maskesi + maske >= 80 (hiç kritik düşmedi) + sinyal < 100
        const hasMaintenanceMask = this.collectedMasks.includes('Bakım Maskesi');
        if (hasMaintenanceMask && this.stats.mask >= 80 && this.stats.signal < 100) {
            this.isGameOver = true;
            this.endReason = 'maskless_mask';
            return;
        }

        // SON 7: Sessiz Kaçış - Sessizlik Maskesi ile iz bırakmadan çözdün
        // Koşullar: Sessizlik Maskesi + şüphe <= 30 (çok düşük) + sinyal < 85
        const hasSilenceMask = this.collectedMasks.includes('Sessizlik Maskesi');
        if (hasSilenceMask && this.stats.suspicion <= 30 && this.stats.signal < 85) {
            this.isGameOver = true;
            this.endReason = 'silent_escape';
            return;
        }

        // ========== VARSAYILAN SONLAR ==========

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
            signal: 0,
            mask: 100,
            suspicion: 35,
            energy: 71
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
    }
}

// Global oyun durumu
let gameState = new GameState();
