document.addEventListener('DOMContentLoaded', () => {
    // 1. EXACT DATABASE PROVIDED
    const productsDatabase = [
        { id: 1, title: "Canon Camera EOS 2000, Black 10x zoom", category: "Electronics", brand: "Canon", features: ["Plastic cover", "8GB Ram"], condition: "Brand new", price: 89.0, oldPrice: 120.0, rating: 4, verified: true, orders: 154, image: "Assets/Image/tech/cameras.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 2, title: "GoPro HERO6 4K Action Camera - Black", category: "Electronics", brand: "GoPro", features: ["Metallic"], condition: "Brand new", price: 99.5, oldPrice: 1128.0, rating: 5, verified: true, orders: 890, image: "Assets/Image/tech/camera2.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 3, title: "Macbook Pro M2 14-inch Space Gray", category: "Computer and tech", brand: "Apple", features: ["Metallic", "Large Memory", "Super power"], condition: "Brand new", price: 1499.0, oldPrice: null, rating: 5, verified: true, orders: 312, image: "Assets/Image/tech/mac.jpeg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 4, title: "iPhone 13 Pro Max - 256GB Blue", category: "Smartphones", brand: "Apple", features: ["Metallic", "Large Memory"], condition: "Refurbished", price: 899.0, oldPrice: 1099.0, rating: 4, verified: false, orders: 1024, image: "Assets/Image/tech/iphone.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 5, title: "Lenovo ThinkPad X1 Carbon", category: "Computer and tech", brand: "Lenovo", features: ["Plastic cover", "8GB Ram"], condition: "Refurbished", price: 340.0, oldPrice: 450.0, rating: 4, verified: false, orders: 420, image: "Assets/Image/tech/laptop.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 6, title: "Sony Noise Cancelling Headphones", category: "Mobile accessory", brand: "Sony", features: ["Plastic cover"], condition: "Brand new", price: 10.0, oldPrice: 20.0, rating: 5, verified: true, orders: 2000, image: "Assets/Image/tech/headphone.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 7, title: "Smartwatch Silver Color Modern", category: "Mobile accessory", brand: "Other", features: ["Metallic"], condition: "Brand new", price: 19.0, oldPrice: 25.0, rating: 3, verified: false, orders: 300, image: "Assets/Image/tech/smartwatches.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 8, title: "Gaming Headset with Mic", category: "Mobile accessory", brand: "Other", features: ["Plastic cover"], condition: "Brand new", price: 8.99, oldPrice: 15.0, rating: 4, verified: true, orders: 800, image: "Assets/Image/tech/gaming.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 9, title: "10-inch Android Tablet", category: "Electronics", brand: "Samsung", features: ["Large Memory"], condition: "Brand new", price: 90.0, oldPrice: 110.0, rating: 4, verified: true, orders: 120, image: "Assets/Image/tech/tablet.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 10, title: "T-shirts with multiple colors, for men", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 10.3, oldPrice: 15.0, rating: 4, verified: true, orders: 540, image: "Assets/Image/cloth/tshirt.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 11, title: "Brown winter coat medium size", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 12.5, oldPrice: 20.0, rating: 5, verified: true, orders: 120, image: "Assets/Image/cloth/jacket.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 12, title: "Jeans shorts for men blue color", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 10.3, oldPrice: null, rating: 3, verified: false, orders: 85, image: "Assets/Image/cloth/shorts.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 13, title: "Jeans bag for travel for men", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 34.0, oldPrice: 45.0, rating: 5, verified: true, orders: 200, image: "Assets/Image/cloth/bag.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 14, title: "Classic Leather Wallet", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 99.0, oldPrice: 120.0, rating: 5, verified: true, orders: 500, image: "Assets/Image/cloth/wallet.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 15, title: "Soft chairs Beige", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 19.0, oldPrice: 30.0, rating: 4, verified: true, orders: 45, image: "Assets/Image/interior/softchair.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 16, title: "Coffee maker in white color", category: "Home and outdoor", brand: "Other", features: ["Super power"], condition: "Brand new", price: 10.3, oldPrice: null, rating: 5, verified: true, orders: 310, image: "Assets/Image/interior/coffee.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 17, title: "Ceramic Kitchen Crockery Set", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 19.0, oldPrice: null, rating: 4, verified: false, orders: 20, image: "Assets/Image/interior/crockery.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 18, title: "Modern Bedside Lamps", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 19.0, oldPrice: 25.0, rating: 4, verified: true, orders: 90, image: "Assets/Image/interior/lamp.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 19, title: "Kitchen Dishes Set", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 19.0, oldPrice: 30.0, rating: 3, verified: false, orders: 15, image: "Assets/Image/interior/kitchen.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 20, title: "Indoor Decorative Plants", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 100.0, oldPrice: null, rating: 5, verified: true, orders: 200, image: "Assets/Image/interior/plant.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 21, title: "Electric Blenders", category: "Home and outdoor", brand: "Other", features: ["Super power"], condition: "Brand new", price: 39.0, oldPrice: 50.0, rating: 4, verified: true, orders: 340, image: "Assets/Image/interior/blender.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 22, title: "Travel Friendly Electric Kettle", category: "Computer and tech", brand: "Other", features: ["Super power"], condition: "Brand new", price: 80.95, oldPrice: 100.0, rating: 5, verified: true, orders: 1000, image: "Assets/Image/tech/kattle.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 23, title: "General Home Appliance", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 19.0, oldPrice: null, rating: 4, verified: false, orders: 40, image: "Assets/Image/interior/homeapp.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 24, title: "iPhone 12 - Blue 128GB", category: "Smartphones", brand: "Apple", features: ["Large Memory", "Super power"], condition: "Brand new", price: 99.5, oldPrice: 1128.0, rating: 5, verified: true, orders: 1540, image: "Assets/Image/tech/Iphone2.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 25, title: "Redmi Smartphone - Black", category: "Smartphones", brand: "Pocco", features: ["Large Memory"], condition: "Brand new", price: 99.5, oldPrice: null, rating: 4, verified: true, orders: 840, image: "Assets/Image/tech/redmi.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 26, title: "Modern Yellow Armchair", category: "Home and outdoor", brand: "Other", features: [], condition: "Brand new", price: 145.0, oldPrice: 180.0, rating: 5, verified: true, orders: 85, image: "Assets/Image/interior/chair2.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 27, title: "Front Load Washing Machine", category: "Home and outdoor", brand: "Samsung", features: ["Super power"], condition: "Brand new", price: 450.0, oldPrice: 550.0, rating: 5, verified: true, orders: 210, image: "Assets/Image/interior/machine.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 28, title: "Men's Blue Polo Shirt", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 18.5, oldPrice: 25.0, rating: 4, verified: false, orders: 320, image: "Assets/Image/cloth/blueshirt.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." },
        { id: 29, title: "Men's Blue Suit Jacket", category: "Clothes and wear", brand: "Other", features: [], condition: "Brand new", price: 85.0, oldPrice: 110.0, rating: 5, verified: true, orders: 150, image: "Assets/Image/cloth/coat.jpg", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt." }
    ];

    // 2. DYNAMIC GENERATORS
    function generateDynamicAttributes(product) {
        let attrs = { "Condition": product.condition, "Brand": product.brand !== "Other" ? product.brand : "Generic", "Price Type": "Negotiable" };
        if (product.category === "Smartphones" || product.category === "Computer and tech" || product.category === "Electronics") {
            attrs["Material"] = product.features.includes("Metallic") ? "Aluminum/Glass" : "Polycarbonate";
            attrs["Warranty"] = "1 Year Limited"; attrs["Protection"] = "Standard Electronics";
        } else if (product.category === "Clothes and wear") {
            attrs["Material"] = "Cotton/Polyester Blend"; attrs["Design"] = "Modern Fit"; attrs["Customization"] = "Available on request";
        } else {
            attrs["Material"] = "Mixed Materials"; attrs["Design"] = "Contemporary"; attrs["Warranty"] = "6 Months";
        }
        return attrs;
    }

    function generateDynamicSpecs(product) {
        let specs = { "Model": `#${product.id}-${product.title.substring(0, 5).toUpperCase()}`, "Certificate": "ISO-898921212" };
        if (product.category === "Smartphones" || product.category === "Computer and tech") {
            specs["Memory"] = product.features.includes("Large Memory") ? "128GB+" : "Standard"; specs["Style"] = "Tech Gadget";
        } else if (product.category === "Clothes and wear") {
            specs["Size"] = "M / L / XL"; specs["Style"] = "Classic style";
        } else {
            specs["Size"] = "Standard Dimensions"; specs["Style"] = "Home Decor/Utility";
        }
        return specs;
    }

    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) starsHTML += '★';
            else starsHTML += '<span class="half-star">★</span>';
        }
        return starsHTML;
    }

    // 3. GET URL ID & INITIALIZE PRODUCT
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 10;
    const product = productsDatabase.find(p => p.id === productId) || productsDatabase[0];

    const dynamicAttributes = generateDynamicAttributes(product);
    const dynamicSpecs = generateDynamicSpecs(product);

    // 4. POPULATE DOM
    document.title = `${product.title} - Brand E-commerce`;
    
    const setElemText = (id, text) => { if(document.getElementById(id)) document.getElementById(id).innerText = text; };
    const setElemSrc = (id, src) => { if(document.getElementById(id)) document.getElementById(id).src = src; };

    setElemText('bc-category', product.category);
    setElemText('bc-title', product.title);
    setElemSrc('pd-main-img', product.image);
    setElemText('pd-title', product.title);
    setElemText('pd-desc', product.desc);

    const starsContainer = document.getElementById('pd-stars');
    if (starsContainer) starsContainer.innerHTML = generateStars(product.rating);
    setElemText('pd-rating', product.rating % 1 === 0 ? product.rating + ".0" : product.rating);
    setElemText('pd-reviews', `${Math.max(1, Math.floor(product.orders * 0.3))} reviews`);
    setElemText('pd-orders', `${product.orders} sold`);

    setElemText('pd-price-1', `$${product.price.toFixed(2)}`);
    setElemText('pd-price-2', `$${(product.price * 0.92).toFixed(2)}`);
    setElemText('pd-price-3', `$${(product.price * 0.80).toFixed(2)}`);
    setElemText('mobile-price-main', `$${product.price.toFixed(2)}`);
    
    const mobileDescEl = document.getElementById('mobile-desc-text');
    const readMoreBtn = document.getElementById('read-more-btn');
    if(mobileDescEl && readMoreBtn) {
        const fullDesc = product.desc;
        const shortDesc = fullDesc.length > 85 ? fullDesc.substring(0, 85) + '...' : fullDesc;
        mobileDescEl.innerText = shortDesc;
        if (fullDesc.length <= 85) readMoreBtn.style.display = 'none';
        readMoreBtn.addEventListener('click', function() {
            if (this.innerText === 'Read more') {
                mobileDescEl.innerText = fullDesc;
                this.innerText = 'Read less';
            } else {
                mobileDescEl.innerText = shortDesc;
                this.innerText = 'Read more';
            }
        });
    }

    document.querySelectorAll('.pd-thumb-img').forEach(img => { img.src = product.image; });

    const attrGrid = document.getElementById('pd-attributes');
    if (attrGrid) {
        attrGrid.innerHTML = ''; let count = 0;
        for (const [key, value] of Object.entries(dynamicAttributes)) {
            attrGrid.innerHTML += `<div class="attr-label">${key}:</div><div class="attr-val">${value}</div>`;
            count++;
            if (count % 2 === 0 && count < Object.keys(dynamicAttributes).length) attrGrid.innerHTML += `<div class="attr-divider"></div><div class="attr-divider"></div>`;
        }
    }
    
    const specsTable = document.getElementById('pd-specs');
    if (specsTable) {
        specsTable.innerHTML = ''; 
        for (const [key, value] of Object.entries(dynamicSpecs)) specsTable.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }
    
    const featuresList = document.getElementById('pd-features');
    if (featuresList) {
        featuresList.innerHTML = '';
        if (product.features && product.features.length > 0) product.features.forEach(f => featuresList.innerHTML += `<li>✓ ${f}</li>`);
        else featuresList.innerHTML += `<li>✓ High quality material</li><li>✓ Satisfaction guaranteed</li>`;
    }

    // 5. "YOU MAY LIKE"
    const ymlContainer = document.getElementById('yml-container');
    const sameCategoryProducts = productsDatabase.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
    const displayYml = sameCategoryProducts.length > 0 ? sameCategoryProducts : productsDatabase.slice(0, 5);
    if (ymlContainer) {
        ymlContainer.innerHTML = '';
        displayYml.forEach(p => {
            ymlContainer.innerHTML += `
                <a href="details.html?id=${p.id}" class="yml-item">
                    <div class="yml-img"><img src="${p.image}" alt="${p.title}"></div>
                    <div class="yml-info">
                        <h4>${p.title}</h4>
                        <span class="price-range">$${p.price.toFixed(2)} - $${(p.price * 1.2).toFixed(2)}</span>
                    </div>
                </a>
            `;
        });
    }

    // 6. "RELATED PRODUCTS"
    const relatedContainer = document.getElementById('related-container');
    const promotedProducts = productsDatabase.filter(p => p.id !== product.id).slice(5, 11); 
    if (relatedContainer) {
        relatedContainer.innerHTML = '';
        promotedProducts.forEach(p => {
            relatedContainer.innerHTML += `
                <a href="details.html?id=${p.id}" class="related-card">
                    <div class="img-box"><img src="${p.image}" alt="${p.title}"></div>
                    <h4>${p.title}</h4>
                    <span class="price">$${p.price.toFixed(2)} - $${(p.price * 1.2).toFixed(2)}</span>
                </a>
            `;
        });
    }

    // 7. TABS LOGIC
    const tabHeaders = document.querySelectorAll('.tabs-header .tab');
    const tabPanes = document.querySelectorAll('.tab-content .tab-pane');
    tabHeaders.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabHeaders.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.style.display = 'none');
            tab.classList.add('active');
            tabPanes[index].style.display = 'block';
        });
    });

    // 8. DYNAMIC MOBILE PILLS LOGIC
    const mobilePills = document.querySelectorAll('.mobile-category-pills .pill');
    mobilePills.forEach(pill => {
        if (pill.innerText.trim() === product.category) {
            pill.classList.add('active');
            setTimeout(() => { pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 100);
        }
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.innerText.trim();
            window.location.href = `products.html?category=${encodeURIComponent(categoryName)}`;
        });
    });

    // 9. ADD TO CART LOGIC
