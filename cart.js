// ============================================================
// CART.JS — per-user data, auth guards, checkout confirmation
// ============================================================

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

// ── User-scoped key helper (mirrors index.js) ──
function getUserKey(base, user) {
    user = user || JSON.parse(localStorage.getItem('currentUser'));
    return user ? base + '_' + user.id : base;
}

let currentUser = null;
let cart = [];
let savedItems = [];
let discountApplied = false;

document.addEventListener("DOMContentLoaded", () => {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const cartMain = document.getElementById('cart-items-container');
    const cartTitle = document.getElementById('cart-title');
    const cartLayout = document.querySelector('.cart-layout');
    const savedSection = document.querySelector('.saved-section');

    // ── AUTH GUARD ──
    if (!currentUser) {
        if (cartTitle) cartTitle.style.display = 'none';
        if (cartLayout) cartLayout.style.display = 'none';
        if (savedSection) savedSection.style.display = 'none';

        const main = document.querySelector('main.container');
        if (main) {
            main.insertAdjacentHTML('afterbegin', `
                <div class="cart-card" style="text-align:center;padding:50px 20px;margin-bottom:20px;">
                    <i class="ph-fill ph-shopping-cart" style="font-size:56px;color:#dee2e6;margin-bottom:16px;display:block;"></i>
                    <h3 style="font-size:20px;color:#1c1c1c;margin-bottom:8px;">Sign in to view your cart</h3>
                    <p style="color:#8b96a5;margin-bottom:24px;font-size:14px;">Your saved cart items are tied to your account.</p>
                    <a href="index.html" style="background:#0d7dfa;color:#fff;border-radius:8px;padding:11px 28px;font-size:14px;font-weight:600;text-decoration:none;font-family:inherit;">Go to Homepage</a>
                </div>`);
        }
        return;
    }

    // Load user-scoped data
    cart = JSON.parse(localStorage.getItem(getUserKey('cart'))) || [];
    savedItems = JSON.parse(localStorage.getItem(getUserKey('savedItems'))) || [];

    renderCart();
    renderSaved();

    document.getElementById('btn-remove-all')?.addEventListener('click', () => {
        cart = []; saveData(); renderCart();
    });

    document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
        if (document.getElementById('coupon-input').value && !discountApplied) {
            discountApplied = true; renderCart();
        }
    });

    // ── CHECKOUT BUTTON — opens confirmation modal ──
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) { alert("Your cart is empty!"); return; }
            const totalText = document.getElementById('summary-total').innerText;
            // Populate modal summary
            const modalTotal = document.getElementById('checkout-modal-total');
            const modalItems = document.getElementById('checkout-modal-items');
            if (modalTotal) modalTotal.textContent = totalText;
            if (modalItems) modalItems.textContent = cart.reduce((s, i) => s + i.qty, 0) + ' item(s)';
            const modal = document.getElementById('checkout-confirm-modal');
            if (modal) modal.classList.add('open');
        });
    }

    // Confirm checkout
    const confirmCheckoutBtn = document.getElementById('btn-confirm-checkout');
    if (confirmCheckoutBtn) {
        confirmCheckoutBtn.addEventListener('click', () => {
            const totalText = document.getElementById('summary-total').innerText;
            let orderHistory = JSON.parse(localStorage.getItem(getUserKey('orderHistory'))) || [];
            const newOrder = {
                id: 'ORD-' + Math.floor(Math.random() * 1000000),
                date: new Date().toLocaleDateString(),
                total: totalText,
                status: 'Processing',
                items: [...cart]
            };
            orderHistory.unshift(newOrder);
            localStorage.setItem(getUserKey('orderHistory'), JSON.stringify(orderHistory));

            const modal = document.getElementById('checkout-confirm-modal');
            if (modal) modal.classList.remove('open');

            cart = []; saveData(); renderCart();

            // Show success toast or inline message
            showCheckoutSuccess();
        });
    }

    // Cancel checkout
    const cancelCheckoutBtn = document.getElementById('btn-cancel-checkout');
    if (cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener('click', () => {
            document.getElementById('checkout-confirm-modal').classList.remove('open');
        });
    }

    // Close modal on overlay click
    const checkoutModal = document.getElementById('checkout-confirm-modal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('open');
        });
    }
});

