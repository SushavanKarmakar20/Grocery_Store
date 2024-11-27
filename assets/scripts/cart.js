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

    window.open("./success.htm");

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

    // Header - Bold and Underlined "Grocery Store"
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(76, 175, 80);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 30, 'F');
    
    // Set font to bold for "Grocery Store"
    pdf.setFont("helvetica", "bold");
    const textWidth = pdf.getTextWidth("Grocery Store");
    const centerX = pdf.internal.pageSize.getWidth() / 2 - textWidth / 2;

    // Print the text "Grocery Store"
    pdf.text("Grocery Store", centerX, 20);
    
    // Underline the text by drawing a line beneath it
    pdf.setDrawColor(255, 255, 255); // White color for the line
    pdf.setLineWidth(1);
    pdf.line(centerX, 22, centerX + textWidth, 22); // Draw a line beneath the text

    // Customer Details - Light Gray Background for a clean look
    //pdf.setFillColor(242, 242, 242); // Light gray
    pdf.rect(0, 30, pdf.internal.pageSize.getWidth(), 50, 'F');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Name: ${customerName}`, 10, 45);
    pdf.text(`Email: ${customerEmail}`, 10, 55);
    pdf.text(`Phone: ${customerPhone}`, 10, 65);
    pdf.text(`Delivery Address: ${customerAddress}`, 10, 75);

    // Payment Method with better visual alignment
    pdf.text(`Payment Method: ${paymentMethod}`, 10, 85);

    // Product details section with table headers
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Products Ordered:", 10, 95);

    // Table Column Headers - Green background with white text
    pdf.setFontSize(12);
    pdf.setFillColor(76, 175, 80);
    pdf.rect(10, 100, 60, 10, 'F'); // Name Column
    pdf.rect(70, 100, 40, 10, 'F'); // Price Column
    pdf.rect(110, 100, 30, 10, 'F'); // Quantity Column
    pdf.rect(140, 100, 50, 10, 'F'); // Total Price Column

    pdf.setTextColor(255, 255, 255); // White text for headers
    pdf.text("Name", 40, 107, { align: 'center' });
    pdf.text("Price", 90, 107, { align: 'center' });
    pdf.text("Quantity", 125, 107, { align: 'center' });
    pdf.text("Total Price", 165, 107, { align: 'center' });

    let y = 110; // Starting Y position for product rows
    let totalAmount = 0;

    // Add each product in table rows with alternating row colors
    cart.forEach((item, index) => {
        const totalPrice = item.price * item.quantity;
        totalAmount += totalPrice;

        // Alternate row colors for readability
        const rowColor = (index % 2 === 0) ? [240, 240, 240] : [255, 255, 255]; // Light gray and white
        pdf.setFillColor(...rowColor);
        pdf.rect(10, y, 60, 10, 'F'); // Name Column
        pdf.rect(70, y, 40, 10, 'F'); // Price Column
        pdf.rect(110, y, 30, 10, 'F'); // Quantity Column
        pdf.rect(140, y, 50, 10, 'F'); // Total Price Column

        // Add text to the rows
        pdf.setTextColor(0, 0, 0); // Black text
        pdf.text(item.name, 40, y + 7, { align: 'center' });
        pdf.text(`Rs. ${item.price.toFixed(2)} /-`, 90, y + 7, { align: 'center' });
        pdf.text(`${item.quantity}`, 130, y + 7, { align: 'center' });
        pdf.text(`Rs. ${totalPrice.toFixed(2)} /-`, 165, y + 7, { align: 'center' });

        y += 12; // Move down for the next row
    });

    // Add lines between each table row for clarity
    pdf.setDrawColor(0, 0, 0); // Black border
    pdf.line(10, 100, 10, y); // Left border
    pdf.line(70, 100, 70, y); // Price border
    pdf.line(110, 100, 110, y); // Quantity border
    pdf.line(140, 100, 140, y); // Total price border
    pdf.line(190, 100, 190, y); // Right border

    // Draw horizontal lines under the table headers and at the bottom
    pdf.line(10, 100, 190, 100); // Top border (header border)
    pdf.line(10, y, 190, y); // Bottom border

    // **Green Background, Bold, White Text for "Total Amount"**
    const totalAmountHeight = 12; // Height of the total amount box
    const totalYPosition = y + 10; // Y position for the Total Amount

    // Set the background color to green
    pdf.setFillColor(76, 175, 80);
    pdf.rect(10, totalYPosition, pdf.internal.pageSize.getWidth() - 25, totalAmountHeight, 'F'); // Background rectangle
    
    // Set the text color to white, and make it bold
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.text(`Total Amount: Rs. ${totalAmount.toFixed(2)} /-`, pdf.internal.pageSize.getWidth() / 2, totalYPosition + 8, { align: 'center' });

    // Update the Y position for subsequent content
    y = totalYPosition + totalAmountHeight + 10;

    // Payment Confirmation
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Payment is Completed", pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 10;
    pdf.text("Thank you for your order!", pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });

    // Save the PDF
    pdf.save("order-details.pdf");
}





updateCart();
