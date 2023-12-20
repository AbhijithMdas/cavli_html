
const products = [
    { id: 1, name: 'C42GM', category: 'NB1/NB2,LTE-M1',image: 'images/module1.png' },
    { id: 2, name: 'C41QS', category: 'NB2', image: 'images/module2.png' },
    { id: 3, name: 'C41QS', category: 'LTE CAT 1.BIS', image: 'images/module3.png' },
    { id: 4, name: 'C10QM', category: 'LTE CAT1/2G', image: 'images/module4.png' },
    { id: 5, name: 'C20QM', category: 'LTE CAT4/2G', image: 'images/module5.png' },
    { id: 6, name: 'C10GS', category: 'CAT1', image: 'images/module6.png' },
    { id: 7, name: 'CQS290', category: 'LTE CAT4/2G', image: 'images/module7.png' },
  
  ];
  
  const cartItems = [];
  
  document.getElementById('viewCartBtn').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'block';
  });
  
  document.getElementById('closeCartBtn').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'none';
  });
  
  const productContainer = document.getElementById('productContainer');
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-box';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p> ${product.category}</p>      
      <button onclick="openPopup(${product.id}, '${product.name}', '${product.category}')">Add to Cart</button>
    `;
    productContainer.appendChild(productElement);
  });
  
  
  function openPopup(id, name, category) {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-content').innerHTML = `
      <h2>Add to Cart</h2>
      <p>Name: ${name}</p>
      <p>Category: ${category}</p>
      
      <label for="regionInput">Region of Testing:</label>
      <select id="regionInput">
        <option value="">Select Region</option>
            <option value="APAC">APAC</option>
            <option value="NAM">NAM</option>
            <option value="SAM">SAM</option>
            <option value="EU">EU</option>
            <option value="GLOBAL">GLOBAL</option>
      </select>
      
      <label for="esimInput">eSIM compatibility:</label>
      <select id="esimInput">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      
      <label for="formFactorInput">Form Factors:</label>
      <select id="formFactorInput">
            <option value="">Select Form Factor</option>
            <option value="M.2">M.2</option>
            <option value="minPIC">minPIC</option>
            <option value="LGA">LGA</option>
            <option value="MiniPCI">MiniPCI</option>
      </select>

      <label for="quantityInput">Quantity:</label>
      <input type="number" id="quantityInput" min="5" max="10" value="5">

      
      <p>Name: ${name}</p>
      <p>Category: ${category}</p>

      <br>
      <button onclick="addToCartPopup(${id}, '${name}', '${category}')">Add to Cart</button>
      <button onclick="closePopup()">Close</button>
    `;
  }
  
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }
  
  function addToCartPopup(id, name, category) {
    const quantity = parseInt(document.getElementById('quantityInput').value);

    const region = document.getElementById('regionInput').value;
    const esimCompatibility = document.getElementById('esimInput').value;
    const formFactor = document.getElementById('formFactorInput').value

    const newItem = { id, name, category, quantity, region, esimCompatibility, formFactor  };
    cartItems.push(newItem);
  
    cartItems.sort((a, b) => a.name.localeCompare(b.name));

    const cartItemsList = document.getElementById('cartItems');
    const cartItemElement = document.createElement('tr');

    cartItemElement.innerHTML = `
    
    <td>${name}</td>
    <td>${category}</td>
    <td>${quantity}</td>
    <td>${region}</td>
    <td>${esimCompatibility}</td>
    <td>${formFactor}</td>

  `;



    cartItemsList.appendChild(cartItemElement);
  
    closePopup(); // Close the popup after adding to cart
  }
  
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    displayCartDetails();
  });
  
  function displayCartDetails() {
    const cartDetailsContainer = document.getElementById('cartDetails');
    cartDetailsContainer.innerHTML = ''; // Clear previous details
  
    cartItems.forEach(item => {
      const cartItemDetailElement = document.createElement('li');
      cartItemDetailElement.textContent = `
        ${item.name} - Category: ${item.category} - Quantity: ${item.quantity}
      `;
      cartDetailsContainer.appendChild(cartItemDetailElement);
    });
  
    document.getElementById('cartItemsDetails').style.display = 'block';
  }
  