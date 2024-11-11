// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.destination-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Интерактивные кнопки
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Добавляем новый функционал

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Поиск направлений
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.destination-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.destination-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Подписка на рассылку
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('.email-input').value;
        if (email) {
            alert('Спасибо за подписку! Мы отправили подтверждение на ' + email);
            newsletterForm.reset();
        }
    });
}

// Анимация при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .destination-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Заменяем функцию загрузки изображений
function loadDestinationImages() {
    const destinations = [
        {
            img: 'https://avatars.mds.yandex.net/get-entity_search/10843572/952422192/S600xU_2x',
            fallback: 'https://avatars.mds.yandex.net/i?id=8d65e08396dd75e69f6b9f4d05a0b2d1cdcf90b7-4468494-images-thumbs&n=13',
            alt: 'Бали'
        },
        {
            img: 'https://avatars.mds.yandex.net/i?id=bf760d902839818ab6dd60e768bb629c344171ee-5686193-images-thumbs&n=13',
            fallback: 'https://avatars.mds.yandex.net/i?id=bf760d902839818ab6dd60e768bb629c344171ee-5686193-images-thumbs&n=13',
            alt: 'Париж'
        },
        {
            img: 'https://avatars.mds.yandex.net/i?id=72e2e3cfecfaa8f0df3a8a19622c31aa5bf733f3-5655706-images-thumbs&n=13',
            fallback: 'https://avatars.mds.yandex.net/i?id=72e2e3cfecfaa8f0df3a8a19622c31aa5bf733f3-5655706-images-thumbs&n=13',
            alt: 'Токио'
        }
    ];

    document.querySelectorAll('.destination-img').forEach((img, index) => {
        if (destinations[index]) {
            // Устанавливаем основное изображение
            img.src = destinations[index].img;
            // Устанавливаем альтернативный текст
            img.alt = destinations[index].alt;
            // Добавляем обработчик ошибки загрузки
            img.onerror = function() {
                this.src = destinations[index].fallback;
                // Если и запасное изображение не загрузилось, показываем заглушку
                this.onerror = function() {
                    this.src = 'https://via.placeholder.com/600x400?text=Изображение+недоступно';
                }
            }
        }
    });
}

// бновляем инициализацию
document.addEventListener('DOMContentLoaded', () => {
    loadDestinationImages();
    loadHeroImage();
});

// Добавляем обработчик для кнопок в карточках направлений
document.querySelectorAll('.destination-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем стандартное поведение
        const card = this.closest('.destination-card');
        const destination = card.querySelector('.destination-title').textContent;
        
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// эффект при наведении на карточку
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.btn').style.transform = 'translateY(-3px)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.btn').style.transform = 'translateY(0)';
    });
});

// код для слайдера
function initializeSlider() {
    const slider = document.querySelector('.destinations-grid');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slider || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = Array.from(slider.querySelectorAll('.destination-card'));
    const totalCards = allDestinations.length;
    const visibleCards = 3;

    // Функция для обновления видимости карточек
    function updateCards() {
        // Очищаем слайдер
        slider.innerHTML = '';
        
        //  новые карточки
        for (let i = 0; i < visibleCards; i++) {
            const index = (currentIndex + i) % totalCards;
            const destination = allDestinations[index];
            
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.style.opacity = '0';
            card.innerHTML = `
                <img 
                    loading="lazy"
                    class="destination-img"
                    src="${destination.img}"
                    alt="${destination.title}"
                >
                <div class="destination-content">
                    <h3 class="destination-title">${destination.title}</h3>
                    <p class="destination-text">${destination.text}</p>
                    <button class="btn btn-primary">Подробнее</button>
                </div>
            `;
            
            slider.appendChild(card);
            
            // Анимация появления
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease-in-out';
                card.style.opacity = '1';
            }, i * 100);
        }
    }

    // Обраотчик для кнопки "Предыдущий"
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCards();
    });

    // Обработчик для кнпки "Следующий"
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCards();
    });

    // Инициализация слайдера
    updateCards();

    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width < 768) {
            visibleCards = 1;
        } else if (width < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        updateCards();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
});

// Добавляем объект с координатами городов
const cityCoordinates = {
    'москва': [55.753215, 37.622504],
    'санкт-петербург': [59.939095, 30.315868],
    'екатеринбург': [56.838011, 60.597465],
    'париж': [48.856614, 2.352222],
    'лондон': [51.507351, -0.127758],
    'нью-йорк': [40.712776, -74.005974],
    'токио': [35.689487, 139.691706],
    'дубай': [25.204849, 55.270783],
    'рим': [41.902783, 12.496366],
    'барселона': [41.385064, 2.173403]
};

