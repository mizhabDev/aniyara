
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

                console.log('cannot add new product', error);
                showToast('error', 'Cannot add a new product')


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



// cloudinary handling 

document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const uploadContainer = document.getElementById('upload-container');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const imageName = document.getElementById('image-name');
    const removeImage = document.getElementById('remove-image');
    const fileInput = document.getElementById('product-image');
    const imageUrlInput = document.getElementById('product-image-url');
    const progressBar = document.querySelector('.progress-bar');
    const uploadError = document.querySelector('.upload-error');
    const uploadSuccess = document.querySelector('.upload-success');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addProductForm = document.getElementById('add-product-form');

    // Track uploaded image info
    let uploadedImageInfo = null;

    // Show upload container initially, hide preview
    previewContainer.style.display = 'none';
    uploadError.style.display = 'none';
    uploadSuccess.style.display = 'none';


    // Handle click on upload container
    uploadContainer.addEventListener('click', function () {
        fileInput.click();
    });

    // Handle drag and drop events
    uploadContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadContainer.classList.add('dragover');
    });

    uploadContainer.addEventListener('dragleave', function () {
        uploadContainer.classList.remove('dragover');
    });

    uploadContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadContainer.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    // Handle file selection
    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            handleFileSelect(this.files[0]);
        }
    });

    // Handle remove image button
    removeImage.addEventListener('click', function (e) {
        e.preventDefault();

        // Delete from Cloudinary if public_id is available
        if (uploadedImageInfo && uploadedImageInfo.public_id) {
            deleteFromCloudinary(uploadedImageInfo.public_id);
        }

        // Reset the upload interface
        resetImageUpload();
    });

    // Handle cancel modal button
    cancelModalBtn.addEventListener('click', function () {
        // Delete from Cloudinary if we've uploaded something
        if (uploadedImageInfo && uploadedImageInfo.public_id) {
            deleteFromCloudinary(uploadedImageInfo.public_id);
        }

        resetImageUpload();
        closeModal();
    });

    // Handle close modal button
    closeModalBtn.addEventListener('click', function () {
        // Same as cancel - delete and close
        if (uploadedImageInfo && uploadedImageInfo.public_id) {
            deleteFromCloudinary(uploadedImageInfo.public_id);
        }

        resetImageUpload();
        closeModal();
    });

    // Reset form when modal is closed or canceled
    function resetImageUpload() {
        fileInput.value = '';
        imageUrlInput.value = '';
        uploadedImageInfo = null;
        previewContainer.style.display = 'none';
        uploadContainer.style.display = 'block';
        uploadContainer.querySelector('.upload-icon').style.display = 'block';
        uploadContainer.querySelector('.upload-text').style.display = 'block';
        uploadContainer.querySelector('.upload-progress').style.display = 'none';
        progressBar.style.width = '0%';

        // Log reset
        console.log('Image upload reset');
    }

    function closeModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Handle file selection and upload to Cloudinary
    function handleFileSelect(file) {
        // Display file name
        imageName.textContent = file.name;

        // Validate file type
        if (!file.type.match('image.*')) {
            showError('Please select an image file');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Show upload progress
        uploadContainer.querySelector('.upload-icon').style.display = 'none';
        uploadContainer.querySelector('.upload-text').style.display = 'none';
        uploadContainer.querySelector('.upload-progress').style.display = 'block';
        simulateProgress(); // For visual feedback during upload

        // Upload to Cloudinary
        uploadToCloudinary(file);
    }

    function uploadToCloudinary(file) {
        // Create form data - using 'image' field name to match backend
        const formData = new FormData();
        formData.append('image', file);

        // Send to server endpoint that handles Cloudinary upload
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload response this :', data);

                // Store upload info for potential deletion
                uploadedImageInfo = {
                    url: data.imageUrl || data.secure_url,
                    public_id: data.public_id
                };

                document.querySelector('#image-url').value = data.imageUrl;
                document.querySelector('#image-public-id').value = data.public_id;


                // Show success message
                uploadSuccess.style.display = 'block';
                setTimeout(() => {
                    // Hide upload container, show preview container
                    uploadContainer.style.display = 'none';
                    previewContainer.style.display = 'flex';
                    // Reset progress bar and messages
                    progressBar.style.width = '0%';
                    uploadSuccess.style.display = 'none';
                }, 1000);

                // After successful image upload

            })
            .catch(error => {
                console.error('Error:', error);
                showError('Failed to upload image. Please try again.');
                resetImageUpload();
            });
    }



    function deleteFromCloudinary(publicId) {
        console.log('Deleting from Cloudinary, public_id:', publicId);

        if (!publicId) {
            console.warn('No public_id provided for deletion');
            return;
        }

        // Send the public_id as is - let the server handle the format
        fetch(`/api/upload/delete/${encodeURIComponent(publicId)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Image deleted from Cloudinary:', data);
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
    }


    function showError(message) {
        uploadError.textContent = message;
        uploadError.style.display = 'block';
        setTimeout(() => {
            uploadError.style.display = 'none';
        }, 3000);
    }

    // For simulating upload progress for visual feedback
    function simulateProgress() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 5;
                progressBar.style.width = width + '%';
            }
        }, 100);
    }

    // Handle form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', function (e) {
            // Don't prevent default as we want the form to submit normally
            // Just reset uploadedImageInfo once the form is submitted
            uploadedImageInfo = null;
        });
    }
});