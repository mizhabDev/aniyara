const pagination = document.querySelector('.pagination');

// Dynamic pagination component for search results



function renderPagination(currentPage, totalPages, query) {
    // If pagination element doesn't exist, don't try to render
    if (!pagination) return;

    // Clear existing pagination
    pagination.innerHTML = '';

    // Don't render pagination if there's only one page
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = '';

    // Previous page button
    if (currentPage > 1) {
        const prevBtn = document.createElement('a');
        prevBtn.href = "javascript:void(0)";
        prevBtn.classList.add('pagination-item');
        prevBtn.innerHTML = '&lt;';
        prevBtn.addEventListener('click', () => handlePageChange(currentPage - 1, query));
        pagination.appendChild(prevBtn);
    }

    // First page
    if (currentPage > 2) {
        const firstPage = document.createElement('a');
        firstPage.href = "javascript:void(0)";
        firstPage.classList.add('pagination-item');
        firstPage.textContent = '1';
        firstPage.addEventListener('click', () => handlePageChange(1, query));
        pagination.appendChild(firstPage);

        // Add ellipsis if needed
        if (currentPage > 3) {
            const ellipsis = document.createElement('span');
            ellipsis.classList.add('pagination-item');
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }

    // Page before current (if it exists)
    if (currentPage > 1) {
        const prevPage = document.createElement('a');
        prevPage.href = "javascript:void(0)";
        prevPage.classList.add('pagination-item');
        prevPage.textContent = currentPage - 1;
        prevPage.addEventListener('click', () => handlePageChange(currentPage - 1, query));
        pagination.appendChild(prevPage);
    }

    // Current page
    const currentPageEl = document.createElement('span');
    currentPageEl.classList.add('pagination-item', 'active');
    currentPageEl.textContent = currentPage;
    pagination.appendChild(currentPageEl);

    // Page after current (if it exists)
    if (currentPage < totalPages) {
        const nextPage = document.createElement('a');
        nextPage.href = "javascript:void(0)";
        nextPage.classList.add('pagination-item');
        nextPage.textContent = currentPage + 1;
        nextPage.addEventListener('click', () => handlePageChange(currentPage + 1, query));
        pagination.appendChild(nextPage);
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
        const ellipsis = document.createElement('span');
        ellipsis.classList.add('pagination-item');
        ellipsis.textContent = '...';
        pagination.appendChild(ellipsis);
    }

    // Last page (if not current or next page)
    if (currentPage < totalPages - 1) {
        const lastPage = document.createElement('a');
        lastPage.href = "javascript:void(0)";
        lastPage.classList.add('pagination-item');
        lastPage.textContent = totalPages;
        lastPage.addEventListener('click', () => handlePageChange(totalPages, query));
        pagination.appendChild(lastPage);
    }

    // Next page button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('a');
        nextBtn.href = "javascript:void(0)";
        nextBtn.classList.add('pagination-item');
        nextBtn.innerHTML = '&gt;';
        nextBtn.addEventListener('click', () => handlePageChange(currentPage + 1, query));
        pagination.appendChild(nextBtn);
    }
}