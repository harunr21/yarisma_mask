/**
 * MASK OF DESTINY - Ana Oyun Motoru
 * Oyun durumu yönetimi, stat sistemi ve kazanma/kaybetme kontrolleri
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
        this.cardsPlayed = 0;
        this.isGameOver = false;
        this.endReason = null;

        // Kart havuzu
        this.cardDeck = [];
        this.usedCards = [];
        this.currentCard = null;

        this.initDeck();
    }

    initDeck() {
        this.cardDeck = shuffleArray([...CARDS]);
        this.usedCards = [];
    }

    getNextCard() {
        // Eğer deste bittiyse, kullanılmış kartları karıştırıp tekrar ekle
        if (this.cardDeck.length === 0) {
            this.cardDeck = shuffleArray([...this.usedCards]);
            this.usedCards = [];
        }

        this.currentCard = this.cardDeck.pop();
        return this.currentCard;
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
        // Yaşam enerjisi -= 2
        // Maske -= 1
        // Şüphe += 1
        // Sinyal pasif değişmez (0)

        this.stats.energy = Math.max(0, this.stats.energy - 2);
        this.stats.mask = Math.max(0, this.stats.mask - 1);
        this.stats.suspicion = Math.min(100, this.stats.suspicion + 1);
    }

    applyChoice(direction) {
        if (!this.currentCard || this.isGameOver) return null;

        const choice = direction === 'left'
            ? this.currentCard.choices.left
            : this.currentCard.choices.right;

        // 1. ÖNCE: Karar anındaki enerjiye göre bekleme süresini hesapla
        // Kartın enerji bedeli henüz düşmediği için, oyuncu o anki enerjisine göre hareket eder
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

        // 3. DAHA SONRA: Kart efektlerini uygula (Eğer oyun bitmediyse)
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
            // Kart etkilerinden sonra tekrar kontrol (örn: ani maske düşüşü)
            this.checkGameEnd();
        }

        // Kartı kullanılmışlara ekle
        this.usedCards.push(this.currentCard);
        this.cardsPlayed++;

        return {
            choice,
            changes,
            day: this.day,
            isGameOver: this.isGameOver,
            endReason: this.endReason
        };
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
                    description: `Tebrikler! ${this.day} günde sinyal gücünü maksimuma çıkardın. Anagemin seni almaya geliyor!`,
                    isWin: true
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

    reset() {
        this.stats = {
            signal: 0,
            mask: 100,
            suspicion: 0,
            energy: 71
        };
        this.day = 1;
        this.cardsPlayed = 0;
        this.isGameOver = false;
        this.endReason = null;
        this.initDeck();
    }
}

// Global oyun durumu
let gameState = new GameState();