// 9. ADD TO CART LOGIC (FIXED FOR BOTH MOBILE & DESKTOP)
    const primaryButtons = document.querySelectorAll('.button-primary');
    
    primaryButtons.forEach(btn => {
        // Only target the buttons that say "Send inquiry" or "Add to cart"
        if(btn.innerText.includes('Send inquiry') || btn.innerText.includes('Add to cart')) {
            
            btn.innerText = "Add to cart"; // Renames the button
            
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Stops the button from reloading the page
                
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.qty += 1;
                } else {
                    cart.push({ id: productId, qty: 1 });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Visual feedback for whichever button was clicked
                btn.innerText = "✓ Added!";
                btn.style.backgroundColor = "#00b517";
                btn.style.borderColor = "#00b517";
                btn.style.color = "#fff";
                
                setTimeout(() => {
                    btn.innerText = "Add to cart";
                    btn.style.backgroundColor = "";
                    btn.style.borderColor = "";
                }, 2000);
            });
        }
    });

    // 10. SAVE FOR LATER LOGIC
    const saveBtns = document.querySelectorAll('.save-btn, .fav-btn-mobile');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let saved = JSON.parse(localStorage.getItem('savedItems')) || [];
            
            if (!saved.includes(productId)) {
                saved.push(productId);
                localStorage.setItem('savedItems', JSON.stringify(saved));
            }
            
            // Visual Feedback
            if(this.classList.contains('save-btn')) {
                this.innerHTML = `<i class="ph-fill ph-heart" style="font-size: 18px; margin-right: 6px; color: #fa3434;"></i> Saved`;
            } else {
                this.innerHTML = `<i class="ph-fill ph-heart" style="font-size: 20px; color: #fa3434;"></i>`;
            }
        });
    });
});