function showCheckoutSuccess() {
    const main = document.querySelector('main.container');
    if (!main) return;
    const existing = document.getElementById('checkout-success-banner');
    if (existing) existing.remove();
    const banner = document.createElement('div');
    banner.id = 'checkout-success-banner';
    banner.style.cssText = 'background:#e8f9ed;border:1px solid #b8eecb;border-radius:12px;padding:20px 24px;display:flex;align-items:center;gap:14px;margin-bottom:20px;';
    banner.innerHTML = `
        <i class="ph-fill ph-check-circle" style="font-size:36px;color:#00873f;flex-shrink:0;"></i>
        <div>
            <p style="font-size:16px;font-weight:700;color:#00873f;margin:0 0 4px;">Order placed successfully!</p>
            <p style="font-size:13px;color:#505050;margin:0;">Thank you for your purchase. <a href="order.html" style="color:#0d7dfa;font-weight:600;">View your orders →</a></p>
        </div>`;
    main.insertAdjacentElement('afterbegin', banner);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const title = document.getElementById('cart-title');
    const btnRemoveAll = document.getElementById('btn-remove-all');

    if (title) title.innerText = `My cart (${cart.length})`;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="padding: 20px 0; color: #8b96a5;">Your cart is empty.</p>';
        if (btnRemoveAll) btnRemoveAll.style.display = 'none';
        updateSummary(0);
        return;
    }

    if (btnRemoveAll) btnRemoveAll.style.display = 'block';
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
            </div>`;
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
        if (!product) return;
        container.innerHTML += `
            <div class="product-card saved-card-override">
                <div class="img-placeholder"><img src="${product.image}" alt="${product.title}"></div>
                <div class="saved-card-info">
                    <p>${product.title}</p>
                    <h4>$${product.price.toFixed(2)}</h4>
                    <div class="saved-mobile-actions">
                        <button class="btn-move-cart" onclick="moveToCartFromSaved(${index})">Move to cart</button>
                        <button class="btn-remove-saved mobile-only-flex" onclick="removeFromSaved(${index})">Remove</button>
                    </div>
                </div>
            </div>`;
    });
}

function updateSummary(subtotal) {
    const discount = discountApplied ? Math.min(60.00, subtotal * 0.1) : 0;
    const tax = subtotal * 0.05;
    const total = subtotal - discount + tax;
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subBox = document.getElementById('summary-subtotal');
    if (subBox) {
        if (window.innerWidth <= 900) {
            subBox.parentElement.innerHTML = `<span>Items (${totalItems}):</span> <span id="summary-subtotal">$${subtotal.toFixed(2)}</span>`;
        } else {
            subBox.innerHTML = `$${subtotal.toFixed(2)}`;
        }
    }
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) checkoutBtn.innerText = window.innerWidth <= 900 ? `Checkout (${totalItems} items)` : 'Checkout';
    if (document.getElementById('summary-discount')) document.getElementById('summary-discount').innerText = `- $${discount.toFixed(2)}`;
    if (document.getElementById('summary-tax')) document.getElementById('summary-tax').innerText = `$${tax.toFixed(2)}`;
    if (document.getElementById('summary-total')) document.getElementById('summary-total').innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) { cart.splice(index, 1); saveData(); renderCart(); }
function removeFromSaved(index) { savedItems.splice(index, 1); saveData(); renderSaved(); }
function updateQty(index, newQty) {
    if (newQty < 1) newQty = 1;
    if (newQty > 10) newQty = 10;
    cart[index].qty = parseInt(newQty);
    saveData(); renderCart();
}
function moveToSaved(index) {
    const item = cart[index];
    if (!savedItems.includes(item.id)) savedItems.push(item.id);
    removeFromCart(index); renderSaved();
}
function moveToCartFromSaved(index) {
    const id = savedItems[index];
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, qty: 1 });
    savedItems.splice(index, 1);
    saveData(); renderCart(); renderSaved();
}
function saveData() {
    localStorage.setItem(getUserKey('cart'), JSON.stringify(cart));
    localStorage.setItem(getUserKey('savedItems'), JSON.stringify(savedItems));
}
