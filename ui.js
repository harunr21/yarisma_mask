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
    mainMenuBtn: document.getElementById('main-menu-btn'),
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
    endContent: document.querySelector('.end-content'),

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
    achievementMaskDescription: document.getElementById('achievement-mask-description'),

    // Video Overlay
    videoOverlay: document.getElementById('video-overlay'),
    storyVideo: document.getElementById('story-video'),
    skipVideoBtn: document.getElementById('skip-video-btn'),

    // Hikaye Geçmişi
    storyLog: document.getElementById('story-log'),
    storyLogToggle: document.getElementById('story-log-toggle'),
    storyLogEntries: document.getElementById('story-log-entries'),

    // Pause Menüsü
    pauseBtn: document.getElementById('pause-btn'),
    pauseMenu: document.getElementById('pause-menu'),
    resumeBtn: document.getElementById('resume-btn'),
    pauseRestartBtn: document.getElementById('pause-restart-btn'),
    pauseMainMenuBtn: document.getElementById('pause-main-menu-btn'),
    pauseSoundToggle: document.getElementById('pause-sound-toggle'),

    // Arkaplan Katmanları
    bgLayer1: document.getElementById('game-bg-layer-1'),
    bgLayer2: document.getElementById('game-bg-layer-2')
};

// ACT arkaplan görselleri
const actBackgrounds = {
    1: 'arkaplan_fotolari/1 - Düzenlendi.png',
    2: 'arkaplan_fotolari/2 - Düzenlendi.png',
    3: 'arkaplan_fotolari/4 - Düzenlendi.png',
    4: 'arkaplan_fotolari/7 - Düzenlendi.png'
};

// Aktif arkaplan katmanı takibi
let activeBackgroundLayer = 1;
let currentBackgroundAct = 0;

// Arkaplanı değiştir (crossfade efekti ile)
function updateGameBackground(act) {
    if (act === currentBackgroundAct) return; // Aynı ACT, değişiklik yok

    const bgPath = actBackgrounds[act];
    if (!bgPath) return;

    currentBackgroundAct = act;

    // Crossfade: Aktif olmayan katmanı güncelle, sonra aktif yap
    if (activeBackgroundLayer === 1) {
        // Layer 2'yi güncelle ve aktif yap
        elements.bgLayer2.style.backgroundImage = `url('${bgPath}')`;
        elements.bgLayer2.classList.add('active');
        elements.bgLayer1.classList.remove('active');
        activeBackgroundLayer = 2;
    } else {
        // Layer 1'i güncelle ve aktif yap
        elements.bgLayer1.style.backgroundImage = `url('${bgPath}')`;
        elements.bgLayer1.classList.add('active');
        elements.bgLayer2.classList.remove('active');
        activeBackgroundLayer = 1;
    }
}

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

// ACT görselleri yol bilgileri
const actImages = {
    1: 'kart_fotolari/1.png',
    2: 'kart_fotolari/2.png',
    3: 'kart_fotolari/3.png',
    4: 'kart_fotolari/4.png'
};

