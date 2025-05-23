<%- include('../admin-partials/header') %>

  <link rel="stylesheet" href="/css/admin_css/products.css">

  <title>Products - Aniyara</title>

  <!-- Products Page -->
  <div id="products-page" class="main-content page hidden-pages">
    <div class="header">
      <h1 class="page-title">Products Management</h1>
      <div class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search products...">
      </div>
    </div>

    <div class="filters">
      <div class="filter-group">
        <select class="filter-select">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home & Kitchen</option>
          <option>Beauty & Personal Care</option>
        </select>
        <select class="filter-select">
          <option>All Stock Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <select class="filter-select">
          <option>Sort By: Latest</option>
          <option>Sort By: Price (Low to High)</option>
          <option>Sort By: Price (High to Low)</option>
          <option>Sort By: Most Popular</option>
        </select>
      </div>
      <button class="btn" id="openModalBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add New Product
      </button>
    </div>

    <div class="products-grid">
      <div class="product-card">
        <img src="/api/placeholder/300/200" alt="Product" class="product-card-img">
        <div class="product-card-body">
          <h3 class="product-card-title">Premium Wireless Headphones</h3>
          <div class="product-card-price">$129.99</div>
          <div class="product-card-stock">In Stock: 45 units</div>
          <div class="product-card-actions">
            <button class="btn btn-sm edit-product-btn">Edit</button>
            <button class="btn btn-sm btn-danger delete-product-btn">Delete</button>
          </div>
        </div>
      </div>
      <!-- More product cards... -->
    </div>



    <!-- pagination -->


    <div class="pagination">
      <% if (currentPage> 1) { %>
        <a href="?page=<%= currentPage - 1 %>" class="pagination-item">&lt;</a>
        <% } %>

          <% if (currentPage> 2) { %>
            <span class="pagination-item">...</span>
            <% } %>

              <% if (currentPage> 1) { %>
                <a href="?page=<%= currentPage - 1 %>" class="pagination-item">
                  <%= currentPage - 1 %>
                </a>
                <% } %>

                  <span class="pagination-item active">
                    <%= currentPage %>
                  </span>

                  <% if (currentPage < totalPages) { %>
                    <a href="?page=<%= parseInt(currentPage) + 1 %>" class="pagination-item">
                      <%= parseInt(currentPage) + 1 %>
                    </a>
                    <% } %>

                      <% if (currentPage < totalPages - 1) { %>
                        <span class="pagination-item">...</span>
                        <% } %>

                          <% if (currentPage < totalPages) { %>
                            <a href="?page=<%= parseInt(currentPage) + 1 %>" class="pagination-item">&gt;</a>
                            <% } %>
    </div>





  </div>

  <!-- Add New Product Modal - Hidden by default -->

  <!--   
  <div class="modal-overlay" id="productModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Add New Product</h2>
        <button class="close-button" id="closeModalBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <form id="add-product-form">
          <div class="form-group">
            <label for="product-name">Product Name</label>
            <input type="text" id="product-name" class="form-control" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="product-price">Price ($)</label>
              <input type="number" id="product-price" class="form-control" step="0.01" min="0" required>
            </div>
            <div class="form-group">
              <label for="product-stock">Stock Quantity</label>
              <input type="number" id="product-stock" class="form-control" min="0" required>
            </div>
          </div>

          <div class="form-group">
            <label for="product-category">Category</label>
            <select id="product-category" class="form-control" required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="audio">Audio</option>
              <option value="camera">Camera</option>
              <option value="wearables">Wearables</option>
            </select>
          </div>

          <div class="form-group">
            <label for="product-description">Description</label>
            <textarea id="product-description" class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label>Product Image</label>
            <div class="image-upload">
              <div class="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="upload-text">Drag and drop an image here, or click to browse</p>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="cancelModalBtn">Cancel</button>
        <button class="btn btn-primary" type="submit" form="add-product-form">
          Add Product
        </button>
      </div>
    </div>
  </div>
 -->

  <!-- Add New Product Modal - Enhanced with Cloudinary Upload -->
  <div class="modal-overlay" id="productModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Add New Product</h2>
        <button class="close-button" id="closeModalBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <form id="add-product-form">
          <div class="form-group">
            <label for="product-name">Product Name</label>
            <input type="text" id="product-name" class="form-control" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="product-price">Price ($)</label>
              <input type="number" id="product-price" class="form-control" step="0.01" min="0" required>
            </div>
            <div class="form-group">
              <label for="product-stock">Stock Quantity</label>
              <input type="number" id="product-stock" class="form-control" min="0" required>
            </div>
          </div>

          <div class="form-group">
            <label for="product-category">Category</label>
            <select id="product-category" class="form-control" required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="audio">Audio</option>
              <option value="camera">Camera</option>
              <option value="wearables">Wearables</option>
            </select>
          </div>

          <div class="form-group">
            <label for="product-description">Description</label>
            <textarea id="product-description" class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label>Product Image</label>
            <input type="file" id="product-image" accept="image/*" style="display:none;">
            <div class="image-upload" id="upload-container">
              <div class="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="upload-text">Drag and drop an image here, or click to browse</p>
              <div class="upload-progress">
                <div class="progress-bar"></div>
              </div>
              <p class="upload-error">Error uploading image. Please try again.</p>
              <p class="upload-success">Image uploaded successfully!</p>
            </div>
            <!-- Image preview area -->
            <div class="image-preview-container" id="preview-container">
              <img src="" alt="Product preview" class="image-preview" id="image-preview">
              <div class="preview-details">
                <span id="image-name">filename.jpg</span>
                <button type="button" class="remove-image" id="remove-image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
            <!-- Hidden input to store Cloudinary URL -->
            <input type="hidden" id="product-image-url" name="productImageUrl">
          </div>
          <!-- Add these hidden inputs in your form -->
          <input type="hidden" id="image-url" name="imageUrl">
          <input type="hidden" id="image-public-id" name="imagePublicId">
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="cancelModalBtn">Cancel</button>
        <button class="btn btn-primary" type="submit" form="add-product-form" id="submit-product">
          Add Product
        </button>
      </div>
    </div>
  </div>






  <!-- Edit Product Modal - Hidden by default -->
  <div class="modal-overlay" id="editProductModal">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Edit Product</h2>
        <button class="close-button" id="closeEditModalBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <form id="edit-product-form" method="PUT" action="/admin/products/edit/:id">
          <!-- Hidden input to store product ID -->
          <input type="hidden" id="edit-product-id">

          <div class="form-group">
            <label for="edit-product-name">Product Name</label>
            <input type="text" id="edit-product-name" class="form-control" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-product-price">Price ($)</label>
              <input type="number" id="edit-product-price" class="form-control" step="0.01" min="0" required>
            </div>
            <div class="form-group">
              <label for="edit-product-stock">Stock Quantity</label>
              <input type="number" id="edit-product-stock" class="form-control" min="0" required>
            </div>
          </div>

          <div class="form-group">
            <label for="edit-product-category">Category</label>
            <select id="edit-product-category" class="form-control" required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="audio">Audio</option>
              <option value="camera">Camera</option>
              <option value="wearables">Wearables</option>
            </select>
          </div>

          <div class="form-group">
            <label for="edit-product-description">Description</label>
            <textarea id="edit-product-description" class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label>Product Image</label>
            <div class="image-preview" id="current-image-preview">
              <img src="/api/placeholder/300/200" alt="Current product image" id="edit-product-image-preview">
            </div>
            <div class="image-upload" id="edit-image-upload">
              <div class="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p class="upload-text">Upload new image (optional)</p>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="cancelEditModalBtn">Cancel</button>
        <button class="btn btn-primary" type="submit" form="edit-product-form">
          Save Changes
        </button>
      </div>
    </div>
  </div>



  <!--<script>

    let uploadedImageInfo = null; // Will store publicId and url after upload

    // Client-side JavaScript for handling file uploads to Cloudinary

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
      removeImage.addEventListener('click', function () {
        fileInput.value = '';
        imageUrlInput.value = '';
        previewContainer.style.display = 'none';
        uploadContainer.style.display = 'block';
      });

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

        // Upload to Cloudinary
        uploadToCloudinary(file);
      }

      function uploadToCloudinary(file) {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

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
            // Handle successful upload
            imageUrlInput.value = data.secure_url;

            // Show success message
            uploadSuccess.style.display = 'block';
            setTimeout(() => {
              // Hide upload container, show preview container
              uploadContainer.style.display = 'none';
              previewContainer.style.display = 'flex';
              // Reset progress bar and messages
              progressBar.style.width = '0%';
              uploadSuccess.style.display = 'none';
              uploadContainer.querySelector('.upload-icon').style.display = 'block';
              uploadContainer.querySelector('.upload-text').style.display = 'block';
              uploadContainer.querySelector('.upload-progress').style.display = 'none';
            }, 1000);
          })
          .catch(error => {
            console.error('Error:', error);
            showError('Failed to upload image. Please try again.');
          });
      }

      function showError(message) {
        uploadError.textContent = message;
        uploadError.style.display = 'block';
        setTimeout(() => {
          uploadError.style.display = 'none';
        }, 3000);
      }

      // For simulating upload progress (remove in production)
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
    });

  </script> -->


   <script>
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
    resetImageUpload();

    // If there's a public_id stored, you can delete from Cloudinary
    const publicId = imageUrlInput.dataset.publicId;
    if (publicId) {
      deleteFromCloudinary(publicId);
    }
  });

  // Handle cancel modal button
  cancelModalBtn.addEventListener('click', function () {
    resetImageUpload();
    closeModal();
  });

  // Handle close modal button
  closeModalBtn.addEventListener('click', function () {
    resetImageUpload();
    closeModal();
  });

  function resetImageUpload() {
    fileInput.value = '';
    imageUrlInput.value = '';
    imageUrlInput.dataset.publicId = '';
    previewContainer.style.display = 'none';
    uploadContainer.style.display = 'block';
    uploadContainer.querySelector('.upload-icon').style.display = 'block';
    uploadContainer.querySelector('.upload-text').style.display = 'block';
    uploadContainer.querySelector('.upload-progress').style.display = 'none';
    progressBar.style.width = '0%';
  }

  function closeModal() {
    document.getElementById('productModal').style.display = 'none';
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
    // Create form data - IMPORTANT: Use 'image' as the field name to match backend
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
        // Handle successful upload
        imageUrlInput.value = data.imageUrl || data.secure_url;
        
        // Store the public_id for potential deletion
        if (data.public_id) {
          imageUrlInput.dataset.publicId = data.public_id;
        }

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
      })
      .catch(error => {
        console.error('Error:', error);
        showError('Failed to upload image. Please try again.');
        resetImageUpload();
      });
  }

  function deleteFromCloudinary(publicId) {
    if (!publicId) return;
    
    fetch(`/api/upload/${publicId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
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
});
  </script> 


  





  <!-- JavaScript for Modal Functionality -->
  <script src="/js/admin_js/product.js"></script>

  <%- include('../admin-partials/footer') %></div>