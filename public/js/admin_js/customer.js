
// view Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all view buttons
    const viewButtons = document.querySelectorAll('.customer-actions .btn:first-child');
    const modalOverlay = document.getElementById('customer-modal');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-footer .btn-secondary');

    // Open modal when view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling again
        });
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});


// edit modal functionality 
document.addEventListener('DOMContentLoaded', function () {
    // Edit button functionality - opens edit modal
    const editButtons = document.querySelectorAll('.customer-actions .btn-secondary');
    const editButtonsInViewModal = document.querySelectorAll('.modal-footer .btn-primary');
    const editModal = document.getElementById('edit-customer-modal');
    const closeEditButtons = document.querySelectorAll('#edit-customer-modal .modal-close, #edit-customer-modal .cancel-edit');

    // Function to open edit modal
    function openEditModal() {
        // Close view modal if it's open
        const viewModal = document.getElementById('customer-modal');
        if (viewModal) {
            viewModal.style.display = 'none';
        }
        // Open edit modal
        editModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Open edit modal from customer cards
    editButtons.forEach(button => {
        button.addEventListener('click', openEditModal);
    });

    // Open edit modal from view modal
    editButtonsInViewModal.forEach(button => {
        if (button.textContent.trim() === 'Edit Customer') {
            button.addEventListener('click', openEditModal);
        }
    });

    // Close edit modal
    closeEditButtons.forEach(button => {
        button.addEventListener('click', function () {
            editModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Close edit modal when clicking outside
    editModal.addEventListener('click', function (e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Tab functionality for edit modal
    const editTabButtons = document.querySelectorAll('#edit-customer-modal .tab-item');
    const editTabContents = document.querySelectorAll('#edit-customer-modal .tab-content');

    editTabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all tabs
            editTabButtons.forEach(btn => btn.classList.remove('active'));
            editTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Same as shipping checkbox functionality
    const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
    const billingFields = document.querySelector('.billing-address-fields');

    sameAsShippingCheckbox.addEventListener('change', function () {
        const billingInputs = billingFields.querySelectorAll('input, select');

        if (this.checked) {
            billingFields.classList.add('disabled');
            billingInputs.forEach(input => {
                input.disabled = true;
            });
        } else {
            billingFields.classList.remove('disabled');
            billingInputs.forEach(input => {
                input.disabled = false;
            });
        }
    });

    // Form submission
    const editCustomerForm = document.getElementById('edit-customer-form');

    editCustomerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Here you would normally process the form data
        // For demo purposes, we'll just close the modal with a success message

        // Show success notification (you could add this to your HTML)
        const successMessage = document.createElement('div');
        successMessage.className = 'notification success';
        successMessage.innerHTML = `
      <div class="notification-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Customer updated successfully!</span>
      </div>
      <button class="notification-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

        document.body.appendChild(successMessage);

        // Auto remove after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);

        // Close the modal
        editModal.style.display = 'none';
        document.body.style.overflow = '';
    });
});


