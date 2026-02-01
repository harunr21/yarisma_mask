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
    achievementMaskImageContainer: document.getElementById('achievement-mask-image-container'),

    // Video Overlay
    videoOverlay: document.getElementById('video-overlay'),
    storyVideo: document.getElementById('story-video'),
    skipVideoBtn: document.getElementById('skip-video-btn')
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
    elements.dayOverlay.style.cursor = 'pointer'; // Her zaman tıklanabilir yapalım

    if (elements.dayOverlayResult) {
        elements.dayOverlayResult.textContent = resultText || '';
    }

    let current = startDay;
    elements.dayOverlayNumber.textContent = current;

    const diff = endDay - startDay;
    const durationPerStep = Math.max(50, Math.min(200, 1000 / diff));

    let isFinishPending = false;

    const finishAnimation = () => {
        if (isFinishPending) return;
        isFinishPending = true;

        clearInterval(interval);
        elements.dayOverlayNumber.textContent = endDay;

        // Animasyonun bittiğini belirtmek için küçük bir bekleme (opsiyonel)
        setTimeout(() => {
            elements.dayOverlay.classList.remove('active');
            // Event listener'ları temizle
            document.removeEventListener('keydown', handleSkip);
            elements.dayOverlay.removeEventListener('click', finishAnimation);
            if (callback) callback();
        }, 100);
    };

    const handleSkip = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
            finishAnimation();
        }
    };

    const interval = setInterval(() => {
        current++;
        elements.dayOverlayNumber.textContent = current;

        if (current >= endDay) {
            clearInterval(interval);
            // Sayaç doğal bittiğinde de tıklamayı beklesin veya tıklandıysa zaten bitecek
        }
    }, durationPerStep);

    // Hem tıklama hem klavye ile geçme desteği
    elements.dayOverlay.addEventListener('click', finishAnimation);
    document.addEventListener('keydown', handleSkip);
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
    const oldAct = gameState.currentAct; // ACT değişikliği kontrolü için
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

    // ACT değişikliği kontrolü
    const actChanged = result.currentAct !== oldAct && result.currentAct >= 2 && result.currentAct <= 4;

    // Sonraki kartı göster (ACT değiştiyse video ile birlikte)
    const showNextCard = () => {
        if (result.isGameOver) {
            setTimeout(() => {
                showEndScreen();
            }, 500);
        } else {
            // ACT değiştiyse önce video oynat
            if (actChanged) {
                const actVideoKey = `act${result.currentAct}`;
                if (!watchedVideos.has(actVideoKey)) {
                    playVideo(actVideoKey, () => {
                        swipeHandler.reset();
                        const nextCard = gameState.getNextCard();
                        renderCard(nextCard);
                    });
                    return;
                }
            }

            swipeHandler.reset();
            const nextCard = gameState.getNextCard();
            renderCard(nextCard);
        }
    };

    // İşlem sonrası yapılacaklar (Yeni kart veya oyun sonu)
    const onComplete = () => {
        // Değişim göstergelerini (sayıları) temizle
        document.querySelectorAll('.stat-change-indicator').forEach(el => el.remove());

        // Eğer maske kazanıldıysa başarım animasyonunu göster
        if (result.earnedMask) {
            animateMaskAward(result.earnedMask, () => {
                updateDayCounter();
                showNextCard();
            });
        } else {
            updateDayCounter();
            showNextCard();
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
            <span class="end-stat-value">${Math.floor(gameState.stats.signal)}%</span>
            <span class="end-stat-label">Sinyal</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/mask.png" alt="Maske" style="height: 32px;"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.mask)}%</span>
            <span class="end-stat-label">Maske</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/suspicion.png" alt="Şüphe" style="height: 32px;"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.suspicion)}%</span>
            <span class="end-stat-label">Şüphe</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/energy.png" alt="Enerji" style="height: 32px;"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.energy)}%</span>
            <span class="end-stat-label">Enerji</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon">📅</span>
            <span class="end-stat-value">${gameState.day}</span>
            <span class="end-stat-label">Gün</span>
        </div>
    `;

    // Kazanılan maskeler raporu
    if (gameState.collectedMasks.length > 0) {
        const maskImages = {
            "İletişim Maskesi": "assets/masks/iletisim_maskesi.png",
            "Güven Maskesi": "assets/masks/guven_maskesi.png"
        };

        const masksHtml = gameState.collectedMasks.map(maskName => {
            const imagePath = maskImages[maskName];
            return `
                <div class="end-mask-item">
                    <img src="${imagePath}" alt="${maskName}">
                    <span>${maskName}</span>
                </div>
            `;
        }).join('');

        elements.endStats.innerHTML += `
            <div class="end-masks-report">
                <h3>KAZANILAN MASKELER</h3>
                <div class="end-masks-list">
                    ${masksHtml}
                </div>
            </div>
        `;
    } else {
        elements.endStats.innerHTML += `
            <div class="end-masks-report">
                <h3>HİÇ MASKE KAZANAMADIN</h3>
            </div>
        `;
    }

    showScreen('end');
}

// Video oynatma fonksiyonu
const videoSources = {
    intro: 'editli_videolar/1.mp4',              // Oyun başlangıcı
    giris_hikayesi: 'editli_videolar/giris_hikayesi.mp4',  // Giriş hikayesi
    act1: 'editli_videolar/2.mp4',               // ACT 1 başlangıcı
    act2: 'editli_videolar/3.mp4',               // ACT 2 başlangıcı
    act3: 'editli_videolar/4.mp4',               // ACT 3 başlangıcı
    act4: 'editli_videolar/5.mp4'                // ACT 4 başlangıcı
};

// Video başlıkları
const videoTitles = {
    intro: 'BAŞLANGIÇ',
    giris_hikayesi: 'HİKAYE',
    act1: 'BÖLÜM 1 - ENKAZ VE İLK TAKLİT',
    act2: 'BÖLÜM 2 - ŞEHİR SENİ ÖĞRENİYOR',
    act3: 'BÖLÜM 3 - YAKINLIK VE GÜVEN',
    act4: 'BÖLÜM 4 - SON DÜZLÜK'
};

// İzlenen videolar (tekrar izlenmemesi için)
let watchedVideos = new Set();

// Video başlık elementi
const videoHeaderTitle = document.getElementById('video-header-title');

function playVideo(videoKey, callback) {
    const videoSrc = videoSources[videoKey];
    if (!videoSrc) {
        if (callback) callback();
        return;
    }

    // Video elementini güncelle
    elements.storyVideo.src = videoSrc;
    elements.storyVideo.load();

    // Video başlığını güncelle
    if (videoHeaderTitle) {
        videoHeaderTitle.textContent = videoTitles[videoKey] || '';
    }

    // Fade-out class'ını kaldır (önceki animasyonlardan kalmış olabilir)
    elements.videoOverlay.classList.remove('fade-out');

    // Video overlay'i göster
    elements.videoOverlay.classList.add('active');

    // Atla butonunu sıfırla (animasyon tekrar çalışsın)
    elements.skipVideoBtn.style.animation = 'none';
    elements.skipVideoBtn.offsetHeight; // Reflow tetikle
    elements.skipVideoBtn.style.animation = 'fadeInSkipBtn 0.8s ease 1.5s forwards';

    // Video bittiğinde
    const onVideoEnd = () => {
        closeVideoWithFade(callback);
    };

    // Atla butonuna tıklama
    const onSkip = () => {
        closeVideoWithFade(callback);
    };

    // Video bittiğinde tetiklenir
    elements.storyVideo.addEventListener('ended', onVideoEnd, { once: true });

    // Atla butonuna tıklama
    elements.skipVideoBtn.addEventListener('click', onSkip, { once: true });

    // Video oynatmayı başlat
    elements.storyVideo.play().catch(err => {
        console.log('Video oynatılamadı:', err);
        closeVideoWithFade(callback);
    });

    function closeVideoWithFade(cb) {
        // Event listener'ları temizle
        elements.storyVideo.removeEventListener('ended', onVideoEnd);
        elements.skipVideoBtn.removeEventListener('click', onSkip);

        // Fade-out animasyonunu başlat
        elements.videoOverlay.classList.add('fade-out');

        // Animasyon bitince overlay'i tamamen kapat
        setTimeout(() => {
            elements.storyVideo.pause();
            elements.videoOverlay.classList.remove('active');
            elements.videoOverlay.classList.remove('fade-out');
            watchedVideos.add(videoKey);
            if (cb) cb();
        }, 600); // CSS transition süresiyle eşleş
    }
}

// ACT değişikliğini kontrol et ve video oynat
let lastAct = 0;

function checkAndPlayActVideo(callback) {
    const currentAct = gameState.currentAct;

    // ACT değiştiyse ve bu ACT için video henüz izlenmediyse
    if (currentAct !== lastAct && currentAct >= 1 && currentAct <= 4) {
        const actVideoKey = `act${currentAct}`;

        if (!watchedVideos.has(actVideoKey)) {
            lastAct = currentAct;
            playVideo(actVideoKey, callback);
            return;
        }
    }

    lastAct = currentAct;
    if (callback) callback();
}

// Oyunu başlat
function startGame() {
    gameState.reset();
    watchedVideos.clear(); // İzlenen videoları sıfırla
    lastAct = 0;

    // Önce intro videosunu oynat
    playVideo('intro', () => {
        // Sonra giriş hikayesi videosunu oynat
        playVideo('giris_hikayesi', () => {
            updateStatBars(false);
            updateDayCounter();
            updateDayCounter();
            updateActProgress();
            updateCollectedMasks([]); // Maskeleri sıfırla

            // ACT 1 videosunu oynat
            checkAndPlayActVideo(() => {
                const firstCard = gameState.getNextCard();
                renderCard(firstCard);

                showScreen('game');

                // Swipe handler'ı başlat
                if (!swipeHandler) {
                    swipeHandler = new SwipeHandler(elements.card, handleSwipe);
                } else {
                    swipeHandler.reset();
                }
            });
        });
    });
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
    // Statik ekranlar veya overlay'ler açıkken kart kaydırmayı engelle
    const isOverlayActive = elements.dayOverlay.classList.contains('active') ||
        elements.achievementOverlay.classList.contains('active');

    // Sadece oyun ekranı aktifse, oyun bitmediyse ve bir overlay açık değilse çalışsın
    if (screens.game.classList.contains('active') && !gameState.isGameOver && !isOverlayActive) {
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
