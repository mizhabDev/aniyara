let currentSort = 'name';
let currentPage = 1;

const searchInput = document.getElementById('searchInput');
const userListContainer = document.getElementById('userListContainer');
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

  //show the preloader when starting to fetch
  document.getElementById('preloader').style.display = 'flex';
  

  try {
    const response = await fetch(`/admin/customersFetch?page=${page}&sort=${sort}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.success) {
      renderCustomers(data.users);
      renderPagination(data.currentPage, data.totalPages);


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
    // Hide the preloder
    setTimeout(() => {
      document.getElementById('preloader').style.display = 'none';

    }, 500);
    
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

