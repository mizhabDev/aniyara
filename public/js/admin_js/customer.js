

const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');

searchInput.addEventListener('input', () => {
  clearBtn.style.display = searchInput.value ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';

  // Reset or fetch full results from backend
  fetchAllCustomers(); // You should define this function
});

// Example function to get full customer list again
function fetchAllCustomers() {
  fetch('/api/customers')  // your endpoint here
    .then(res => res.json())
    .then(data => {
      console.log('Reset results:', data);
      // renderCustomerList(data); <-- You can use your render logic here
    });
}
