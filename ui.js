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
    settingsBtn: document.getElementById('settings-btn'),
    tutorialBtn: document.getElementById('tutorial-btn'),
    settingsModal: document.getElementById('settings-modal'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    tutorialModal: document.getElementById('tutorial-modal'),
    closeTutorialBtn: document.getElementById('close-tutorial-btn'),
    soundToggle: document.getElementById('sound-toggle'),

    // Stat barlar
    signalBar: document.getElementById('signal-bar'),
    maskBar: document.getElementById('mask-bar'),
    suspicionBar: document.getElementById('suspicion-bar'),
    energyBar: document.getElementById('energy-bar'),
    signalValue: document.getElementById('signal-value'),
    maskValue: document.getElementById('mask-value'),
    suspicionValue: document.getElementById('suspicion-value'),
    energyValue: document.getElementById('energy-value'),

    // Kart
    card: document.getElementById('current-card'),
    cardImage: document.getElementById('card-image'),
    cardEmoji: document.querySelector('.card-emoji'),
    // cardTitle kaldırıldı
    cardDescription: document.getElementById('card-description'),
    leftChoiceText: document.getElementById('left-choice-text'),
    rightChoiceText: document.getElementById('right-choice-text'),

    // Gün sayacı
    dayNumber: document.getElementById('day-number'),

    // Oyun sonu
    endIcon: document.getElementById('end-icon'),
    endTitle: document.getElementById('end-title'),
    endDescription: document.getElementById('end-description'),
    endStats: document.getElementById('end-stats'),

    // Gün animasyon overlay
    dayOverlay: document.getElementById('day-overlay'),
    dayOverlayLabel: document.querySelector('.day-overlay-label'),
    dayOverlayNumber: document.getElementById('day-overlay-number'),
    dayOverlayNumber: document.getElementById('day-overlay-number'),
    dayOverlayResult: document.getElementById('day-overlay-result'),

    // Toplanan maskeler
    collectedMasksContainer: document.getElementById('collected-masks-container'),

    // Başarım Overlay
    achievementOverlay: document.getElementById('achievement-overlay'),
    achievementMaskName: document.getElementById('achievement-mask-name'),
    achievementMaskImageContainer: document.getElementById('achievement-mask-image-container')
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

    // Değerleri yaz
    elements.signalValue.textContent = `${Math.floor(stats.signal)}`;
    elements.maskValue.textContent = `${Math.floor(stats.mask)}`;
    elements.suspicionValue.textContent = `${Math.floor(stats.suspicion)}`;
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
function animateStatChange(statName, changeAmount, passiveAmount = 0) {
    const statElement = document.querySelector(`.stat[data-stat="${statName}"]`);
    if (statElement) {
        statElement.classList.add('pulse');
        setTimeout(() => {
            statElement.classList.remove('pulse');
        }, 300);

        // Değişim göstergesi (sayısal animasyon)
        if (changeAmount !== 0 || passiveAmount !== 0) {
            const indicator = document.createElement('div');

            // Ana seçim etkisi
            const choiceSign = changeAmount > 0 ? '+' : '';
            const choiceText = changeAmount !== 0 ? `${choiceSign}${changeAmount}` : '';

            // Pasif etki (günlük değişimler)
            const passiveSign = passiveAmount > 0 ? '+' : '';
            const formattedPassive = passiveAmount.toFixed(1).replace('.0', '');
            const passiveText = passiveAmount !== 0 ? `${passiveSign}${formattedPassive}` : '';

            indicator.className = `stat-change-indicator ${(changeAmount + passiveAmount) > 0 ? 'positive' : 'negative'}`;

            if (choiceText && passiveText) {
                indicator.innerHTML = `<span class="choice-val">${choiceText}</span><span class="passive-val">${passiveText}</span>`;
            } else {
                indicator.textContent = choiceText || passiveText;
            }

            statElement.appendChild(indicator);
        }
    }
}

// Kartı render et
function renderCard(card) {
    if (!card) return;

    elements.cardEmoji.textContent = card.emoji;
    // elements.cardTitle.textContent = card.title; // Kaldırıldı
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

// ACT ve ilerleme göstergesini güncelle (Devre dışı bırakıldı)
function updateActProgress() {
    // Kullanıcı isteği üzerine kaldırıldı
}

// Gün geçiş animasyonu
function animateDayPass(startDay, endDay, resultText, callback) {
    if (startDay >= endDay) {
        if (callback) callback();
        return;
    }

    elements.dayOverlay.classList.add('active');

    // İmleci normal yap, tıklama hazır olunca pointer olacak
    elements.dayOverlay.style.cursor = 'default';

    // Sonuç metnini ayarla
    if (elements.dayOverlayResult) {
        elements.dayOverlayResult.textContent = resultText || '';
    }

    // Animasyon başlangıç değeri
    let current = startDay;
    elements.dayOverlayNumber.textContent = current;

    // Fark arttıkça hızlan, ama çok hızlı da olmasın
    const diff = endDay - startDay;
    const durationPerStep = Math.max(50, Math.min(200, 1000 / diff));

    const interval = setInterval(() => {
        current++;
        elements.dayOverlayNumber.textContent = current;

        if (current >= endDay) {
            clearInterval(interval);

            // Sayaç bittiğinde tıklama ile geçişi aktifleştir
            setTimeout(() => {
                // Görsel ipucu: imleci pointer yap
                elements.dayOverlay.style.cursor = 'pointer';

                const onOverlayClick = () => {
                    elements.dayOverlay.classList.remove('active');
                    if (callback) callback();
                };

                elements.dayOverlay.addEventListener('click', onOverlayClick, { once: true });
            }, 500); // 500ms bekle ki yanlışlıkla hemen geçilmesin
        }
    }, durationPerStep);
}

// Başarım animasyonu
function animateMaskAward(maskName, callback) {
    const maskImages = {
        "İletişim Maskesi": "assets/masks/iletisim_maskesi.png",
        "Güven Maskesi": "assets/masks/guven_maskesi.png"
    };

    elements.achievementMaskName.textContent = maskName;

    // Görsel ekle
    const imagePath = maskImages[maskName];
    if (imagePath) {
        elements.achievementMaskImageContainer.innerHTML = `<img src="${imagePath}" alt="${maskName}">`;
    } else {
        elements.achievementMaskImageContainer.innerHTML = '';
    }

    elements.achievementOverlay.classList.add('active');

    // Tıklayınca kapat
    const onAchievementClick = () => {
        elements.achievementOverlay.classList.remove('active');
        if (callback) callback();
    };

    elements.achievementOverlay.addEventListener('click', onAchievementClick, { once: true });
}

// Toplanan maskeleri güncelle
function updateCollectedMasks(masks) {
    if (!elements.collectedMasksContainer) return;

    elements.collectedMasksContainer.innerHTML = '';

    // Sabit slotlar oluşturabiliriz veya sadece toplananları gösterebiliriz.
    // Kullanıcı "kazandıkça o slota yerleşsin" dediği için şimdilik sadece var olanları gösterelim.
    // Ancak "slot" hissi için boş slotlar da ekleyebiliriz ama şimdilik dinamik yapalım.

    if (!masks || masks.length === 0) return;

    const maskImages = {
        "İletişim Maskesi": "assets/masks/iletisim_maskesi.png",
        "Güven Maskesi": "assets/masks/guven_maskesi.png"
    };

    masks.forEach(maskName => {
        const imagePath = maskImages[maskName];
        if (imagePath) {
            const maskEl = document.createElement('div');
            maskEl.className = 'collected-mask-slot';
            maskEl.innerHTML = `
                <img src="${imagePath}" alt="${maskName}" class="collected-mask-image">
                <div class="mask-tooltip">${maskName}</div>
            `;

            // Tıklama ile isni göster/gizle
            maskEl.addEventListener('click', (e) => {
                e.stopPropagation(); // Event bubbling engelle

                // Diğer tüm tooltipleri kapat
                document.querySelectorAll('.mask-tooltip').forEach(el => {
                    if (el !== maskEl.querySelector('.mask-tooltip')) {
                        el.classList.remove('visible');
                    }
                });

                // Tıklanan slotun tooltip'ini toggle et
                const tooltip = maskEl.querySelector('.mask-tooltip');
                tooltip.classList.toggle('visible');
            });

            elements.collectedMasksContainer.appendChild(maskEl);
        }
    });
}

// Swipe işlendikten sonra
function handleSwipe(direction) {
    const oldDay = gameState.day; // Animasyon için eski günü kaydet
    const result = gameState.applyChoice(direction);

    if (!result) return;

    // Değişen statları animasyonla göster
    for (const [statName, changeInfo] of Object.entries(result.changes)) {
        // changeInfo.change: kartın etkisi
        // changeInfo.totalChange: pasifler dahil toplam değişim
        const passive = changeInfo.totalChange - changeInfo.change;

        if (changeInfo.change !== 0 || Math.abs(passive) > 0.01) {
            animateStatChange(statName, changeInfo.change, passive);
        }
    }

    // Stat barlarını güncelle
    updateStatBars();

    // ACT göstergesini güncelle
    updateActProgress();

    // Maskeleri güncelle
    if (result.collectedMasks) {
        updateCollectedMasks(result.collectedMasks);
    }

    // İşlem sonrası yapılacaklar (Yeni kart veya oyun sonu)
    const onComplete = () => {
        // Değişim göstergelerini (sayıları) temizle
        document.querySelectorAll('.stat-change-indicator').forEach(el => el.remove());

        // Eğer maske kazanıldıysa başarım animasyonunu göster
        if (result.earnedMask) {
            animateMaskAward(result.earnedMask, () => {
                updateDayCounter();

                if (result.isGameOver) {
                    setTimeout(() => {
                        showEndScreen();
                    }, 500);
                } else {
                    swipeHandler.reset();
                    const nextCard = gameState.getNextCard();
                    renderCard(nextCard);
                }
            });
        } else {
            updateDayCounter();

            if (result.isGameOver) {
                setTimeout(() => {
                    showEndScreen();
                }, 500);
            } else {
                swipeHandler.reset();
                const nextCard = gameState.getNextCard();
                renderCard(nextCard);
            }
        }
    };

    // Gün geçişi olduysa animasyonu oynat
    if (result.day > oldDay) {
        // Kartın çıkış animasyonunu bekle (400ms)
        setTimeout(() => {
            // Sonuç metnini al
            const resultText = result.choice.result;
            animateDayPass(oldDay, result.day, resultText, onComplete);
        }, 400);
    } else {
        // Gün değişmediyse (bazen olabilir)
        setTimeout(onComplete, 400);
    }
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
            <span class="end-stat-icon"><img src="assets/icons/signal.png" alt="Sinyal" style="height: 32px;"></span>
            <span class="end-stat-value">${gameState.stats.signal}%</span>
            <span class="end-stat-label">Sinyal</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/mask.png" alt="Maske" style="height: 32px;"></span>
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
    updateDayCounter();
    updateActProgress();
    updateCollectedMasks([]); // Maskeleri sıfırla

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

elements.soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateSoundUI();
});

// Event Listeners
elements.startBtn.addEventListener('click', startGame);
elements.restartBtn.addEventListener('click', startGame);

// Ses durumu yönetimi
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // Varsayılan açık

function updateSoundUI() {
    if (soundEnabled) {
        elements.soundToggle.textContent = 'AÇIK';
        elements.soundToggle.classList.add('on');
    } else {
        elements.soundToggle.textContent = 'KAPALI';
        elements.soundToggle.classList.remove('on');
    }
}

// İlk yüklemede UI'ı güncelle
updateSoundUI();

elements.settingsBtn.addEventListener('click', () => {
    elements.settingsModal.classList.add('active');
});

elements.closeSettingsBtn.addEventListener('click', () => {
    elements.settingsModal.classList.remove('active');
});

elements.tutorialBtn.addEventListener('click', () => {
    elements.tutorialModal.classList.add('active');
});

elements.closeTutorialBtn.addEventListener('click', () => {
    elements.tutorialModal.classList.remove('active');
});

// Sayfanın herhangi bir yerine tıklayınca maske isimlerini kapat
document.addEventListener('click', () => {
    document.querySelectorAll('.mask-tooltip.visible').forEach(el => {
        el.classList.remove('visible');
    });
});

// Klavye kontrolleri (Ok tuşlarıyla seçim yapma)
document.addEventListener('keydown', (e) => {
    // Sadece oyun ekranı aktifse ve oyun bitmediyse çalışsın
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
