


console.log("this from modal.js");



function add(a, b, c) {
    return a + b + c;
  }
  
  const nums = [1, 2, 3];
  console.log(add(nums));  // 6
  


/* Modal Styles */


.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    display: flex;
    /* Hidden by default, JS will show it */
  }
  
  .modal-container {
    background-color: var(--white);
    border-radius: 8px;
    width: 750px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border);
  }
  
  .modal-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0;
  }
  
  .modal-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xs);
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .modal-close:hover {
    background-color: var(--gray-light);
    color: var(--dark);
  }
  
  .modal-content {
    padding: var(--spacing-lg);
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border);
  }
  
  /* Customer Profile */
  .customer-profile {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .customer-profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: var(--spacing-lg);
  }
  
  .customer-profile-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 var(--spacing-xs) 0;
  }
  
  .customer-profile-email {
    font-size: 0.875rem;
    color: var(--secondary);
    margin-bottom: var(--spacing-xs);
  }
  
  .customer-profile-since {
    font-size: 0.813rem;
    color: var(--gray);
  }
  
  /* Stats Card */
  .customer-stats-card {
    display: flex;
    background-color: var(--gray-light);
    border-radius: 8px;
    margin-bottom: var(--spacing-lg);
    overflow: hidden;
  }
  
  .stat-item {
    flex: 1;
    padding: var(--spacing-md);
    text-align: center;
    border-right: 1px solid var(--border);
  }
  
  .stat-item:last-child {
    border-right: none;
  }
  
  .stat-value {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: var(--spacing-xs);
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: var(--secondary);
  }
  
  /* Tabs */
  .tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--spacing-lg);
  }
  
  .tab-item {
    padding: var(--spacing-md) var(--spacing-lg);
    border: none;
    background: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--secondary);
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }
  
  .tab-item.active {
    color: var(--primary);
  }
  
  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
  }
  
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }
  
  /* Orders Tab */
  .order-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .order-item {
    background-color: var(--gray-light);
    border-radius: 6px;
    padding: var(--spacing-md);
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
  }
  
  .order-id {
    font-weight: 600;
    color: var(--dark);
  }
  
  .order-date {
    color: var(--secondary);
    font-size: 0.813rem;
  }
  
  .order-status {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 12px;
  }
  
  .order-status.completed {
    background-color: #DCFCE7;
    color: #16A34A;
  }
  
  .order-status.processing {
    background-color: #FEF3C7;
    color: #D97706;
  }
  
  .order-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.813rem;
    color: var(--secondary);
  }
  
  .order-total {
    font-weight: 500;
    color: var(--dark);
  }
  
  .view-more {
    text-align: center;
    margin-top: var(--spacing-md);
  }
  
  .view-more a {
    color: var(--primary);
    font-size: 0.875rem;
    text-decoration: none;
  }
  
  /* Details Tab */
  .info-section {
    margin-bottom: var(--spacing-lg);
  }
  
  .info-section h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: var(--spacing-md);
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
  
  .info-row {
    display: flex;
    flex-direction: column;
  }
  
  .info-label {
    font-size: 0.75rem;
    color: var(--secondary);
    margin-bottom: 4px;
  }
  
  .info-value {
    font-size: 0.875rem;
    color: var(--dark);
  }
  
  .address p {
    font-size: 0.875rem;
    color: var(--dark);
    margin: 0 0 4px 0;
  }
  
  /* Notes Tab */
  .notes-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }
  
  .note-item {
    background-color: var(--gray-light);
    border-radius: 6px;
    padding: var(--spacing-md);
  }
  
  .note-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
  }
  
  .note-author {
    font-weight: 500;
    color: var(--dark);
    font-size: 0.813rem;
  }
  
  .note-date {
    color: var(--secondary);
    font-size: 0.75rem;
  }
  
  .note-content {
    font-size: 0.875rem;
    color: var(--dark);
    line-height: 1.4;
  }
  
  .add-note h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: var(--spacing-sm);
  }
  
  .add-note textarea {
    width: 100%;
    height: 100px;
    padding: var(--spacing-md);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 0.875rem;
    margin-bottom: var(--spacing-md);
    resize: vertical;
    font-family: var(--font-family);
  }
  
  .add-note textarea:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  /* Button Styling (Already in your CSS but adding specifics for modal) */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  .btn-primary {
    background-color: var(--primary);
    color: var(--white);
  }
  
  .btn-primary:hover {
    background-color: #1D4ED8;
  }
  
  .btn-secondary {
    background-color: var(--white);
    border: 1px solid var(--border);
    color: var(--secondary);
  }
  
  .btn-secondary:hover {
    background-color: var(--gray-light);
  }
  
  /* edit .modal */
  
  /* Edit Modal Styles (in addition to the view modal styles) */
  .modal-container {
    max-height: 90vh;
    overflow-y: auto;
  }
  
  /* Form Header */
  .form-header {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .customer-avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .customer-avatar-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--spacing-md);
  }
  
  .avatar-upload-actions {
    display: flex;
    gap: var(--spacing-md);
  }
  
  /* Form Sections */
  .form-section {
    background-color: var(--white);
    border-radius: 8px;
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    border: 1px solid var(--border);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .form-section h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 var(--spacing-md) 0;
  }
  
  /* Form Grid */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
  
  .full-width {
    grid-column: span 2;
  }
  
  /* Form Elements */
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-size: 0.813rem;
    font-weight: 500;
    color: var(--secondary);
    margin-bottom: var(--spacing-xs);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: var(--spacing-md);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 0.875rem;
    color: var(--dark);
    font-family: var(--font-family);
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  /* Disabled Form Fields */
  .disabled input,
  .disabled select {
    background-color: var(--gray-light);
    cursor: not-allowed;
  }
  
  /* Address Actions */
  .address-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
  
  .checkbox-wrapper label {
    font-size: 0.813rem;
    color: var(--secondary);
    cursor: pointer;
  }
  
  /* Toggle Switch */
  .toggle-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .toggle-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-label {
    font-size: 0.875rem;
    color: var(--dark);
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--gray);
    border-radius: 24px;
    transition: .3s;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: var(--white);
    border-radius: 50%;
    transition: .3s;
  }
  
  input:checked+.toggle-slider {
    background-color: var(--primary);
  }
  
  input:checked+.toggle-slider:before {
    transform: translateX(24px);
  }
  
  /* Danger Zone */
  .danger-zone {
    border-color: #FCA5A5;
  }
  
  .danger-zone h3 {
    color: #DC2626;
  }
  
  .danger-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .btn-outline-danger {
    background-color: transparent;
    border: 1px solid #DC2626;
    color: #DC2626;
  }
  
  .btn-outline-danger:hover {
    background-color: #FEE2E2;
  }
  
  .danger-note {
    font-size: 0.813rem;
    color: #DC2626;
    margin: 0;
  }
  
  /* Button Icon */
  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background-color: var(--white);
    color: var(--secondary);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-icon:hover {
    background-color: var(--gray-light);
    color: var(--dark);
  }
  
  .btn-danger {
    background-color: #DC2626;
    color: var(--white);
    border: none;
  }
  
  .btn-danger:hover {
    background-color: #B91C1C;
  }
  
  /* Ensure our edit tabs extend full width */
  .edit-tabs {
    display: flex;
    width: 100%;
  }
  
  .edit-tabs .tab-item {
    flex: 1;
    text-align: center;
  }
  
  /* Loading Skeleton */
  .loading-state {
    text-align: center;
    padding: 2rem;
  }
  
  
  .error-state {
    text-align: center;
    padding: 2rem;
    color: #ef4444;
  }
  
  .error-state svg {
    margin-bottom: 1rem;
  }
  
  .skeleton-loading {
    padding: 1rem;
  }
  
  .skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
  
    100% {
      background-position: -200% 0;
    }
  }
  
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  }
  
  .notification.success {
    border-left: 4px solid #22c55e;
  }
  
  .notification.error {
    border-left: 4px solid #ef4444;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
  
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .customer-profile-info {
    padding: 16px;
  }
  
  .customer-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .customer-email {
    color: #666;
    margin-bottom: 4px;
  }
  
  .customer-joined {
    font-size: 0.875rem;
    color: #888;
  }



























document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const modalOverlay = document.getElementById('customer-modal');
    const editModal = document.getElementById('edit-customer-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    
    // Initialize Modals
    initViewModal();
    initEditModal();

    // View Modal Functions
    function initViewModal() {
        const closeButtons = document.querySelectorAll('.modal-close, .modal-footer .btn-secondary');
        const tabButtons = document.querySelectorAll('.tab-item');
        const tabContents = document.querySelectorAll('.tab-content');

        // Event Listeners
        viewButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const userId = this.getAttribute('data-id');
                await fetchAndDisplayUserDetails(userId);
                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(modalOverlay));
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal(modalOverlay);
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', () => switchTab(button.dataset.tab));
        });
    }

    // Edit Modal Functions
    function initEditModal() {
        const closeEditButtons = document.querySelectorAll('#edit-customer-modal .modal-close, #edit-customer-modal .cancel-edit');
        const editTabButtons = document.querySelectorAll('#edit-customer-modal .tab-item');
        const editCustomerForm = document.getElementById('edit-customer-form');

        editButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const userId = this.getAttribute('data-id');
                const userData = await fetchAndDisplayUserDetails(userId);
                if (userData) {
                    populateEditForm(userData);
                    editModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeEditButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(editModal));
        });

        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) closeModal(editModal);
        });

        editCustomerForm?.addEventListener('submit', handleFormSubmit);
    }

    // Helper Functions
    async function fetchAndDisplayUserDetails(userId) {
        try {
            showLoadingSkeleton();
            const response = await fetch(`/admin/customers/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user details');
            
            const userData = await response.json();
            if (!userData) throw new Error('No user data received');

            updateModalWithUserData(userData);
            return userData;
        } catch (error) {
            console.error('Error:', error);
            showErrorState();
            return null;
        } finally {
            hideLoadingSkeleton();
        }
    }

    function updateModalWithUserData(userData) {
        const profileInfo = document.querySelector('.customer-profile-info');
        if (!profileInfo) return;

        profileInfo.innerHTML = `
            <h3 class="customer-name">${userData.name || 'N/A'}</h3>
            <p class="customer-email">${userData.email || 'N/A'}</p>
            <p class="customer-joined">Joined: ${formatDate(userData.createdAt)}</p>
        `;

        updateStats(userData);
        updateOrdersList(userData.orders);
    }

    function updateStats(userData) {
        const stats = {
            totalOrders: userData.totalOrders || 0,
            totalSpent: formatCurrency(userData.totalSpent || 0),
            avgOrder: formatCurrency(calculateAverageOrder(userData.totalSpent, userData.totalOrders)),
            status: userData.status || 'Active'
        };

        Object.entries(stats).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) element.textContent = value;
        });
    }

    // UI State Functions
    function showLoadingSkeleton() {
        const skeletonHTML = `
            <div class="skeleton-loading">
                <div class="skeleton-item" style="height: 24px; width: 60%"></div>
                <div class="skeleton-item" style="height: 16px; width: 80%"></div>
                <div class="skeleton-item" style="height: 16px; width: 40%"></div>
            </div>
        `;
        
        document.querySelector('.customer-profile-info').innerHTML = skeletonHTML;
        document.querySelectorAll('.stat-value').forEach(stat => {
            stat.innerHTML = '<div class="skeleton-item" style="height: 20px;"></div>';
        });
    }

    function hideLoadingSkeleton() {
        document.querySelectorAll('.skeleton-loading').forEach(el => el.remove());
    }

    function showErrorState() {
        const errorHTML = `
            <div class="error-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Failed to load customer data</p>
            </div>
        `;
        document.querySelector('.customer-profile-info').innerHTML = errorHTML;
    }

    // Utility Functions
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function switchTab(tabId) {
        const tabButtons = document.querySelectorAll('.tab-item');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`${tabId}-tab`);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
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
        }).format(amount || 0);
    }

    function calculateAverageOrder(totalSpent, totalOrders) {
        return totalOrders > 0 ? totalSpent / totalOrders : 0;
    }
});