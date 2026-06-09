document.addEventListener("DOMContentLoaded", () => {
    function getUserKey(base, user) {
        user = user || JSON.parse(localStorage.getItem('currentUser'));
        return user ? base + '_' + user.id : base;
    }

    const productsDatabase = [
        { id: 1, title: "Canon Camera EOS 2000, Black 10x zoom", brand: "Canon", price: 89.0, image: "Assets/Image/tech/cameras.jpg" },
        { id: 2, title: "GoPro HERO6 4K Action Camera - Black", brand: "GoPro", price: 99.5, image: "Assets/Image/tech/camera2.jpg" },
        { id: 3, title: "Macbook Pro M2 14-inch Space Gray", brand: "Apple", price: 1499.0, image: "Assets/Image/tech/mac.jpeg" },
        { id: 4, title: "iPhone 13 Pro Max - 256GB Blue", brand: "Apple", price: 899.0, image: "Assets/Image/tech/iphone.jpg" },
        { id: 5, title: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", price: 340.0, image: "Assets/Image/tech/laptop.jpg" },
        { id: 6, title: "Sony Noise Cancelling Headphones", brand: "Sony", price: 10.0, image: "Assets/Image/tech/headphone.jpg" },
        { id: 7, title: "Smartwatch Silver Color Modern", brand: "Other", price: 19.0, image: "Assets/Image/tech/smartwatches.jpg" },
        { id: 8, title: "Gaming Headset with Mic", brand: "Other", price: 8.99, image: "Assets/Image/tech/gaming.jpg" },
        { id: 9, title: "10-inch Android Tablet", brand: "Samsung", price: 90.0, image: "Assets/Image/tech/tablet.jpg" },
        { id: 10, title: "T-shirts with multiple colors, for men", brand: "Other", price: 10.3, image: "Assets/Image/cloth/tshirt.jpg" },
        { id: 11, title: "Brown winter coat medium size", brand: "Other", price: 12.5, image: "Assets/Image/cloth/jacket.jpg" },
        { id: 12, title: "Jeans shorts for men blue color", brand: "Other", price: 10.3, image: "Assets/Image/cloth/shorts.jpg" },
        { id: 13, title: "Jeans bag for travel for men", brand: "Other", price: 34.0, image: "Assets/Image/cloth/bag.jpg" },
        { id: 14, title: "Classic Leather Wallet", brand: "Other", price: 99.0, image: "Assets/Image/cloth/wallet.jpg" },
        { id: 15, title: "Soft chairs Beige", brand: "Other", price: 19.0, image: "Assets/Image/interior/softchair.jpg" },
        { id: 16, title: "Coffee maker in white color", brand: "Other", price: 10.3, image: "Assets/Image/interior/coffee.jpg" },
        { id: 17, title: "Ceramic Kitchen Crockery Set", brand: "Other", price: 19.0, image: "Assets/Image/interior/crockery.jpg" },
        { id: 18, title: "Modern Bedside Lamps", brand: "Other", price: 19.0, image: "Assets/Image/interior/lamp.jpg" },
        { id: 19, title: "Kitchen Dishes Set", brand: "Other", price: 19.0, image: "Assets/Image/interior/kitchen.jpg" },
        { id: 20, title: "Indoor Decorative Plants", brand: "Other", price: 100.0, image: "Assets/Image/interior/plant.jpg" },
        { id: 21, title: "Electric Blenders", brand: "Other", price: 39.0, image: "Assets/Image/interior/blender.jpg" },
        { id: 22, title: "Travel Friendly Electric Kettle", brand: "Other", price: 80.95, image: "Assets/Image/tech/kattle.jpg" },
        { id: 23, title: "General Home Appliance", brand: "Other", price: 19.0, image: "Assets/Image/interior/homeapp.jpg" },
        { id: 24, title: "iPhone 12 - Blue 128GB", brand: "Apple", price: 99.5, image: "Assets/Image/tech/Iphone2.jpg" },
        { id: 25, title: "Redmi Smartphone - Black", brand: "Pocco", price: 99.5, image: "Assets/Image/tech/redmi.jpg" },
        { id: 26, title: "Modern Yellow Armchair", brand: "Other", price: 145.0, image: "Assets/Image/interior/chair2.jpg" },
        { id: 27, title: "Front Load Washing Machine", brand: "Samsung", price: 450.0, image: "Assets/Image/interior/machine.jpg" },
        { id: 28, title: "Men's Blue Polo Shirt", brand: "Other", price: 18.5, image: "Assets/Image/cloth/blueshirt.jpg" },
        { id: 29, title: "Men's Blue Suit Jacket", brand: "Other", price: 85.0, image: "Assets/Image/cloth/coat.jpg" }
    ];

    const ordersContainer = document.getElementById('orders-container');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // ── AUTH GUARD ──
    if (!currentUser) {
        ordersContainer.innerHTML = `
            <div class="cart-card" style="text-align:center;padding:50px 20px;">
                <i class="ph-fill ph-package" style="font-size:56px;color:#dee2e6;margin-bottom:16px;display:block;"></i>
                <h3 style="font-size:20px;color:#1c1c1c;margin-bottom:8px;">Sign in to view your orders</h3>
                <p style="color:#8b96a5;margin-bottom:24px;font-size:14px;">Your order history is tied to your account.</p>
                <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                    <a href="index.html" style="background:#0d7dfa;color:#fff;border:none;border-radius:8px;padding:11px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;">Go to Homepage</a>
                </div>
            </div>`;
        return;
    }

    const orderHistory = JSON.parse(localStorage.getItem(getUserKey('orderHistory', currentUser))) || [];

    if (orderHistory.length === 0) {
        ordersContainer.innerHTML = `
            <div class="cart-card" style="text-align:center;padding:40px 20px;">
                <i class="ph ph-package" style="font-size:48px;color:#dee2e6;margin-bottom:15px;display:block;"></i>
                <h3 style="font-size:18px;color:#1c1c1c;margin-bottom:10px;">No orders yet</h3>
                <p style="color:#8b96a5;margin-bottom:20px;">You haven't placed any orders. Check out our products!</p>
                <a href="products.html?category=All category" class="btn-back-shop">Start Shopping</a>
            </div>`;
        return;
    }

    let html = '';
    orderHistory.forEach(order => {
        let itemsHtml = '';
        order.items.forEach(item => {
            const product = productsDatabase.find(p => p.id === item.id) || { title: "Unknown Item", image: "", price: 0 };
            itemsHtml += `
                <div style="display:flex;gap:15px;margin-top:15px;align-items:center;">
                    <img src="${product.image}" alt="${product.title}" style="width:60px;height:60px;border-radius:6px;border:1px solid #dee2e6;object-fit:contain;padding:5px;">
                    <div>
                        <h4 style="font-size:15px;margin-bottom:5px;font-weight:500;color:#1c1c1c;">${product.title}</h4>
                        <p style="font-size:14px;color:#8b96a5;">Qty: ${item.qty} &nbsp;•&nbsp; $${product.price.toFixed(2)} each</p>
                    </div>
                </div>`;
        });

        html += `
            <div class="cart-card" style="margin-bottom:20px;">
                <div style="border-bottom:1px solid #dee2e6;padding-bottom:15px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:15px;">
                    <div>
                        <span style="color:#8b96a5;font-size:13px;text-transform:uppercase;font-weight:600;">Order ID</span>
                        <strong style="display:block;font-size:15px;color:#1c1c1c;margin-top:4px;">${order.id}</strong>
                    </div>
                    <div>
                        <span style="color:#8b96a5;font-size:13px;text-transform:uppercase;font-weight:600;">Date Placed</span>
                        <strong style="display:block;font-size:15px;color:#1c1c1c;margin-top:4px;">${order.date}</strong>
                    </div>
                    <div>
                        <span style="color:#8b96a5;font-size:13px;text-transform:uppercase;font-weight:600;">Total Amount</span>
                        <strong style="display:block;font-size:15px;color:#1c1c1c;margin-top:4px;">${order.total}</strong>
                    </div>
                    <div style="text-align:right;">
                        <span style="background:#e3f0ff;color:#0d7dfa;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600;">${order.status}</span>
                    </div>
                </div>
                <div class="order-items">${itemsHtml}</div>
            </div>`;
    });

    ordersContainer.innerHTML = html;
});