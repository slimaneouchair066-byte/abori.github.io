// script.js - ملف الجافاسكريبت المتكامل لموقع توقعات الطقس
// تم تطويره باحترافية عالية مع محاكاة الذكاء الاصطناعي ونظام GPS

// ============================================================
// 1. البيانات الأساسية (محاكاة قواعد البيانات)
// ============================================================

// بيانات المدن مع توقعات 10 أيام وتفاصيل إضافية
const cityDatabase = {
    cairo: {
        id: 'cairo',
        name: 'القاهرة',
        country: 'مصر',
        coordinates: { lat: 30.0444, lng: 31.2357 },
        temps: [28, 29, 31, 30, 27, 26, 29, 32, 33, 30],
        desc: 'مشمس مع بعض الغيوم',
        icon: 'fa-sun',
        details: {
            rain: 10,
            wind: 18,
            humidity: 45,
            sea: 'هادئ',
            volcano: 'نشاط منخفض',
            quake: '2.1',
            pressure: 1015,
            uv: 7
        },
        news: [
            'تحذير من ارتفاع درجات الحرارة غداً',
            'أمطار خفيفة متوقعة في المساء',
            'نشاط رياح معتدل على السواحل'
        ],
        images: [
            { type: 'nature', icon: 'fa-pyramid', label: 'أهرامات الجيزة' },
            { type: 'city', icon: 'fa-flag', label: 'نهر النيل' },
            { type: 'landmark', icon: 'fa-mosque', label: 'جامع محمد علي' }
        ]
    },
    dubai: {
        id: 'dubai',
        name: 'دبي',
        country: 'الإمارات',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        temps: [38, 39, 41, 42, 40, 39, 41, 43, 44, 42],
        desc: 'حار جداً ومشمس',
        icon: 'fa-sun',
        details: {
            rain: 0,
            wind: 22,
            humidity: 25,
            sea: 'معتدل',
            volcano: 'لا يوجد',
            quake: '1.0',
            pressure: 1008,
            uv: 9
        },
        news: [
            'درجات حرارة قياسية متوقعة',
            'تحذير من الجفاف وارتفاع الأشعة فوق البنفسجية',
            'حركة بحرية معتدلة في الخليج'
        ],
        images: [
            { type: 'landmark', icon: 'fa-building', label: 'برج خليفة' },
            { type: 'nature', icon: 'fa-palm-tree', label: 'نخلة جميرا' },
            { type: 'city', icon: 'fa-hotel', label: 'مدينة دبي' }
        ]
    },
    london: {
        id: 'london',
        name: 'لندن',
        country: 'بريطانيا',
        coordinates: { lat: 51.5074, lng: -0.1278 },
        temps: [15, 16, 14, 13, 15, 17, 18, 16, 14, 13],
        desc: 'غائم مع أمطار متفرقة',
        icon: 'fa-cloud-rain',
        details: {
            rain: 70,
            wind: 30,
            humidity: 82,
            sea: 'مضطرب',
            volcano: 'خامل',
            quake: '0.8',
            pressure: 1002,
            uv: 2
        },
        news: [
            'أمطار غزيرة متوقعة في المناطق الشرقية',
            'تحذير من الرياح القوية قرب السواحل',
            'ارتفاع منسوب المياه في نهر التايمز'
        ],
        images: [
            { type: 'landmark', icon: 'fa-clock', label: 'بيغ بن' },
            { type: 'city', icon: 'fa-umbrella', label: 'شوارع لندن' },
            { type: 'nature', icon: 'fa-tree', label: 'حدائق هايد بارك' }
        ]
    },
    tokyo: {
        id: 'tokyo',
        name: 'طوكيو',
        country: 'اليابان',
        coordinates: { lat: 35.6762, lng: 139.6503 },
        temps: [22, 24, 23, 21, 20, 22, 25, 26, 24, 22],
        desc: 'معتدل مع نسيم خفيف',
        icon: 'fa-cloud-sun',
        details: {
            rain: 40,
            wind: 20,
            humidity: 60,
            sea: 'هادئ',
            volcano: 'مراقبة مستمرة',
            quake: '3.0',
            pressure: 1012,
            uv: 5
        },
        news: [
            'نشاط زلزالي خفيف مسجل صباحاً',
            'استقرار في درجات الحرارة طوال الأسبوع',
            'تحذير من تسونامي (منخفض الاحتمال)'
        ],
        images: [
            { type: 'landmark', icon: 'fa-torii-gate', label: 'معبد سينسو-جي' },
            { type: 'nature', icon: 'fa-cherry-blossom', label: 'أزهار الكرز' },
            { type: 'city', icon: 'fa-tower', label: 'برج طوكيو' }
        ]
    },
    newyork: {
        id: 'newyork',
        name: 'نيويورك',
        country: 'أمريكا',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        temps: [18, 20, 22, 21, 19, 18, 20, 23, 24, 22],
        desc: 'غائم جزئياً',
        icon: 'fa-cloud',
        details: {
            rain: 45,
            wind: 28,
            humidity: 68,
            sea: 'معتدل',
            volcano: 'خامل',
            quake: '1.5',
            pressure: 1010,
            uv: 4
        },
        news: [
            'تقلبات جوية متوقعة نهاية الأسبوع',
            'رياح قوية تضرب مدينة نيويورك',
            'انخفاض في درجات الحرارة ليلاً'
        ],
        images: [
            { type: 'landmark', icon: 'fa-statue-of-liberty', label: 'تمثال الحرية' },
            { type: 'city', icon: 'fa-city', label: 'سنترال بارك' },
            { type: 'nature', icon: 'fa-tree', label: 'حدائق بروكلين' }
        ]
    },
    casablanca: {
        id: 'casablanca',
        name: 'الدار البيضاء',
        country: 'المغرب',
        coordinates: { lat: 33.5731, lng: -7.5898 },
        temps: [24, 25, 27, 26, 24, 23, 25, 28, 27, 26],
        desc: 'مشمس مع نسيم بحري',
        icon: 'fa-sun',
        details: {
            rain: 15,
            wind: 16,
            humidity: 55,
            sea: 'هادئ',
            volcano: 'لا يوجد',
            quake: '0.5',
            pressure: 1018,
            uv: 6
        },
        news: [
            'أجواء صيفية معتدلة طوال الأسبوع',
            'نشاط بحري منخفض في المحيط الأطلسي',
            'فرصة لهطول أمطار خفيفة نهاية الأسبوع'
        ],
        images: [
            { type: 'landmark', icon: 'fa-mosque', label: 'مسجد الحسن الثاني' },
            { type: 'city', icon: 'fa-flag', label: 'كورنيش الدار البيضاء' },
            { type: 'nature', icon: 'fa-ocean', label: 'ساحل المحيط' }
        ]
    },
    riyadh: {
        id: 'riyadh',
        name: 'الرياض',
        country: 'السعودية',
        coordinates: { lat: 24.7136, lng: 46.6753 },
        temps: [42, 43, 45, 44, 42, 41, 43, 46, 47, 45],
        desc: 'جاف وحار جداً',
        icon: 'fa-sun',
        details: {
            rain: 0,
            wind: 12,
            humidity: 15,
            sea: '—',
            volcano: 'خامل',
            quake: '0.2',
            pressure: 1005,
            uv: 10
        },
        news: [
            'موجة حارة شديدة مستمرة',
            'تحذير من التعرض للشمس ساعات الذروة',
            'استقرار في الأحوال الجوية'
        ],
        images: [
            { type: 'nature', icon: 'fa-desert', label: 'صحراء الربع الخالي' },
            { type: 'landmark', icon: 'fa-tower', label: 'برج الفيصلية' },
            { type: 'city', icon: 'fa-building', label: 'مدينة الرياض' }
        ]
    }
};

