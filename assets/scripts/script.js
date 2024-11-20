// Sample product data
const products = [
    /* { id: 0, name: 'Delivery Fee', showedprice: 99, price: 29, category: 'all', image: '' }, */

    { id: 1, name: 'Apple Kashmir (500g)', showedprice: 149, price: 116.25, category: 'Fruits', image: '../images/Fruits/KashmirApple.webp' },
    { id: 2, name: 'Green Grapes (250g)', showedprice: 99, price: 81.1, category: 'Fruits', image: '../images/Fruits/Grapes.jpg' },
    { id: 3, name: 'Guava (500g)', showedprice: 119, price: 94, category: 'Fruits', image: '../images/Fruits/Guava.avif' },
    { id: 4, name: 'Pineapple (1Pc)', showedprice: 149, price: 119.25, category: 'Fruits', image: '../images/Fruits/Pineapple.jpg' },
    { id: 5, name: 'Mosambi Regular (500g)', showedprice: 69, price: 49.75, category: 'Fruits', image: '../images/Fruits/Mosambi.jpg' },
    { id: 6, name: 'Coconut (1Pc)', showedprice: 59, price: 42.5, category: 'Fruits', image: '../images/Fruits/Coconut.webp' },
    { id: 7, name: 'Apple Shimla (500g)', showedprice: 129, price: 105.75, category: 'Fruits', image: '../images/Fruits/ShimlaApple.jpg' },
    { id: 8, name: 'Pomegranate (500g)', showedprice: 229, price: 187.75, category: 'Fruits', image: '../images/Fruits/Pomegranate.jpg' },
    { id: 9, name: 'Banana (500g)', showedprice: 49, price: 40, category: 'Fruits', image: '../images/Fruits/BananaR.avif' },
    { id: 10, name: 'Raw Mango (500g)', showedprice: 169, price: 140, category: 'Fruits', image: '../images/Fruits/RawMango.jpg' },
    { id: 11, name: 'Water Chestnut (500g)', showedprice: 69, price: 55.2, category: 'Fruits', image: '../images/Fruits/Chestnut.jpg' },
    { id: 12, name: 'Avocado (1Pc)', showedprice: 249, price: 206.5, category: 'Fruits', image: '../images/Fruits/Avocado.jpg' },
    { id: 13, name: 'Dragon Fruit (1Pc)', showedprice: 249, price: 207.5, category: 'Fruits', image: '../images/Fruits/DragonFruit.avif' },
      
    { id: 14, name: 'Ginger (100g)', showedprice: 59, price: 44.85, category: 'Vegetables', image: '../images/Vegetables/Ginger.jpg' },
    { id: 15, name: 'Garlic (100g)', showedprice: 69, price: 54.5, category: 'Vegetables', image: '../images/Vegetables/Garlic.avif' },
    { id: 16, name: 'Beans (250g)', showedprice: 59, price: 44.25, category: 'Vegetables', image: '../images/Vegetables/Beans.jpg' },
    { id: 17, name: 'Green Chilli (100g)', showedprice: 39, price: 29.25, category: 'Vegetables', image: '../images/Vegetables/GChilli.jpg' },
    { id: 18, name: 'Lemon (150g)', showedprice: 69, price: 50, category: 'Vegetables', image: '../images/Vegetables/Lemon.webp' },
    { id: 19, name: 'Cucumber (500g)', showedprice: 79, price: 59, category: 'Vegetables', image: '../images/Vegetables/Cucumber.avif' },
    { id: 20, name: 'Capsicum (250g)', showedprice: 89, price: 66.75, category: 'Vegetables', image: '../images/Vegetables/Capsicum.jpg' },
    { id: 21, name: 'Coriander (100g)', showedprice: 69, price: 51, category: 'Vegetables', image: '../images/Vegetables/Coriander.jpg' },
    { id: 22, name: 'Spring Onion (500g)', showedprice: 249, price: 201.5, category: 'Vegetables', image: '../images/Vegetables/SOnion.jpg' },
    { id: 23, name: 'Onion (1kg)', showedprice: 99, price: 75.25, category: 'Vegetables', image: '../images/Vegetables/Onion.jpg' },
    { id: 24, name: 'Cabbage (1Pc)', showedprice: 79, price: 63.2, category: 'Vegetables', image: '../images/Vegetables/Cabbage.avif' },
    { id: 25, name: 'Cauliflower (500g)', showedprice: 69, price: 55.5, category: 'Vegetables', image: '../images/Vegetables/Cauliflower.webp' },
    { id: 26, name: 'Tomato (500g)', showedprice: 99, price: 80, category: 'Vegetables', image: '../images/Vegetables/Tomato.jpg' },
    { id: 27, name: 'Carrot (500g)', showedprice: 89, price: 68.5, category: 'Vegetables', image: '../images/Vegetables/Carrot.jpg' },
    { id: 28, name: 'Potato Chandramukhi (1Kg)', showedprice: 59, price: 47.25, category: 'Vegetables', image: '../images/Vegetables/PotatoC.webp' },
    { id: 29, name: 'Brinjal (500g)', showedprice: 149, price: 119.2, category: 'Vegetables', image: '../images/Vegetables/Brinjal.jpg' },
    { id: 30, name: 'Parwal (500g)', showedprice: 69, price: 50, category: 'Vegetables', image: '../images/Vegetables/Parwal.jpg' }, 
    { id: 31, name: 'Lady Finger (500g)', showedprice: 59, price: 49, category: 'Vegetables', image: '../images/Vegetables/LadyFinger.avif' },
    { id: 32, name: 'Potato Jyoti (1Kg)', showedprice: 49, price: 41.75, category: 'Vegetables', image: '../images/Vegetables/PotatoJ.jpg' },
    
    { id: 33, name: 'Amul Cheese Slices (200g)', showedprice: 149, price: 137, category: 'Dairy', image: '../images/Dairy/CheeseS.webp' },
    { id: 34, name: 'Amul Masti Dahi (400g)', showedprice: 49, price: 46.5, category: 'Dairy', image: '../images/Dairy/Dahi.jpg' },
    { id: 35, name: 'Amul Garlic Butter (100g)', showedprice: 69, price: 63.5, category: 'Dairy', image: '../images/Dairy/ButterG.webp' },
    { id: 36, name: 'Amulya Dairy Whitener (250g)', showedprice: 119, price: 108.5, category: 'Dairy', image: '../images/Dairy/AmulyaWhitener.jpg' },
    { id: 37, name: 'Amul Cheese Block (500g)', showedprice: 299, price: 269.25, category: 'Dairy', image: '../images/Dairy/CheeseB.webp' },
    { id: 38, name: 'Amul Taza Milk (1L)', showedprice: 79, price: 69.5, category: 'Dairy', image: '../images/Dairy/AmulTaza.webp' },
    { id: 39, name: 'Amul Salted Butter (100g)', showedprice: 59, price: 54.5, category: 'Dairy', image: '../images/Dairy/Butter.avif' },
    
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display products on the dashboard
function displayProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productBlock = document.createElement('div');
        productBlock.className = 'product';
        productBlock.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 175px;height: 175px;cursor: pointer;">
            <h4 style="margin-top: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 5px;cursor: pointer;">${product.name}</h4>
            <div style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <p style="text-decoration: line-through; margin-right: 10px; color: brown;">₹${product.showedprice.toFixed(2)}</p>
                <p style="font-weight:bold; color: #4CAF50;">₹${product.price.toFixed(2)}</p>
            </div>
            <br>
            <button onclick="addToCart(${product.id})" style="background-color: #4CAF50;color: white; text-align: center; cursor: pointer; font-size: 15px; border-radius: 8px; padding: 8px 10px;">Add to Cart</button>
        `;
        productList.appendChild(productBlock);
    });
}

// Function to filter products by category
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to local storage
    alert(`${product.name} added to cart!`);
}

// Display all products by default on the dashboard page
displayProducts(products);
