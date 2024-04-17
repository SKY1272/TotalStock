document.addEventListener('DOMContentLoaded', function() {
  const productList = document.getElementById('productList');
  const productForm = document.getElementById('productForm');
  const totalSellingElement = document.getElementById('totalSelling');
  const apiUrl = 'https://crudcrud.com/api/f383984f906846f6a5131f363dc66d7b/totalStock';

  let details = [];

  // Load initial data from the database
  loadDataFromApi();

  // Function to load data from the API
  function loadDataFromApi() {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        details = data;
        AddDetails();
      })
      .catch(error => console.error('Error loading data from API:', error));
  }

  // Function to save data to the API
  function saveDataToApi(data) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data saved to API:', data);
        // After saving, reload data to reflect changes
        loadDataFromApi();
      })
      .catch(error => console.error('Error saving data to API:', error));
  }

  // Function to delete entry from the API
  function deleteEntryFromApi(id) {
    const deleteUrl = `${apiUrl}/${id}`;
    fetch(deleteUrl, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Entry deleted from API:', data);
        // After deleting, reload data to reflect changes
        loadDataFromApi();
      })
      .catch(error => console.error('Error deleting entry from API:', error));
  }

  productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    const newData = { productName, sellingPrice };
    details.push(newData);

    // Save data to API
    saveDataToApi(newData);

    // Clear form fields
    document.getElementById('productName').value = '';
    document.getElementById('sellingPrice').value = '';
  });

  function displayTotalSelling() {
    const totalSelling = details.reduce((acc, item) => acc + item.sellingPrice, 0);
    totalSellingElement.textContent = `Total Selling: $${totalSelling.toFixed(2)}`;
  }

  function AddDetails() {
    productList.innerHTML = '';
    details.forEach(item => {
      const newItem = document.createElement('div');
      newItem.textContent = `${item.productName}: $${item.sellingPrice.toFixed(2)}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        const itemId = item._id; 
        deleteEntryFromApi(itemId);
      });

      newItem.appendChild(deleteButton);
      productList.appendChild(newItem);
    });

    displayTotalSelling();
  }
}); 

