// Частицы на фоне
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.1, random: true },
        size: { value: 2, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.04,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" }
        }
    }
});

// Анимация чисел в статистике
const numberElements = document.querySelectorAll('.info-number');
numberElements.forEach(element => {
    const target = element.textContent;
    element.textContent = '0';
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumber(element, target);
            observer.unobserve(element);
        }
    }, { threshold: 0.5 });
    
    observer.observe(element);
});

function animateNumber(element, target) {
    let current = 0;
    const targetNum = parseInt(target.replace('+', ''));
    const increment = targetNum / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
        }
    }, 50);
}

// Эффект при клике на аватар
const avatar = document.querySelector('.avatar-img');
if (avatar) {
    avatar.addEventListener('click', () => {
        // Мигание аватара
        avatar.style.filter = 'grayscale(100%) contrast(120%) brightness(1.5)';
        setTimeout(() => {
            avatar.style.filter = 'grayscale(100%) contrast(110%)';
        }, 300);
        
        // Создаём частицы
        createClickParticles(avatar.getBoundingClientRect());
    });
    
    // Запасная картинка если не загрузится
    avatar.onerror = () => {
        avatar.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><circle cx="160" cy="160" r="155" fill="none" stroke="white" stroke-width="2" opacity="0.3"/></svg>';
    };
}

// Частицы при клике
function createClickParticles(rect) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
        `;
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let opacity = 1;
        const animate = () => {
            opacity -= 0.03;
            particle.style.opacity = opacity;
            particle.style.transform = `translate(${vx * 30}px, ${vy * 30}px)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        animate();
    }
}

// Случайное мерцание фоновых символов
setInterval(() => {
    const symbols = document.querySelectorAll('.bg-symbols .symbol');
    if (symbols.length > 0) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        randomSymbol.style.opacity = '0.06';
        randomSymbol.style.textShadow = '0 0 60px rgba(255,255,255,0.2)';
        
        setTimeout(() => {
            randomSymbol.style.opacity = '0.03';
            randomSymbol.style.textShadow = 'none';
        }, 500);
    }
}, 2000);

// Параллакс при движении мыши
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.clientX * 2) / 150;
    const y = (window.innerHeight - e.clientY * 2) / 150;
    
    const symbols = document.querySelector('.bg-symbols');
    if (symbols) {
        symbols.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Плавное появление страницы
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Анимация появления элементов при скролле
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Наблюдаем за всеми карточками
document.querySelectorAll('.service-card, .step, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(el);
});