// product.js

// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // Modal elements
    const modal = document.getElementById('productModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');

    // Open modal
    openModalBtn.addEventListener('click', function () {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';        
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal, resetImageUpload);

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

        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

        if (!allFieldsFilled) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: 'Some fields are missing!',
                text: 'Please fill all required fields.',
                background: '#1e1e1e',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 3000
            });
        } else {
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
                console.log('Product successfully created', result);

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
                showToast('error', 'Cannot add a new product');
            }

            closeModal();
            form.reset();
            resetImageUpload();
            const urlParams = new URLSearchParams(window.location.search);
            currentSort = urlParams.get('sort') || 'latest';
            const page = urlParams.get('page') || 1;
            console.log('current sort:', currentSort);
            console.log('current page:', page);
            console.log('Refreshing product list after adding a new product');
            fetchProducts(page, currentSort); // Refresh product list after adding a new product
        }
    });

    // Edit modal functionality
    const editButtons = document.querySelectorAll('.product-card-actions .btn:not(.btn-danger)');
    const editModal = document.getElementById('editProductModal');
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const cancelEditModalBtn = document.getElementById('cancelEditModalBtn');
    const editForm = document.getElementById('edit-product-form');

    function closeEditModal() {
        editModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    editButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-card-title').textContent;
            const productPriceText = productCard.querySelector('.product-card-price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            const stockText = productCard.querySelector('.product-card-stock').textContent;
            const stockMatch = stockText.match(/(\d+)/);
            const stockQuantity = stockMatch ? parseInt(stockMatch[1]) : 0;

            const productImage = productCard.querySelector('.product-card-img').src;
            const productId = productCard.dataset.id || 'product-' + Math.floor(Math.random() * 1000);

            document.getElementById('edit-product-id').value = productId;
            document.getElementById('edit-product-name').value = productName;
            document.getElementById('edit-product-price').value = productPrice;
            document.getElementById('edit-product-stock').value = stockQuantity;
            document.getElementById('edit-product-category').value = 'electronics';
            document.getElementById('edit-product-description').value = 'Product description goes here...';
            document.getElementById('edit-product-image-preview').src = productImage;

            editModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeEditModalBtn.addEventListener('click', closeEditModal);
    cancelEditModalBtn.addEventListener('click', closeEditModal);

    editModal.addEventListener('click', function (event) {
        if (event.target === editModal) {
            closeEditModal();
        }
    });

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

                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('edit-product-image-preview').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
    });

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

    console.log('Edit modal functionality loaded');

    // Delete functionality
    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete-product-btn')) {
            console.log('Delete button clicked');
            const productId = e.target.dataset.id.trim();
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-card-title').textContent;

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `This will permanently delete "${productName}" from both database and cloud storage!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                background: '#fff',
            });

            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while we delete the product.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                try {
                    const response = await axios.delete(`/api/upload/delete/${productId}`);
                    const data = response.data;

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product Deleted!',
                            text: 'Product and its image were deleted successfully.',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            toast: true,
                            position: 'top-end'
                        });

                        productCard.style.transition = 'opacity 0.3s ease';
                        productCard.style.opacity = '0';
                        const urlParams = new URLSearchParams(window.location.search);
                        currentSort = urlParams.get('sort') || 'latest';
                        const page = urlParams.get('page') || 1;
                        console.log('current sort:', currentSort);
                        console.log('current page:', page);


                        fetchProducts(currentPage, currentSort)

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Deletion Failed',
                            text: data.message || 'Failed to delete the product.',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('Delete error:', error);

                    let errorMessage = 'An error occurred while deleting the product.';

                    if (error.response) {
                        errorMessage = error.response.data.message || `Server error: ${error.response.status}`;
                    } else if (error.request) {
                        errorMessage = 'Network error. Please check your connection.';
                    } else {
                        errorMessage = error.message || 'Unknown error occurred.';
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorMessage,
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    });

    // ===== CLOUDINARY HANDLING (Previously in nested DOMContentLoaded) =====

    // DOM elements for image upload
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
    const addProductForm = document.getElementById('add-product-form');

    // Track uploaded image info
    let uploadedImageInfo = null;

    // Show upload container initially, hide preview
    if (previewContainer) previewContainer.style.display = 'none';
    if (uploadError) uploadError.style.display = 'none';
    if (uploadSuccess) uploadSuccess.style.display = 'none';

    // Handle click on upload container
    if (uploadContainer) {
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
    }

    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                handleFileSelect(this.files[0]);
            }
        });
    }

    // Handle remove image button
    if (removeImage) {
        removeImage.addEventListener('click', function (e) {
            e.preventDefault();

            if (uploadedImageInfo && uploadedImageInfo.public_id) {
                deleteFromCloudinary(uploadedImageInfo.public_id);
            }

            resetImageUpload();
        });
    }

    // Handle cancel modal button
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', function () {
            if (uploadedImageInfo && uploadedImageInfo.public_id) {
                deleteFromCloudinary(uploadedImageInfo.public_id);
            }

            resetImageUpload();
            closeModal();
        });
    }

    // Handle close modal button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            if (uploadedImageInfo && uploadedImageInfo.public_id) {
                deleteFromCloudinary(uploadedImageInfo.public_id);
            }

            resetImageUpload();
            closeModal();
        });
    } 

    // Reset form when modal is closed or canceled
    function resetImageUpload() {
        if (fileInput) fileInput.value = '';
        if (imageUrlInput) imageUrlInput.value = '';
        uploadedImageInfo = null;
        if (previewContainer) previewContainer.style.display = 'none';
        if (uploadContainer) {
            uploadContainer.style.display = 'block';
            const uploadIcon = uploadContainer.querySelector('.upload-icon');
            const uploadText = uploadContainer.querySelector('.upload-text');
            const uploadProgress = uploadContainer.querySelector('.upload-progress');

            if (uploadIcon) uploadIcon.style.display = 'block';
            if (uploadText) uploadText.style.display = 'block';
            if (uploadProgress) uploadProgress.style.display = 'none';
        }
        if (progressBar) progressBar.style.width = '0%';

        console.log('Image upload reset');
    }


    // Handle file selection and upload to Cloudinary
    function handleFileSelect(file) {
        if (imageName) imageName.textContent = file.name;

        if (!file.type.match('image.*')) {
            showError('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            if (imagePreview) imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        if (uploadContainer) {
            const uploadIcon = uploadContainer.querySelector('.upload-icon');
            const uploadText = uploadContainer.querySelector('.upload-text');
            const uploadProgress = uploadContainer.querySelector('.upload-progress');

            if (uploadIcon) uploadIcon.style.display = 'none';
            if (uploadText) uploadText.style.display = 'none';
            if (uploadProgress) uploadProgress.style.display = 'block';
        }

        simulateProgress();
        uploadToCloudinary(file);

        fetchProducts(currentPage, currentSort)


    }

    function uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('image', file);

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
                console.log('Upload response:', data);

                uploadedImageInfo = {
                    url: data.imageUrl || data.secure_url,
                    public_id: data.public_id
                };

                const imageUrlField = document.querySelector('#image-url');
                const imagePublicIdField = document.querySelector('#image-public-id');

                if (imageUrlField) imageUrlField.value = data.imageUrl;
                if (imagePublicIdField) imagePublicIdField.value = data.public_id;

                if (uploadSuccess) uploadSuccess.style.display = 'block';

                setTimeout(() => {
                    if (uploadContainer) uploadContainer.style.display = 'none';
                    if (previewContainer) previewContainer.style.display = 'flex';
                    if (progressBar) progressBar.style.width = '0%';
                    if (uploadSuccess) uploadSuccess.style.display = 'none';
                }, 1000);
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
        if (uploadError) {
            uploadError.textContent = message;
            uploadError.style.display = 'block';
            setTimeout(() => {
                uploadError.style.display = 'none';
            }, 3000);
        }
    }

    function simulateProgress() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 5;
                if (progressBar) progressBar.style.width = width + '%';
            }
        }, 100);
    }

    // Handle form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', function (e) {
            uploadedImageInfo = null;
        });
    }

    console.log('All functionality loaded successfully');
});

function showToast(type, message) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });
}

