// محاكاة مصادر البيانات الخارجية (للكشف العميق)
const externalSources = [
    { name: 'مصدر NOAA', weight: 0.3 },
    { name: 'مصدر ECMWF', weight: 0.25 },
    { name: 'مصدر JMA', weight: 0.2 },
    { name: 'مصدر العرب للطقس', weight: 0.15 },
    { name: 'مصدر عالمي', weight: 0.1 }
];

// ============================================================
// 2. نظام إدارة الحالة (State Management)
// ============================================================

const AppState = {
    currentCity: 'cairo',
    gpsEnabled: false,
    gpsCity: null,
    userLocation: null,
    uploadedImages: [],
    comments: [],
    isSearching: false,
    aiAnalysis: null
};

// ============================================================
// 3. نظام GPS المتقدم
// ============================================================

class GPSManager {
    constructor() {
        this.watchId = null;
        this.isWatching = false;
        this.lastPosition = null;
    }

    // الحصول على الموقع الحالي
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('GPS غير مدعوم في هذا المتصفح'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.lastPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    resolve(this.lastPosition);
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 30000
                }
            );
        });
    }

    // مراقبة الموقع بشكل مستمر
    startWatching(onUpdate, onError) {
        if (!navigator.geolocation) {
            if (onError) onError(new Error('GPS غير مدعوم'));
            return;
        }

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.lastPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                this.isWatching = true;
                if (onUpdate) onUpdate(this.lastPosition);
            },
            (error) => {
                if (onError) onError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 60000
            }
        );
    }

    stopWatching() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            this.isWatching = false;
        }
    }

    // حساب المسافة بين نقطتين (هافرسين)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // نصف قطر الأرض بالكيلومتر
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // تحديد أقرب مدينة من الموقع الحالي
    findNearestCity(lat, lng) {
        let nearest = null;
        let minDistance = Infinity;

        for (const [key, city] of Object.entries(cityDatabase)) {
            const distance = this.calculateDistance(
                lat, lng,
                city.coordinates.lat,
                city.coordinates.lng
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { key, ...city, distance };
            }
        }

        return nearest;
    }
}

