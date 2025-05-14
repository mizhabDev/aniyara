
// Modal functionality



document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('productModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');

    // Open modal
    openModalBtn.addEventListener('click', function () {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission
    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            stock: document.getElementById('product-stock').value,
            category: document.getElementById('product-category').value,
            description: document.getElementById('product-description').value,
            imageUrl: document.getElementById('image-url').value,
            imagePublicId: document.getElementById('image-public-id').value
        };

        console.log('Product data:', formData);

        // Check if any value is missing or empty
        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

        if (!allFieldsFilled) {
            Swal.fire({
                toast: true,                // Popup pole alla, corner toast pole varum
                position: 'top-end',        // Top-right = 'top-end'
                icon: 'warning',
                title: 'Some fields are missing!',
                text: 'Please fill all required fields.',
                background: '#1e1e1e',      // Dark background
                color: '#ffffff',           // Text white
                showConfirmButton: false,
                timer: 3000                 // 3 seconds
            });
        }


        else {
            console.log("✅ All fields are filled. Proceeding...");

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) throw new Error('Failed to create product line no 82-product.js')

                const result = await response.json();

                console.log('This is from product.js line no 86 product successfully created', result);

                // 🔥 Show Swal Success Toast
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added!',
                    text: 'Your product was added successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title',
                        htmlContainer: 'custom-swal-text'
                    }
                });
            } catch (error) {

                console.log('cannot add new product',error);
                showToast('error','Cannot add a new product')


            }

            // Here you would typically send this data to your server
            // After successful submission, close the modal
            closeModal();

            // Optional: Reset the form
            form.reset();
        };



    });



    // Edit modal functionality
    document.addEventListener('DOMContentLoaded', function () {
        // Get references to all edit buttons
        const editButtons = document.querySelectorAll('.product-card-actions .btn:not(.btn-danger)');
        const editModal = document.getElementById('editProductModal');
        const closeEditModalBtn = document.getElementById('closeEditModalBtn');
        const cancelEditModalBtn = document.getElementById('cancelEditModalBtn');
        const editForm = document.getElementById('edit-product-form');

        // Function to close the edit modal
        function closeEditModal() {
            editModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Attach event listeners to all edit buttons
        editButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Get the product card containing this button
                const productCard = this.closest('.product-card');

                // Extract product information
                const productName = productCard.querySelector('.product-card-title').textContent;
                const productPriceText = productCard.querySelector('.product-card-price').textContent;
                const productPrice = parseFloat(productPriceText.replace('$', ''));

                const stockText = productCard.querySelector('.product-card-stock').textContent;
                const stockMatch = stockText.match(/(\d+)/);
                const stockQuantity = stockMatch ? parseInt(stockMatch[1]) : 0;

                const productImage = productCard.querySelector('.product-card-img').src;

                // For demo purposes, we'll use a dummy ID - in reality, you'd get this from your data
                const productId = productCard.dataset.id || 'product-' + Math.floor(Math.random() * 1000);

                // Populate the edit form
                document.getElementById('edit-product-id').value = productId;
                document.getElementById('edit-product-name').value = productName;
                document.getElementById('edit-product-price').value = productPrice;
                document.getElementById('edit-product-stock').value = stockQuantity;

                // Set a default category if we don't have actual data
                // In a real app, you'd get this from your product data
                document.getElementById('edit-product-category').value = 'electronics';

                // Set description - in a real app, you'd populate this from your data
                document.getElementById('edit-product-description').value = 'Product description goes here...';

                // Set the current image
                document.getElementById('edit-product-image-preview').src = productImage;

                // Show the edit modal
                editModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal when clicking the close button
        closeEditModalBtn.addEventListener('click', closeEditModal);

        // Close modal when clicking the cancel button
        cancelEditModalBtn.addEventListener('click', closeEditModal);

        // Close when clicking outside the modal
        editModal.addEventListener('click', function (event) {
            if (event.target === editModal) {
                closeEditModal();
            }
        });

        // Image upload functionality for edit modal
        const editImageUpload = document.getElementById('edit-image-upload');
        editImageUpload.addEventListener('click', function () {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.click();

            fileInput.onchange = function () {
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const fileName = file.name;
                    document.querySelector('#edit-image-upload .upload-text').textContent = 'Selected: ' + fileName;

                    // Show preview of new image
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById('edit-product-image-preview').src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
        });

        // Form submission handling
        editForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = {
                id: document.getElementById('edit-product-id').value,
                name: document.getElementById('edit-product-name').value,
                price: document.getElementById('edit-product-price').value,
                stock: document.getElementById('edit-product-stock').value,
                category: document.getElementById('edit-product-category').value,
                description: document.getElementById('edit-product-description').value
            };

            try {
                const response = await fetch(`/products/edit/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const updatedProduct = await response.json();
                    console.log('Product updated in DB:', updatedProduct);

                    // 🥳 Show success toast
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Edited!',
                        text: 'Your product was successfully edited.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true,
                        position: 'top-end',
                        customClass: {
                            popup: 'custom-swal-popup',
                            title: 'custom-swal-title',
                            htmlContainer: 'custom-swal-text'
                        }
                    });

                    // Update frontend UI
                    const productCards = document.querySelectorAll('.product-card');
                    productCards.forEach(card => {
                        if (card.dataset.id === formData.id) {
                            card.querySelector('.product-card-title').textContent = formData.name;
                            card.querySelector('.product-card-price').textContent = '$' + parseFloat(formData.price).toFixed(2);
                            card.querySelector('.product-card-stock').textContent = 'In Stock: ' + formData.stock + ' units';
                        }
                    });

                    closeEditModal();
                } else {
                    console.error('Update failed');
                    Swal.fire('Oops!', 'Something went wrong while updating the product.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire('Oops!', 'Something went wrong.', 'error');
            }
        });

        // Delete functionality (with SweetAlert2 confirmation)
        document.querySelectorAll('.delete-product-btn').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.dataset.id;
                const productCard = this.closest('.product-card'); // Capture reference before 'this' changes

                Swal.fire({
                    title: 'Are you sure?',
                    text: "This product will be permanently deleted!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    background: '#fff',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Send DELETE request
                        fetch(`/admin/delete-product/${productId}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    // Success Toast
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Product Deleted!',
                                        text: 'Your product was deleted successfully.',
                                        showConfirmButton: false,
                                        timer: 2000,
                                        timerProgressBar: true,
                                        toast: true,
                                        position: 'bottom-end'
                                    });

                                    // Remove product card from DOM
                                    productCard.remove();
                                } else {
                                    // Error toast if deletion failed
                                    Swal.fire('Oops!', 'Failed to delete the product.', 'error');
                                }
                            })
                            .catch(error => {
                                console.error('Delete error:', error);
                                Swal.fire('Oops!', 'An error occurred while deleting.', 'error');
                            });
                    }
                });
            });
        });


    });
});


function showToast(type, message) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type, // 'success', 'error', 'warning'
      title: message,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });
  }