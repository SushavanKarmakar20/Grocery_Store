
// Dynamic category list
const categories = [
    { name: "Vegetables", value: "Vegetables" },
    { name: "Fruits", value: "Fruits" },
    { name: "Dairy", value: "Dairy" },
    { name: "Dry Fruits", value: "Dry Fruits" },
    { name: "Masalas", value: "Masalas" },
    { name: "Chips", value: "Chips" },
    { name: "Beverages", value: "Beverages" },
    { name: "Ice Cream", value: "Ice Cream" }
];

// Populate categories
function populateCategories() {
    const categorySelect = document.getElementById("category");

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.value;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

window.onload = populateCategories;


// Products for each category
const products = {
    "Vegetables": [
        { name: "Carrot", price: 2 },
        { name: "Potato", price: 1.5 },
        { name: "Onion", price: 1.2 },
    ],
    "Fruits": [
        { name: "Apple", price: 3 },
        { name: "Banana", price: 1.8 },
        { name: "Orange", price: 2.5 },
    ],
    "Dairy": [
        { name: "Milk", price: 1.2 },
        { name: "Cheese", price: 3 },
        { name: "Butter", price: 2.5 },
    ],
    "Dry Fruits": [
        { name: "Almonds", price: 5 },
        { name: "Cashews", price: 6 },
        { name: "Raisins", price: 4 },
    ],
    "Masalas": [
        { name: "Cumin", price: 1.5 },
        { name: "Coriander", price: 1.2 },
        { name: "Turmeric", price: 0.8 },
    ],
    "Chips": [
        { name: "Lays", price: 2 },
        { name: "Pringles", price: 2.5 },
        { name: "Doritos", price: 3 },
    ],
    "Beverages": [
        { name: "Soda", price: 1.5 },
        { name: "Juice", price: 2 },
        { name: "Tea", price: 1.8 },
    ],
    "Ice Cream": [
        { name: "Vanilla", price: 2.5 },
        { name: "Chocolate", price: 3 },
        { name: "Strawberry", price: 2.8 },
    ],
};

// Show products based on selected category
function showProducts() {
    const category = document.getElementById("category").value;
    const productContainer = document.getElementById("product-container");

    if (category === "None") {
        productContainer.innerHTML = "";
        return;
    }

    let productHTML = `
        <label for="product">Select Product:</label>
        <select id="product">
            <option value="">Select Product</option>
    `;

    products[category].forEach(product => {
        productHTML += `<option value="${product.name}">${product.name} - $${product.price}</option>`;
    });

    productHTML += `</select>`;
    productContainer.innerHTML = productHTML;
}


// Add selected item to the order summary
function addToList() {
    const category = document.getElementById("category").value;
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;

    if (category === "None" || product === "") {
        alert("Please select a valid category and product.");
        return;
    }

    const price = products[category].find(p => p.name === product).price;
    const totalPrice = (price * quantity).toFixed(2);

    const orderTable = document.getElementById("order-summary").getElementsByTagName('tbody')[0];
    const row = orderTable.insertRow();
    row.innerHTML = `
        <td>${category}</td>
        <td>${product}</td>
        <td>${quantity}</td>
        <td>$${price}</td>
        <td>$${totalPrice}</td>
    `;
}


function showDetails() {
     // Show the Delivery Details Form (Address, Email, Mobile, Place Order Button)
    document.getElementById("delivery-details").style.display = "block";
    
        // Optionally, hide the Proceed button after it's clicked (if you want)
    document.getElementById("proceed-btn").style.display = "none";
}


// Generate PDF of the order summary
function generatePDF() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    const table = document.getElementById("order-summary").getElementsByTagName('tbody')[0];
    let orderDetails = "";
    let totalAmount = 0;
    let rowIndex = 0;

    // Collect order details and calculate total amount
    for (let i = 0; i < table.rows.length; i++) {
        const cells = table.rows[i].cells;
        const price = parseFloat(cells[3].innerText.replace('$', ''));
        const quantity = parseInt(cells[2].innerText);
        const totalPrice = price * quantity;
        totalAmount += totalPrice;

        orderDetails += `${cells[0].innerText} - ${cells[1].innerText} (Qty: ${cells[2].innerText}) - $${price} x ${quantity} = $${totalPrice.toFixed(2)}\n`;

        rowIndex++;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add logo at the center of the page
    const logo = './assets/images/grocery-store-logo.jpg'; 
    doc.addImage(logo, 'PNG', 85, 5, 40, 40); // Add logo at (x=85, y=10), width=40px, height=40px

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color for text
    doc.text("Name: " + name, 20, 50); 
    doc.text("Mobile No: " + mobile, 20, 60);
    doc.text("Email ID: " + email, 80, 60);
    doc.text("Address: " + address, 20, 70);

    // Add line separator after Address
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);  // Horizontal line

    // Add table header
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White color for table header
    doc.setFillColor(52, 152, 219); // Blue color for header background
    doc.rect(20, 80, 180, 10, 'F'); // Table header background
    doc.text("Category", 23, 85);
    doc.text("Product", 60, 85);
    doc.text("Quantity", 110, 85);
    doc.text("Price", 140, 85);
    doc.text("Total", 170, 85);

    // Add rows with alternating row colors and details
    let yPosition = 90;
    rowIndex = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const cells = table.rows[i].cells;
        const price = parseFloat(cells[3].innerText.replace('$', ''));
        const quantity = parseInt(cells[2].innerText);
        const totalPrice = price * quantity;

        // Alternate row colors (light blue, white)
        doc.setFillColor(rowIndex % 2 === 0 ? 241 : 249, rowIndex % 2 === 0 ? 248 : 249, rowIndex % 2 === 0 ? 255 : 255);
        doc.rect(20, yPosition, 180, 10, 'F');
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(cells[0].innerText, 23, yPosition + 6);
        doc.text(cells[1].innerText, 60, yPosition + 6);
        doc.text(cells[2].innerText, 110, yPosition + 6);
        doc.text(cells[3].innerText, 140, yPosition + 6);
        doc.text(cells[4].innerText, 170, yPosition + 6);

        yPosition += 10;
        rowIndex++;
    }

    // Add line separator after Address
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 10, 190, yPosition + 10);  // Horizontal line

    // Add table header
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White color for table header
    doc.setFillColor(52, 152, 219); // Blue color for header background
    doc.rect(20, 80, 180, 10, 'F'); // Table header background
    doc.text("Category", 23, 85);
    doc.text("Product", 60, 85);
    doc.text("Quantity", 110, 85);
    doc.text("Price", 140, 85);
    doc.text("Total", 170, 85);

    // Add Total Price section
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White color for table header
    doc.setFillColor(52, 152, 219); // Blue color for header background
    doc.rect(20, yPosition, 180, 10, 'F');
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 80, yPosition + 7);

    // Save the PDF
    doc.save("order-summary.pdf");
}