// ============================================================
// 4. نظام الذكاء الاصطناعي (محاكاة متقدمة)
// ============================================================

class AISystem {
    constructor() {
        this.sources = externalSources;
        this.confidence = 0;
    }

    // تحليل عميق باستخدام مصادر متعددة
    deepAnalysis(cityId) {
        const city = cityDatabase[cityId];
        if (!city) return null;

        // محاكاة جمع البيانات من مصادر مختلفة
        const results = this.sources.map(source => {
            // محاكاة اختلافات طفيفة بين المصادر
            const variation = (Math.random() - 0.5) * 2;
            const tempAdjust = Math.round(variation * 2);
            const rainAdjust = Math.round(variation * 5);
            
            return {
                source: source.name,
                weight: source.weight,
                temp: city.temps.map(t => t + tempAdjust),
                rain: Math.max(0, city.details.rain + rainAdjust),
                wind: Math.round(city.details.wind + variation * 3),
                confidence: 0.7 + Math.random() * 0.25
            };
        });

        // حساب المتوسط المرجح
        const weightedAvg = this.calculateWeightedAverage(results);
        this.confidence = weightedAvg.confidence;

        // إضافة تحليل إضافي
        return {
            city: city.name,
            sources: results,
            weighted: weightedAvg,
            confidence: this.confidence,
            recommendations: this.generateRecommendations(city, weightedAvg),
            alerts: this.generateAlerts(city, weightedAvg),
            timestamp: new Date().toISOString()
        };
    }

    calculateWeightedAverage(results) {
        let totalWeight = 0;
        let tempSum = [];
        let rainSum = 0;
        let windSum = 0;
        let confidenceSum = 0;

        // تهيئة مصفوفة الحرارة
        for (let i = 0; i < 10; i++) tempSum[i] = 0;

        results.forEach(result => {
            const w = result.weight;
            totalWeight += w;
            
            result.temp.forEach((t, i) => {
                tempSum[i] += t * w;
            });
            
            rainSum += result.rain * w;
            windSum += result.wind * w;
            confidenceSum += result.confidence * w;
        });

        return {
            temps: tempSum.map(t => Math.round(t / totalWeight)),
            rain: Math.round(rainSum / totalWeight),
            wind: Math.round(windSum / totalWeight),
            confidence: confidenceSum / totalWeight
        };
    }

