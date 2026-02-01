/**
 * MASK OF DESTINY - Swipe Mekanikleri
 * Touch ve mouse sürükleme ile kart seçimi
 */

class SwipeHandler {
    constructor(cardElement, onSwipe) {
        this.card = cardElement;
        this.onSwipe = onSwipe;

        // Swipe parametreleri
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.threshold = 100; // Karar eşiği (piksel)
        this.maxRotation = 15; // Maksimum dönüş açısı

        this.init();
    }

    init() {
        // Mouse events
        this.card.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));

        // Touch events
        this.card.addEventListener('touchstart', this.handleStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleEnd.bind(this));

        // Prevent default drag behavior
        this.card.addEventListener('dragstart', (e) => e.preventDefault());
    }

    handleStart(e) {
        // Pause menüsü açıksa veya oyun bittiyse swipe yapılamaz
        if (gameState.isGameOver || (typeof isPaused !== 'undefined' && isPaused)) return;

        this.isDragging = true;
        this.card.classList.add('swiping');

        if (e.type === 'touchstart') {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        } else {
            this.startX = e.clientX;
            this.startY = e.clientY;
        }

        this.currentX = 0;
    }

    handleMove(e) {
        if (!this.isDragging) return;

        let clientX;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }

        this.currentX = clientX - this.startX;

        // Kart pozisyonunu ve rotasyonunu güncelle
        const rotation = (this.currentX / this.threshold) * this.maxRotation;
        const clampedRotation = Math.max(-this.maxRotation, Math.min(this.maxRotation, rotation));

        this.card.style.transform = `translateX(${this.currentX}px) rotate(${clampedRotation}deg)`;

        // Hint'leri göster/gizle
        this.updateHints();
    }

    handleEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.card.classList.remove('swiping');

        // Hint'leri gizle
        this.hideHints();

        // Karar eşiğini geçtiyse swipe yap
        if (Math.abs(this.currentX) >= this.threshold) {
            const direction = this.currentX > 0 ? 'right' : 'left';
            this.triggerSwipe(direction);
        } else {
            // Merkeze geri dön
            this.card.style.transform = '';
        }
    }

    updateHints() {
        const leftHint = document.querySelector('.left-hint');
        const rightHint = document.querySelector('.right-hint');

        // Opaklık hesapla: Ne kadar çekilirse o kadar kaybolur
        const progress = Math.min(Math.abs(this.currentX) / this.threshold, 1);
        const currentOpacity = 0.8 * (1 - progress);

        leftHint.style.opacity = currentOpacity;
        rightHint.style.opacity = currentOpacity;
    }

    hideHints() {
        document.querySelector('.left-hint').style.opacity = 0.8;
        document.querySelector('.right-hint').style.opacity = 0.8;
    }

    triggerSwipe(direction) {
        // Okları tamamen gizle
        document.querySelector('.left-hint').style.opacity = 0;
        document.querySelector('.right-hint').style.opacity = 0;

        // Animasyon sınıfı ekle
        this.card.classList.add(direction === 'left' ? 'swipe-left' : 'swipe-right');

        // Callback'i çağır
        setTimeout(() => {
            this.onSwipe(direction);
        }, 300);
    }

    reset() {
        this.card.classList.remove('swipe-left', 'swipe-right', 'swiping');
        this.card.style.transform = '';
        this.hideHints();
    }
}

// Global swipe handler (ui.js'de başlatılacak)
let swipeHandler = null;
