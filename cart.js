// FULL DATABASE
const productsDatabase = [
    { id: 1, title: "Canon Camera EOS 2000, Black 10x zoom", category: "Electronics", brand: "Canon", price: 89.0, rating: 4, image: "Assets/Image/tech/cameras.jpg" },
    { id: 2, title: "GoPro HERO6 4K Action Camera - Black", category: "Electronics", brand: "GoPro", price: 99.5, rating: 5, image: "Assets/Image/tech/camera2.jpg" },
    { id: 3, title: "Macbook Pro M2 14-inch Space Gray", category: "Computer and tech", brand: "Apple", price: 1499.0, rating: 5, image: "Assets/Image/tech/mac.jpeg" },
    { id: 4, title: "iPhone 13 Pro Max - 256GB Blue", category: "Smartphones", brand: "Apple", price: 899.0, rating: 4, image: "Assets/Image/tech/iphone.jpg" },
    { id: 5, title: "Lenovo ThinkPad X1 Carbon", category: "Computer and tech", brand: "Lenovo", price: 340.0, rating: 4, image: "Assets/Image/tech/laptop.jpg" },
    { id: 6, title: "Sony Noise Cancelling Headphones", category: "Mobile accessory", brand: "Sony", price: 10.0, rating: 5, image: "Assets/Image/tech/headphone.jpg" },
    { id: 7, title: "Smartwatch Silver Color Modern", category: "Mobile accessory", brand: "Other", price: 19.0, rating: 3, image: "Assets/Image/tech/smartwatches.jpg" },
    { id: 8, title: "Gaming Headset with Mic", category: "Mobile accessory", brand: "Other", price: 8.99, rating: 4, image: "Assets/Image/tech/gaming.jpg" },
    { id: 9, title: "10-inch Android Tablet", category: "Electronics", brand: "Samsung", price: 90.0, rating: 4, image: "Assets/Image/tech/tablet.jpg" },
    { id: 10, title: "T-shirts with multiple colors, for men", category: "Clothes and wear", brand: "Other", price: 10.3, rating: 4, image: "Assets/Image/cloth/tshirt.jpg" },
    { id: 11, title: "Brown winter coat medium size", category: "Clothes and wear", brand: "Other", price: 12.5, rating: 5, image: "Assets/Image/cloth/jacket.jpg" },
    { id: 12, title: "Jeans shorts for men blue color", category: "Clothes and wear", brand: "Other", price: 10.3, rating: 3, image: "Assets/Image/cloth/shorts.jpg" },
    { id: 13, title: "Jeans bag for travel for men", category: "Clothes and wear", brand: "Other", price: 34.0, rating: 5, image: "Assets/Image/cloth/bag.jpg" },
    { id: 14, title: "Classic Leather Wallet", category: "Clothes and wear", brand: "Other", price: 99.0, rating: 5, image: "Assets/Image/cloth/wallet.jpg" },
    { id: 15, title: "Soft chairs Beige", category: "Home and outdoor", brand: "Other", price: 19.0, rating: 4, image: "Assets/Image/interior/softchair.jpg" },
    { id: 16, title: "Coffee maker in white color", category: "Home and outdoor", brand: "Other", price: 10.3, rating: 5, image: "Assets/Image/interior/coffee.jpg" },
    { id: 17, title: "Ceramic Kitchen Crockery Set", category: "Home and outdoor", brand: "Other", price: 19.0, rating: 4, image: "Assets/Image/interior/crockery.jpg" },
    { id: 18, title: "Modern Bedside Lamps", category: "Home and outdoor", brand: "Other", price: 19.0, rating: 4, image: "Assets/Image/interior/lamp.jpg" },
    { id: 19, title: "Kitchen Dishes Set", category: "Home and outdoor", brand: "Other", price: 19.0, rating: 3, image: "Assets/Image/interior/kitchen.jpg" },
    { id: 20, title: "Indoor Decorative Plants", category: "Home and outdoor", brand: "Other", price: 100.0, rating: 5, image: "Assets/Image/interior/plant.jpg" },
    { id: 21, title: "Electric Blenders", category: "Home and outdoor", brand: "Other", price: 39.0, rating: 4, image: "Assets/Image/interior/blender.jpg" },
    { id: 22, title: "Travel Friendly Electric Kettle", category: "Computer and tech", brand: "Other", price: 80.95, rating: 5, image: "Assets/Image/tech/kattle.jpg" },
    { id: 23, title: "General Home Appliance", category: "Home and outdoor", brand: "Other", price: 19.0, rating: 4, image: "Assets/Image/interior/homeapp.jpg" },
    { id: 24, title: "iPhone 12 - Blue 128GB", category: "Smartphones", brand: "Apple", price: 99.5, rating: 5, image: "Assets/Image/tech/Iphone2.jpg" },
    { id: 25, title: "Redmi Smartphone - Black", category: "Smartphones", brand: "Pocco", price: 99.5, rating: 4, image: "Assets/Image/tech/redmi.jpg" },
    { id: 26, title: "Modern Yellow Armchair", category: "Home and outdoor", brand: "Other", price: 145.0, rating: 5, image: "Assets/Image/interior/chair2.jpg" },
    { id: 27, title: "Front Load Washing Machine", category: "Home and outdoor", brand: "Samsung", price: 450.0, rating: 5, image: "Assets/Image/interior/machine.jpg" },
    { id: 28, title: "Men's Blue Polo Shirt", category: "Clothes and wear", brand: "Other", price: 18.5, rating: 4, image: "Assets/Image/cloth/blueshirt.jpg" },
    { id: 29, title: "Men's Blue Suit Jacket", category: "Clothes and wear", brand: "Other", price: 85.0, rating: 5, image: "Assets/Image/cloth/coat.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
let discountApplied = false;

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    renderSaved();
    
    document.getElementById('btn-remove-all')?.addEventListener('click', () => { cart = []; saveData(); renderCart(); });
    document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
        if (document.getElementById('coupon-input').value && !discountApplied) { discountApplied = true; renderCart(); }
    });
});

    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Check if there is actually anything to buy
            if (cart.length === 0) {
                alert("Your cart is already empty!");
                return;
            }
            
            // 1. Show the success message!
            alert("Payment Successful! Thank you for your order. 🎉");
            
            // 2. Empty the cart completely
            cart = [];
            
            // 3. Save the empty state to memory and refresh the screen
            saveData();
            renderCart();
        });
    }

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const title = document.getElementById('cart-title');
    const btnRemoveAll = document.getElementById('btn-remove-all');
    
    title.innerText = `My cart (${cart.length})`;
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="padding: 20px 0; color: #8b96a5;">Your cart is empty.</p>';
        if(btnRemoveAll) btnRemoveAll.style.display = 'none';
        updateSummary(0);
        return;
    }

    if(btnRemoveAll) btnRemoveAll.style.display = 'block';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const product = productsDatabase.find(p => p.id === item.id) || { title: "Unknown", price: 0, image: "", brand: "Unknown" };
        subtotal += (product.price * item.qty);

        container.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" class="cart-item-img" alt="${product.title}">
                
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${product.title}</h4>
                    <p class="cart-item-specs">Size: medium, Color: blue <br>Seller: ${product.brand}</p>
                    
                    <i class="ph-fill ph-dots-three-vertical mobile-3-dots mobile-only" onclick="removeFromCart(${index})"></i>
                    
                    <div class="cart-item-actions desktop-only-flex">
                        <button onclick="removeFromCart(${index})">Remove</button>
                        <button class="btn-save" onclick="moveToSaved(${index})">Save for later</button>
                    </div>
                </div>

                <div class="cart-item-pricing desktop-only-flex">
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                    <select class="qty-dropdown" onchange="updateQty(${index}, this.value)">
                        ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${n == item.qty ? 'selected' : ''}>Qty: ${n}</option>`).join('')}
                    </select>
                </div>

                <div class="mobile-qty-price-row mobile-only-flex">
                    <div class="custom-qty-box">
                        <button class="custom-qty-btn" onclick="updateQty(${index}, ${item.qty - 1})">−</button>
                        <div class="custom-qty-val">${item.qty}</div>
                        <button class="custom-qty-btn" onclick="updateQty(${index}, ${item.qty + 1})">+</button>
                    </div>
                    <div class="mobile-item-price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
        `;
    });

    updateSummary(subtotal);
}

