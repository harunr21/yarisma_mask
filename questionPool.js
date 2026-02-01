/**
 * MASK OF DESTINY - Soru Havuzu
 * 4 ACT x 7 Soru x 5 Alternatif = 140 Soru
 */

const QUESTION_POOL = {
    // ACT 1 — Enkaz ve İlk Taklit
    1: {
        name: "Enkaz ve İlk Taklit",
        questions: {
            1: { // 1.1 — Enkazdan Çıkış ve İlk Risk
                theme: "ENERJI_AVI",
                critical: false,
                alternatives: [
                    {
                        id: "1.1-A",
                        scene: "Enkazın yarı açık kabininin içinden ritmik bir titreşim geliyor; metal aralıklardan mavi bir ışık sızıyor ve maske bunu hissedince içten ince bir cızırtı çıkarıyor.",
                        choices: {
                            left: { text: "Kaynağa yaklaş", result: "Bir fırsat yakalarsın ama metal sürtünmesi ve ışık, etrafı daha 'sesli' yapar.", effects: { signal: 3, mask: -2, suspicion: 3, energy: -2 } },
                            right: { text: "Geri çekil", result: "Sessiz kalırsın ama içindeki merak, peşine yapışır.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "1.1-B",
                        scene: "Dumanın içinde iki parça metal birbirine sürtünüyor; her sürtünmede kıvılcım atıyor ve karanlıkta küçük bir fener gibi parlıyor.",
                        choices: {
                            left: { text: "Yoluna devam et", result: "İz bırakmazsın ama 'orada bir şey vardı' hissi büyür.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Parçaları yokla", result: "Bir şey kurtarabilirsin ama kıvılcımın görgü tanığı olur.", effects: { signal: 4, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "1.1-C",
                        scene: "Enkazın üstünde kırmızı bir acil durum lambası hâlâ yanıp sönüyor; her yanışında etrafı bir anlığına gündüz gibi açıyor.",
                        choices: {
                            left: { text: "Dokunma", result: "Hızlı uzaklaşırsın, iz bırakmazsın.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Lambayı söndürmeye çalış", result: "Gizlilik artar ama uğraşın seni o noktaya bağlar.", effects: { signal: 0, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "1.1-D",
                        scene: "Enkazın yan tarafında küçük bir servis kapağı aralanmış; içeriden soğuk hava ve elektrik kokusu geliyor.",
                        choices: {
                            left: { text: "Kapatıp geç", result: "Daha güvenli ilerlersin ama belki de tek fırsatı geride bırakmış olursun.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "İçine bak", result: "İşe yarar bir şey bulabilirsin ama eğildiğin an 'yakalanma' gibi hissedilir.", effects: { signal: 5, mask: -2, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "1.1-E",
                        scene: "Uzakta bir kuş sürüsü, sanki görünmeyen bir şeyden ürkmüş gibi bir anda havalanıyor; sesleri bir dalga gibi yayılıyor.",
                        choices: {
                            left: { text: "Ters yöne sap", result: "Kendini korursun ama yön duygun bulanıklaşır.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } },
                            right: { text: "Sesin kaynağını araştır", result: "Gerçeğe yaklaşırsın ama aynı zamanda görünür olursun.", effects: { signal: 3, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    }
                ]
            },
            2: { // 1.2 — Maskeyi İlk Kez "İnsan" Gibi Kullanma
                theme: "MASKE_BIYOMEKANIGI",
                critical: false,
                alternatives: [
                    {
                        id: "1.2-A",
                        scene: "Maskeyi taktığında yüz çizgilerin fazla pürüzsüz; sanki gerçek bir yüz değil de iyi yapılmış bir poster gibi duruyor.",
                        choices: {
                            left: { text: "Aynada prova yap", result: "Daha doğal görünürsün ama zaman, sessizce erir.", effects: { signal: 0, mask: 3, suspicion: -2, energy: -1 } },
                            right: { text: "Provasız çık", result: "Hız kazanırsın ama küçük bir hata 'geri dönebilir.'", effects: { signal: 0, mask: -2, suspicion: 3, energy: 0 } }
                        }
                    },
                    {
                        id: "1.2-B",
                        scene: "Konuşmayı denediğinde sesin metalik tınlıyor; kelimeler doğru ama tını 'yanlış.'",
                        choices: {
                            left: { text: "Fısıltıyla konuş", result: "Daha az dikkat çekersin ama bu kez de 'neden bu kadar kısık?' sorusu doğabilir.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Normal konuş", result: "İnandırıcı olabilirsin ama her kelime bir sınav olur.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "1.2-C",
                        scene: "Gülümsemeyi deniyorsun; dudakların tam olması gereken yerde ama duygu eksik, simetri fazla.",
                        choices: {
                            left: { text: "Gülümsemeyi azalt", result: "Daha güvenli olursun ama biraz soğuk görünürsün.", effects: { signal: 0, mask: 1, suspicion: 1, energy: 0 } },
                            right: { text: "Bilerek şaka yap", result: "Sıcak görünürsün ama maske daha çok çalışır.", effects: { signal: 0, mask: -2, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "1.2-D",
                        scene: "Maske içi buhar yapıyor; görüşün daralıyor, sanki gözlerin camın arkasına itilmiş gibi.",
                        choices: {
                            left: { text: "Dayan", result: "Dışarıya daha az iz bırakırsın ama maske yorulur.", effects: { signal: 0, mask: -3, suspicion: -1, energy: -1 } },
                            right: { text: "Kısa havalandır", result: "Masken rahatlar ama o an 'açıkta' kalma hissi artar.", effects: { signal: 0, mask: 2, suspicion: 3, energy: -1 } }
                        }
                    },
                    {
                        id: "1.2-E",
                        scene: "Bir vitrinde yansımanı görüyorsun; göz kırpman gecikmeli ve ters, sanki yanlış sinyale cevap veriyor.",
                        choices: {
                            left: { text: "Umursama", result: "Hızlı ilerlersin ama bu küçük hata bir gün büyüyebilir.", effects: { signal: 0, mask: -2, suspicion: 2, energy: 0 } },
                            right: { text: "Düzeltmeye çalış", result: "Daha iyi taklit edersin ama orada fazla kalırsın.", effects: { signal: 0, mask: 2, suspicion: -1, energy: -1 } }
                        }
                    }
                ]
            },
            3: { // 1.3 — İlk Enerji Arayışı
                theme: "ENERJI_AVI",
                critical: false,
                alternatives: [
                    {
                        id: "1.3-A",
                        scene: "Arka sokakta kırık bir priz; kapağı yok, kablo ucu çıplak. Elektrik, sanki seni çağırıyor.",
                        choices: {
                            left: { text: "Uzun süre bağlan", result: "Güçlenirsin ama kıvılcım sesi merak uyandırır.", effects: { signal: 0, mask: -1, suspicion: 4, energy: 5 } },
                            right: { text: "Kısa dokun", result: "Az alırsın ama sessiz kalırsın.", effects: { signal: 0, mask: 0, suspicion: 0, energy: 2 } }
                        }
                    },
                    {
                        id: "1.3-B",
                        scene: "Köşe başında şarjda bir scooter; göstergesi yanıp sönüyor, sahibinin kim olduğu belirsiz.",
                        choices: {
                            left: { text: "Dokunmadan geç", result: "Güvende kalırsın ama güçsüzlük artar.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -2 } },
                            right: { text: "Bataryayı sök", result: "Enerji kazanırsın ama geride iz bırakabilirsin.", effects: { signal: 0, mask: 0, suspicion: 5, energy: 4 } }
                        }
                    },
                    {
                        id: "1.3-C",
                        scene: "Bir trafo kutusu; kapak kilitli ama gevşek, içerden hafif uğultu geliyor.",
                        choices: {
                            left: { text: "Uzak dur", result: "Risk azalır, ihtiyaç büyür.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -2 } },
                            right: { text: "Açmayı dene", result: "Büyük kazanç olabilir, büyük risk de.", effects: { signal: 2, mask: -2, suspicion: 5, energy: 5 } }
                        }
                    },
                    {
                        id: "1.3-D",
                        scene: "Bir uzatma kablosu, bir pencerenin altından sarkıyor; kapalı perdelerin arkasında yaşam var.",
                        choices: {
                            left: { text: "Bağlan", result: "Kısa rahatlama gelir ama biri fark edebilir.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 3 } },
                            right: { text: "Kesip al", result: "Sonra işine yarar, ama 'görünmez' kalmak zorlaşır.", effects: { signal: 0, mask: 0, suspicion: 5, energy: 2 } }
                        }
                    },
                    {
                        id: "1.3-E",
                        scene: "Bir marketin dış duvarında priz var; insanlar girip çıkıyor, gözler dolaşıyor.",
                        choices: {
                            left: { text: "Gece gelmeyi planla", result: "Gözlerden kaçarsın ama belirsizlik artar.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } },
                            right: { text: "Sıradan biri gibi yaklaş", result: "Normal görünürsen kısa bir fırsat yakalarsın.", effects: { signal: 0, mask: -1, suspicion: 2, energy: 3 } }
                        }
                    }
                ]
            },
            4: { // 1.4 — İlk Gözetim / Tehlike
                theme: "GOZETIM_POLIS",
                critical: false,
                alternatives: [
                    {
                        id: "1.4-A",
                        scene: "Uzakta bir far seni tarıyor; ışık üstüne geldiğinde maske içten soğuk bir titreme yapıyor.",
                        choices: {
                            left: { text: "Çalılığa dal", result: "Kaybolursun ama hareket izleri bırakabilirsin.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -2 } },
                            right: { text: "Donup normal görün", result: "Kurtulursun ama o anın gerilimi içerde kalır.", effects: { signal: 0, mask: -2, suspicion: 1, energy: -1 } }
                        }
                    },
                    {
                        id: "1.4-B",
                        scene: "Köşe başında kamera; üstünde küçük bir kırmızı nokta yanıyor, sanki seni 'seçmiş' gibi.",
                        choices: {
                            left: { text: "Hızla geç", result: "Zaman kazanırsın ama kayıt ihtimali artar.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -1 } },
                            right: { text: "Kör nokta bekle", result: "Doğru anı yakalarsan izsiz geçersin.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -2 } }
                        }
                    },
                    {
                        id: "1.4-C",
                        scene: "Bir polis arabası yavaşlayıp yanından süzülüyor; içerideki gözler kısa bir an senin gözlerinde duruyor.",
                        choices: {
                            left: { text: "Ara sokağa sap", result: "Gözden kaçarsın, şüphe azalır.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } },
                            right: { text: "Yürüyüşünü normal tut", result: "İnandırabilirsen geçersin.", effects: { signal: 0, mask: -2, suspicion: 2, energy: -1 } }
                        }
                    },
                    {
                        id: "1.4-D",
                        scene: "Birinin telefonu elinde; kamerayı açıp açmadığı belli değil ama ekranın parıltısı sana dönük.",
                        choices: {
                            left: { text: "Başını çevir", result: "Gizlersin ama bu kez daha garip görünebilirsin.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Normal yürümeye devam et", result: "Doğal görünürsen sorun çıkmayabilir.", effects: { signal: 0, mask: -1, suspicion: -1, energy: 0 } }
                        }
                    },
                    {
                        id: "1.4-E",
                        scene: "Bir köpek havlamaya başlar; havlama sesi sokakta yankılanır, kapılar aralanır.",
                        choices: {
                            left: { text: "Koş", result: "Ses büyür, gözler döner.", effects: { signal: 0, mask: -1, suspicion: 5, energy: -3 } },
                            right: { text: "Sakinleşip yavaşla", result: "Ortam yatışır, ses sönümlenir.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } }
                        }
                    }
                ]
            },
            5: { // 1.5 — İlk Sosyal Temas
                theme: "SOSYAL_BAGLAR",
                critical: false,
                alternatives: [
                    {
                        id: "1.5-A",
                        scene: "Bir çocuk elindeki balonu sallayıp seni 'kostüm' sanıyor; gözleri saf bir merakla parlıyor.",
                        choices: {
                            left: { text: "Uzaklaş", result: "Kendini korursun, soğuk görünürsün.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "El salla", result: "Kısa bir 'normal' an yaşarsın.", effects: { signal: 0, mask: -1, suspicion: -3, energy: 0 } }
                        }
                    },
                    {
                        id: "1.5-B",
                        scene: "Yaşlı biri, elindeki poşetlerle durup 'iyi misin?' diye soruyor; sesinde tehdit yok, sadece alışkanlık var.",
                        choices: {
                            left: { text: "Görmezden gel", result: "Sessiz kalırsın ama şüphe doğabilir.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Kısa cevap ver", result: "Sıradan görünürsen geçer.", effects: { signal: 0, mask: -1, suspicion: -3, energy: 0 } }
                        }
                    },
                    {
                        id: "1.5-C",
                        scene: "Kasiyer küçük bir sohbetle seni 'sınıflandırmak' ister: 'Nerelisin?'",
                        choices: {
                            left: { text: "Konuyu değiştir", result: "Kısa kesersin, soğuk görünebilirsin.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Küçük bir hikâye uydur", result: "Anlık geçiştirirsin, yalanın gölgesi uzar.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "1.5-D",
                        scene: "Yardım noktasında sıcak çorba; buharı bile 'ev' gibi kokuyor ama kuyrukta yüzler var.",
                        choices: {
                            left: { text: "Uzak dur", result: "Sessiz kalırsın ama güçsüzleşirsin.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -2 } },
                            right: { text: "Kuyruğa gir", result: "Biraz nefes alırsın ama gözler artar.", effects: { signal: 0, mask: -1, suspicion: 3, energy: 3 } }
                        }
                    },
                    {
                        id: "1.5-E",
                        scene: "Birisi battaniye uzatır; elinle alırsan, mesafe kapanır.",
                        choices: {
                            left: { text: "Reddet", result: "Mesafe korursun, yalnızlık artar.", effects: { signal: 0, mask: 0, suspicion: 1, energy: -1 } },
                            right: { text: "Kabul et", result: "Sıcaklık gelir, yakınlık da gelir.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 2 } }
                        }
                    }
                ]
            },
            6: { // 1.6 — İlk Sinyal Denemesi
                theme: "SINYAL_PARAZIT",
                critical: false,
                alternatives: [
                    {
                        id: "1.6-A",
                        scene: "Eski bir yangın merdiveni çatıya çıkıyor; yukarıda antenler, aşağıda gözler var.",
                        choices: {
                            left: { text: "Çıkıp dene", result: "Bir ilerleme hissi gelir, görünürlük artar.", effects: { signal: 5, mask: -2, suspicion: 4, energy: -2 } },
                            right: { text: "Çıkma", result: "Gizli kalırsın, ilerleme yavaşlar.", effects: { signal: 0, mask: 0, suspicion: -2, energy: 0 } }
                        }
                    },
                    {
                        id: "1.6-B",
                        scene: "Cihaz kısa süre cızırdar; ekranında anlamsız çizgiler koşar, sanki bir şey 'duymuş' gibi.",
                        choices: {
                            left: { text: "Ayarı kıs", result: "İz azalır, ilerleme yavaşlar.", effects: { signal: 1, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Aynı ayarı sürdür", result: "İlerlersin ama iz büyüyebilir.", effects: { signal: 4, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "1.6-C",
                        scene: "Yakındaki sokak lambaları bir an titrer; insanlar başlarını kaldırır ama sonra devam eder.",
                        choices: {
                            left: { text: "Kes", result: "Şehir sakinleşir.", effects: { signal: 0, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Devam et", result: "Daha güçlü bir işaret doğar.", effects: { signal: 5, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "1.6-D",
                        scene: "Çatıda anten silüeti görürsün; rüzgâr anteni sallarken, içindeki umut da sallanır.",
                        choices: {
                            left: { text: "Uzak dur", result: "Kapı kapanır.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Yaklaş", result: "Kapı aralanır.", effects: { signal: 4, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "1.6-E",
                        scene: "Bir radyo cızırtısı duyarsın; sanki başka bir dünyadan gelen nefes.",
                        choices: {
                            left: { text: "Uzaklaş", result: "Risk düşer.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Kaynağa yönel", result: "İleride kritik bir fırsat doğabilir.", effects: { signal: 5, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    }
                ]
            },
            7: { // 1.7 — Act 1 Kapanış
                theme: "MASKE_BIYOMEKANIGI",
                critical: false,
                alternatives: [
                    {
                        id: "1.7-A",
                        scene: "Karanlık bir camda yansımanı görürsün; maskeyi çıkarıp bakma arzusu boğazında düğümlenir.",
                        choices: {
                            left: { text: "Bakmazsın", result: "Güvende kalırsın, yabancılaşma artar.", effects: { signal: 0, mask: 1, suspicion: -1, energy: 0 } },
                            right: { text: "Kısacık bak", result: "Kendini hatırlarsın ama risk büyür.", effects: { signal: 0, mask: -2, suspicion: 3, energy: 1 } }
                        }
                    },
                    {
                        id: "1.7-B",
                        scene: "Enkaz geride kalır; ayaklarının altındaki toprak bile 'başka' hissedilir.",
                        choices: {
                            left: { text: "'Yaşamak istiyorum.'", result: "Kararlar yumuşar.", effects: { signal: 0, mask: 2, suspicion: 0, energy: 1 } },
                            right: { text: "'Sadece kurtulmalıyım.'", result: "Kararlar sertleşir.", effects: { signal: 2, mask: -1, suspicion: 0, energy: 0 } }
                        }
                    },
                    {
                        id: "1.7-C",
                        scene: "Gecenin sessizliğinde 'nefessiz' olduğunu hatırlarsın; yine de boğazında bir sıkışma var.",
                        choices: {
                            left: { text: "Şansa bırak", result: "Hızlı gidersin, hatalar artabilir.", effects: { signal: 1, mask: -2, suspicion: 3, energy: 1 } },
                            right: { text: "Rutin kurmaya çalış", result: "Kontrol hissi artar.", effects: { signal: 0, mask: 2, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "1.7-D",
                        scene: "Şehir ışıkları uzakta parlıyor; hem davet hem tehdit gibi.",
                        choices: {
                            left: { text: "Kıyıda kal", result: "Risk azalır, imkân azalır.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 0 } },
                            right: { text: "Şehre yaklaş", result: "Fırsatlar artar, gözler de.", effects: { signal: 3, mask: -1, suspicion: 3, energy: -1 } }
                        }
                    },
                    {
                        id: "1.7-E",
                        scene: "Maskenin içinden metalik bir 'tıng' gelir; sanki maske de yorgunluğunu söylüyor.",
                        choices: {
                            left: { text: "Ertele", result: "Zaman kazanırsın, risk büyür.", effects: { signal: 0, mask: -3, suspicion: 0, energy: 1 } },
                            right: { text: "Onarmayı düşün", result: "Maske toparlanır, sen yorulursun.", effects: { signal: 0, mask: 4, suspicion: 0, energy: -2 } }
                        }
                    }
                ]
            }
        }
    },
    // ACT 2 — Şehir Seni Öğreniyor
    2: {
        name: "Şehir Seni Öğreniyor",
        questions: {
            1: { // 2.1 — Şehre Giriş / Kalabalık
                theme: "SOSYAL_BAGLAR",
                critical: false,
                alternatives: [
                    {
                        id: "2.1-A",
                        scene: "Neon tabelalar, hızla akan kalabalık ve çarpışan omuzlar; burada kaybolmak kolay ama 'insan' olmak zor.",
                        choices: {
                            left: { text: "Akışa karış", result: "Saklanırsın ama masken çok çalışır.", effects: { signal: 0, mask: -3, suspicion: -3, energy: -2 } },
                            right: { text: "Ara yola sap", result: "Sessiz kalırsın, yalnızlık artar.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "2.1-B",
                        scene: "Metro girişinde güvenlik turnikesi; insanların kart sesi bir ritim gibi, senin ritmin ise farklı.",
                        choices: {
                            left: { text: "Uzak dur", result: "Risk azalır, fırsat azalır.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Sıradan biri gibi gir", result: "Doğal görünürsen geçersin.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "2.1-C",
                        scene: "Büyük bir ekran haber döndürüyor; 'garip ışıklar' ve 'tuhaf görüntüler' gibi kelimeler seçiyorsun.",
                        choices: {
                            left: { text: "Bakmadan geç", result: "Zaman kazanırsın, bilgi kaybedersin.", effects: { signal: 0, mask: 0, suspicion: 0, energy: 0 } },
                            right: { text: "İzleyip öğren", result: "Dünyayı daha iyi okursun.", effects: { signal: 2, mask: 0, suspicion: 1, energy: -1 } }
                        }
                    },
                    {
                        id: "2.1-D",
                        scene: "Sokak müzisyeni etrafında küçük bir çember; yüzler birbirine dönerken, senin yüzün de sınanır.",
                        choices: {
                            left: { text: "Uzaklaş", result: "Sessiz kalırsın.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Orada dur", result: "Kalabalıkta erirsin.", effects: { signal: 0, mask: -2, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "2.1-E",
                        scene: "Bir satıcı gözünün içine bakıp seslenir; bu şehirde görmezden gelmek bile bir cevap.",
                        choices: {
                            left: { text: "Görmezden gel", result: "Soğuk görünürsün.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Kısa cevap ver", result: "İnsan gibi görünürsün.", effects: { signal: 0, mask: -1, suspicion: -2, energy: -1 } }
                        }
                    }
                ]
            },
            2: { // 2.2 — Gözetim Baskısı Artıyor
                theme: "GOZETIM_POLIS",
                critical: false,
                alternatives: [
                    {
                        id: "2.2-A",
                        scene: "Kamera direğinin altından geçmek zorundasın; kırmızı ışık yanıp sönüyor, sanki seni sayıyor.",
                        choices: {
                            left: { text: "Kör nokta bekle", result: "Doğru anı yakalarsan izsiz geçersin.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -2 } },
                            right: { text: "Hızla geç", result: "Hız kazanırsın, kayıt riski artar.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -1 } }
                        }
                    },
                    {
                        id: "2.2-B",
                        scene: "Polis kontrol noktası uzakta; şeritler, bariyerler ve 'bakışlar.'",
                        choices: {
                            left: { text: "Ters yöne dön", result: "Risk azalır, zaman kaybedersin.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -2 } },
                            right: { text: "Kalabalıkla geç", result: "Doğal görünürsen kurtulursun.", effects: { signal: 0, mask: -2, suspicion: -1, energy: -1 } }
                        }
                    },
                    {
                        id: "2.2-C",
                        scene: "Birinin bakışı sende uzun kalır; tanımıyor ama 'tanır gibi' bakar.",
                        choices: {
                            left: { text: "Başını çevir", result: "Gizlersin ama daha dikkat çekebilirsin.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 0 } },
                            right: { text: "Gülümseyip selam ver", result: "Sıcaklık şüpheyi yumuşatabilir.", effects: { signal: 0, mask: -1, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "2.2-D",
                        scene: "Telefon ekranı parıldar; kamera açık mı değil mi bilmiyorsun ama 'ihtimal' bile yetiyor.",
                        choices: {
                            left: { text: "Araya girip kaybol", result: "Görünmez olursun ama iz bırakabilirsin.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Normal yürü", result: "Doğal görünürsen sorun olmaz.", effects: { signal: 0, mask: -1, suspicion: -2, energy: 0 } }
                        }
                    },
                    {
                        id: "2.2-E",
                        scene: "Siren sesi yaklaşır; bir an herkesin yüzü aynı yöne döner ve sen de dönmek zorunda hissedersin.",
                        choices: {
                            left: { text: "Sokakta kal", result: "Kontrol sende kalır ama risk artar.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 0 } },
                            right: { text: "Bir dükkâna gir", result: "Anlık koruma bulursun.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } }
                        }
                    }
                ]
            },
            3: { // 2.3 — Sinyal İştahı / Parazit
                theme: "SINYAL_PARAZIT",
                critical: false,
                alternatives: [
                    {
                        id: "2.3-A",
                        scene: "Cihaz 'parazit' uyarısı verir; ekran çizgileri titrer, sanki başka bir şey araya giriyor.",
                        choices: {
                            left: { text: "Çözmeyi dene", result: "Zor ama temiz bir yol açılır.", effects: { signal: 4, mask: -1, suspicion: -1, energy: -2 } },
                            right: { text: "Görmezden gel", result: "Kolay olur, sonra bedel doğabilir.", effects: { signal: 1, mask: 0, suspicion: 0, energy: 0 } }
                        }
                    },
                    {
                        id: "2.3-B",
                        scene: "Sinyal denemesinde sokak lambaları hafif titrer; iki kişi durup yukarı bakar.",
                        choices: {
                            left: { text: "Kes", result: "İz azalır, ilerleme yavaşlar.", effects: { signal: 0, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Devam et", result: "İlerlersin, şehir fark eder.", effects: { signal: 5, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "2.3-C",
                        scene: "Çatı anteni uzakta görünür; oraya çıkmak bir itiraf gibi 'ben buradayım' demektir.",
                        choices: {
                            left: { text: "Vazgeç", result: "Risk azalır.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Çıkmayı planla", result: "Sinyal umudu büyür.", effects: { signal: 3, mask: 0, suspicion: 2, energy: -1 } }
                        }
                    },
                    {
                        id: "2.3-D",
                        scene: "Sunucu odasının kapısı aralık; içerisi soğuk, düzenli, sessiz. Senin gibi.",
                        choices: {
                            left: { text: "Kapatıp geç", result: "Sessiz kalırsın.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "İçeri gir", result: "Güçlenirsin, alarm riski doğar.", effects: { signal: 4, mask: 0, suspicion: 5, energy: 3 } }
                        }
                    },
                    {
                        id: "2.3-E",
                        scene: "Cihaz bir an 'YANIT' gibi bir kelime gösterir; sonra sanki utanıp susar.",
                        choices: {
                            left: { text: "Kapat", result: "Kendini korursun.", effects: { signal: 0, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Takip et", result: "Büyük bir kapı aralanabilir.", effects: { signal: 5, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    }
                ]
            },
            4: { // 2.4 — KRİTİK: İLETİŞİM MASKESİ KAPISI
                theme: "SINYAL_PARAZIT",
                critical: true,
                criticalType: "COMMUNICATION_MASK_GATE",
                alternatives: [
                    {
                        id: "2.4-A",
                        scene: "Radyo kulübünde biri kulaklığı sana uzatır; cızırtının içinde ritim var, ritmin içinde bir 'dil.'",
                        choices: {
                            left: { text: "Bağlantıyı kes", result: "Köprü ihtimali kapanır, yalnız hedef kalır.", effects: { signal: 0, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Çözmeyi dene", result: "Maske içinde yeni bir mod uyanır; iki dil birbirine yaklaşır (İletişim Maskesi yolu).", effects: { signal: 3, mask: -2, suspicion: 3, energy: -3 }, award: "İletişim Maskesi" }
                        }
                    },
                    {
                        id: "2.4-B",
                        scene: "Ekranda tekrar eden bir dizilim akıyor; kulüpteki kişi 'bunu kimse anlamıyor' der, gözleri senden bir mucize bekler.",
                        choices: {
                            left: { text: "Ritmi sustur", result: "Risk azalır, ama kapı kapanır.", effects: { signal: -1, mask: 0, suspicion: -3, energy: 0 } },
                            right: { text: "Ritmi anlamlandırıp cevap üret", result: "Maske, anlamı sese çevirmeyi öğrenir (İletişim Maskesi yolu).", effects: { signal: 3, mask: -2, suspicion: 3, energy: -3 }, award: "İletişim Maskesi" }
                        }
                    },
                    {
                        id: "2.4-C",
                        scene: "Kulüpte biri fısıldar: 'Bunu yayınlarsak insanlar korkar.' Cihazın ekranı kısa kısa parıldar.",
                        choices: {
                            left: { text: "Hiç iletme", result: "Güvenlik artar, köprü kapanır.", effects: { signal: -1, mask: 0, suspicion: -5, energy: 0 } },
                            right: { text: "Korkuyu azaltacak şekilde ilet", result: "Sözlerin köprü olur; maske iletişimi kazanır (İletişim Maskesi yolu).", effects: { signal: 3, mask: -2, suspicion: 2, energy: -3 }, award: "İletişim Maskesi" }
                        }
                    },
                    {
                        id: "2.4-D",
                        scene: "Yanıt göndermek için daha fazla güç, daha fazla zaman ve daha fazla görünürlük gerekir; kulüpteki sessizlik ağırlaşır.",
                        choices: {
                            left: { text: "Bedeli reddet", result: "Kendini korursun, iletişim yolu söner.", effects: { signal: -1, mask: 0, suspicion: -4, energy: 1 } },
                            right: { text: "Bedeli göze al", result: "Maske iletişimi öğrenir; karşılık verme yetisi doğar (İletişim Maskesi yolu).", effects: { signal: 3, mask: -3, suspicion: 3, energy: -4 }, award: "İletişim Maskesi" }
                        }
                    },
                    {
                        id: "2.4-E",
                        scene: "'İnsanlar korkar,' der biri; 'biz de korkarız,' diye düşünürsün. O an maske, yalnız bir kılık değil, bir dil olur.",
                        choices: {
                            left: { text: "Her şeyi kesip çık", result: "Köprü kurma ihtimali kaybolur.", effects: { signal: -1, mask: 0, suspicion: -5, energy: 0 } },
                            right: { text: "İkisini de sakinleştirecek mesaj kur", result: "İletişim Maskesi yolu açılır.", effects: { signal: 3, mask: -2, suspicion: 1, energy: -3 }, award: "İletişim Maskesi" }
                        }
                    }
                ]
            },
            5: { // 2.5 — KRİTİK: KİMLİK MASKESİ KAPISI
                theme: "GOZETIM_POLIS",
                critical: true,
                criticalType: "IDENTITY_MASK_GATE",
                alternatives: [
                    {
                        id: "2.5-A",
                        scene: "Metro turnikesinde kartın çalışmıyor; görevli 'kimlik göster' diyor. Arkada bekleyen insanların gözleri sırtında.",
                        choices: {
                            left: { text: "Panikle geri çekil", result: "Şüphe artar ama kimlik kapısı kapanır.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -1 } },
                            right: { text: "Sisteme kayıt ol, kimliği göster", result: "Artık kayıtlısın. Sistem seni tanıyor—ve bu seni koruyor (Kimlik Maskesi yolu).", effects: { signal: 0, mask: -2, suspicion: -3, energy: -2 }, award: "Kimlik Maskesi" }
                        }
                    },
                    {
                        id: "2.5-B",
                        scene: "Kütüphane üyeliği istiyorlar; formda ad, adres, fotoğraf var. Karar anında elindeki kalem titriyor.",
                        choices: {
                            left: { text: "Formu doldurma, çık", result: "Görünmez kalırsın ama fırsat kaybolur.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Formu doldur, sisteme gir", result: "Kayıt sisteminde bir iz var artık—ama bu iz seni koruyor (Kimlik Maskesi yolu).", effects: { signal: 0, mask: -1, suspicion: -4, energy: -2 }, award: "Kimlik Maskesi" }
                        }
                    },
                    {
                        id: "2.5-C",
                        scene: "Hastane acil girişinde 'kayıt olmalısınız' diyorlar; arkada bir polis memuru bekliyor.",
                        choices: {
                            left: { text: "Kayıt olmadan çık", result: "Risk artar, kapı kapanır.", effects: { signal: 0, mask: 0, suspicion: 3, energy: -1 } },
                            right: { text: "Kayıt ol, sıra bekle", result: "Sistem seni kabul etti. Artık 'tanınan' birisin (Kimlik Maskesi yolu).", effects: { signal: 0, mask: -2, suspicion: -3, energy: -3 }, award: "Kimlik Maskesi" }
                        }
                    },
                    {
                        id: "2.5-D",
                        scene: "İş başvurusu formunda 'referans' istiyorlar; yanında belgeler, önünde kamera.",
                        choices: {
                            left: { text: "Başvuruyu bırak", result: "Güvenli çekilirsin ama yol kapanır.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Formu tamamla", result: "Şehrin kayıtlarına girdin—artık görünmezlik değil, uyum stratejin (Kimlik Maskesi yolu).", effects: { signal: 0, mask: -1, suspicion: -4, energy: -2 }, award: "Kimlik Maskesi" }
                        }
                    },
                    {
                        id: "2.5-E",
                        scene: "Bir kontrol noktasında 'belgeni göster' diyorlar; arkanda kuyruk, önünde soru.",
                        choices: {
                            left: { text: "Ters yöne dön", result: "Dikkat çekersin ama devam edersin.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -2 } },
                            right: { text: "Yetkili gibi davran, belgeyi göster", result: "Sistemin içinde kaybolmak, görünmez olmaktan daha güvenli (Kimlik Maskesi yolu).", effects: { signal: 0, mask: -2, suspicion: -5, energy: -2 }, award: "Kimlik Maskesi" }
                        }
                    }
                ]
            },
            6: { // 2.6 — KRİTİK: BAKIM MASKESİ KAPISI
                theme: "MASKE_BIYOMEKANIGI",
                critical: true,
                criticalType: "MAINTENANCE_MASK_GATE",
                alternatives: [
                    {
                        id: "2.6-A",
                        scene: "Terk edilmiş atölyede aynalar, kalıplar, reçine ve ince aletler bulursun. Saatlerce uğraşmak gerekecek.",
                        choices: {
                            left: { text: "Hızlıca çık", result: "Güvenli kalırsın ama fırsat kaybolur.", effects: { signal: 0, mask: -1, suspicion: -1, energy: 0 } },
                            right: { text: "Saatlerce çalış, protokolü öğren", result: "Maskeyi onarmayı, stabilize etmeyi öğrendin (Bakım Maskesi yolu).", effects: { signal: 0, mask: 4, suspicion: 2, energy: -4 }, award: "Bakım Maskesi" }
                        }
                    },
                    {
                        id: "2.6-B",
                        scene: "Eski bir kliniğin bodrumunda tıbbi malzemeler var; yapıştırıcılar, steril bezler, maske dokusuna benzeyen şeyler.",
                        choices: {
                            left: { text: "Dokunmadan çık", result: "Risk sıfır ama maske zayıflar.", effects: { signal: 0, mask: -2, suspicion: -1, energy: 0 } },
                            right: { text: "Malzemeleri topla, dene", result: "Maskeyi kendi ellerin onardı; artık buna hakimsin (Bakım Maskesi yolu).", effects: { signal: 0, mask: 5, suspicion: 3, energy: -3 }, award: "Bakım Maskesi" }
                        }
                    },
                    {
                        id: "2.6-C",
                        scene: "Terzi dükkanının arka odasında maske kalıplarına benzer yüz formları var. Usta sorular sormadan çalışmanı izliyor.",
                        choices: {
                            left: { text: "Teşekkür edip çık", result: "Soru yoktu ama cevap da yok.", effects: { signal: 0, mask: 0, suspicion: 0, energy: 0 } },
                            right: { text: "Ustadan öğren", result: "Saatler geçti; artık maskenin zayıf noktalarını biliyorsun (Bakım Maskesi yolu).", effects: { signal: 0, mask: 4, suspicion: 2, energy: -4 }, award: "Bakım Maskesi" }
                        }
                    },
                    {
                        id: "2.6-D",
                        scene: "Bir eczanede 'dermatolojik tamir kiti' görürsün; kutunun içindekiler masken için birebir.",
                        choices: {
                            left: { text: "Alma", result: "Şüphe yok ama maske yıpranıyor.", effects: { signal: 0, mask: -1, suspicion: -1, energy: 0 } },
                            right: { text: "Al ve dene", result: "Kit işe yaradı; maskeyi kontrol etmeyi öğrendin (Bakım Maskesi yolu).", effects: { signal: 0, mask: 4, suspicion: 1, energy: -2 }, award: "Bakım Maskesi" }
                        }
                    },
                    {
                        id: "2.6-E",
                        scene: "Sığınakta biri 'yüzündeki çatlağı' gösterip sorar: 'Bunu nasıl tamir edersin?' Cevap vermek maskeyi açıklamak demek.",
                        choices: {
                            left: { text: "Geçiştir", result: "Şüphe kalır ama sır korunur.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Yanıt ver, birlikte çalış", result: "Birinin yardımıyla maskeyi onardın; artık bakım protokolün var (Bakım Maskesi yolu).", effects: { signal: 0, mask: 5, suspicion: 3, energy: -3 }, award: "Bakım Maskesi" }
                        }
                    }
                ]
            },
            7: { // 2.7 — KRİTİK: SESSİZLİK MASKESİ KAPISI
                theme: "GOZETIM_POLIS",
                critical: true,
                criticalType: "SILENCE_MASK_GATE",
                alternatives: [
                    {
                        id: "2.7-A",
                        scene: "Kamera var. Kör nokta çok dar. Koşarsan yakalanırsın. Sabır tek çıkış yolu.",
                        choices: {
                            left: { text: "Hızla geç", result: "Kayıt kalır, şüphe artar.", effects: { signal: 0, mask: 0, suspicion: 5, energy: -1 } },
                            right: { text: "Sabırla bekle, doğru anda geç", result: "Hiçbir iz kalmadı. Sessizliğin gücünü öğrendin (Sessizlik Maskesi yolu).", effects: { signal: 0, mask: 0, suspicion: -4, energy: -3 }, award: "Sessizlik Maskesi" }
                        }
                    },
                    {
                        id: "2.7-B",
                        scene: "Sokakta siren sesi yaklaşıyor. İki seçenek: koşmak ya da duvara yapışıp beklemek.",
                        choices: {
                            left: { text: "Koş", result: "Dikkat çekersin, iz bırakırsın.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -2 } },
                            right: { text: "Gölgede bekle", result: "Arabalar geçti. Kimse seni görmedi (Sessizlik Maskesi yolu).", effects: { signal: 0, mask: 0, suspicion: -5, energy: -2 }, award: "Sessizlik Maskesi" }
                        }
                    },
                    {
                        id: "2.7-C",
                        scene: "Bir mağazadan çıkarken alarm çalıyor—ama senin için değil. Herkes dönüp bakıyor.",
                        choices: {
                            left: { text: "Panikle ayrıl", result: "Dikkat çekersin.", effects: { signal: 0, mask: 0, suspicion: 3, energy: -1 } },
                            right: { text: "Sakin kal, kalabalıkla ak", result: "Kimse yüzünü hatırlamadı. İz bırakmadan kaybolmayı öğrendin (Sessizlik Maskesi yolu).", effects: { signal: 0, mask: -1, suspicion: -4, energy: -2 }, award: "Sessizlik Maskesi" }
                        }
                    },
                    {
                        id: "2.7-D",
                        scene: "Bir devriye seni 'tanır gibi' bakar. Göz teması kurarsan hatırlanırsın.",
                        choices: {
                            left: { text: "Göz teması kur", result: "Akılda kalırsın.", effects: { signal: 0, mask: 0, suspicion: 4, energy: 0 } },
                            right: { text: "Bakışından kaç, normale devam et", result: "Gölge gibi geçtin. Sessizlik seni korudu (Sessizlik Maskesi yolu).", effects: { signal: 0, mask: 0, suspicion: -5, energy: -1 }, award: "Sessizlik Maskesi" }
                        }
                    },
                    {
                        id: "2.7-E",
                        scene: "Kalabalık bir meydanda 'tuhaf biri' arıyorlar. Herkes birbirine bakıyor. Sen ne yaparsın?",
                        choices: {
                            left: { text: "Hızla uzaklaş", result: "Hareket dikkat çeker.", effects: { signal: 0, mask: 0, suspicion: 4, energy: -2 } },
                            right: { text: "Kalabalığa karış, nefes al", result: "Onlarca insan arasında kaybolmak, kaçmaktan daha kolaydı (Sessizlik Maskesi yolu).", effects: { signal: 0, mask: -1, suspicion: -5, energy: -2 }, award: "Sessizlik Maskesi" }
                        }
                    }
                ]
            }
        }
    },
    // ACT 3 — Yakınlık ve Güven
    3: {
        name: "Yakınlık ve Güven",
        questions: {
            1: { // 3.1 — Barınma / Rutin Kurma
                theme: "BARINMA_RUTIN",
                critical: false,
                alternatives: [
                    {
                        id: "3.1-A",
                        scene: "Terk depoda bir köşe; yerde paletler, duvarda rutubet izleri, tavanda tek bir ampul.",
                        choices: {
                            left: { text: "Gezgin kal", result: "Özgürlük gelir, yorgunluk artar.", effects: { signal: 1, mask: 0, suspicion: -2, energy: -2 } },
                            right: { text: "Yerleş", result: "Güvenli his gelir, sinyal zorlaşır.", effects: { signal: 0, mask: 2, suspicion: 1, energy: 3 } }
                        }
                    },
                    {
                        id: "3.1-B",
                        scene: "Bir evin kapısı bu kez daha uzun açık kalır; içeriden çay kokusu gelir.",
                        choices: {
                            left: { text: "Girme", result: "Kontrol sende kalır.", effects: { signal: 0, mask: 0, suspicion: 1, energy: -1 } },
                            right: { text: "Gir", result: "Yakınlık artar.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 2 } }
                        }
                    },
                    {
                        id: "3.1-C",
                        scene: "Sığınakta yer kavgası; bir battaniye uğruna sesler yükselir.",
                        choices: {
                            left: { text: "Uzak dur", result: "Güvenlik artar.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Yatıştır", result: "İnsanlık artar.", effects: { signal: 0, mask: -1, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "3.1-D",
                        scene: "Uykusuzluk çöker; maskenin içi sıcak, dışarısı soğuk, düşünceler karışık.",
                        choices: {
                            left: { text: "Uyanık kal", result: "Kontrol artar, tükenirsin.", effects: { signal: 0, mask: -2, suspicion: -1, energy: -3 } },
                            right: { text: "Kısa uyku", result: "Toparlanırsın, risk doğar.", effects: { signal: 0, mask: 1, suspicion: 2, energy: 3 } }
                        }
                    },
                    {
                        id: "3.1-E",
                        scene: "Bir rutini seçebilirsin: aynı sokaklar, aynı saatler, aynı davranışlar; rutin bazen kamuflajdır.",
                        choices: {
                            left: { text: "Akışa bırak", result: "Hız artar, sürpriz artar.", effects: { signal: 1, mask: -1, suspicion: 1, energy: 0 } },
                            right: { text: "Plan yap", result: "Hatalar azalır gibi olur.", effects: { signal: 0, mask: 1, suspicion: -2, energy: -1 } }
                        }
                    }
                ]
            },
            2: { // 3.2 — Sosyal Bağlar Derinleşiyor
                theme: "SOSYAL_BAGLAR",
                critical: false,
                alternatives: [
                    {
                        id: "3.2-A",
                        scene: "Biri sana battaniye uzatır; parmakların battaniyeye değerse, mesafe kapanır.",
                        choices: {
                            left: { text: "Alma", result: "Mesafe güvenlik getirir.", effects: { signal: 0, mask: 0, suspicion: 1, energy: -1 } },
                            right: { text: "Al", result: "Sıcaklık yakınlık getirir.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 2 } }
                        }
                    },
                    {
                        id: "3.2-B",
                        scene: "Birisi kalabalığın içinde 'O kötü biri değil' diye seni savunur; sesi titrer ama kararlıdır.",
                        choices: {
                            left: { text: "Sessiz kal", result: "Bağ zayıf ama sürer.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Teşekkür et", result: "Bağ güçlenir.", effects: { signal: 0, mask: -1, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "3.2-C",
                        scene: "Bir çocuk seni oyununa çağırır; gözler kısa süreliğine seni 'tehdit' olarak değil 'insan' olarak görür.",
                        choices: {
                            left: { text: "Reddet", result: "Gizli kalırsın, soğuk görünürsün.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Katıl", result: "Şehir seni daha az korkutucu görür.", effects: { signal: 0, mask: -1, suspicion: -4, energy: -1 } }
                        }
                    },
                    {
                        id: "3.2-D",
                        scene: "Komşu 'çay' der; bu kelime, seni bir odaya değil, bir hayata davet eder.",
                        choices: {
                            left: { text: "Gitme", result: "Gizlilik artar.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Git", result: "Güven ihtimali artar.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 1 } }
                        }
                    },
                    {
                        id: "3.2-E",
                        scene: "Birisi sırrını fısıldar; 'kimseye söyleme' derken aslında 'yanımda kal' demek ister.",
                        choices: {
                            left: { text: "Umursama", result: "Bağ kopar.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Dinle", result: "Bağ doğar.", effects: { signal: 0, mask: 1, suspicion: -1, energy: -1 } }
                        }
                    }
                ]
            },
            3: { // 3.3 — Gölgeler ve Tehditler
                theme: "KARA_PAZAR",
                critical: false,
                alternatives: [
                    {
                        id: "3.3-A",
                        scene: "'Seni gördüm' mesajı yine gelir; mesajın geldiği anda bir araba yavaşlar ve senin gölgen uzar.",
                        choices: {
                            left: { text: "Kaynağı araştır", result: "Çözebilirsin, tuzağa da düşebilirsin.", effects: { signal: 2, mask: -1, suspicion: 3, energy: -2 } },
                            right: { text: "Yer değiştir", result: "İz azalır.", effects: { signal: 0, mask: 0, suspicion: -3, energy: -2 } }
                        }
                    },
                    {
                        id: "3.3-B",
                        scene: "Kara pazarda bir satıcı fiyatın yanına bir de 'iyilik' yazar: 'Sonra ödersin.'",
                        choices: {
                            left: { text: "Uzaklaş", result: "Risk azalır.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Pazarlık yap", result: "Zaman kazanırsın.", effects: { signal: 0, mask: 0, suspicion: 2, energy: 2 } }
                        }
                    },
                    {
                        id: "3.3-C",
                        scene: "Sığınakta biri seni ele vermekle tehdit eder; sesi alçak ama keskindir: 'Beni de yakarsın.'",
                        choices: {
                            left: { text: "Kaç", result: "Hızlı kurtuluş, büyük dalga.", effects: { signal: 0, mask: 0, suspicion: 5, energy: -3 } },
                            right: { text: "Yardım ederek sustur", result: "Geçici huzur, uzun gölge.", effects: { signal: 0, mask: -1, suspicion: -2, energy: -2 } }
                        }
                    },
                    {
                        id: "3.3-D",
                        scene: "Polis devriyesi aynı bölgede tekrar belirir; bu kez sokak senin için daralır.",
                        choices: {
                            left: { text: "Normal görün", result: "Bağ sürer, maskeye yük biner.", effects: { signal: 0, mask: -2, suspicion: 2, energy: -1 } },
                            right: { text: "Sessiz rotaya geç", result: "Şehir senden uzaklaşır.", effects: { signal: 0, mask: 0, suspicion: -3, energy: -2 } }
                        }
                    },
                    {
                        id: "3.3-E",
                        scene: "İnternette bir görüntünün dolaştığını hissedersin; gözlerin değil, şehir seni izliyordur artık.",
                        choices: {
                            left: { text: "Görmezden gel", result: "Kolay ama tehlikeli.", effects: { signal: 0, mask: 0, suspicion: 4, energy: 0 } },
                            right: { text: "İzleri temizlemeye çalış", result: "Zor ama mümkün.", effects: { signal: 0, mask: -1, suspicion: -2, energy: -2 } }
                        }
                    }
                ]
            },
            4: { // 3.4 — KRİTİK: GÜVEN MASKESİ KAPISI
                theme: "SOSYAL_BAGLAR",
                critical: true,
                criticalType: "TRUST_MASK_GATE",
                alternatives: [
                    {
                        id: "3.4-A",
                        scene: "Çocuğu dar bir sokakta bulursun; dizleri kanamış, sesi titrer. Onu götürmek seni görünür yapar.",
                        choices: {
                            left: { text: "Saklanıp geri çekil", result: "Kendini korursun ama güven yolu kapanır.", effects: { signal: 1, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Çocuğu ailesine götür", result: "Teşekkür bir 'kapı' açar; maske içinde güven kilidi çözülür (Güven Maskesi yolu).", effects: { signal: 0, mask: 2, suspicion: 4, energy: -3 }, award: "Güven Maskesi" }
                        }
                    },
                    {
                        id: "3.4-B",
                        scene: "Bir apartmanın anahtarı kaybolmuştur; kapıda ağlayan biri 'evimde kaldım' der. Sen anahtarı bulursun.",
                        choices: {
                            left: { text: "Umursama", result: "Gizli kalırsın, güven kapısı kapanır.", effects: { signal: 1, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Bulup geri ver", result: "Küçük iyilik, büyük güven doğurur (Güven Maskesi yolu).", effects: { signal: 0, mask: 1, suspicion: 3, energy: -2 }, award: "Güven Maskesi" }
                        }
                    },
                    {
                        id: "3.4-C",
                        scene: "Komşu, gözlerini kaçırmadan sorar: 'Geceleri nereye gidiyorsun?' Bu soru, maskenin en zayıf yerine değmiştir.",
                        choices: {
                            left: { text: "Büyük bir yalan söyle", result: "Anlık kurtulursun, güven kapısı kapanır.", effects: { signal: 1, mask: -1, suspicion: -1, energy: 0 } },
                            right: { text: "Duygusal bir gerçek söyle", result: "Güven doğar; maske 'güven' modunu kazanır (Güven Maskesi yolu).", effects: { signal: 0, mask: 2, suspicion: 3, energy: -2 }, award: "Güven Maskesi" }
                        }
                    },
                    {
                        id: "3.4-D",
                        scene: "Biri düşmüş, kanıyor; insanlar bakıyor ama kimse yaklaşmıyor. Sen yaklaşırsan görünür olursun.",
                        choices: {
                            left: { text: "Uzaklaş", result: "Gizli kalırsın, güven yolu kapanır.", effects: { signal: 1, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Yardım et", result: "Korkunun içinden güven çıkar (Güven Maskesi yolu).", effects: { signal: 0, mask: 2, suspicion: 4, energy: -3 }, award: "Güven Maskesi" }
                        }
                    },
                    {
                        id: "3.4-E",
                        scene: "Bir panik anı; biri bağırır, biri ağlar, kalabalık titreşir. Senin davranışın ortamı belirleyebilir.",
                        choices: {
                            left: { text: "Kaç", result: "Hayatta kalırsın ama güven kapanır.", effects: { signal: 1, mask: 0, suspicion: 2, energy: -1 } },
                            right: { text: "Sakinleştirici bir şey yap", result: "Güven doğar; maske bunu öğrenir (Güven Maskesi yolu).", effects: { signal: 0, mask: 1, suspicion: -2, energy: -2 }, award: "Güven Maskesi" }
                        }
                    }
                ]
            },
            5: { // 3.5 — Güven Sonrası Dalga
                theme: "SOSYAL_BAGLAR",
                critical: false,
                alternatives: [
                    {
                        id: "3.5-A",
                        scene: "İnsanlar seni artık daha çok hatırlıyor; bazen iyi, bazen kötü bir hikâyeyle.",
                        choices: {
                            left: { text: "Yer değiştir", result: "Risk azalır, bağ kopar.", effects: { signal: 0, mask: 0, suspicion: -4, energy: -2 } },
                            right: { text: "Normal davran", result: "Bağ büyür, normal görünürsün.", effects: { signal: 0, mask: -1, suspicion: -1, energy: 0 } }
                        }
                    },
                    {
                        id: "3.5-B",
                        scene: "Müttefik olabilecek biri sana kapısını aralar: 'Burada kal.'",
                        choices: {
                            left: { text: "Git", result: "Özgürlük artar, güven azalır.", effects: { signal: 1, mask: 0, suspicion: 1, energy: -1 } },
                            right: { text: "Kal", result: "Güven artar, özgürlük azalır.", effects: { signal: 0, mask: 2, suspicion: -2, energy: 2 } }
                        }
                    },
                    {
                        id: "3.5-C",
                        scene: "Çocuk seni görünce gülümser; yetişkinler seni daha az korkutucu görür.",
                        choices: {
                            left: { text: "Görmezden gel", result: "Kurtuluş yolu sertleşir.", effects: { signal: 2, mask: 0, suspicion: 2, energy: 0 } },
                            right: { text: "Karşılık ver", result: "Dünya yolu güçlenir.", effects: { signal: 0, mask: 1, suspicion: -3, energy: -1 } }
                        }
                    },
                    {
                        id: "3.5-D",
                        scene: "Birisi bir başkasına 'o kötü biri değil' derken seni işaret eder gibi yapar.",
                        choices: {
                            left: { text: "Sessiz kal", result: "Kırılgan bir bağ kalır.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Teşekkür et", result: "Bağ güçlenir.", effects: { signal: 0, mask: 1, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "3.5-E",
                        scene: "İç ses tekrar sorar: 'Maskeyi bir gün çıkarabilir misin?' Bu soru artık daha gerçek.",
                        choices: {
                            left: { text: "'Hayır.'", result: "Kurtarma sonuna hazırlık artar.", effects: { signal: 3, mask: 0, suspicion: 0, energy: 0 } },
                            right: { text: "'Evet.'", result: "Dünya sonuna hazırlık artar.", effects: { signal: 0, mask: 2, suspicion: 0, energy: 1 } }
                        }
                    }
                ]
            },
            6: { // 3.6 — Sinyal mi Bağ mı
                theme: "SINYAL_PARAZIT",
                critical: false,
                alternatives: [
                    {
                        id: "3.6-A",
                        scene: "Çatıya çıkıp sinyal atmak için kısa bir pencere var; rüzgâr sert, sokaklar izliyor.",
                        choices: {
                            left: { text: "Vazgeç", result: "İz azalır, kurtuluş gecikir.", effects: { signal: 0, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Dene", result: "Kurtuluş yaklaşır, iz büyür.", effects: { signal: 5, mask: -2, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "3.6-B",
                        scene: "Müttefikle daha derin bir konuşma fırsatı; bir odada iki sandalye, iki sessizlik.",
                        choices: {
                            left: { text: "Sus", result: "Gizlilik güçlenir.", effects: { signal: 0, mask: 0, suspicion: 1, energy: 0 } },
                            right: { text: "Konuş", result: "Dünya yolu güçlenir.", effects: { signal: 0, mask: 1, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "3.6-C",
                        scene: "Parazit tekrar yükselir; cihaz sanki iki farklı kanala aynı anda bağlanıyordur.",
                        choices: {
                            left: { text: "Kes", result: "Risk azalır.", effects: { signal: 0, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Çözmeye uğraş", result: "Köprü yolu güçlenir (varsa).", effects: { signal: 3, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "3.6-D",
                        scene: "Haberlerde 'garip ışıklar' yeniden geçer; insanlar artık korkuyu isimlendirmeye başlamıştır.",
                        choices: {
                            left: { text: "Uzaklaş", result: "Kendini korursun.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 0 } },
                            right: { text: "Söylentiyi yumuşat", result: "Şüphe hafifler.", effects: { signal: 0, mask: -1, suspicion: -4, energy: -1 } }
                        }
                    },
                    {
                        id: "3.6-E",
                        scene: "Kara pazar 'hızlı çözüm' sunar; hızlı çözümün gölgesi de hızlıdır.",
                        choices: {
                            left: { text: "Reddet", result: "Zor ama temiz.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -1 } },
                            right: { text: "Kabul", result: "Hız gelir, bedel gelir.", effects: { signal: 3, mask: -1, suspicion: 4, energy: 2 } }
                        }
                    }
                ]
            },
            7: { // 3.7 — Act 3 Kapanış
                theme: "BILGI_DIL",
                critical: false,
                alternatives: [
                    {
                        id: "3.7-A",
                        scene: "Gökyüzünde titreme artık daha sık; sanki bir şey seni arıyor, ya da seni işaretliyor.",
                        choices: {
                            left: { text: "'Bu felaket de olabilir.'", result: "Kontrol ve saklanma öne çıkar.", effects: { signal: 0, mask: 1, suspicion: -2, energy: 0 } },
                            right: { text: "'Bu kurtarma olabilir.'", result: "Kurtarma yolu öne çıkar.", effects: { signal: 4, mask: -1, suspicion: 2, energy: -1 } }
                        }
                    },
                    {
                        id: "3.7-B",
                        scene: "İnsanların sana bakışı değişiyor; bazı bakışlarda merhamet var, bazılarında korku.",
                        choices: {
                            left: { text: "Mesafe koy", result: "Gizlilik büyür.", effects: { signal: 1, mask: 0, suspicion: -1, energy: 0 } },
                            right: { text: "Yakınlık kur", result: "Dünya yolu büyür.", effects: { signal: 0, mask: 1, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "3.7-C",
                        scene: "İçinden 'köprü olabilirsin' fikri geçer; bu fikir ağır ama sıcak.",
                        choices: {
                            left: { text: "'İşim değil.'", result: "Tek hedef kurtuluş olur.", effects: { signal: 3, mask: 0, suspicion: 0, energy: 0 } },
                            right: { text: "'Deneyeceğim.'", result: "İletişim yolu güçlenir.", effects: { signal: 0, mask: 1, suspicion: -1, energy: -1 } }
                        }
                    },
                    {
                        id: "3.7-D",
                        scene: "Maskenin çatlağı ışıkta daha görünür; sanki maskenin kendisi bile 'sonlara' yaklaşıyor.",
                        choices: {
                            left: { text: "Ertele", result: "Zaman kazanırsın, risk büyür.", effects: { signal: 0, mask: -3, suspicion: 0, energy: 1 } },
                            right: { text: "Onar", result: "Daha sağlam görünürsün.", effects: { signal: 0, mask: 4, suspicion: 0, energy: -2 } }
                        }
                    },
                    {
                        id: "3.7-E",
                        scene: "Müttefik 'senin yerin neresi?' der; bu soru bir coğrafya değil, bir kimlik sorusudur.",
                        choices: {
                            left: { text: "'Evime döneceğim.'", result: "Kurtuluş kapısı açılır.", effects: { signal: 3, mask: -1, suspicion: 0, energy: 0 } },
                            right: { text: "'Bilmiyorum.'", result: "Duygusal kapı açılır.", effects: { signal: 0, mask: 2, suspicion: 0, energy: 1 } }
                        }
                    }
                ]
            }
        }
    },
    // ACT 4 — Son Düzlük
    4: {
        name: "Son Düzlük",
        questions: {
            1: { // 4.1 — Gökyüzü İşaretleri
                theme: "KURTARMA_SON_DUZLUK",
                critical: false,
                alternatives: [
                    {
                        id: "4.1-A",
                        scene: "İnce ışık çizgileri bulutların altında belirir; rüzgâr, şehrin sesini bir anda keser.",
                        choices: {
                            left: { text: "Saklan", result: "Risk azalır, zaman daralır.", effects: { signal: -2, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Takip et", result: "Final hızlanır, görünürlük artar.", effects: { signal: 4, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "4.1-B",
                        scene: "Elektronikler kısa süre bozulur; birinin telefonu kapanır, biri 'ne oluyor?' diye bağırır.",
                        choices: {
                            left: { text: "Kes", result: "Şehir sakinleşir, belirsizlik uzar.", effects: { signal: -2, mask: 0, suspicion: -5, energy: 0 } },
                            right: { text: "Devam et", result: "İlerlersin, dikkat çekersin.", effects: { signal: 4, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "4.1-C",
                        scene: "Rüzgâr aniden yön değiştirir; havada 'yaklaşan' bir şeyin basıncı var gibi.",
                        choices: {
                            left: { text: "Kapalı alana kaç", result: "Gözden kaçarsın.", effects: { signal: -1, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Açık alana çık", result: "Kurtuluş için uygun zemin doğar.", effects: { signal: 3, mask: -1, suspicion: 2, energy: -1 } }
                        }
                    },
                    {
                        id: "4.1-D",
                        scene: "Uzakta bir uğultu; ne siren ne rüzgâr, daha derinden bir titreşim.",
                        choices: {
                            left: { text: "Ters yöne git", result: "Sona gecikmeli girersin.", effects: { signal: -2, mask: 0, suspicion: -3, energy: -1 } },
                            right: { text: "Uğultuya git", result: "Sona yaklaşırsın.", effects: { signal: 4, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "4.1-E",
                        scene: "Gökyüzü sanki cevap veriyor; ışıklar ritim tutar gibi yanıp sönüyor.",
                        choices: {
                            left: { text: "Cevabı bastır", result: "Şüphe azalır.", effects: { signal: -2, mask: 0, suspicion: -5, energy: 0 } },
                            right: { text: "Cevabı büyüt", result: "Kurtarma/iletişim artar.", effects: { signal: 4, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    }
                ]
            },
            2: { // 4.2 — Polis Çemberi / Son Av
                theme: "GOZETIM_POLIS",
                critical: false,
                alternatives: [
                    {
                        id: "4.2-A",
                        scene: "Son günlerde devriyeler sıklaşır; ayn yüzleri daha çok görürsün, aynı araçlar daha yavaş geçer.",
                        choices: {
                            left: { text: "Kalabalığa karış", result: "İz erir, maske yorulur.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } },
                            right: { text: "Şehir dışına kaç", result: "Şüphe azalabilir, fırsatlar azalır.", effects: { signal: 0, mask: 0, suspicion: -3, energy: -2 } }
                        }
                    },
                    {
                        id: "4.2-B",
                        scene: "Bir kontrol noktası kurulur; bariyerler, ışıklar ve 'sıradaki' bakışlar.",
                        choices: {
                            left: { text: "Yan yola sap", result: "Sessiz kalırsın ama zaman kaybedersin.", effects: { signal: 0, mask: 0, suspicion: -1, energy: -2 } },
                            right: { text: "Normal gibi geç", result: "Başarırsan kimse anlamaz.", effects: { signal: 0, mask: -2, suspicion: 3, energy: -1 } }
                        }
                    },
                    {
                        id: "4.2-C",
                        scene: "Bir telefon ışığı sana döner; ekran parıltısı kısa bir an yüzünü yakalar gibi.",
                        choices: {
                            left: { text: "Saklan", result: "Kurtulursun ama garip görünürsün.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 0 } },
                            right: { text: "Normal yürü", result: "Doğal görünürsen sorun olmaz.", effects: { signal: 0, mask: -1, suspicion: -2, energy: 0 } }
                        }
                    },
                    {
                        id: "4.2-D",
                        scene: "Siren sesi yaklaşır; sokak bir an boşalır ve boşlukta sen çok görünür olursun.",
                        choices: {
                            left: { text: "Sokakta devam et", result: "Hız kazanırsın, risk artar.", effects: { signal: 0, mask: 0, suspicion: 4, energy: 0 } },
                            right: { text: "Bir binaya gir", result: "Anlık koruma bulursun.", effects: { signal: 0, mask: 0, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "4.2-E",
                        scene: "Bir polis 'dur' diye bağırır; sesindeki emir, maskenin içine kadar girer.",
                        choices: {
                            left: { text: "Kaç", result: "Hızlı kurtulursun, av başlar.", effects: { signal: 0, mask: 0, suspicion: 5, energy: -3 } },
                            right: { text: "Durup konuş", result: "Doğru ton seni kurtarabilir.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } }
                        }
                    }
                ]
            },
            3: { // 4.3 — Maskenin Son Sınavı
                theme: "MASKE_BIYOMEKANIGI",
                critical: false,
                alternatives: [
                    {
                        id: "4.3-A",
                        scene: "Maske çatırdar gibi bir ses çıkarır; sanki içten bir yer kırılmıştır ama dışarıdan belli değildir.",
                        choices: {
                            left: { text: "Görmezden gel", result: "Zaman kazanırsın, risk büyür.", effects: { signal: 0, mask: -3, suspicion: 0, energy: 1 } },
                            right: { text: "Onarmayı dene", result: "Maske toparlar, sen zorlanırsın.", effects: { signal: 0, mask: 4, suspicion: 0, energy: -2 } }
                        }
                    },
                    {
                        id: "4.3-B",
                        scene: "Maskenin içi buz gibi olur; yüzün donuklaşır, tepkin geç gelir.",
                        choices: {
                            left: { text: "Sıkılaştır", result: "Güvende kalırsın, çatlak büyüyebilir.", effects: { signal: 0, mask: -2, suspicion: -1, energy: 0 } },
                            right: { text: "Kısa gevşet", result: "Kendini toparlarsın, görünürlük riski doğar.", effects: { signal: 0, mask: 2, suspicion: 3, energy: 1 } }
                        }
                    },
                    {
                        id: "4.3-C",
                        scene: "Mimiklerin gecikmeli gelir; birine baktığında 'gözlerin' doğru yerde ama anlam yanlış yerde kalır.",
                        choices: {
                            left: { text: "Daha az konuş", result: "Daha az test olursun, garip görünebilirsin.", effects: { signal: 0, mask: 0, suspicion: 3, energy: 0 } },
                            right: { text: "Normal konuş", result: "İnanırsan geçer, inanmazlarsa yanarsın.", effects: { signal: 0, mask: -2, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "4.3-D",
                        scene: "Maskenin kokusu değişir; bu koku, insanlara değil ama hayvanlara ve sezgilere konuşur.",
                        choices: {
                            left: { text: "Umursama", result: "Hızlı gidersin, risk büyür.", effects: { signal: 0, mask: -2, suspicion: 3, energy: 0 } },
                            right: { text: "Bastırmaya çalış", result: "Şimdilik çözersin, sonra geri dönebilir.", effects: { signal: 0, mask: 1, suspicion: -2, energy: -1 } }
                        }
                    },
                    {
                        id: "4.3-E",
                        scene: "Yansımanda yüzün sana ait değil; o yüzle kaç kez yalan söyledin, kaç kez iyilik yaptın, hatırlarsın.",
                        choices: {
                            left: { text: "Bakma", result: "Kendini korursun, yabancılaşma artar.", effects: { signal: 0, mask: -1, suspicion: 0, energy: 0 } },
                            right: { text: "Bir an bak", result: "Kararın netleşir.", effects: { signal: 0, mask: 1, suspicion: 0, energy: 1 } }
                        }
                    }
                ]
            },
            4: { // 4.4 — Son Hazırlık
                theme: "KURTARMA_SON_DUZLUK",
                critical: false,
                alternatives: [
                    {
                        id: "4.4-A",
                        scene: "Stadyum gibi geniş bir alan görürsün; ışıklar, kameralar, kalabalık ihtimali… ama iniş için mükemmel.",
                        choices: {
                            left: { text: "Gitme", result: "Daha sessiz kalırsın.", effects: { signal: -3, mask: 0, suspicion: -5, energy: 0 } },
                            right: { text: "Git", result: "Sona yaklaşır, kalabalığı çağırırsın.", effects: { signal: 4, mask: -1, suspicion: 4, energy: -2 } }
                        }
                    },
                    {
                        id: "4.4-B",
                        scene: "Şehir dışındaki boş arazi sessiz; burada gökyüzü daha geniş, ama yol daha yorucu.",
                        choices: {
                            left: { text: "Şehirde kal", result: "Fırsat artar, göz artar.", effects: { signal: 1, mask: -1, suspicion: 2, energy: 0 } },
                            right: { text: "Oraya yönel", result: "Risk azalır, yorgunluk artar.", effects: { signal: 2, mask: 0, suspicion: -4, energy: -3 } }
                        }
                    },
                    {
                        id: "4.4-C",
                        scene: "Müttefik 'burada kal' derken sesi titrer; bu titreme korku değil, bağlılıktır.",
                        choices: {
                            left: { text: "Git", result: "Kurtuluş odaklanır.", effects: { signal: 2, mask: -1, suspicion: 0, energy: -1 } },
                            right: { text: "Kal", result: "Güven artar.", effects: { signal: -3, mask: 2, suspicion: -2, energy: 2 } }
                        }
                    },
                    {
                        id: "4.4-D",
                        scene: "Radyo kulübü 'son mesaj' ister; 'bir kez daha, ama doğru söyle' der gibi.",
                        choices: {
                            left: { text: "Mesajı reddet", result: "Risk azalır.", effects: { signal: -2, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Mesajı hazırla", result: "Köprü yolu güçlenir.", effects: { signal: 2, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "4.4-E",
                        scene: "Kalabalık bir etkinlik var; burada işaret vermek kolay, burada kaybolmak da kolay… ama bedel büyük.",
                        choices: {
                            left: { text: "Uzak dur", result: "Görünmezlik artar.", effects: { signal: -3, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Oraya yakın dur", result: "İşaret vermek kolaylaşır.", effects: { signal: 3, mask: -1, suspicion: 3, energy: -1 } }
                        }
                    }
                ]
            },
            5: { // 4.5 — KRİTİK: Son 1 Kapısı (Sinyali 100'e tamamlama)
                theme: "KURTARMA_SON_DUZLUK",
                critical: true,
                criticalType: "FINAL_SIGNAL_GATE",
                alternatives: [
                    {
                        id: "4.5-A",
                        scene: "Cihaz ekranda 'bir adım kaldı' der gibi titrer; bu adım atılırsa artık geri dönüş yoktur.",
                        choices: {
                            left: { text: "Son adımı atma", result: "Kurtuluşu bilerek erteler, diğer sonlara kapı aralarsın.", effects: { signal: -2, mask: 1, suspicion: -3, energy: 1 } },
                            right: { text: "Son adımı at", result: "Kurtuluş artık geri dönüşsüz biçimde yaklaşır.", effects: { signal: 7, mask: -2, suspicion: 4, energy: -3 } }
                        }
                    },
                    {
                        id: "4.5-B",
                        scene: "Sinyal çizgisi dolmuştur; cihaz 'konum kesinleşiyor' hissi verir, sanki gökyüzü sana kilitlenir.",
                        choices: {
                            left: { text: "Dur", result: "Dünya seçeneklerini korursun.", effects: { signal: -2, mask: 1, suspicion: -4, energy: 1 } },
                            right: { text: "Devam et", result: "Gökyüzü seni işaretler.", effects: { signal: 7, mask: -2, suspicion: 4, energy: -3 } }
                        }
                    },
                    {
                        id: "4.5-C",
                        scene: "Cihaz tek bir komut ister: 'güç.' Bunu verirsen ev gelir; vermezsen belirsizlik kalır.",
                        choices: {
                            left: { text: "İsteği reddet", result: "Köprü/kalma ihtimali canlı kalır.", effects: { signal: -2, mask: 1, suspicion: -3, energy: 1 } },
                            right: { text: "İsteği yerine getir", result: "Artık kurtarma kaçınılmaz olur.", effects: { signal: 7, mask: -2, suspicion: 4, energy: -4 } }
                        }
                    },
                    {
                        id: "4.5-D",
                        scene: "Parmakların titrer; bu titreme korkudan değil, kararın ağırlığındandır.",
                        choices: {
                            left: { text: "Adımı atma", result: "Karanlık uzar ama seçenekler artar.", effects: { signal: -2, mask: 1, suspicion: -3, energy: 1 } },
                            right: { text: "Adımı at", result: "Işıklar netleşir.", effects: { signal: 7, mask: -2, suspicion: 4, energy: -3 } }
                        }
                    },
                    {
                        id: "4.5-E",
                        scene: "Ekranda bir 'ev' simgesi belirir; tek dokunuşla her şey bitebilir.",
                        choices: {
                            left: { text: "Basma", result: "Burada kalma ihtimali büyür.", effects: { signal: -2, mask: 1, suspicion: -3, energy: 1 } },
                            right: { text: "Bas", result: "Ev çağrısı güçlenir.", effects: { signal: 7, mask: -2, suspicion: 4, energy: -3 } }
                        }
                    }
                ]
            },
            6: { // 4.6 — KRİTİK: Son 3 Kapısı (Köprü — İletişim Maskesi gerekir)
                theme: "SINYAL_PARAZIT",
                critical: true,
                criticalType: "BRIDGE_GATE",
                alternatives: [
                    {
                        id: "4.6-A",
                        scene: "Radyo kulübü ve bir insan müttefik seni bir araya getirir: 'İki tarafa da aynı anda konuşabilir misin?'",
                        choices: {
                            left: { text: "Mesajı kes", result: "Köprü zayıflar; yalnız kalırsın.", effects: { signal: -1, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Mesajı iki tarafa da ilet", result: "Korku yerine anlam doğar; köprü olma yolu açılır.", effects: { signal: 4, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "4.6-B",
                        scene: "Ekranda iki dil gibi iki çizgi akar; onları üst üste getirmek mümkündür ama tehlikelidir.",
                        choices: {
                            left: { text: "Sakla", result: "Kendini korursun ama köprü kapanır.", effects: { signal: -1, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Çeviriyi paylaş", result: "İnsanların dili yumuşar, uzayın dili yaklaşır.", effects: { signal: 4, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "4.6-C",
                        scene: "Bir küçük grup toplanmıştır; hepsi korkuyor ama hepsi de merak ediyor.",
                        choices: {
                            left: { text: "Sus", result: "Şüphe azalabilir ama fırsat kaçar.", effects: { signal: -2, mask: 0, suspicion: -3, energy: 0 } },
                            right: { text: "Konuş", result: "Köprü olma ihtimali güçlenir.", effects: { signal: 4, mask: -1, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "4.6-D",
                        scene: "Radyo kulübü 'son kez' der; 'doğru mesaj' ister, yanlış mesaj felaket doğurur.",
                        choices: {
                            left: { text: "Reddet", result: "İletişim yolu söner.", effects: { signal: -2, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Kabul et", result: "İletişim Maskesi anlam kazanır.", effects: { signal: 4, mask: -1, suspicion: 2, energy: -2 } }
                        }
                    },
                    {
                        id: "4.6-E",
                        scene: "İki tarafta da korku var; sen korkuyu 'çeviriyle' azaltabilirsin.",
                        choices: {
                            left: { text: "Mesajı iptal et", result: "Köprü yolu zayıflar.", effects: { signal: -2, mask: 0, suspicion: -4, energy: 0 } },
                            right: { text: "Sakin bir mesaj kur", result: "Köprü yolu güçlenir.", effects: { signal: 4, mask: -1, suspicion: 1, energy: -2 } }
                        }
                    }
                ]
            },
            7: { // 4.7 — KRİTİK: Son 4 Kapısı (Dünya'da kalma — Güven Maskesi gerekir)
                theme: "SOSYAL_BAGLAR",
                critical: true,
                criticalType: "STAY_ON_EARTH_GATE",
                alternatives: [
                    {
                        id: "4.7-A",
                        scene: "Müttefik kapının eşiğinde durur; 'Gerçeğini bana göster, burada kal' derken sesinde korku değil cesaret vardır.",
                        choices: {
                            left: { text: "Kaç", result: "Hayatta kalırsın ama 'ev' kapısı kapanır.", effects: { signal: 2, mask: 0, suspicion: 2, energy: -1 } },
                            right: { text: "Gerçeğini müttefiğe göster", result: "Kabul edilme ihtimali doğar; dünyada kalma yolu açılır.", effects: { signal: -4, mask: 4, suspicion: 3, energy: -2 } }
                        }
                    },
                    {
                        id: "4.7-B",
                        scene: "Bir odada iki kişi; biri sen, biri insan. Aranızdaki tek şey söz ve nefes gibi görünmeyen bir bağ.",
                        choices: {
                            left: { text: "Maskeye sığın", result: "Güven kırılır.", effects: { signal: 2, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Güveni seç", result: "Dünya bir an yumuşar.", effects: { signal: -4, mask: 4, suspicion: 3, energy: -1 } }
                        }
                    },
                    {
                        id: "4.7-C",
                        scene: "Müttefik seni saklamak değil, yanında tutmak ister; 'kaçma' der.",
                        choices: {
                            left: { text: "Git", result: "Kurtuluş odaklanır.", effects: { signal: 2, mask: -1, suspicion: 1, energy: -1 } },
                            right: { text: "Kal", result: "Dünya sonu güçlenir.", effects: { signal: -4, mask: 4, suspicion: 1, energy: 1 } }
                        }
                    },
                    {
                        id: "4.7-D",
                        scene: "Kapı ardına kadar açılır; içeriden sıcak ışık sızar, dışarıdan siren sesi gelir.",
                        choices: {
                            left: { text: "Dönüp git", result: "Yalnızlık seçilir.", effects: { signal: 2, mask: 0, suspicion: 2, energy: -1 } },
                            right: { text: "İçeri gir", result: "Bir insanın kabulü, yeni hayat ihtimali olur.", effects: { signal: -4, mask: 4, suspicion: 2, energy: 1 } }
                        }
                    },
                    {
                        id: "4.7-E",
                        scene: "Maskenin kenarına dokunursun; çıkarırsan her şey değişir, çıkarmazsan hiçbir şey değişmez.",
                        choices: {
                            left: { text: "Çıkarma", result: "Dünya ile temas gecikir/bozulur.", effects: { signal: 2, mask: 0, suspicion: -2, energy: 0 } },
                            right: { text: "Çıkar", result: "Dünya ile gerçek temas başlar.", effects: { signal: -5, mask: 5, suspicion: 4, energy: -1 } }
                        }
                    }
                ]
            }
        }
    }
};

// Görülen alternatifleri takip eden obje
const seenAlternatives = {};

// Görülen alternatifleri sıfırla (yeni oyun başladığında çağrılmalı)
function resetSeenAlternatives() {
    for (const key in seenAlternatives) {
        delete seenAlternatives[key];
    }
}

// Soru havuzundan rastgele soru seçme fonksiyonu
// Daha önce görülmemiş alternatifleri tercih eder ve seçeneklerin yerlerini rastgele değiştirir
function getRandomQuestion(act, questionNumber) {
    const actData = QUESTION_POOL[act];
    if (!actData) return null;

    const questionData = actData.questions[questionNumber];
    if (!questionData) return null;

    const alternatives = questionData.alternatives;
    const key = `${act}-${questionNumber}`;

    // Bu soru için görülen alternatifleri al veya oluştur
    if (!seenAlternatives[key]) {
        seenAlternatives[key] = [];
    }

    // Henüz görülmemiş alternatifleri bul
    const unseenIndices = [];
    for (let i = 0; i < alternatives.length; i++) {
        if (!seenAlternatives[key].includes(i)) {
            unseenIndices.push(i);
        }
    }

    // Eğer tüm alternatifler görüldüyse, listeyi sıfırla ve tekrar başla
    if (unseenIndices.length === 0) {
        seenAlternatives[key] = [];
        for (let i = 0; i < alternatives.length; i++) {
            unseenIndices.push(i);
        }
    }

    // Görülmemiş alternatiflerden rastgele birini seç
    const randomUnseenIndex = Math.floor(Math.random() * unseenIndices.length);
    const selectedIndex = unseenIndices[randomUnseenIndex];

    // Seçilen alternatifi görülenler listesine ekle
    seenAlternatives[key].push(selectedIndex);

    // Seçilen alternatifin bir kopyasını oluştur
    const selectedAlt = JSON.parse(JSON.stringify(alternatives[selectedIndex]));

    // %50 ihtimalle seçeneklerin yerlerini değiştir (sağ-sol swap)
    const shouldSwapChoices = Math.random() < 0.5;
    if (shouldSwapChoices && selectedAlt.choices) {
        const temp = selectedAlt.choices.left;
        selectedAlt.choices.left = selectedAlt.choices.right;
        selectedAlt.choices.right = temp;
    }

    return selectedAlt;
}

// Dışa aktarma
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTION_POOL, getRandomQuestion, resetSeenAlternatives };
}
