// This script handles the search functionality for the customer list page in the admin panel.
// It allows the admin to search for users by name or email and displays the results dynamically.
//
// It also includes a debounce function to optimize performance by limiting the number of API calls made during typing.


const searchInput = document.getElementById('searchInput');
const userListContainer = document.querySelector('.customers-content');
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

// Search function
const handleSearch = async () => {
  const query = searchInput.value.trim();
  clearBtn.style.display = query ? 'block' : 'none';

  if (query !== "") {
    pagination.style.display = "none";

    try {
      const res = await fetch(`/admin/search-users?query=${encodeURIComponent(query)}`);
      const users = await res.json();

      // Clear old cards
      userListContainer.innerHTML = '';

      // Render new cards
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

        document.addEventListener('click', function (e) {
          openViewModal(e);
          openEditModal(e);
        });
        



        userListContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  } else {
    pagination.style.display = "";
    window.location.reload();
  }
};

// Attach debounced version of search
searchInput.addEventListener('input', debounce(handleSearch, 300));

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  window.location.reload(); // Show all users again
});



// Add event listeners to the newly created buttons

card.querySelector(".view-btn").addEventListener("click", () => {
  const id = user._id;
  // Add your view logic here
  console.log("View clicked for user:", id);
  // For example: openViewModal(id);
});

card.querySelector(".edit-btn").addEventListener("click", () => {
  const id = user._id;
  // Add your edit logic here
  console.log("Edit clicked for user:", id);
  // For example: openEditModal(id);
});



// Event listener for the "View" button in the user list




// async function openViewModal(e) {
//   if (e.target.classList.contains("view-btn")) {
//     const userId = e.target.getAttribute("data-id");

//     try {
//       const res = await fetch(`/admin/customers/${userId}`);
//       const user = await res.json();

//       // Fill modal fields
//       document.getElementById('view-name').textContent = user.name;
//       document.getElementById('view-email').textContent = user.email;
//       document.getElementById('view-phone').textContent = user.phone;
//       document.getElementById('view-created').textContent = new Date(user.createdAt).toLocaleDateString();
//       document.getElementById('view-status').textContent = user.status ? 'Blocked' : 'Active';

//       // Show the modal
//       document.getElementById('viewModal').style.display = 'flex';
//     } catch (err) {
//       console.error('Error fetching user:', err);
//     }
//   }
// }








async function openViewModal(e) {
  if (e.target && e.target.classList && e.target.classList.contains("view-btn")) {
    const userId = e.target.getAttribute("data-id");

    try {
      const res = await fetch(`/admin/customers/${userId}`);
      const user = await res.json();

      // Fill modal fields
      document.getElementById('view-name').textContent = user.name;
      document.getElementById('view-email').textContent = user.email;
      document.getElementById('view-phone').textContent = user.phone;
      document.getElementById('view-created').textContent = new Date(user.createdAt).toLocaleDateString();
      document.getElementById('view-status').textContent = user.status ? 'Blocked' : 'Active';

      // Show the modal
      document.getElementById('viewModal').style.display = 'flex';
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }
}

async function openEditModal(e) {
  if (e.target && e.target.classList.contains('edit-btn')) {
    const userId = e.target.getAttribute('data-id');

    try {
      const res = await fetch(`/admin/customers/${userId}`);
      const user = await res.json();

      // Fill the modal fields
      document.getElementById('edit-name').textContent = user.name;
      document.getElementById('edit-email').textContent = user.email;

      const blockBtn = document.getElementById('block-unblock-btn');
      blockBtn.textContent = user.isBlocked ? 'Unblock' : 'Block';
      blockBtn.setAttribute('data-id', user._id);
      blockBtn.setAttribute('data-status', user.isBlocked);

      // Show the modal
      document.getElementById('editModal').style.display = 'flex';
    } catch (err) {
      console.error('Error fetching user for edit:', err);
    }
  }
}