function renderSaved() {
    const container = document.getElementById('saved-items-container');
    container.innerHTML = '';
    
    if (savedItems.length === 0) {
        container.innerHTML = '<p style="color: #8b96a5;">No items saved for later.</p>';
        return;
    }

    savedItems.forEach((id, index) => {
        const product = productsDatabase.find(p => p.id === id);
        if(!product) return;

        container.innerHTML += `
            <div class="product-card saved-card-override">
                <div class="img-placeholder">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="saved-card-info">
                    <p>${product.title}</p>
                    <h4>$${product.price.toFixed(2)}</h4>
                    
                    <div class="saved-mobile-actions">
                        <button class="btn-move-cart" onclick="moveToCartFromSaved(${index})">Move to cart</button>
                        <button class="btn-remove-saved mobile-only-flex" onclick="removeFromSaved(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateSummary(subtotal) {
    const discount = discountApplied ? Math.min(60.00, subtotal * 0.1) : 0; 
    const tax = subtotal * 0.05; 
    const total = subtotal - discount + tax;
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const subBox = document.getElementById('summary-subtotal');
    if (subBox) {
        // Matches mobile text exactly: "Items (3):"
        if (window.innerWidth <= 900) {
            subBox.parentElement.innerHTML = `<span>Items (${totalItems}):</span> <span id="summary-subtotal">$${subtotal.toFixed(2)}</span>`;
        } else {
            subBox.innerHTML = `$${subtotal.toFixed(2)}`;
        }
    }
    
    const checkoutBtn = document.querySelector('.btn-checkout');
    if(checkoutBtn) {
        checkoutBtn.innerText = window.innerWidth <= 900 ? `Checkout (${totalItems} items)` : 'Checkout';
    }

    if(document.getElementById('summary-discount')) document.getElementById('summary-discount').innerText = `- $${discount.toFixed(2)}`;
    if(document.getElementById('summary-tax')) document.getElementById('summary-tax').innerText = `$${tax.toFixed(2)}`;
    if(document.getElementById('summary-total')) document.getElementById('summary-total').innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) { cart.splice(index, 1); saveData(); renderCart(); }
function removeFromSaved(index) { savedItems.splice(index, 1); saveData(); renderSaved(); }
function updateQty(index, newQty) {
    if(newQty < 1) newQty = 1;
    if(newQty > 10) newQty = 10;
    cart[index].qty = parseInt(newQty);
    saveData(); renderCart();
}
function moveToSaved(index) {
    const item = cart[index];
    if(!savedItems.includes(item.id)) savedItems.push(item.id);
    removeFromCart(index); renderSaved();
}
function moveToCartFromSaved(index) {
    const id = savedItems[index];
    const existing = cart.find(i => i.id === id);
    if(existing) existing.qty += 1;
    else cart.push({id: id, qty: 1});
    savedItems.splice(index, 1); 
    saveData(); renderCart(); renderSaved();
}
function saveData() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
}