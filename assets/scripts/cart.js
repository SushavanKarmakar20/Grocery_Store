let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartMessage = document.getElementById('cartMessage');
    cartItems.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartMessage.style.display = 'block';
        document.getElementById('cartContent').style.display = 'none';
        document.getElementById("totalMessage").style.display = 'none';
    } else {
        cartMessage.style.display = 'none';
        document.getElementById('cartContent').style.display = 'block';
        document.getElementById("totalMessage").style.display = 'block';
        var totalAmount = 0;
        var totalQuantity = 0;
        
        // Populate cart items
        cart.forEach(item => {
            totalAmount += parseFloat((item.price * item.quantity).toFixed(2));
            totalQuantity +=parseFloat(item.quantity);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.showedprice.toFixed(2)}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td>₹${(item.showedprice * item.quantity).toFixed(2) - (item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            `;
            cartItems.appendChild(row); 
        });
        
        var phrase = "Total Quantity: " + totalQuantity + "<br>" +"<br>To be Paid: ₹ " + totalAmount;
        document.getElementById("totalMessage").innerHTML = phrase + "<br>";
        
    }
}

// Function to remove items from the cart
function removeFromCart(productId) {
    // Find the index of the item to remove
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        // Remove the item from the cart
        cart.splice(itemIndex, 1);
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart(); // Re-render the cart
    }
}

// Function to update the quantity of items in the cart
function updateQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        const newQuantity = parseInt(quantity);
        // If the new quantity is valid, update it
        if (newQuantity > 0) {
            product.quantity = newQuantity;
            // Update the cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(); // Re-render the cart
        } else {
            // If the quantity is 0 or invalid, remove the item from the cart
            removeFromCart(productId);
        }
    }
}


// Function to open payment modal
document.getElementById('placeOrderBtn').addEventListener('click', function() {
    document.getElementById('paymentModal').style.display = 'block';
});

// Function to close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function validateCustomerDetails() {
    // Get the values of the form fields
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;

    // Check if any field is empty
    if (customerName === "" || customerEmail === "" || customerPhone === "" || customerAddress === "") {
        alert("Please fill out all details before submitting the order.");
        return false; // Prevent the form submission
    }

    // If all fields are filled, return true to allow form submission
    return true;
}

// Function to handle checkout and generate PDF
async function checkoutOrder() {
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Validate customer details
    if (!validateCustomerDetails()) {
        return; 
    }

    // Show payment confirmation message
    alert(`Payment Method Selected: ${paymentMethod}. Your order is being processed!`);

    // Close the modal
    closePaymentModal();

    // Generate PDF after confirming payment
    await generatePDF(paymentMethod);
}

// Function to generate a PDF with payment method
async function generatePDF(paymentMethod) {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;

    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(76, 175, 80);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text("Grocery Store", pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Customer details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Name: ${customerName}`, 10, 40);
    pdf.text(`Email: ${customerEmail}`, 10, 50);
    pdf.text(`Phone: ${customerPhone}`, 10, 60);
    pdf.text(`Delivery Address: ${customerAddress}`, 10, 70);

    // Payment Method
    pdf.text(`Payment Method: ${paymentMethod}`, 10, 80);

    // Product details header
    pdf.text("Products Ordered:", 10, 90);
    pdf.setFontSize(10);
    pdf.text("Name", 10, 100);
    pdf.text("Price", 70, 100);
    pdf.text("Quantity", 110, 100);
    pdf.text("Total Price", 150, 100);

    let y = 110; // Y position for products
    let totalAmount = 0;

    cart.forEach(item => {
        const totalPrice = item.price * item.quantity;
        totalAmount += totalPrice;

        pdf.text(item.name, 10, y);
        pdf.text(`₹${item.price.toFixed(2)}`, 70, y);
        pdf.text(`${item.quantity}`, 110, y);
        pdf.text(`₹${totalPrice.toFixed(2)}`, 150, y);
        y += 10; // Move down for next item
    });

    // Total Amount
    pdf.setFontSize(12);
    pdf.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 10, y);
    y += 10;
    pdf.setFontSize(14);
    pdf.text("Payment is Completed", pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 10;
    pdf.text("Thank you for your order!", pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });

    // Save the PDF
    pdf.save("order-details.pdf");
}

updateCart();
