// This script handles the search functionality for the customer list page in the admin panel.
// It allows the admin to search for users by name or email and displays the results dynamically.
//
// It also includes a debounce function to optimize performance by limiting the number of API calls made during typing.
let currentSort = 'name';
let currentPage = 1;

const searchInput = document.getElementById('searchInput');
const userListContainer = document.getElementById('userListContainer');
const pagination = document.querySelector('.pagination');
const clearBtn = document.getElementById('clearBtn');


// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}



// fetching users

document.addEventListener('DOMContentLoaded', () => {
  // Get sort parameter from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  currentSort = urlParams.get('sort') || 'name';
  currentPage = parseInt(urlParams.get('page')) || 1;

  // Set the sort dropdown to match current sort
  const sortSelect = document.querySelector('select[name="sort"]');
  if (sortSelect) {
    sortSelect.value = currentSort;
  }

  // Fetch initial data
  fetchCustomers(currentPage, currentSort);

  // Add listeners for sort change
  sortSelect.addEventListener('change', function () {
    currentSort = this.value;
    fetchCustomers(1, currentSort); // Reset to page 1 when sort changes

    // Update URL without reloading page
    const url = new URL(window.location);
    url.searchParams.set('sort', currentSort);
    url.searchParams.set('page', 1);
    window.history.pushState({}, '', url);
  });
});

// Main function to fetch customers
async function fetchCustomers(page = 1, sort = 'name') {


  try {
    const response = await fetch(`/admin/customersFetch?page=${page}&sort=${sort}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success) {
      renderCustomers(data.users);
      // renderPagination(data.currentPage, data.totalPages);


    } else {
      console.error('Error fetching customers:', data);
    }
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    userListContainer.innerHTML = `
            <div class="error-message">
                Failed to load customers. Please try again.
           <button onclick="fetchCustomers(${page}, '${sort}')">Retry</button>
            </div>
        `;
  } finally {

  }
}

// Render customer cards
function renderCustomers(users) {
  userListContainer.innerHTML = '';

  if (users.length === 0) {
    userListContainer.innerHTML = '<div class="no-results">No customers found</div>';
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('customer-card');
    card.innerHTML = `
          <img src="/api/placeholder/60/60" alt="Customer" class="customer-avatar">
          <div class="customer-info">
            <h3 class="customer-name">${user.name}</h3>
            <div class="customer-email">${user.email}</div>
            <div class="customer-stats">
              <div>Total Orders: ${user.totalOrders || 0}</div>
              <div>Total Spent: $${(user.totalSpent || 0).toFixed(2)}</div>
              <div>Member Since: ${new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div class="customer-actions">
            <button type="button" class="btn btn-sm view-btn" data-id="${user._id}">View</button>
            <button class="btn btn-sm btn-secondary edit-btn" data-id="${user._id}">Edit</button>
          </div>
        `;

    userListContainer.appendChild(card);
  });


}


// Search function with pagination support

const handleSearch = async (page = 1) => {
  const query = searchInput.value.trim();
  clearBtn.style.display = query ? 'block' : 'none';

  if (query) {
    // Update current page
    currentPage = page;

    // Show loading skeletons
    userListContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const skeleton = document.createElement('div');
      skeleton.classList.add('skeleton-card');
      skeleton.innerHTML = `
        <div class="skeleton skeleton-avatar"></div>
        <div style="flex: 1">
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line short"></div>
          <div class="skeleton skeleton-line"></div>
        </div>
      `;
      userListContainer.appendChild(skeleton);
    }

    try {
      // Use the currentPage and currentSort variables
      const res = await fetch(`/admin/search-users?query=${encodeURIComponent(query)}&page=${currentPage}&sort=${currentSort}`);

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Search response:", data);

      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      const users = data.users || [];

      // Clear skeletons
      userListContainer.innerHTML = users.length ? '' : '<div class="no-results">No users found</div>';

      // Render user cards
      users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('customer-card');
        card.innerHTML = `
          <img src="/api/placeholder/60/60" alt="Customer" class="customer-avatar">
          <div class="customer-info">
            <h3 class="customer-name">${user.name}</h3>
            <div class="customer-email">${user.email}</div>
            <div class="customer-stats">
              <div>Total Orders: ${user.totalOrders || 0}</div>
              <div>Total Spent: $${(user.totalSpent || 0).toFixed(2)}</div>
              <div>Member Since: ${new Date(user.createdAt).toDateString()}</div>
            </div>
          </div>
          <div class="customer-actions">
            <button type="button" class="btn btn-sm view-btn" data-id="${user._id}">View</button>
            <button class="btn btn-sm btn-secondary edit-btn" data-id="${user._id}">Edit</button>
          </div>
        `;
        userListContainer.appendChild(card);
      });

      // Render pagination
      renderPagination(data.currentPage, data.totalPages, query);

    } catch (err) {
      console.error('Error fetching users:', err);
      userListContainer.innerHTML = '<p>Error loading users. Please try again.</p>';

      // Hide pagination on error
      if (pagination) {
        pagination.style.display = 'none';
      }
    }
  } else {
    if (pagination) {
      pagination.style.display = "";
    }
    window.location.reload();
  }
};

// Function to handle pagination clicks for search results
function handlePageChange(page, query) {
  currentPage = page;

  // If there's an active search, use the search function
  if (query && query.trim() !== '') {
    handleSearch(page);
  } else {
    // Otherwise fall back to regular customer list
    fetchCustomers(page, currentSort);
  }
}



// Attach debounced version of search
searchInput.addEventListener('input', debounce(handleSearch, 300));

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  window.location.reload(); // Show all users again
});



// edit & view button configaration
document.getElementById('userListContainer').addEventListener('click', async (event) => {
  const target = event.target;

  if (target.classList.contains('view-btn')) {
    const userId = target.dataset.id;
    handleViewCustomer(userId);
  }

  if (target.classList.contains('edit-btn')) {
    const userId = target.dataset.id;
    handleEditCustomer(userId);
  }
});


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





