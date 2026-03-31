// Lucky Charms — Scripts

(() => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const Images = document.getElementsByTagName('img');
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    // Mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Active nav link on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 140;
        let current = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar scroll style
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveNav();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Scroll-reveal animation
    const revealEls = document.querySelectorAll(
        '.member-card, .sprint-card, .value-row, .situation-block, .conclusion-card, .values-photo-wrap'
    );

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));

    // Stagger team cards
    document.querySelectorAll('.member-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
    });

    // Stagger value rows
    document.querySelectorAll('.value-row').forEach((row, i) => {
        row.style.transitionDelay = `${i * 0.06}s`;
    });

    //Zoom function for persona's && insights
    span.onclick = function() {modal.style.display = "none";}
    for (var i = 0; i < Images.length; i++) {
        Images[i].onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        captionText.innerHTML = this.nextElementSibling.innerHTML;
        }
    }
})();