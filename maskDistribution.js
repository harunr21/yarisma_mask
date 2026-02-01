/**
 * MASK OF DESTINY - Maske Dağıtım Sistemi
 * Maskelerin hangi sorularda sorulacağını rastgele belirler
 */

// Oyun başladığında çağrılacak - maskeleri rastgele sorulara atar
function initializeMaskDistribution() {
    // 5 farklı maske var
    const masks = [
        'İletişim Maskesi',     // COMMUNICATION_MASK_GATE
        'Kimlik Maskesi',        // IDENTITY_MASK_GATE
        'Bakım Maskesi',         // MAINTENANCE_MASK_GATE
        'Sessizlik Maskesi',     // SILENCE_MASK_GATE
        'Güven Maskesi'          // TRUST_MASK_GATE
    ];

    // ACT 2 ve ACT 3'teki toplam soru sayısı: 14 (ACT 2: 7 soru, ACT 3: 7 soru)
    const availableQuestions = [];

    // ACT 2 - Soru 1-7
    for (let q = 1; q <= 7; q++) {
        availableQuestions.push({ act: 2, question: q });
    }

    // ACT 3 - Soru 1-7
    for (let q = 1; q <= 7; q++) {
        availableQuestions.push({ act: 3, question: q });
    }

    // Soruları karıştır (Fisher-Yates shuffle)
    for (let i = availableQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableQuestions[i], availableQuestions[j]] = [availableQuestions[j], availableQuestions[i]];
    }

    // İlk 5 soruyu maske soruları olarak ayır
    const maskDistribution = {};

    for (let i = 0; i < masks.length; i++) {
        const maskName = masks[i];
        const assignedQuestion = availableQuestions[i];

        const key = `${assignedQuestion.act}-${assignedQuestion.question}`;
        maskDistribution[key] = maskName;
    }

    // Global değişkene kaydet
    window.MASK_DISTRIBUTION = maskDistribution;

    console.log('🎭 Maske dağılımı oluşturuldu:', maskDistribution);
    return maskDistribution;
}

// Belirli bir soruda hangi maskenin verileceğini kontrol et
function getMaskForQuestion(act, questionNumber) {
    if (!window.MASK_DISTRIBUTION) {
        console.warn('Maske dağılımı henüz oluşturulmamış! initializeMaskDistribution() çağrılmalı.');
        return null;
    }

    const key = `${act}-${questionNumber}`;
    return window.MASK_DISTRIBUTION[key] || null;
}

// Bu sorunun bir maske sorusu olup olmadığını kontrol et
function isQuestionMaskGate(act, questionNumber) {
    return getMaskForQuestion(act, questionNumber) !== null;
}

// Dışa aktarma
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMaskDistribution,
        getMaskForQuestion,
        isQuestionMaskGate
    };
}