// Обновляем функцию инициализации карты
function initMap() {
    if (typeof ymaps === 'undefined') {
        console.error('Yandex Maps API не загружен');
        return;
    }

    ymaps.ready(() => {
        window.map = new ymaps.Map('map', {
            center: [55.753215, 37.622504],
            zoom: 4,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Создаем коллекцию для офисов
        const officesCollection = new ymaps.GeoObjectCollection();
        
        // Создаем коллекцию для пользовательских меток
        const userCollection = new ymaps.GeoObjectCollection();
        
        // Добавляем коллекции на карту
        window.map.geoObjects.add(officesCollection);
        window.map.geoObjects.add(userCollection);

        // Добавляем обработчик клика по карте
        window.map.events.add('click', function(e) {
            const coords = e.get('coords');
            
            // Очищаем только пользовательские метки
            userCollection.removeAll();
            
            // Создаем новую метку
            const placemark = new ymaps.Placemark(coords, {
                balloonContent: 'Выбранное место'
            }, {
                preset: 'islands#redDotIcon'
            });
            
            // Добавляем метку в коллекцию пользовательских меток
            userCollection.add(placemark);
            
            // Получаем адрес по координатам
            ymaps.geocode(coords).then(function(res) {
                const firstGeoObject = res.geoObjects.get(0);
                const address = firstGeoObject.getAddressLine();
                
                // Обновляем поле ввода с найденным адресом
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = address;
                }
                
                // Обновляем содержимое балуна
                placemark.properties.set('balloonContent', `
                    <div class="map-balloon">
                        <h3>Выбранное место</h3>
                        <p>${address}</p>
                    </div>
                `);
                placemark.balloon.open();
            });
        });

        // Добавляем метки офисов
        const offices = [
            {
                coordinates: [55.753215, 37.622504],
                title: 'Москва',
                address: 'ул. Тверская, 1',
                phone: '+7 (495) 123-45-67'
            },
            {
                coordinates: [59.939095, 30.315868],
                title: 'Санкт-Петербург',
                address: 'Невский проспект, 1',
                phone: '+7 (812) 123-45-67'
            },
            {
                coordinates: [56.838011, 60.597465],
                title: 'Екатеринбург',
                address: 'ул. Ленина, 1',
                phone: '+7 (343) 123-45-67'
            }
        ];

        // Создаем метки для каждого офиса
        offices.forEach(office => {
            const placemark = new ymaps.Placemark(office.coordinates, {
                balloonContent: `
                    <div class="map-balloon">
                        <h3>${office.title}</h3>
                        <p>${office.address}</p>
                        <p>${office.phone}</p>
                    </div>
                `
            }, {
                preset: 'islands#blueCircleDotIcon'
            });

            // Добавляем метку в коллекцию офисов
            officesCollection.add(placemark);
        });

        // Обработчики для списка офисов
        document.querySelectorAll('.office-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const office = offices[index];
                window.map.setCenter(office.coordinates, 15, {
                    duration: 500
                });
            });
        });
    });
}

// Загружаем API Яндекс Карт
function loadYandexMaps() {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=3f57e599-ba97-44f7-9aa9-6e961bbb4c11&lang=ru_RU';
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
}

// Загружаем карту при загрузке страницы
document.addEventListener('DOMContentLoaded', loadYandexMaps);

document.addEventListener('DOMContentLoaded', () => {
    const exploreButton = document.querySelector('.hero-content .btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
                mapSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            

            const destination = document.querySelector('.search-input').value;
            const date = document.querySelector('.date-input').value;
            const travelers = document.querySelector('.travelers-input').value;


            if (!destination || !date || !travelers) {
                alert('Пожалуйста, заполните все поля');
                return;
            }


            localStorage.setItem('bookingDetails', JSON.stringify({
                destination,
                date,
                travelers
            }));


            window.location.href = 'booking.html';
        });
    }
});

// Обновляем код для страницы бронирования
if (window.location.pathname.includes('booking.html')) {
    // Получаем сохраненные данные
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    
    if (bookingDetails) {
        // Отображаем детали бронирования
        document.getElementById('destination-details').textContent = 
            `Направление: ${bookingDetails.destination}`;
        document.getElementById('date-details').textContent = 
            `Дата: ${bookingDetails.date}`;
        document.getElementById('travelers-details').textContent = 
            `Количество путешественников: ${bookingDetails.travelers}`;

        // Создаем поля для каждого путешественника
        const travelersContainer = document.getElementById('travelers-container');
        for (let i = 0; i < parseInt(bookingDetails.travelers); i++) {
            const travelerDiv = document.createElement('div');
            travelerDiv.className = 'traveler-info';
            travelerDiv.innerHTML = `
                <h4>Путешественник ${i + 1}</h4>
                <input type="text" placeholder="Имя" required>
                <input type="text" placeholder="Фамилия" required>
                <input type="date" placeholder="Дата рождения" required>
                <input type="text" placeholder="Номер паспорта" required>
            `;
            travelersContainer.appendChild(travelerDiv);
        }

        // Обработчик отправки формы
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Показываем подтверждение
                if (confirm('Подтвердить бронирование?')) {
                    // Создаем и показываем уведомление
                    const notification = document.createElement('div');
                    notification.style.position = 'fixed';
                    notification.style.top = '-100px';
                    notification.style.left = '50%';
                    notification.style.transform = 'translateX(-50%)';
                    notification.style.backgroundColor = '#4CAF50';
                    notification.style.color = 'white';
                    notification.style.padding = '15px 30px';
                    notification.style.borderRadius = '5px';
                    notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
                    notification.style.zIndex = '1000';
                    notification.style.transition = 'top 0.5s ease-in-out';
                    notification.style.textAlign = 'center';
                    notification.textContent = 'Успешно. Все детали отправлены на вашу почту';
                    
                    document.body.appendChild(notification);

                    // Показываем уведомление
                    setTimeout(() => {
                        notification.style.top = '20px';
                    }, 100);

                    // Скрываем уведомление и перенаправляем на главную
                    setTimeout(() => {
                        notification.style.top = '-100px';
                        setTimeout(() => {
                            localStorage.removeItem('bookingDetails');
                            window.location.href = 'index.html';
                        }, 500);
                    }, 3000);
                }
            });
        }
    }
}
  