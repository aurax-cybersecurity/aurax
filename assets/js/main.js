document.addEventListener('DOMContentLoaded', () => {
    if (window.feather) {
        window.feather.replace();
    }

    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) {
        return;
    }

    const setMenuState = (isOpen, returnFocus = false) => {
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        mobileMenu.hidden = !isOpen;
        document.body.classList.toggle('mobile-menu-open', isOpen);

        if (isOpen) {
            mobileMenu.querySelector('a')?.focus();
        } else if (returnFocus) {
            menuToggle.focus();
        }
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuState(false, true);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuState(false);
        }
    });
});
