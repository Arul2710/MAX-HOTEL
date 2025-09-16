        document.addEventListener('DOMContentLoaded', function() {
        // --- Mobile and Tablet Menu Toggle ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const tabletMenuButton = document.getElementById('tablet-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        }

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }
        if (tabletMenuButton) {
            tabletMenuButton.addEventListener('click', toggleMobileMenu);
        }

        // --- Sticky Header on Scroll ---
        const mainNav = document.getElementById('main-nav');
        if (mainNav) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                if (scrollPosition > 100) {
                    mainNav.classList.add('sticky-header', 'py-4');
                    mainNav.classList.remove('py-6');
                } else {
                    mainNav.classList.remove('sticky-header', 'py-4');
                    mainNav.classList.add('py-6');
                }
            });
        }

        // --- Hero Slider ---
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.getElementById('slider-prev');
        const nextBtn = document.getElementById('slider-next');
        let currentIndex = 0;
        let autoSlideInterval;

        function showSlide(index) {
            if (slides.length === 0) return;
            slides.forEach((slide, i) => {
                slide.style.opacity = '0';
                slide.style.zIndex = '10';
            });
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].style.opacity = '1';
            slides[index].style.zIndex = '20';
            dots[index].classList.add('active');

            const animatedElements = slides[index].querySelectorAll('[class*="animate-"]');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 10);
            });

            currentIndex = index;
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        function startAutoSlide() {
            stopAutoSlide();
            if (slides.length > 1) {
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        const slider = document.getElementById('home-slider1');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
        
        showSlide(0);
        startAutoSlide();

        // --- Stats Counter Animation on Scroll ---
        const statsSection = document.querySelector('.stats-section');
        const statNumbers = document.querySelectorAll('.stat-number');
        let statsAnimated = false;

        const animateNumbers = () => {
            if (statsAnimated) return;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                let current = 0;
                const duration = 2000;
                const stepTime = 15;
                const increment = (target / (duration / stepTime));
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCounter();
            });
            statsAnimated = true;
        };

        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !statsAnimated) {
                        animateNumbers();
                    }
                });
            }, {
                threshold: 0.5
            });
            statsObserver.observe(statsSection);
        }

        // --- Room Cards Slider ---
        const roomSlider = document.querySelector('.room-slider');
        const roomPrevBtn = document.getElementById('room-prev-btn');
        const roomNextBtn = document.getElementById('room-next-btn');
        const roomCards = document.querySelectorAll('.room-slider > div');
        let roomAutoSlideInterval;
        const roomSlideIntervalTime = 5000;

        function getRoomScrollAmount() {
            if (!roomCards || roomCards.length === 0) return 0;
            const style = window.getComputedStyle(roomSlider);
            const gapMatch = style.gap.match(/(\d+)px/);
            const gap = gapMatch ? parseInt(gapMatch[1]) : 24; // Default gap
            const cardWidth = roomCards[0].offsetWidth;
            
            return cardWidth + gap;
        }

        function updateRoomButtons() {
            if (!roomSlider) return;
            roomPrevBtn.disabled = roomSlider.scrollLeft <= 0;
            roomNextBtn.disabled = roomSlider.scrollLeft >= (roomSlider.scrollWidth - roomSlider.clientWidth - 1);
        }

        function scrollToNextRoom() {
            if (!roomSlider) return;
            const scrollAmount = getRoomScrollAmount();
            if (roomSlider.scrollLeft >= roomSlider.scrollWidth - roomSlider.clientWidth - 1) {
                roomSlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                roomSlider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        function startRoomAutoSlide() {
            stopRoomAutoSlide();
            roomAutoSlideInterval = setInterval(scrollToNextRoom, roomSlideIntervalTime);
        }

        function stopRoomAutoSlide() {
            clearInterval(roomAutoSlideInterval);
        }

        if (roomNextBtn) {
            roomNextBtn.addEventListener('click', function() {
                stopRoomAutoSlide();
                scrollToNextRoom();
                startRoomAutoSlide();
            });
        }
        if (roomPrevBtn) {
            roomPrevBtn.addEventListener('click', function() {
                stopRoomAutoSlide();
                roomSlider.scrollBy({
                    left: -getRoomScrollAmount(),
                    behavior: 'smooth'
                });
                startRoomAutoSlide();
            });
        }
        if (roomSlider) {
            roomSlider.addEventListener('scroll', updateRoomButtons);
            roomSlider.addEventListener('mouseenter', stopRoomAutoSlide);
            roomSlider.addEventListener('mouseleave', startRoomAutoSlide);
        }
        window.addEventListener('resize', updateRoomButtons);
        updateRoomButtons();
        startRoomAutoSlide();



    
            // --- Why Choose Us Image Slider Modal ---
            const featureImageWrappers = document.querySelectorAll('.feature-image-wrapper');
            const imageSliderModal = document.getElementById('imageSliderModal');
            const closeSliderBtn = document.getElementById('closeSliderBtn');
            const modalSliderContent = document.getElementById('modal-slider-content');
            const modalSlides = modalSliderContent ? modalSliderContent.querySelectorAll('img') : [];
            const modalPrevBtn = document.getElementById('modal-prev-btn');
            const modalNextBtn = document.getElementById('modal-next-btn');

            let currentModalSlide = 0;
            const totalModalSlides = modalSlides.length;

            function showModalSlide(index) {
                modalSlides.forEach((slide, i) => {
                    slide.style.display = (i === index) ? 'block' : 'none';
                });
                currentModalSlide = index;
            }

            featureImageWrappers.forEach((wrapper, index) => {
                wrapper.addEventListener('click', () => {
                    currentModalSlide = index;
                    showModalSlide(currentModalSlide);
                    imageSliderModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                });
            });

            if (closeSliderBtn) {
                closeSliderBtn.addEventListener('click', () => {
                    imageSliderModal.classList.add('hidden');
                    document.body.style.overflow = '';
                });
            }

            if (modalNextBtn) {
                modalNextBtn.addEventListener('click', () => {
                    currentModalSlide = (currentModalSlide + 1) % totalModalSlides;
                    showModalSlide(currentModalSlide);
                });
            }
            if (modalPrevBtn) {
                modalPrevBtn.addEventListener('click', () => {
                    currentModalSlide = (currentModalSlide - 1 + totalModalSlides) % totalModalSlides;
                    showModalSlide(currentModalSlide);
                });
            }
            if (modalSlides.length > 0) {
                showModalSlide(0); // Initialize first modal slide
            }



        // --- Gallery Category Filtering ---
        const categoryButtons = document.querySelectorAll('#gallery button[data-category]');
        const galleryItems = document.querySelectorAll('.gallery-item');

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active-category', 'bg-amber-500', 'text-white'));
                this.classList.add('active-category', 'bg-amber-500', 'text-white');

                const selectedCategory = this.getAttribute('data-category');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // --- Gallery and "Why Choose Us" Image Modals ---
        setupModal('.view-image', '#imageModal', '#closeModal', '#modalImage', 'data-src');
        setupModal('.feature-image-wrapper', '#imageSliderModal', '#closeSliderBtn', '#modal-slider-content', null);
        
        function setupModal(triggerSelector, modalSelector, closeSelector, contentSelector, srcAttribute) {
            const triggers = document.querySelectorAll(triggerSelector);
            const modal = document.querySelector(modalSelector);
            const closeBtn = document.querySelector(closeSelector);
            const content = document.querySelector(contentSelector);
            
            if (!modal) return;

            triggers.forEach((trigger, index) => {
                trigger.addEventListener('click', () => {
                    if(srcAttribute) {
                       content.src = trigger.getAttribute(srcAttribute);
                    }
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                });
            });

            if(closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            modal.addEventListener('click', (e) => {
                if(e.target === modal) {
                    closeModal();
                }
            });
            
            function closeModal() {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
                if(srcAttribute) {
                    content.src = '';
                }
            }
        }
        
        // --- Client Slider ---
        const clientSlider = document.querySelector('.clients-slider');
        const clientPrevBtn = document.getElementById('client-prev-btn');
        const clientNextBtn = document.getElementById('client-next-btn');
        let clientAutoScrollInterval;

        function scrollClients(amount) {
            clientSlider.scrollBy({ left: amount, behavior: 'smooth' });
        }
        
        function startClientAutoScroll() {
            stopClientAutoScroll();
            clientAutoScrollInterval = setInterval(() => {
                if (clientSlider.scrollLeft >= (clientSlider.scrollWidth - clientSlider.clientWidth - 1)) {
                    clientSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollClients(200);
                }
            }, 3000);
        }

        function stopClientAutoScroll() {
            clearInterval(clientAutoScrollInterval);
        }

        if (clientSlider) {
            clientPrevBtn.addEventListener('click', () => { scrollClients(-200); });
            clientNextBtn.addEventListener('click', () => { scrollClients(200); });
            clientSlider.parentElement.addEventListener('mouseenter', stopClientAutoScroll);
            clientSlider.parentElement.addEventListener('mouseleave', startClientAutoScroll);
            startClientAutoScroll();
        }
    });