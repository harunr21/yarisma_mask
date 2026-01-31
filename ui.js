/**
 * MASK OF DESTINY - UI Yönetimi
 * Ekran geçişleri, stat bar güncellemeleri ve kart render
 */

// DOM Elementleri
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const elements = {
    // Butonlar
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),

    // Stat barlar
    signalBar: document.getElementById('signal-bar'),
    maskBar: document.getElementById('mask-bar'),
    suspicionBar: document.getElementById('suspicion-bar'),
    energyBar: document.getElementById('energy-bar'),
    energyValue: document.getElementById('energy-value'),

    // Kart
    card: document.getElementById('current-card'),
    cardImage: document.getElementById('card-image'),
    cardEmoji: document.querySelector('.card-emoji'),
    cardTitle: document.getElementById('card-title'),
    cardDescription: document.getElementById('card-description'),
    leftChoiceText: document.getElementById('left-choice-text'),
    rightChoiceText: document.getElementById('right-choice-text'),

    // Gün sayacı
    dayNumber: document.getElementById('day-number'),

    // Oyun sonu
    endIcon: document.getElementById('end-icon'),
    endTitle: document.getElementById('end-title'),
    endDescription: document.getElementById('end-description'),
    endStats: document.getElementById('end-stats')
};

// Ekran geçişleri
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// Stat barlarını güncelle
function updateStatBars(animate = true) {
    const stats = gameState.stats;

    // Her stat için bar genişliğini ayarla
    elements.signalBar.style.width = `${stats.signal}%`;
    elements.maskBar.style.width = `${stats.mask}%`;
    elements.suspicionBar.style.width = `${stats.suspicion}%`;
    elements.energyBar.style.width = `${stats.energy}%`;

    // Enerji yüzdesini yaz
    elements.energyValue.textContent = `${Math.floor(stats.energy)}`;

    // Düşük stat uyarısı
    checkStatWarnings();
}

function checkStatWarnings() {
    const stats = gameState.stats;
    const statElements = document.querySelectorAll('.stat');

    statElements.forEach(el => {
        const statName = el.dataset.stat;
        el.classList.remove('warning');

        // Düşük değer uyarısı
        if (statName === 'mask' && stats.mask <= 20) {
            el.classList.add('warning');
        } else if (statName === 'energy' && stats.energy <= 15) {
            el.classList.add('warning');
        } else if (statName === 'suspicion' && stats.suspicion >= 80) {
            el.classList.add('warning');
        }
    });
}

// Stat değişim animasyonu
function animateStatChange(statName) {
    const statElement = document.querySelector(`.stat[data-stat="${statName}"]`);
    if (statElement) {
        statElement.classList.add('pulse');
        setTimeout(() => {
            statElement.classList.remove('pulse');
        }, 300);
    }
}

// Kartı render et
function renderCard(card) {
    if (!card) return;

    elements.cardEmoji.textContent = card.emoji;
    elements.cardTitle.textContent = card.title;
    elements.cardDescription.textContent = card.description;
    elements.leftChoiceText.textContent = card.choices.left.text;
    elements.rightChoiceText.textContent = card.choices.right.text;

    // Giriş animasyonu
    elements.card.classList.add('entering');
    setTimeout(() => {
        elements.card.classList.remove('entering');
    }, 400);
}

// Gün sayacını güncelle
function updateDayCounter() {
    elements.dayNumber.textContent = gameState.day;
}

// Swipe işlendikten sonra
function handleSwipe(direction) {
    const result = gameState.applyChoice(direction);

    if (!result) return;

    // Değişen statları animasyonla göster
    for (const statName of Object.keys(result.changes)) {
        animateStatChange(statName);
    }

    // UI güncelle
    updateStatBars();
    updateDayCounter();

    // Oyun bittiyse
    if (result.isGameOver) {
        setTimeout(() => {
            showEndScreen();
        }, 500);
        return;
    }

    // Yeni kart göster
    setTimeout(() => {
        swipeHandler.reset();
        const nextCard = gameState.getNextCard();
        renderCard(nextCard);
    }, 400);
}

// Oyun sonu ekranını göster
function showEndScreen() {
    const endMessage = gameState.getEndMessage();

    elements.endIcon.textContent = endMessage.icon;
    elements.endTitle.textContent = endMessage.title;
    elements.endTitle.className = 'end-title ' + (endMessage.isWin ? 'win' : 'lose');
    elements.endDescription.textContent = endMessage.description;

    // Son istatistikler
    elements.endStats.innerHTML = `
        <div class="end-stat">
            <span class="end-stat-icon">📡</span>
            <span class="end-stat-value">${gameState.stats.signal}%</span>
            <span class="end-stat-label">Sinyal</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon">🎭</span>
            <span class="end-stat-value">${gameState.stats.mask}%</span>
            <span class="end-stat-label">Maske</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon">📅</span>
            <span class="end-stat-value">${gameState.day}</span>
            <span class="end-stat-label">Gün</span>
        </div>
    `;

    showScreen('end');
}

// Oyunu başlat
function startGame() {
    gameState.reset();
    updateStatBars(false);
    updateDayCounter();

    const firstCard = gameState.getNextCard();
    renderCard(firstCard);

    showScreen('game');

    // Swipe handler'ı başlat
    if (!swipeHandler) {
        swipeHandler = new SwipeHandler(elements.card, handleSwipe);
    } else {
        swipeHandler.reset();
    }
}

// Event Listeners
elements.startBtn.addEventListener('click', startGame);
elements.restartBtn.addEventListener('click', startGame);

// PiP Toggle
const pipBtn = document.getElementById('pip-toggle-btn');
const cardArea = document.querySelector('.card-area');

// Butona tıklayınca modu değiştir
pipBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Event bubbling engelle
    cardArea.classList.toggle('pip-mode');
    pipBtn.classList.toggle('active');
});

// Kart alanına tıklayınca (eğer pip modundaysa) normale dön
cardArea.addEventListener('click', (e) => {
    if (cardArea.classList.contains('pip-mode')) {
        cardArea.classList.remove('pip-mode');
        pipBtn.classList.remove('active');
    }
});

// Klavye kontrolleri (opsiyonel)
document.addEventListener('keydown', (e) => {
    if (screens.game.classList.contains('active') && !gameState.isGameOver) {
        if (e.key === 'ArrowLeft') {
            elements.card.classList.add('swipe-left');
            setTimeout(() => handleSwipe('left'), 300);
        } else if (e.key === 'ArrowRight') {
            elements.card.classList.add('swipe-right');
            setTimeout(() => handleSwipe('right'), 300);
        }
    }
});

// Başlangıç ekranını göster
showScreen('start');
