/**
 * MASK OF DESTINY - Kart Veri Dosyası
 * Her kart senaryo içerir ve sol/sağ seçimlerle farklı etkiler yaratır
 */

const CARDS = [
    // === SİNYAL KARTLARI ===
    {
        id: "signal_antenna",
        title: "Gizli Anten",
        description: "Çatıda küçük bir sinyal anteni kurabilirsin. Riskli ama sinyal güçlenir.",
        emoji: "📡",
        choices: {
            left: {
                text: "Çok riskli",
                effects: { signal: 0, mask: -3, suspicion: 0, energy: -2 }
            },
            right: {
                text: "Anteni kur",
                effects: { signal: 15, mask: -8, suspicion: 15, energy: -5 }
            }
        }
    },
    {
        id: "signal_radio",
        title: "Eski Radyo",
        description: "Komşunun çöpe attığı eski radyoyu gördün. İçindeki parçalar işine yarayabilir.",
        emoji: "📻",
        choices: {
            left: {
                text: "Görmezden gel",
                effects: { signal: 0, mask: 0, suspicion: -5, energy: 3 }
            },
            right: {
                text: "Parçaları al",
                effects: { signal: 10, mask: 0, suspicion: 5, energy: -3 }
            }
        }
    },
    {
        id: "signal_tower",
        title: "Telefon Kulesi",
        description: "Yakındaki telefon kulesine tırmanıp sinyal amplifikatörü yerleştirebilirsin.",
        emoji: "🗼",
        choices: {
            left: {
                text: "Tehlikeli",
                effects: { signal: 2, mask: 0, suspicion: 0, energy: 0 }
            },
            right: {
                text: "Gece git",
                effects: { signal: 25, mask: -15, suspicion: 10, energy: -5 }
            }
        }
    },

    // === MASKE/SAĞLIK KARTLARI ===
    {
        id: "mask_repair",
        title: "Çürüyen Deri",
        description: "Maskenin kenarları çürümeye başladı. Acil tamir gerekiyor.",
        emoji: "🩹",
        choices: {
            left: {
                text: "Sonra bakarım",
                effects: { signal: 0, mask: -10, suspicion: 5, energy: 0 }
            },
            right: {
                text: "Hemen tamir et",
                effects: { signal: 0, mask: 15, suspicion: 0, energy: -5 }
            }
        }
    },
    {
        id: "mask_humidity",
        title: "Nemli Hava",
        description: "Hava çok nemli, masken hızla bozuluyor. Kuru bir yer bulmalısın.",
        emoji: "💧",
        choices: {
            left: {
                text: "Dışarıda kal",
                effects: { signal: 5, mask: -15, suspicion: 0, energy: -3 }
            },
            right: {
                text: "İçeri sığın",
                effects: { signal: 0, mask: 5, suspicion: 5, energy: -3 }
            }
        }
    },
    {
        id: "mask_sun",
        title: "Kavurucu Güneş",
        description: "Güneş maskeni kurutuyor. Gölge bulmalısın ama insanlar orada.",
        emoji: "☀️",
        choices: {
            left: {
                text: "Güneşte kal",
                effects: { signal: 0, mask: -12, suspicion: 0, energy: -4 }
            },
            right: {
                text: "Kalabalığa karış",
                effects: { signal: 0, mask: -2, suspicion: 10, energy: -3 }
            }
        }
    },

    // === ŞÜPHE KARTLARI ===
    {
        id: "suspicion_neighbor",
        title: "Meraklı Komşu",
        description: "Komşun garip garip bakıyor. 'Yeni mi taşındınız?' diye soruyor.",
        emoji: "🏠",
        choices: {
            left: {
                text: "Kaç",
                effects: { signal: 0, mask: -5, suspicion: 15, energy: -4 }
            },
            right: {
                text: "Sohbet et",
                effects: { signal: 0, mask: -5, suspicion: -10, energy: -4 }
            }
        }
    },
    {
        id: "suspicion_police",
        title: "Polis Kontrolü",
        description: "Mahallede kimlik kontrolü yapılıyor. Sıra sana geldi.",
        emoji: "👮",
        choices: {
            left: {
                text: "Kaçmaya çalış",
                effects: { signal: 0, mask: -10, suspicion: 30, energy: -5 }
            },
            right: {
                text: "Sahte kimlik göster",
                effects: { signal: 0, mask: -5, suspicion: 5, energy: -5 }
            }
        }
    },
    {
        id: "suspicion_child",
        title: "Küçük Çocuk",
        description: "Bir çocuk sana dikkatle bakıyor. 'Gözlerin neden öyle?' diyor.",
        emoji: "👧",
        choices: {
            left: {
                text: "Uzaklaş",
                effects: { signal: 0, mask: 0, suspicion: 5, energy: -3 }
            },
            right: {
                text: "Lens takıyorum de",
                effects: { signal: 0, mask: 0, suspicion: -5, energy: -3 }
            }
        }
    },
    {
        id: "suspicion_camera",
        title: "Güvenlik Kamerası",
        description: "Her yerde güvenlik kameraları var. Yüzünü gizlemeli misin?",
        emoji: "📹",
        choices: {
            left: {
                text: "Normal yürü",
                effects: { signal: 0, mask: 0, suspicion: 10, energy: 0 }
            },
            right: {
                text: "Yüzünü kapat",
                effects: { signal: 0, mask: -3, suspicion: 5, energy: -3 }
            }
        }
    },

    // === ENERJİ KARTLARI ===
    {
        id: "energy_food",
        title: "İnsan Yemeği",
        description: "Bir restoran var. İnsan yemeği enerjini azaltır ama şüphe çekmez.",
        emoji: "🍔",
        choices: {
            left: {
                text: "Yemeden geç",
                effects: { signal: 0, mask: 0, suspicion: 0, energy: -5 }
            },
            right: {
                text: "Yemek ye",
                effects: { signal: 0, mask: 0, suspicion: -5, energy: -3 }
            }
        }
    },
    {
        id: "energy_crystal",
        title: "Enerji Kristali",
        description: "Gemiden düşen bir enerji kristali buldun. Ama biri görmüş olabilir.",
        emoji: "💎",
        choices: {
            left: {
                text: "Bırak gitsin",
                effects: { signal: 0, mask: 0, suspicion: 0, energy: -3 }
            },
            right: {
                text: "Hemen al",
                effects: { signal: 5, mask: 0, suspicion: 15, energy: 5 }
            }
        }
    },
    {
        id: "energy_sleep",
        title: "Terk Edilmiş Bina",
        description: "Terk edilmiş bir bina buldun. Burada dinlenebilirsin.",
        emoji: "🏚️",
        choices: {
            left: {
                text: "Devam et",
                effects: { signal: 0, mask: -5, suspicion: 0, energy: -5 }
            },
            right: {
                text: "Dinlen",
                effects: { signal: 0, mask: 5, suspicion: 0, energy: 5 }
            }
        }
    },
    {
        id: "energy_electric",
        title: "Elektrik Hattı",
        description: "Yüksek gerilim hattından enerji çekebilirsin. Tehlikeli ama etkili.",
        emoji: "⚡",
        choices: {
            left: {
                text: "Çok riskli",
                effects: { signal: 0, mask: 0, suspicion: 0, energy: -3 }
            },
            right: {
                text: "Enerji çek",
                effects: { signal: 0, mask: -10, suspicion: 10, energy: 5 }
            }
        }
    },

    // === KARAR KARTLARI ===
    {
        id: "decision_hospital",
        title: "Hastane",
        description: "Bir hastaneden malzeme çalabilirsin. Maske tamiri için lazım.",
        emoji: "🏥",
        choices: {
            left: {
                text: "Etik değil",
                effects: { signal: 0, mask: -5, suspicion: 0, energy: 0 }
            },
            right: {
                text: "Gece gir",
                effects: { signal: 0, mask: 20, suspicion: 20, energy: -5 }
            }
        }
    },
    {
        id: "decision_help",
        title: "Yardım Çığlığı",
        description: "Biri yardım istiyor. Yardım etmek insani ama dikkat çeker.",
        emoji: "🆘",
        choices: {
            left: {
                text: "Duymazdan gel",
                effects: { signal: 0, mask: 0, suspicion: 0, energy: 0 }
            },
            right: {
                text: "Yardım et",
                effects: { signal: 0, mask: -5, suspicion: -15, energy: -5 }
            }
        }
    },
    {
        id: "decision_crowd",
        title: "Kalabalık Meydan",
        description: "Şehir meydanında büyük bir kalabalık var. İçinden geçebilir veya dolanabilirsin.",
        emoji: "👥",
        choices: {
            left: {
                text: "Dolaş",
                effects: { signal: 0, mask: -3, suspicion: 0, energy: -5 }
            },
            right: {
                text: "Kalabalığa gir",
                effects: { signal: 0, mask: -8, suspicion: -10, energy: -3 }
            }
        }
    },
    {
        id: "decision_rain",
        title: "Yağmur",
        description: "Şiddetli yağmur başladı. Masken için kötü ama şüphe azalır.",
        emoji: "🌧️",
        choices: {
            left: {
                text: "Sığınak bul",
                effects: { signal: 0, mask: 5, suspicion: 5, energy: -5 }
            },
            right: {
                text: "Yağmurda yürü",
                effects: { signal: 5, mask: -15, suspicion: -10, energy: -3 }
            }
        }
    },

    // === ÖZEL KARTLAR ===
    {
        id: "special_scientist",
        title: "Bilim İnsanı",
        description: "Bir bilim insanı seni fark etti. Tehlike mi yoksa fırsat mı?",
        emoji: "🔬",
        choices: {
            left: {
                text: "Kaç",
                effects: { signal: 0, mask: -10, suspicion: 10, energy: -5 }
            },
            right: {
                text: "İletişim kur",
                effects: { signal: 20, mask: -5, suspicion: 25, energy: -5 }
            }
        }
    },
    {
        id: "special_night",
        title: "Gece Yarısı",
        description: "Gece çöktü. Karanlıkta hareket etmek daha güvenli.",
        emoji: "🌙",
        choices: {
            left: {
                text: "Bekle",
                effects: { signal: 0, mask: 5, suspicion: 0, energy: 5 }
            },
            right: {
                text: "Sinyal gönder",
                effects: { signal: 15, mask: -5, suspicion: 5, energy: -5 }
            }
        }
    },
    {
        id: "special_dog",
        title: "Sokak Köpeği",
        description: "Bir köpek seni takip ediyor ve havlıyor. Dikkat çekiyor.",
        emoji: "🐕",
        choices: {
            left: {
                text: "Koş",
                effects: { signal: 0, mask: -5, suspicion: 15, energy: -5 }
            },
            right: {
                text: "Yiyecek ver",
                effects: { signal: 0, mask: 0, suspicion: -5, energy: -5 }
            }
        }
    },
    {
        id: "special_mirror",
        title: "Ayna",
        description: "Bir vitrin aynasında yansımanı gördün. Masken iyi görünmüyor.",
        emoji: "🪞",
        choices: {
            left: {
                text: "Görmezden gel",
                effects: { signal: 0, mask: -5, suspicion: 5, energy: 0 }
            },
            right: {
                text: "Düzelt",
                effects: { signal: 0, mask: 10, suspicion: 10, energy: -5 }
            }
        }
    },
    {
        id: "special_ufo",
        title: "Gece Işığı",
        description: "Gökyüzünde bir ışık! Anagemin sinyaline cevap mı yoksa insan uçağı mı?",
        emoji: "🛸",
        choices: {
            left: {
                text: "Gizlen",
                effects: { signal: 0, mask: 5, suspicion: -5, energy: 3 }
            },
            right: {
                text: "Sinyal gönder",
                effects: { signal: 30, mask: -10, suspicion: 20, energy: -5 }
            }
        }
    }
];

// Kart karıştırma fonksiyonu
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Dışa aktarma
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CARDS, shuffleArray };
}
