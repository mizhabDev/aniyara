document.addEventListener('DOMContentLoaded', function() {
    // Get all carousel elements
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to update slides and indicators
    function updateSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Event listeners for next/prev buttons
    nextButton.addEventListener('click', () => {
        updateSlide(currentSlide + 1);
    });

    prevButton.addEventListener('click', () => {
        updateSlide(currentSlide - 1);
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
        });
    });

    // Auto-advance slides
    function autoAdvance() {
        updateSlide(currentSlide + 1);
    }

    let slideInterval = setInterval(autoAdvance, 5000);

    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoAdvance, 5000);
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