    generateRecommendations(city, analysis) {
        const recs = [];
        
        if (analysis.rain > 60) {
            recs.push('يُنصح بحمل مظلة أو معطف واقٍ من المطر');
        }
        if (analysis.temps[0] > 35) {
            recs.push('درجات حرارة عالية، يُنصح بشرب الماء بكثرة وتجنب الشمس المباشرة');
        }
        if (analysis.wind > 25) {
            recs.push('رياح قوية متوقعة، توخ الحذر في المناطق المفتوحة');
        }
        if (city.details.uv > 7) {
            recs.push('مستوى الأشعة فوق البنفسجية مرتفع، استخدم واقي الشمس');
        }
        
        if (recs.length === 0) {
            recs.push('الأجواء معتدلة، استمتع بيومك');
        }
        
        return recs;
    }

    generateAlerts(city, analysis) {
        const alerts = [];
        
        if (analysis.rain > 80) {
            alerts.push({ level: 'تحذير', message: 'أمطار غزيرة متوقعة، احتمال فيضان' });
        }
        if (analysis.temps[0] > 40) {
            alerts.push({ level: 'إنذار', message: 'موجة حر شديدة، خطر على الصحة' });
        }
        if (city.details.quake > 3) {
            alerts.push({ level: 'تنبيه', message: `نشاط زلزالي بقوة ${city.details.quake}، راقب التحديثات` });
        }
        if (analysis.wind > 35) {
            alerts.push({ level: 'تحذير', message: 'رياح عاصفة متوقعة، خطر على الملاحة' });
        }
        
        return alerts;
    }

    // محاكاة البحث العميق
    async deepSearch(query) {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
        
        // بحث في قاعدة البيانات
        const results = [];
        const queryLower = query.toLowerCase().trim();
        
        for (const [key, city] of Object.entries(cityDatabase)) {
            const nameMatch = city.name.includes(queryLower) || 
                            city.country.includes(queryLower) ||
                            key.includes(queryLower);
            if (nameMatch) {
                results.push({
                    ...city,
                    matchScore: 1 - (city.name.length - queryLower.length) / city.name.length
                });
            }
        }
        
        // إذا لم يتم العثور على نتائج، اقتراح أقرب تطابق
        if (results.length === 0) {
            // محاكاة الذكاء الاصطناعي في اقتراح مدن مشابهة
            const suggestions = Object.values(cityDatabase)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(city => ({
                    ...city,
                    matchScore: 0.3 + Math.random() * 0.2,
                    suggested: true
                }));
            return suggestions;
        }
        
        return results.sort((a, b) => b.matchScore - a.matchScore);
    }
}

// ============================================================
// 5. واجهة المستخدم (UI Controller)
// ============================================================

class UIController {
    constructor() {
        this.elements = this.initializeElements();
        this.gpsManager = new GPSManager();
        this.aiSystem = new AISystem();
        this.currentCity = 'cairo';
        this.isDarkMode = false;
        this.uploadedImages = [];
        this.comments = [];
        
        this.bindEvents();
        this.initializeApp();
    }

    initializeElements() {
        return {
            weatherGrid: document.getElementById('weatherGrid'),
            citySelect: document.getElementById('citySelect'),
            customCity: document.getElementById('customCity'),
            searchBtn: document.getElementById('searchBtn'),
            gpsText: document.getElementById('gpsText'),
            extraDetails: document.getElementById('extraDetails'),
            galleryContainer: document.getElementById('galleryContainer'),
            newsContainer: document.getElementById('newsContainer'),
            uploadTrigger: document.getElementById('uploadTrigger'),
            imageUpload: document.getElementById('imageUpload'),
            uploadGpsStatus: document.getElementById('uploadGpsStatus'),
            commentBox: document.querySelector('.comment-box'),
            commentBtn: document.querySelector('.btn-outline'),
            loadingIndicator: this.createLoadingIndicator()
        };
    }

