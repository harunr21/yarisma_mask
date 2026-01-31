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
            suspicion: 0,   // %100 olursa LİNÇ - GAME OVER  
            energy: 71      // Kaynak, 0'a düşerse hareket edemezsin
        };

        this.day = 1;
        this.isGameOver = false;
        this.endReason = null;

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
        // Yaşam enerjisi -= 0.5
        // Maske -= 1
        // Şüphe += 1
        // Sinyal pasif değişmez (0)

        this.stats.energy = Math.max(0, this.stats.energy - 0.5);
        this.stats.mask = Math.max(0, this.stats.mask - 1);
        this.stats.suspicion = Math.min(100, this.stats.suspicion + 1);
    }

    applyChoice(direction) {
        if (!this.currentQuestion || this.isGameOver) return null;

        const choice = direction === 'left'
            ? this.currentQuestion.choices.left
            : this.currentQuestion.choices.right;

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

        // 3. DAHA SONRA: Soru efektlerini uygula (Eğer oyun bitmediyse)
        if (!this.isGameOver) {
            for (const [stat, value] of Object.entries(effects)) {
                if (value !== 0) {
                    const oldValue = this.stats[stat];
                    this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + value));
                    changes[stat] = {
                        oldValue,
                        newValue: this.stats[stat],
                        change: value
                    };
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
            day: this.day,
            isGameOver: this.isGameOver,
            endReason: this.endReason,
            currentAct: this.currentAct,
            currentQuestionInAct: this.currentQuestionInAct,
            totalQuestionsAnswered: this.totalQuestionsAnswered
        };
    }

    /**
     * Tüm sorular bittiğinde final sonunu belirle
     */
    checkFinalEnding() {
        // Sinyal %100'e ulaştıysa: Eve Dönüş
        if (this.stats.signal >= 100) {
            this.isGameOver = true;
            this.endReason = 'win';
            return;
        }

        // Tüm sorular tamamlandı ama sinyal yeterli değil
        // Mask durumuna göre son belirlenir
        if (this.stats.mask >= 50) {
            // Maske sağlam ama sinyal yetersiz - Dünya'da kaldı
            this.isGameOver = true;
            this.endReason = 'stayed_on_earth';
        } else {
            // Maske zayıf - belirsiz son
            this.isGameOver = true;
            this.endReason = 'uncertain';
        }
    }

    checkGameEnd() {
        // Kazanma: Sinyal %100
        if (this.stats.signal >= 100) {
            this.isGameOver = true;
            this.endReason = 'win';
            return;
        }

        // Kaybetme: Maske 0
        if (this.stats.mask <= 0) {
            this.isGameOver = true;
            this.endReason = 'mask_destroyed';
            return;
        }

        // Kaybetme: Şüphe %100
        if (this.stats.suspicion >= 100) {
            this.isGameOver = true;
            this.endReason = 'caught';
            return;
        }

        // Kaybetme: Enerji 0 (opsiyonel - daha zor mod için)
        if (this.stats.energy <= 0) {
            // Enerji 0 olduğunda maske daha hızlı çürüsün
            this.stats.mask = Math.max(0, this.stats.mask - 5);
        }
    }

    getEndMessage() {
        switch (this.endReason) {
            case 'win':
                return {
                    title: 'EVE DÖNÜŞ!',
                    icon: '🚀',
                    description: `Tebrikler! ${this.day} günde ve ${this.totalQuestionsAnswered} kararla sinyal gücünü maksimuma çıkardın. Anagemin seni almaya geliyor!`,
                    isWin: true
                };
            case 'stayed_on_earth':
                return {
                    title: 'DÜNYA\'DA KALDIN',
                    icon: '🌍',
                    description: `${this.day} gün ve ${this.totalQuestionsAnswered} kararın sonunda, sinyal yeterli güce ulaşamadı. Ama masken sağlam kaldı. Belki bu dünya o kadar da kötü değildir...`,
                    isWin: true // Alternatif bir "iyi" son
                };
            case 'uncertain':
                return {
                    title: 'BELİRSİZ SON',
                    icon: '❓',
                    description: `${this.day} gün geçti. Ne eve dönebildin ne de burada kalmayı başardın. Geleceğin belirsiz...`,
                    isWin: false
                };
            case 'mask_destroyed':
                return {
                    title: 'MASKE ÇÜRÜDÜ',
                    icon: '💀',
                    description: `${this.day}. günde masken tamamen çürüdü. Gerçek formun ortaya çıktı ve insanlar panikle kaçıştı.`,
                    isWin: false
                };
            case 'caught':
                return {
                    title: 'YAKALANDIN!',
                    icon: '🚨',
                    description: `${this.day}. günde şüpheler doruk noktasına ulaştı. İnsanlar seni yakaladı!`,
                    isWin: false
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
            actName: this.currentAct <= 4 ? QUESTION_POOL[this.currentAct].name : 'Tamamlandı'
        };
    }

    reset() {
        this.stats = {
            signal: 0,
            mask: 100,
            suspicion: 0,
            energy: 71
        };
        this.day = 1;
        this.isGameOver = false;
        this.endReason = null;

        // ACT tabanlı ilerleme sıfırla
        this.currentAct = 1;
        this.currentQuestionInAct = 1;
        this.totalQuestionsAnswered = 0;
        this.currentQuestion = null;
    }
}

// Global oyun durumu
let gameState = new GameState();
