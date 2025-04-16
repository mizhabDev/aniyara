document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove all classes first
        slides.forEach(slide => {
            slide.classList.remove('active', 'previous');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add previous class to current slide
        slides[currentSlide].classList.add('previous');

        // Update current slide index
        currentSlide = (index + slides.length) % slides.length;

        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add click events to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();

    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopSlideshow);
    carousel.addEventListener('mouseleave', startSlideshow);

    // Add control buttons functionality
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        showSlide(currentSlide - 1);
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        showSlide(currentSlide + 1);
        startSlideshow();
    });

    // Quick View functionality
    function initializeQuickView() {
        const modal = document.getElementById('quickViewModal');
        const closeBtn = modal.querySelector('.close');
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');

        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.product-card');
                
                // Get product details
                const image = card.querySelector('.product-image img').src;
                const title = card.querySelector('.product-title').textContent;
                const price = card.querySelector('.product-price').textContent;

                // Update modal content
                document.getElementById('modalImage').src = image;
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalPrice').textContent = price;

                // Show modal
                modal.style.display = 'block';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close modal when clicking X
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Add wishlist functionality
        const wishlistBtn = modal.querySelector('.modal-wishlist');
        wishlistBtn.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.classList.add('active');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.classList.remove('active');
            }
        });

        // Add quantity controls
        const minusBtn = modal.querySelector('.minus');
        const plusBtn = modal.querySelector('.plus');
        const quantityInput = modal.querySelector('.quantity input');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

    initializeQuickView();
});