    createLoadingIndicator() {
        const div = document.createElement('div');
        div.className = 'loading-indicator';
        div.style.cssText = `
            display: none;
            text-align: center;
            padding: 20px;
            font-size: 1.2rem;
            color: #f5b342;
        `;
        div.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تحليل البيانات ...';
        return div;
    }

    initializeApp() {
        // إضافة مؤشر التحميل
        const container = document.querySelector('.container');
        container.insertBefore(this.elements.loadingIndicator, container.children[0]);
        
        // تحميل البيانات الأولية
        this.loadCity('cairo');
        this.activateGPS();
    }

    bindEvents() {
        // البحث
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.customCity.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // تغيير المدينة من القائمة
        this.elements.citySelect.addEventListener('change', (e) => {
            this.elements.customCity.value = '';
            this.loadCity(e.target.value);
        });

        // رفع الصور
        this.elements.uploadTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleImageUpload();
        });
        this.elements.imageUpload.addEventListener('change', (e) => {
            this.processUploadedImage(e);
        });

        // التعليقات
        this.elements.commentBtn.addEventListener('click', () => {
            this.addComment();
        });
        this.elements.commentBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addComment();
            }
        });

        // إضافة تحكم بالوضع الليلي (اختياري)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' && e.ctrlKey) {
                this.toggleDarkMode();
            }
        });
    }

    // ============================================================
    // 6. نظام GPS
    // ============================================================

    activateGPS() {
        this.elements.gpsText.textContent = 'جاري التحديد...';
        
        this.gpsManager.startWatching(
            (position) => {
                AppState.gpsEnabled = true;
                AppState.userLocation = position;
                
                // البحث عن أقرب مدينة
                const nearest = this.gpsManager.findNearestCity(position.lat, position.lng);
                if (nearest && nearest.distance < 100) { // في حدود 100 كم
                    AppState.gpsCity = nearest.key;
                    this.elements.gpsText.textContent = `📍 ${nearest.name} (${Math.round(nearest.distance)} كم)`;
                    this.elements.uploadGpsStatus.innerHTML = '✅ تم التحقق من الموقع (GPS) – يمكنك التحميل';
                    
                    // تحديث المدينة تلقائياً إذا كانت في نفس البلد
                    if (nearest.distance < 50) {
                        this.loadCity(nearest.key);
                    }
                } else {
                    this.elements.gpsText.textContent = '📍 موقع غير معروف';
                    this.elements.uploadGpsStatus.innerHTML = '⚠️ موقعك غير قريب من أي مدينة مسجلة';
                }
            },
            (error) => {
                AppState.gpsEnabled = false;
                this.elements.gpsText.textContent = '❌ غير متاح';
                this.elements.uploadGpsStatus.innerHTML = '❌ يلزم تفعيل GPS للتحميل';
                console.warn('GPS Error:', error.message);
            }
        );
    }

    // ============================================================
    // 7. البحث العميق بالذكاء الاصطناعي
    // ============================================================

    async handleSearch() {
        const customQuery = this.elements.customCity.value.trim();
        
        if (!customQuery) {
            // استخدام المدينة المختارة من القائمة
            this.loadCity(this.elements.citySelect.value);
            return;
        }

        // إظهار مؤشر التحميل
        this.showLoading(true);
        
        try {
            // البحث العميق
            const results = await this.aiSystem.deepSearch(customQuery);
            
            if (results.length > 0) {
                // اختيار أفضل نتيجة
                const bestMatch = results[0];
                this.elements.citySelect.value = bestMatch.id || Object.keys(cityDatabase).find(k => cityDatabase[k].name === bestMatch.name);
                this.elements.customCity.value = bestMatch.name;
                
                // تحليل عميق باستخدام الذكاء الاصطناعي
                const analysis = this.aiSystem.deepAnalysis(bestMatch.id || Object.keys(cityDatabase).find(k => cityDatabase[k].name === bestMatch.name));
                AppState.aiAnalysis = analysis;
                
                this.loadCity(bestMatch.id || Object.keys(cityDatabase).find(k => cityDatabase[k].name === bestMatch.name));
                
                // عرض نتائج التحليل
                this.showAIAnalysis(analysis);
            } else {
                // لم يتم العثور على نتائج
                this.showNotification('لم يتم العثور على مدينة مطابقة، جرب اسماً آخر', 'warning');
                this.showLoading(false);
            }
        } catch (error) {
            console.error('Search Error:', error);
            this.showNotification('حدث خطأ في البحث، حاول مرة أخرى', 'error');
            this.showLoading(false);
        }
    }

    showAIAnalysis(analysis) {
        if (!analysis) return;
        
        // عرض معلومات إضافية عن التحليل
        const extraDetails = this.elements.extraDetails;
        const city = cityDatabase[this.currentCity];
        
        // إضافة شارة الذكاء الاصطناعي
        const aiBadge = document.createElement('div');
        aiBadge.className = 'ai-analysis-badge';
        aiBadge.style.cssText = `
            background: rgba(59, 43, 74, 0.4);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            border: 1px solid rgba(160, 123, 201, 0.3);
            margin-top: 10px;
            text-align: center;
        `;
        aiBadge.innerHTML = `
            <i class="fas fa-brain" style="color: #c9a8f0;"></i>
            تحليل AI من ${analysis.sources.length} مصدر
            (الثقة: ${Math.round(analysis.confidence * 100)}%)
        `;
        
        // إضافة توصيات
        if (analysis.recommendations.length > 0) {
            const recDiv = document.createElement('div');
            recDiv.style.cssText = `
                background: rgba(245, 179, 66, 0.1);
                border-radius: 16px;
                padding: 12px 16px;
                margin-top: 8px;
                border-right: 3px solid #f5b342;
            `;
            recDiv.innerHTML = `
                <strong style="color: #f5b342;"><i class="fas fa-lightbulb"></i> توصيات:</strong>
                <ul style="margin: 6px 0 0 20px; font-size: 0.9rem;">
                    ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
                </ul>
            `;
            extraDetails.appendChild(recDiv);
        }
        
        // إضافة تنبيهات
        if (analysis.alerts.length > 0) {
            analysis.alerts.forEach(alert => {
                const alertDiv = document.createElement('div');
                alertDiv.style.cssText = `
                    background: ${alert.level === 'تحذير' ? 'rgba(255, 100, 50, 0.15)' : 'rgba(255, 200, 50, 0.15)'};
                    border: 1px solid ${alert.level === 'تحذير' ? 'rgba(255, 100, 50, 0.3)' : 'rgba(255, 200, 50, 0.3)'};
                    border-radius: 12px;
                    padding: 8px 14px;
                    margin: 4px 0;
                    font-size: 0.85rem;
                    color: ${alert.level === 'تحذير' ? '#ff8a70' : '#f5d7a0'};
                `;
                alertDiv.innerHTML = `
                    <i class="fas fa-${alert.level === 'تحذير' ? 'exclamation-triangle' : 'bell'}"></i>
                    ${alert.message}
                `;
                extraDetails.appendChild(alertDiv);
            });
        }
        
        this.showLoading(false);
    }

    // ============================================================
    // 8. عرض بيانات الطقس
    // ============================================================

    loadCity(cityId) {
        const city = cityDatabase[cityId];
        if (!city) return;

        this.currentCity = cityId;
        AppState.currentCity = cityId;

        // تحديث القائمة المنسدلة
        this.elements.citySelect.value = cityId;
        
        // عرض التوقعات
        this.renderWeather(city);
        
        // عرض التفاصيل الإضافية
        this.renderDetails(city);
        
        // عرض الصور
        this.renderGallery(city);
        
        // عرض الأخبار
        this.renderNews(city);
        
        // تحديث حالة GPS
        this.updateGPSStatus(city);
    }

    renderWeather(city) {
        const grid = this.elements.weatherGrid;
        const days = ['اليوم', 'غداً', 'بعد غد', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7', 'اليوم 8', 'اليوم 9', 'اليوم 10'];
        
        let html = '';
        const temps = city.temps;
        
        for (let i = 0; i < 10; i++) {
            const temp = temps[i % temps.length];
            const icon = i % 2 === 0 ? city.icon || 'fa-sun' : (i % 3 === 0 ? 'fa-cloud' : 'fa-cloud-sun');
            const rainChance = Math.round(city.details.rain + (Math.random() - 0.5) * 20);
            
            html += `
                <div class="day-card" style="animation-delay: ${i * 0.05}s">
                    <div class="day-name">${days[i]}</div>
                    <div><i class="fas ${icon}" style="color: #f5b342; font-size: 1.8rem;"></i></div>
                    <div class="temp">${temp}°C</div>
                    <div class="desc">${city.desc}</div>
                    <div style="font-size:0.8rem; opacity:0.7; margin-top: 4px;">
                        <i class="fas fa-tint"></i> ${Math.max(0, rainChance)}%
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = html;
    }

    renderDetails(city) {
        const details = city.details;
        const extra = this.elements.extraDetails;
        
        extra.innerHTML = `
            <span><i class="fas fa-tint"></i> الأمطار: ${details.rain}%</span>
            <span><i class="fas fa-fire"></i> البراكين: ${details.volcano}</span>
            <span><i class="fas fa-water"></i> حركة البحر: ${details.sea}</span>
            <span><i class="fas fa-map"></i> الزلازل: ${details.quake}</span>
            <span><i class="fas fa-wind"></i> الرياح: ${details.wind} كم/س</span>
            <span><i class="fas fa-tachometer-alt"></i> الضغط: ${details.pressure} hPa</span>
            <span><i class="fas fa-sun"></i> UV: ${details.uv}</span>
        `;
    }

    renderGallery(city) {
        const container = this.elements.galleryContainer;
        let html = '';
        
        // الصور الأساسية
        city.images.forEach(img => {
            html += `
                <div class="fake-img" title="${img.label}">
                    <i class="fas ${img.icon}"></i>
                    <span style="display: block; font-size: 0.6rem; margin-top: 4px;">${img.label}</span>
                </div>
            `;
        });
        
        // إضافة الصور المرفوعة من قبل المستخدم
        this.uploadedImages.forEach(img => {
            html += `
                <div class="fake-img" style="background-image: url(${img}); background-size: cover; background-position: center; color: transparent;">
                    <span style="position: absolute; bottom: 2px; right: 6px; font-size: 0.5rem; color: rgba(255,255,255,0.6); background: rgba(0,0,0,0.4); padding: 2px 8px; border-radius: 10px;">مرفوع</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    renderNews(city) {
        const container = this.elements.newsContainer;
        const icons = ['fa-bolt', 'fa-umbrella', 'fa-tsunami', 'fa-cloud', 'fa-wind', 'fa-sun'];
        
        let html = city.news.map((news, index) => `
            <div class="news-item">
                <i class="fas ${icons[index % icons.length]}" style="color: ${index % 2 === 0 ? '#f5b342' : '#7fc1db'};"></i>
                ${news}
            </div>
        `).join('');
        
        // إضافة التعليقات
        if (this.comments.length > 0) {
            html += this.comments.slice(-3).map(comment => `
                <div class="news-item" style="border-right-color: #7fc1db; background: rgba(0,0,0,0.15);">
                    <i class="fas fa-comment" style="color: #8dc9e0;"></i>
                    <span style="opacity: 0.7; font-size: 0.8rem;">${new Date(comment.time).toLocaleTimeString()}</span>
                    ${comment.text}
                </div>
            `).join('');
        }
        
        container.innerHTML = html;
    }

    updateGPSStatus(city) {
        if (AppState.gpsEnabled) {
            this.elements.gpsText.textContent = `📍 ${city.name}`;
            this.elements.uploadGpsStatus.innerHTML = '✅ تم التحقق من الموقع (GPS) – يمكنك التحميل';
        }
    }

    // ============================================================
    // 9. رفع الصور والتعليقات
    // ============================================================

    handleImageUpload() {
        if (!AppState.gpsEnabled) {
            this.showNotification('⚠️ نظام GPS غير مفعل. يجب أن تكون متواجداً فعلياً في المنطقة لتحميل الصورة.', 'error');
            return;
        }
        
        // التحقق من المسافة للمدينة الحالية
        const city = cityDatabase[this.currentCity];
        if (AppState.userLocation && city) {
            const distance = this.gpsManager.calculateDistance(
                AppState.userLocation.lat,
                AppState.userLocation.lng,
                city.coordinates.lat,
                city.coordinates.lng
            );
            
            if (distance > 100) {
                this.showNotification(`⚠️ أنت بعيد عن ${city.name} (${Math.round(distance)} كم). يجب أن تكون في المنطقة لرفع الصورة.`, 'error');
                return;
            }
        }
        
        this.elements.imageUpload.click();
    }

    processUploadedImage(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // التحقق من حجم الملف (حد أقصى 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('⚠️ حجم الصورة كبير جداً (حد أقصى 5MB)', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            this.uploadedImages.push(imageData);
            AppState.uploadedImages.push(imageData);
            
            // تحديث المعرض
            const city = cityDatabase[this.currentCity];
            this.renderGallery(city);
            
            this.showNotification('✅ تم رفع الصورة بنجاح!', 'success');
        };
        reader.readAsDataURL(file);
        
        // إعادة تعيين الإدخال
        event.target.value = '';
    }

    addComment() {
        const box = this.elements.commentBox;
        const text = box.value.trim();
        
        if (!text) {
            this.showNotification('الرجاء كتابة تعليق أولاً', 'warning');
            return;
        }
        
        const comment = {
            text: text,
            time: Date.now(),
            city: this.currentCity,
            user: 'زائر'
        };
        
        this.comments.push(comment);
        AppState.comments.push(comment);
        
        // تحديث الأخبار
        const city = cityDatabase[this.currentCity];
        this.renderNews(city);
        
        box.value = '';
        this.showNotification('✅ تم نشر تعليقك بنجاح', 'success');
    }

    // ============================================================
    // 10. أدوات مساعدة
    // ============================================================

    showLoading(show) {
        this.elements.loadingIndicator.style.display = show ? 'block' : 'none';
        if (show) {
            this.elements.loadingIndicator.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i> 
                جاري تحليل البيانات من ${externalSources.length} مصدر ...
            `;
        }
    }

    showNotification(message, type = 'info') {
        const colors = {
            info: '#7fc1db',
            success: '#5cb85c',
            warning: '#f5b342',
            error: '#ff6b6b'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(10, 25, 40, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid ${colors[type]};
            border-radius: 16px;
            padding: 14px 24px;
            color: #fff;
            font-size: 0.95rem;
            max-width: 350px;
            z-index: 9999;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}" 
               style="color: ${colors[type]}; margin-left: 10px;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        const body = document.body;
        if (this.isDarkMode) {
            body.style.background = 'linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 100%)';
            body.style.color = '#e0e0e0';
        } else {
            body.style.background = 'linear-gradient(145deg, #0b1a2e 0%, #1a3a4a 100%)';
            body.style.color = '#fff';
        }
    }
}

// ============================================================
// 11. إضافة تأثيرات CSS ديناميكية
// ============================================================

// إضافة تأثيرات الحركة عبر CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
    .loading-indicator {
        animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// ============================================================
// 12. تهيئة التطبيق
// ============================================================

// انتظار تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة واجهة المستخدم
    window.app = new UIController();
    
    console.log('🌤️ تطبيق طقس العالم تم تشغيله بنجاح!');
    console.log('📡 GPS متاح:', navigator.geolocation ? 'نعم' : 'لا');
    console.log('🏙️ عدد المدن:', Object.keys(cityDatabase).length);
    console.log('🧠 نظام الذكاء الاصطناعي جاهز');
});

// تصدير للتطوير
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cityDatabase, GPSManager, AISystem, UIController };
}