// Kartı render et
function renderCard(card) {
    if (!card) return;

    // ACT görselini göster
    const currentAct = gameState.currentAct;
    const actImagePath = actImages[currentAct];

    if (actImagePath) {
        // Görsel varsa görseli göster, emoji'yi gizle
        elements.cardImage.style.backgroundImage = `url('${actImagePath}')`;
        elements.cardImage.style.backgroundSize = 'cover';
        elements.cardImage.style.backgroundPosition = 'center';
        elements.cardEmoji.style.display = 'none';
    } else {
        // Görsel yoksa emoji'yi göster
        elements.cardImage.style.backgroundImage = 'none';
        elements.cardEmoji.style.display = 'block';
        elements.cardEmoji.textContent = card.emoji;
    }

    // Arkaplanı güncelle
    updateGameBackground(currentAct);

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
        "Güven Maskesi": "assets/masks/guven_maskesi.png",
        "Kimlik Maskesi": "assets/masks/kimlik_maskesi.png",
        "Bakım Maskesi": "assets/masks/bakim_maskesi.png",
        "Sessizlik Maskesi": "assets/masks/sessizlik_maskesi.png"
    };

    const maskDescriptions = {
        "İletişim Maskesi": "Sinyal gücünü artırır (+12). İki dünyanın köprüsü olabilirsin.",
        "Güven Maskesi": "Şüpheyi azaltır (-40). İnsanlar sana güvenmeye başlar.",
        "Kimlik Maskesi": "Resmi kayıtlara geçmeni sağlar (Şüphe +15, Enerji +10).",
        "Bakım Maskesi": "Maskeni onarır (+20). Özünü daha uzun süre korursun.",
        "Sessizlik Maskesi": "Görünmezlik sağlar (Şüphe -30, Sinyal -10). Gölgelerde yaşarsın."
    };

    elements.achievementMaskName.textContent = maskName;

    // Maske açıklamasını göster
    if (elements.achievementMaskDescription) {
        elements.achievementMaskDescription.textContent = maskDescriptions[maskName] || "";
    }

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
        "Güven Maskesi": "assets/masks/guven_maskesi.png",
        "Kimlik Maskesi": "assets/masks/kimlik_maskesi.png",
        "Bakım Maskesi": "assets/masks/bakim_maskesi.png",
        "Sessizlik Maskesi": "assets/masks/sessizlik_maskesi.png"
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
    const currentQuestion = gameState.currentQuestion; // Hikaye geçmişi için kaydet
    const result = gameState.applyChoice(direction);

    if (!result) return;

    // Seçim sesini çal
    playChoiceSound();

    // Hikaye geçmişine ekle
    addStoryEntry(oldDay, oldAct, currentQuestion, direction, result);

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
    // Arkaplan müziğini durdur
    stopBackgroundMusic();

    const endMessage = gameState.getEndMessage();

    elements.endIcon.textContent = endMessage.icon;
    elements.endTitle.textContent = endMessage.title;
    elements.endTitle.className = 'end-title ' + (endMessage.isWin ? 'win' : 'lose');
    elements.endDescription.textContent = endMessage.description;

    // Pencere çerçevesi rengini ayarla
    if (elements.endContent) {
        if (endMessage.isWin) {
            elements.endContent.classList.add('win');
        } else {
            elements.endContent.classList.remove('win');
        }
    }

    // Son istatistikler
    elements.endStats.innerHTML = `
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/signal.png" alt="Sinyal"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.signal)}%</span>
            <span class="end-stat-label">Sinyal</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/mask.png" alt="Maske"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.mask)}%</span>
            <span class="end-stat-label">Maske</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/suspicion.png" alt="Şüphe"></span>
            <span class="end-stat-value">${Math.floor(gameState.stats.suspicion)}%</span>
            <span class="end-stat-label">Şüphe</span>
        </div>
        <div class="end-stat">
            <span class="end-stat-icon"><img src="assets/icons/energy.png" alt="Enerji"></span>
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
            "Güven Maskesi": "assets/masks/guven_maskesi.png",
            "Kimlik Maskesi": "assets/masks/kimlik_maskesi.png",
            "Bakım Maskesi": "assets/masks/bakim_maskesi.png",
            "Sessizlik Maskesi": "assets/masks/sessizlik_maskesi.png"
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

    // Arkaplan müziğini fade-out ile duraklat
    pauseBackgroundMusic();

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

            // Arkaplan müziğini fade-in ile devam ettir
            resumeBackgroundMusic();

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
    clearStoryLog(); // Hikaye geçmişini temizle
    currentBackgroundAct = 0; // Arkaplan durumunu sıfırla

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

                // Arkaplan müziğini başlat (tüm intro videoları bittikten sonra)
                startBackgroundMusic();

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

    // Arkaplan müziğini kontrol et
    if (soundEnabled) {
        // Eğer oyun ekranındaysak müziği başlat
        if (screens.game.classList.contains('active') && !gameState.isGameOver) {
            const isVideoPlaying = elements.videoOverlay.classList.contains('active');
            if (!isVideoPlaying) {
                resumeBackgroundMusic();
            }
        }
    } else {
        // Ses kapatıldıysa müziği durdur
        stopBackgroundMusic();
    }
});

// Event Listeners
// Hızlı yeniden başlatma (Intro videolarını atla)
function restartGame() {
    gameState.reset();
    watchedVideos.clear();
    lastAct = 0;
    clearStoryLog();
    currentBackgroundAct = 0;

    // Intro, Giriş Hikayesi ve ACT 1 videosunu atla (direkt oyuna başla)
    watchedVideos.add('act1');

    updateStatBars(false);
    updateDayCounter();
    updateActProgress();
    updateCollectedMasks([]);

    // ACT 1 videosunu kontrol et (watchedVideos'a eklediğimiz için atlayacak)
    checkAndPlayActVideo(() => {
        const firstCard = gameState.getNextCard();
        renderCard(firstCard);

        showScreen('game');
        startBackgroundMusic();

        if (typeof swipeHandler === 'undefined' || !swipeHandler) {
            swipeHandler = new SwipeHandler(elements.card, handleSwipe);
        } else {
            swipeHandler.reset();
        }
    });
}

elements.startBtn.addEventListener('click', startGame);
elements.restartBtn.addEventListener('click', () => {
    // Arkaplan müziğini durdur
    stopBackgroundMusic();

    // Pause menüsünü kapat (eğer açıksa)
    if (typeof isPaused !== 'undefined' && isPaused) {
        closePauseMenu();
    }

    // Direkt oyunu yeniden başlat
    restartGame();
});

// Pause menüsü butonları
elements.pauseRestartBtn.addEventListener('click', () => {
    closePauseMenu();
    restartGame();
});

elements.pauseMainMenuBtn.addEventListener('click', () => {
    closePauseMenu();
    // Arkaplan müziğini durdur
    stopBackgroundMusic();

    // Oyun durumunu sıfırla
    gameState.reset();
    watchedVideos.clear();
    lastAct = 0;
    clearStoryLog();
    currentBackgroundAct = 0;

    // Ana menüye dön
    showScreen('start');
});

elements.mainMenuBtn.addEventListener('click', () => {
    // Arkaplan müziğini durdur
    stopBackgroundMusic();

    // Pause menüsünü kapat (eğer açıksa)
    if (typeof isPaused !== 'undefined' && isPaused) {
        closePauseMenu();
    }

    // Oyun durumunu sıfırla
    gameState.reset();
    watchedVideos.clear();
    lastAct = 0;
    clearStoryLog();
    currentBackgroundAct = 0;

    // Ana menüye dön
    showScreen('start');
});

// Ses durumu yönetimi
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // Varsayılan açık
const choiceSound = new Audio('ses_dosyalari/secim_sesi.mp3');

// Arkaplan müziği
const backgroundMusic = new Audio('ses_dosyalari/arkaplan_sesi.MP3');
backgroundMusic.loop = true; // Sürekli çalsın
backgroundMusic.volume = 0.5; // Başlangıç ses seviyesi (0-1 arası)

let musicFadeInterval = null; // Fade animasyonu için interval

// Arkaplan müziğini başlat
function startBackgroundMusic() {
    if (!soundEnabled) return;

    backgroundMusic.currentTime = 0;
    backgroundMusic.volume = 0; // Sessizden başla

    backgroundMusic.play().catch(e => console.log('Müzik çalma hatası:', e));

    // Fade-in: 0'dan 0.5'e
    fadeMusic(0, 0.5, 1000);
}

// Arkaplan müziğini durdur (fade-out ile)
function stopBackgroundMusic() {
    // Fade-out: Mevcut seviyeden 0'a
    fadeMusic(backgroundMusic.volume, 0, 1000, () => {
        backgroundMusic.pause();
    });
}

// Arkaplan müziğini fade-out yap (video başladığında)
function pauseBackgroundMusic() {
    if (musicFadeInterval) {
        clearInterval(musicFadeInterval);
        musicFadeInterval = null;
    }

    // Fade-out: Mevcut seviyeden 0'a
    fadeMusic(backgroundMusic.volume, 0, 800, () => {
        backgroundMusic.pause();
    });
}

// Arkaplan müziğini fade-in yap (video bittiğinde)
function resumeBackgroundMusic() {
    if (!soundEnabled) return;

    if (musicFadeInterval) {
        clearInterval(musicFadeInterval);
        musicFadeInterval = null;
    }

    backgroundMusic.play().catch(e => console.log('Müzik çalma hatası:', e));

    // Fade-in: 0'dan 0.5'e
    fadeMusic(0, 0.5, 800);
}

// Müzik seviyesini fade ile değiştir
function fadeMusic(fromVolume, toVolume, duration, callback) {
    if (musicFadeInterval) {
        clearInterval(musicFadeInterval);
    }

    const steps = 30; // 30 adımda geçiş yap
    const stepDuration = duration / steps;
    const volumeStep = (toVolume - fromVolume) / steps;

    let currentStep = 0;
    backgroundMusic.volume = Math.max(0, Math.min(1, fromVolume));

    musicFadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = fromVolume + (volumeStep * currentStep);
        backgroundMusic.volume = Math.max(0, Math.min(1, newVolume));

        if (currentStep >= steps) {
            clearInterval(musicFadeInterval);
            musicFadeInterval = null;
            backgroundMusic.volume = Math.max(0, Math.min(1, toVolume));
            if (callback) callback();
        }
    }, stepDuration);
}

function playChoiceSound() {
    if (soundEnabled) {
        choiceSound.currentTime = 0; // Sesi başa sar (hızlı art arda çalabilmek için)
        choiceSound.play().catch(e => console.log('Ses çalma hatası:', e));
    }
}

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

// ===================================
// TUTORIAL SİSTEMİ
// ===================================

let currentTutorialPage = 1;
const totalTutorialPages = 4;

// Tutorial elementlerini dinamik olarak seçelim (sayfa yüklendiğinde)
const tutorialElements = {
    prevBtn: document.getElementById('tutorial-prev-btn'),
    nextBtn: document.getElementById('tutorial-next-btn'),
    pagesContainer: document.getElementById('tutorial-pages-container'),
    progressFill: document.getElementById('tutorial-progress-fill'),
    progressText: document.getElementById('tutorial-progress-text'),
    // querySelectorAll dinamik olmadığı için güncelleme fonksiyonunda tekrar çağırılabilir ama burada sabit
    getDots: () => document.querySelectorAll('.page-dot'),
    getPages: () => document.querySelectorAll('.tutorial-page')
};

function updateTutorialUI() {
    // Sayfaları güncelle
    const pages = document.querySelectorAll('.tutorial-page');
    pages.forEach(page => {
        page.classList.remove('active');
        if (parseInt(page.dataset.page) === currentTutorialPage) {
            page.classList.add('active');
        }
    });

    // Noktaları güncelle
    const dots = document.querySelectorAll('.page-dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.page) === currentTutorialPage) {
            dot.classList.add('active');
        }
    });

    // İlerleme çubuğunu güncelle
    if (tutorialElements.progressFill && tutorialElements.progressText) {
        const progressPercentage = (currentTutorialPage / totalTutorialPages) * 100;
        tutorialElements.progressFill.style.width = `${progressPercentage}%`;
        tutorialElements.progressText.textContent = `${currentTutorialPage} / ${totalTutorialPages}`;
    }

    // Buton durumlarını güncelle
    if (tutorialElements.prevBtn) {
        tutorialElements.prevBtn.disabled = currentTutorialPage === 1;
        tutorialElements.prevBtn.style.opacity = currentTutorialPage === 1 ? '0.5' : '1';
        tutorialElements.prevBtn.style.cursor = currentTutorialPage === 1 ? 'default' : 'pointer';
    }

    if (tutorialElements.nextBtn) {
        const navText = tutorialElements.nextBtn.querySelector('.nav-text');
        const navArrow = tutorialElements.nextBtn.querySelector('.nav-arrow');

        if (currentTutorialPage === totalTutorialPages) {
            if (navText) navText.textContent = 'KAYDIRMAYA BAŞLA';
            if (navArrow) navArrow.textContent = '🚀';
            tutorialElements.nextBtn.classList.add('finish-btn');
        } else {
            if (navText) navText.textContent = 'SONRAKİ';
            if (navArrow) navArrow.textContent = '→';
            tutorialElements.nextBtn.classList.remove('finish-btn');
        }
    }
}

function nextTutorialPage() {
    if (currentTutorialPage < totalTutorialPages) {
        currentTutorialPage++;
        updateTutorialUI();
    } else {
        // Tutorial bitti, modalı kapat
        closeTutorial();

        // Eğer başlangıç ekranındaysak (oyun henüz başlamadıysa) oyunu başlat
        if (screens.start.classList.contains('active')) {
            startGame();
        }
    }
}

function prevTutorialPage() {
    if (currentTutorialPage > 1) {
        currentTutorialPage--;
        updateTutorialUI();
    }
}

function openTutorial() {
    currentTutorialPage = 1;
    updateTutorialUI();
    elements.tutorialModal.classList.add('active');
}

function closeTutorial() {
    elements.tutorialModal.classList.remove('active');
}

// Event Listeners - Eğer elementler varsa ekle
if (tutorialElements.nextBtn) {
    tutorialElements.nextBtn.addEventListener('click', nextTutorialPage);
}

if (tutorialElements.prevBtn) {
    tutorialElements.prevBtn.addEventListener('click', prevTutorialPage);
}

// Noktalara tıklama
const dots = document.querySelectorAll('.page-dot');
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentTutorialPage = parseInt(dot.dataset.page);
        updateTutorialUI();
    });
});

// Ana butonlar
elements.tutorialBtn.addEventListener('click', openTutorial);
elements.closeTutorialBtn.addEventListener('click', closeTutorial);

// Başlangıçta tutorial UI'ını bir kez güncelle
// (Script yüklendiğinde DOM hazır olmayabilir, bu yüzden window load veya element kontrolü yapılabilir ama script en sonda olduğu için sorun olmaz)
updateTutorialUI();

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
        elements.achievementOverlay.classList.contains('active') ||
        isPaused; // Pause menüsü kontrolü eklendi

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

// Hikaye Geçmişi Toggle
if (elements.storyLogToggle) {
    elements.storyLogToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStoryLog();
    });
}

// Başlık kısmına tıklama ile de toggle
const storyLogHeader = document.querySelector('.story-log-header');
if (storyLogHeader) {
    storyLogHeader.addEventListener('click', toggleStoryLog);
}

// Hikaye geçmişi toggle fonksiyonu
function toggleStoryLog() {
    if (elements.storyLog) {
        elements.storyLog.classList.toggle('collapsed');
    }
}

// Hikaye geçmişine yeni girdi ekle
// Hikaye geçmişine yeni girdi ekle
function addStoryEntry(day, act, question, direction, result) {
    if (!elements.storyLogEntries || !question) return;

    // Boş mesajı kaldır (varsa)
    const emptyMsg = elements.storyLogEntries.querySelector('.story-log-empty');
    if (emptyMsg) {
        emptyMsg.remove();
    }

    const choice = result.choice;
    const statIcons = {
        signal: 'assets/icons/signal.png',
        mask: 'assets/icons/mask.png',
        suspicion: 'assets/icons/suspicion.png',
        energy: 'assets/icons/energy.png'
    };

    const statNames = {
        signal: 'Sinyal',
        mask: 'Maske',
        suspicion: 'Şüphe',
        energy: 'Enerji'
    };

    // Helper to generate stat HTML
    const generateStatHtml = (stat, value) => {
        if (value === 0) return '';
        const sign = value > 0 ? '+' : '';
        const className = value > 0 ? 'positive' : 'negative';
        const formattedValue = Math.round(value * 10) / 10;
        return `
            <span class="story-stat-change ${className}">
                <img src="${statIcons[stat]}" alt="${statNames[stat]}">
                ${sign}${formattedValue}
            </span>
        `;
    };

    // 1. Karar Etkileri (Choice Actions)
    let choiceStatsHtml = '';
    if (result.effects) {
        for (const [stat, value] of Object.entries(result.effects)) {
            choiceStatsHtml += generateStatHtml(stat, value);
        }
    }

    // 2. Pasif Değişimler (Passive Changes)
    let passiveStatsHtml = '';
    if (result.changes) {
        for (const [stat, info] of Object.entries(result.changes)) {
            let maskEffect = (result.maskEffects && result.maskEffects[stat]) || 0;
            let actionEffect = (result.effects && result.effects[stat]) || 0;
            // Pasif = Total - Action - MaskEffect
            let passive = info.totalChange - actionEffect - maskEffect;

            // Floating point precision fix
            if (Math.abs(passive) > 0.1) {
                passiveStatsHtml += generateStatHtml(stat, passive);
            }
        }
    }

    // 3. Maske Etkileri (Mask Bonuses)
    let maskEffectsHtml = '';
    if (result.maskEffects) {
        for (const [stat, value] of Object.entries(result.maskEffects)) {
            maskEffectsHtml += generateStatHtml(stat, value);
        }
    }

    // Maske kazanma görseli
    let maskEarnedHtml = '';
    if (result.earnedMask) {
        const maskImages = {
            "İletişim Maskesi": "assets/masks/iletisim_maskesi.png",
            "Güven Maskesi": "assets/masks/guven_maskesi.png",
            "Kimlik Maskesi": "assets/masks/kimlik_maskesi.png",
            "Bakım Maskesi": "assets/masks/bakim_maskesi.png",
            "Sessizlik Maskesi": "assets/masks/sessizlik_maskesi.png"
        };
        const maskImage = maskImages[result.earnedMask];
        if (maskImage) {
            maskEarnedHtml = `
                <div class="story-entry-mask-earned">
                    <img src="${maskImage}" alt="${result.earnedMask}">
                    <span>🎭 ${result.earnedMask} Kazanıldı!</span>
                </div>
            `;
        }
    }

    // Act ismi al
    let actName = '';
    if (typeof QUESTION_POOL !== 'undefined' && QUESTION_POOL[act]) {
        actName = QUESTION_POOL[act].name;
    }

    const entry = document.createElement('div');
    entry.className = 'story-entry';

    let html = `
        <div class="story-entry-header">
            <span class="story-entry-day">📅 Gün ${day}</span>
            <span class="story-entry-act">${actName || `Bölüm ${act}`}</span>
        </div>
        <div class="story-entry-question">${question.description}</div>
        <div class="story-entry-choice ${direction === 'left' ? 'left-choice' : 'right-choice'}">
            <span class="story-entry-choice-arrow">${direction === 'left' ? '←' : '→'}</span>
            <span class="story-entry-choice-text">${choice.text}</span>
        </div>
        ${choice.result ? `<div class="story-entry-result">"${choice.result}"</div>` : ''}
    `;

    // Add Sections clearly
    if (choiceStatsHtml) {
        html += `<div class="story-entry-section">
                    <div class="story-section-title">KARAR ETKİSİ</div>
                    <div class="story-entry-stats">${choiceStatsHtml}</div>
                 </div>`;
    }

    if (maskEarnedHtml) {
        html += maskEarnedHtml;
    }

    if (maskEffectsHtml) {
        html += `<div class="story-entry-section">
                    <div class="story-section-title">MASKE BONUSU</div>
                    <div class="story-entry-stats">${maskEffectsHtml}</div>
                 </div>`;
    }

    if (passiveStatsHtml) {
        html += `<div class="story-entry-section">
                    <div class="story-section-title">ZAMAN / PASİF</div>
                    <div class="story-entry-stats">${passiveStatsHtml}</div>
                 </div>`;
    }

    entry.innerHTML = html;

    // En üste ekle (son karar en üstte)
    elements.storyLogEntries.insertBefore(entry, elements.storyLogEntries.firstChild);

    // Çok fazla girdi varsa en eskilerini temizle (performans için)
    const maxEntries = 50;
    while (elements.storyLogEntries.children.length > maxEntries) {
        elements.storyLogEntries.removeChild(elements.storyLogEntries.lastChild);
    }
}

// Hikaye geçmişini temizle
function clearStoryLog() {
    if (elements.storyLogEntries) {
        elements.storyLogEntries.innerHTML = `
            <div class="story-log-empty">
                <p>Henüz karar verilmedi...</p>
                <p style="font-size: 0.8rem; margin-top: 8px;">Kararların burada görünecek</p>
            </div>
        `;
    }
}

// ===================================
// PAUSE MENU FUNCTIONALITY
// ===================================

let isPaused = false;

// Pause menüsünü aç
function openPauseMenu() {
    if (isPaused) return;

    isPaused = true;
    elements.pauseMenu.classList.add('active');

    // Arkaplan müziğinin sesini azalt (0.5'ten 0.15'e)
    if (soundEnabled && !backgroundMusic.paused) {
        fadeMusic(backgroundMusic.volume, 0.15, 300);
    }

    // Ses toggle durumunu senkronize et
    updatePauseSoundUI();
}

// Pause menüsünü kapat
function closePauseMenu() {
    if (!isPaused) return;

    isPaused = false;
    elements.pauseMenu.classList.remove('active');

    // Arkaplan müziğinin sesini normale döndür (0.5'e)
    if (soundEnabled && !backgroundMusic.paused) {
        fadeMusic(backgroundMusic.volume, 0.5, 300);
    }
}

// Pause menü ses toggle UI'ı güncelle
function updatePauseSoundUI() {
    if (soundEnabled) {
        elements.pauseSoundToggle.textContent = 'AÇIK';
        elements.pauseSoundToggle.classList.add('on');
    } else {
        elements.pauseSoundToggle.textContent = 'KAPALI';
        elements.pauseSoundToggle.classList.remove('on');
    }
}

// Pause butonu event listener
elements.pauseBtn.addEventListener('click', () => {
    openPauseMenu();
});

// Resume butonu event listener
elements.resumeBtn.addEventListener('click', () => {
    closePauseMenu();
});

// Pause menüsü ses toggle
elements.pauseSoundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateSoundUI();
    updatePauseSoundUI();

    // Arkaplan müziğini kontrol et
    if (soundEnabled) {
        // Eğer oyun ekranındaysak müziği başlat
        if (screens.game.classList.contains('active') && !gameState.isGameOver) {
            const isVideoPlaying = elements.videoOverlay.classList.contains('active');
            if (!isVideoPlaying) {
                resumeBackgroundMusic();
            }
        }
    } else {
        // Ses kapatıldıysa müziği durdur
        stopBackgroundMusic();
    }
});

// ESC tuşu ile pause menüsü toggle
document.addEventListener('keydown', (e) => {
    // Sadece oyun ekranında ESC ile pause menüsü açılsın
    if (e.key === 'Escape' && screens.game.classList.contains('active') && !gameState.isGameOver) {
        // Video veya başka overlay açıksa ESC tuşunu işleme
        const isOverlayActive = elements.dayOverlay.classList.contains('active') ||
            elements.achievementOverlay.classList.contains('active') ||
            elements.videoOverlay.classList.contains('active');

        if (!isOverlayActive) {
            if (isPaused) {
                closePauseMenu();
            } else {
                openPauseMenu();
            }
        }
    }
});

// Başlangıç ekranını göster
showScreen('start');
