document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const modalOverlay = document.getElementById('customer-modal');
    const editModal = document.getElementById('edit-customer-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    
    // Initialize Modals
    initViewModal();
    initEditModal();

    function initViewModal() {
        // View Modal Elements
        const closeButtons = document.querySelectorAll('.modal-close, .modal-footer .btn-secondary');
        const tabButtons = document.querySelectorAll('.tab-item');
        const editButton = document.querySelector('#customer-modal .btn-primary'); // Add this line
        const tabContents = document.querySelectorAll('.tab-content');

        // View Button Handlers
        viewButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const userId = this.getAttribute('data-id');
                const userData = await fetchUserDetails(userId);
                if (userData) {
                    modalOverlay.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    // Store userId for edit button
                    editButton.setAttribute('data-user-id', userId);
                }
            });
        });

        // Add Edit Button Handler
        editButton.addEventListener('click', async function() {
            const userId = this.getAttribute('data-user-id');
            if (userId) {
                // Close view modal
                closeModal(modalOverlay);
                
                // Get user data and open edit modal
                const userData = await fetchUserDetails(userId);
                if (userData) {
                    populateEditForm(userData);
                    editModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Close Handlers
        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(modalOverlay));
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal(modalOverlay);
        });

        // Tab Functionality
        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tabId = this.dataset.tab;
                switchTab(tabId);
            });
        });

       
    }

    function initEditModal() {
        // Edit Modal Elements
        const closeEditButtons = document.querySelectorAll('#edit-customer-modal .modal-close, #edit-customer-modal .cancel-edit');
        const editTabButtons = document.querySelectorAll('#edit-customer-modal .tab-item');
        const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
        const editCustomerForm = document.getElementById('edit-customer-form');

        // Edit Button Handlers
        editButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const userId = this.getAttribute('data-id');
                const userData = await fetchUserDetails(userId);
                if (userData) {
                    populateEditForm(userData);
                    editModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close Handlers
        closeEditButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(editModal));
        });

        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) closeModal(editModal);
        });

        // Tab Functionality
        editTabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tabId = this.dataset.tab;
                switchEditTab(tabId);
            });
        });

        // Same as Shipping Logic
        sameAsShippingCheckbox.addEventListener('change', handleShippingCheckbox);

        // Form Submission
        editCustomerForm.addEventListener('submit', handleFormSubmit());
    }

    function switchEditTab(tabId) {
        document.querySelectorAll('#edit-customer-modal .tab-item').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('#edit-customer-modal .tab-content').forEach(content => content.classList.remove('active'));
        document.querySelector(`#edit-customer-modal [data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    function handleShippingCheckbox() {
        const billingFields = document.querySelector('.billing-address-fields');
        const billingInputs = billingFields.querySelectorAll('input, select');
        billingFields.classList.toggle('disabled', this.checked);
        billingInputs.forEach(input => input.disabled = this.checked);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(e.target);
            const userId = document.querySelector('#edit-customer-modal .btn-primary').getAttribute('data-user-id');
            
            const response = await fetch(`/admin/customers/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (!response.ok) throw new Error('Failed to update customer');

            showNotification('Customer updated successfully!', 'success');
            closeModal(editModal);
            // Refresh the view modal if it's still open
            const userData = await fetchUserDetails(userId);
            if (userData) {
                updateModalWithUserData(userData);
            }
        } catch (error) {
            showNotification('Failed to update customer', 'error');
            console.error('Form submission error:', error);
        }
    }

    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Helper Functions
async function fetchUserDetails(userId) {
    try {
        showLoadingSkeleton();
        const response = await fetch(`/admin/customers/${userId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        
        const userData = await response.json();
        if (!userData) {
            throw new Error('No user data received');
        }

        hideLoadingSkeleton();
        updateModalWithUserData(userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user details:', error);
        showErrorState();
        return null;
    }
}

function populateEditForm(userData) {
    // Basic Info
    const [firstName, lastName] = (userData.name || '').split(' ');
    document.getElementById('firstName').value = firstName || '';
    document.getElementById('lastName').value = lastName || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('phone').value = userData.phone || '';
    document.getElementById('status').value = userData.status || 'active';

    // Address Info
    if (userData.shipping) {
        document.getElementById('shippingAddress1').value = userData.shipping.address1 || '';
        document.getElementById('shippingCity').value = userData.shipping.city || '';
        document.getElementById('shippingState').value = userData.shipping.state || '';
        document.getElementById('shippingZip').value = userData.shipping.zip || '';
    }

    // Billing Info
    if (userData.billing) {
        document.getElementById('billingAddress1').value = userData.billing.address1 || '';
        document.getElementById('billingCity').value = userData.billing.city || '';
        document.getElementById('billingState').value = userData.billing.state || '';
        document.getElementById('billingZip').value = userData.billing.zip || '';
    }
}

function updateModalWithUserData(userData) {
    // Update profile info
    const profileInfo = document.querySelector('.customer-profile-info');
    profileInfo.innerHTML = `
        <h3 class="customer-name">${userData.name || 'N/A'}</h3>
        <p class="customer-email">${userData.email || 'N/A'}</p>
        <p class="customer-joined">Joined: ${formatDate(userData.createdAt)}</p>
    `;

    // Update stats
    const stats = {
        totalOrders: userData.totalOrders || 0,
        totalSpent: formatCurrency(userData.totalSpent || 0),
        avgOrder: formatCurrency(calculateAverageOrder(userData.totalSpent, userData.totalOrders)),
        status: userData.status || 'Active'
    };

    Object.entries(stats).forEach(([key, value]) => {
        const statElement = document.getElementById(key);
        if (statElement) {
            statElement.textContent = value;
        }
    });

    // Update orders tab if exists
    if (userData.orders && userData.orders.length > 0) {
        updateOrdersList(userData.orders);
    }
}

function calculateAverageOrder(totalSpent, totalOrders) {
    return (totalSpent && totalOrders ? (totalSpent / totalOrders).toFixed(2) : '0.00');
}

function showLoadingSkeleton() {
    const skeletonHTML = `
        <div class="skeleton-loading">
            <div class="skeleton-item" style="height: 24px; width: 60%; margin-bottom: 12px;"></div>
            <div class="skeleton-item" style="height: 16px; width: 80%; margin-bottom: 8px;"></div>
            <div class="skeleton-item" style="height: 16px; width: 40%;"></div>
        </div>
    `;

    document.querySelector('.customer-profile-info').innerHTML = skeletonHTML;
    
    // Add loading state to stats
    document.querySelectorAll('.stat-value').forEach(stat => {
        stat.innerHTML = '<div class="skeleton-item" style="height: 20px;"></div>';
    });
}

function hideLoadingSkeleton() {
    document.querySelectorAll('.skeleton-loading').forEach(skeleton => {
        skeleton.remove();
    });
}

function showErrorState() {
    document.querySelector('.customer-profile-info').innerHTML = `
        <div class="error-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
            </svg>
            <p>Failed to load customer data</p>
        </div>
    `;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success' ? `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>` :
                `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line>`}
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function updateOrdersList(orders) {
    const orderList = document.querySelector('.order-list');
    if (!orderList) return;

    orderList.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">#${order.orderId}</span>
                <span class="order-date">${formatDate(order.date)}</span>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-total">${formatCurrency(order.total)}</div>
        </div>
    `).join('');
}