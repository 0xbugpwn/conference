let currentLang = localStorage.getItem('bugpwn_lang') || 'fr';

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('bugpwn_lang', lang);

    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    if (langToggle) {
        langToggle.innerText = lang === 'fr' ? 'EN' : 'FR';
    }
    if (langToggleMobile) {
        langToggleMobile.innerText = lang === 'fr' ? 'EN' : 'FR';
    }

    if (typeof translations !== 'undefined') {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALISATION LANGUE ---
    updateLanguage(currentLang);

    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage(newLang);
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage(newLang);
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- GESTION DE LA NEWSLETTER ---
    const newsForm = document.getElementById('newsletter-form');
    const newsBtn = document.getElementById('news-btn');
    const newsInput = document.getElementById('news-input');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxpgfOi38v9enff6fwL5n1QPLC_iPz2sXfh0YDiHL5gb5_33qmN1EOyKNqR7FXwt58a/exec';

    if (newsForm && newsBtn && newsInput) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsInput.value) {
                const originalText = newsBtn.innerHTML;
                newsBtn.innerHTML = "SENDING_ <i class='fas fa-circle-notch fa-spin ml-2'></i>";
                
                let requestBody = new FormData();
                requestBody.append('Email', newsInput.value);
                
                fetch(scriptURL, { method: 'POST', body: requestBody, mode: 'no-cors' })
                    .then(() => {
                        newsBtn.innerHTML = currentLang === 'fr' ? "TRANSMIS <i class='fas fa-check ml-2'></i>" : "TRANSMITTED <i class='fas fa-check ml-2'></i>";
                        newsBtn.classList.remove('bg-white', 'text-black');
                        newsBtn.classList.add('bg-gray-500', 'text-white');
                        newsInput.value = '';
                        setTimeout(() => {
                            newsBtn.innerHTML = originalText;
                            newsBtn.classList.add('bg-white', 'text-black');
                            newsBtn.classList.remove('bg-gray-500', 'text-white');
                        }, 3000);
                    })
                    .catch(() => {
                        newsBtn.innerHTML = "DONE_";
                        setTimeout(() => newsBtn.innerHTML = originalText, 3000);
                    });
            }
        });
    }
});

// --- COPIE PRESSE-PAPIER (Global context for onclick attributes) ---
function copyToClipboard(elementId, btn) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const textToCopy = el.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        const copiedText = currentLang === 'fr' ? '<i class="fas fa-check"></i> COPIÉ' : '<i class="fas fa-check"></i> COPIED';
        btn.innerHTML = copiedText;
        btn.classList.add('text-green-600');
        btn.classList.remove('text-gray-500');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('text-green-600');
            btn.classList.add('text-gray-500');
        }, 2000);
    });
}