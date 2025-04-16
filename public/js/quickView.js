document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const closeBtn = modal.querySelector('.close');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.product-card');
            const image = card.querySelector('.product-image img').src;
            const title = card.querySelector('.product-title').textContent;
            const price = card.querySelector('.product-price').textContent;

            document.getElementById('modalImage').src = image;
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalPrice').textContent = price;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Quantity controls
    const minusBtn = modal.querySelector('.minus');
    const plusBtn = modal.querySelector('.plus');
    const quantityInput = modal.querySelector('.quantity input');

    minusBtn.addEventListener('click', () => {
        const value = parseInt(quantityInput.value);
        if (value > 1) quantityInput.value = value - 1;
    });

    plusBtn.addEventListener('click', () => {
        const value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
});