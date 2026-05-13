document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list-container");
  if (!productContainer) return;

  const productsDatabase = [
    {
      id: 1,
      title: "Canon Camera EOS 2000, Black 10x zoom",
      category: "Electronics",
      brand: "Canon",
      features: ["Plastic cover", "8GB Ram"],
      condition: "Brand new",
      price: 89.0,
      oldPrice: 120.0,
      rating: 4,
      verified: true,
      orders: 154,
      image: "Assets/Image/tech/cameras.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 2,
      title: "GoPro HERO6 4K Action Camera - Black",
      category: "Electronics",
      brand: "GoPro",
      features: ["Metallic"],
      condition: "Brand new",
      price: 99.5,
      oldPrice: 1128.0,
      rating: 5,
      verified: true,
      orders: 890,
      image: "Assets/Image/tech/camera2.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 3,
      title: "Macbook Pro M2 14-inch Space Gray",
      category: "Computer and tech",
      brand: "Apple",
      features: ["Metallic", "Large Memory", "Super power"],
      condition: "Brand new",
      price: 1499.0,
      oldPrice: null,
      rating: 5,
      verified: true,
      orders: 312,
      image: "Assets/Image/tech/mac.jpeg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 4,
      title: "iPhone 13 Pro Max - 256GB Blue",
      category: "Smartphones",
      brand: "Apple",
      features: ["Metallic", "Large Memory"],
      condition: "Refurbished",
      price: 899.0,
      oldPrice: 1099.0,
      rating: 4,
      verified: false,
      orders: 1024,
      image: "Assets/Image/tech/iphone.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 5,
      title: "Lenovo ThinkPad X1 Carbon",
      category: "Computer and tech",
      brand: "Lenovo",
      features: ["Plastic cover", "8GB Ram"],
      condition: "Refurbished",
      price: 340.0,
      oldPrice: 450.0,
      rating: 4,
      verified: false,
      orders: 420,
      image: "Assets/Image/tech/laptop.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 6,
      title: "Sony Noise Cancelling Headphones",
      category: "Mobile accessory",
      brand: "Sony",
      features: ["Plastic cover"],
      condition: "Brand new",
      price: 10.0,
      oldPrice: 20.0,
      rating: 5,
      verified: true,
      orders: 2000,
      image: "Assets/Image/tech/headphone.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 7,
      title: "Smartwatch Silver Color Modern",
      category: "Mobile accessory",
      brand: "Other",
      features: ["Metallic"],
      condition: "Brand new",
      price: 19.0,
      oldPrice: 25.0,
      rating: 3,
      verified: false,
      orders: 300,
      image: "Assets/Image/tech/smartwatches.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 8,
      title: "Gaming Headset with Mic",
      category: "Mobile accessory",
      brand: "Other",
      features: ["Plastic cover"],
      condition: "Brand new",
      price: 8.99,
      oldPrice: 15.0,
      rating: 4,
      verified: true,
      orders: 800,
      image: "Assets/Image/tech/gaming.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 9,
      title: "10-inch Android Tablet",
      category: "Electronics",
      brand: "Samsung",
      features: ["Large Memory"],
      condition: "Brand new",
      price: 90.0,
      oldPrice: 110.0,
      rating: 4,
      verified: true,
      orders: 120,
      image: "Assets/Image/tech/tablet.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 10,
      title: "T-shirts with multiple colors, for men",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 10.3,
      oldPrice: 15.0,
      rating: 4,
      verified: true,
      orders: 540,
      image: "Assets/Image/cloth/tshirt.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 11,
      title: "Brown winter coat medium size",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 12.5,
      oldPrice: 20.0,
      rating: 5,
      verified: true,
      orders: 120,
      image: "Assets/Image/cloth/jacket.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 12,
      title: "Jeans shorts for men blue color",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 10.3,
      oldPrice: null,
      rating: 3,
      verified: false,
      orders: 85,
      image: "Assets/Image/cloth/shorts.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 13,
      title: "Jeans bag for travel for men",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 34.0,
      oldPrice: 45.0,
      rating: 5,
      verified: true,
      orders: 200,
      image: "Assets/Image/cloth/bag.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 14,
      title: "Classic Leather Wallet",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 99.0,
      oldPrice: 120.0,
      rating: 5,
      verified: true,
      orders: 500,
      image: "Assets/Image/cloth/wallet.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 15,
      title: "Soft chairs Beige",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 19.0,
      oldPrice: 30.0,
      rating: 4,
      verified: true,
      orders: 45,
      image: "Assets/Image/interior/softchair.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 16,
      title: "Coffee maker in white color",
      category: "Home and outdoor",
      brand: "Other",
      features: ["Super power"],
      condition: "Brand new",
      price: 10.3,
      oldPrice: null,
      rating: 5,
      verified: true,
      orders: 310,
      image: "Assets/Image/interior/coffee.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 17,
      title: "Ceramic Kitchen Crockery Set",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 19.0,
      oldPrice: null,
      rating: 4,
      verified: false,
      orders: 20,
      image: "Assets/Image/interior/crockery.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 18,
      title: "Modern Bedside Lamps",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 19.0,
      oldPrice: 25.0,
      rating: 4,
      verified: true,
      orders: 90,
      image: "Assets/Image/interior/lamp.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 19,
      title: "Kitchen Dishes Set",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 19.0,
      oldPrice: 30.0,
      rating: 3,
      verified: false,
      orders: 15,
      image: "Assets/Image/interior/kitchen.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 20,
      title: "Indoor Decorative Plants",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 100.0,
      oldPrice: null,
      rating: 5,
      verified: true,
      orders: 200,
      image: "Assets/Image/interior/plant.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 21,
      title: "Electric Blenders",
      category: "Home and outdoor",
      brand: "Other",
      features: ["Super power"],
      condition: "Brand new",
      price: 39.0,
      oldPrice: 50.0,
      rating: 4,
      verified: true,
      orders: 340,
      image: "Assets/Image/interior/blender.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 22,
      title: "Travel Friendly Electric Kettle",
      category: "Computer and tech",
      brand: "Other",
      features: ["Super power"],
      condition: "Brand new",
      price: 80.95,
      oldPrice: 100.0,
      rating: 5,
      verified: true,
      orders: 1000,
      image: "Assets/Image/tech/kattle.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 23,
      title: "General Home Appliance",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 19.0,
      oldPrice: null,
      rating: 4,
      verified: false,
      orders: 40,
      image: "Assets/Image/interior/homeapp.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 24,
      title: "iPhone 12 - Blue 128GB",
      category: "Smartphones",
      brand: "Apple",
      features: ["Large Memory", "Super power"],
      condition: "Brand new",
      price: 99.5,
      oldPrice: 1128.0,
      rating: 5,
      verified: true,
      orders: 1540,
      image: "Assets/Image/tech/Iphone2.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 25,
      title: "Redmi Smartphone - Black",
      category: "Smartphones",
      brand: "Pocco",
      features: ["Large Memory"],
      condition: "Brand new",
      price: 99.5,
      oldPrice: null,
      rating: 4,
      verified: true,
      orders: 840,
      image: "Assets/Image/tech/redmi.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 26,
      title: "Modern Yellow Armchair",
      category: "Home and outdoor",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 145.0,
      oldPrice: 180.0,
      rating: 5,
      verified: true,
      orders: 85,
      image: "Assets/Image/interior/chair2.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 27,
      title: "Front Load Washing Machine",
      category: "Home and outdoor",
      brand: "Samsung",
      features: ["Super power"],
      condition: "Brand new",
      price: 450.0,
      oldPrice: 550.0,
      rating: 5,
      verified: true,
      orders: 210,
      image: "Assets/Image/interior/machine.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 28,
      title: "Men's Blue Polo Shirt",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 18.5,
      oldPrice: 25.0,
      rating: 4,
      verified: false,
      orders: 320,
      image: "Assets/Image/cloth/blueshirt.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
    {
      id: 29,
      title: "Men's Blue Suit Jacket",
      category: "Clothes and wear",
      brand: "Other",
      features: [],
      condition: "Brand new",
      price: 85.0,
      oldPrice: 110.0,
      rating: 5,
      verified: true,
      orders: 150,
      image: "Assets/Image/cloth/coat.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    },
  ];

  // --- 2. URL PARAMETERS ---
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get("search")
    ? urlParams.get("search").toLowerCase()
    : "";
  const initialCategory = urlParams.get("category") || "All category";

  // --- 3. STATE ---
  let currentView = "list";
  let filters = {
    search: initialSearch,
    category: initialCategory,
    brands: [],
    features: [],
    minRating: 0,
    minPrice: 0,
    maxPrice: 3000,
    condition: "Any",
    verifiedOnly: document.getElementById("verified-only")
      ? document.getElementById("verified-only").checked
      : false,
  };
  let currentSort = "Featured";
  let pagination = { currentPage: 1, itemsPerPage: 9 };

  // --- 4. DOM ELEMENTS ---
  const viewGridBtn = document.getElementById("view-grid");
  const viewListBtn = document.getElementById("view-list");
  const sortDropdown = document.getElementById("sort-dropdown");
  const itemsPerPageDropdown = document.getElementById("items-per-page");
  const listCount = document.getElementById("list-count-num");
  const activeCategoryText = document.getElementById("active-category-text");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  const paginationNumbers = document.getElementById("pagination-numbers");
  const activeFiltersContainer = document.getElementById(
    "active-filters-container",
  );

  const filterCategories = document.querySelectorAll(".filter-category");
  const filterBrands = document.querySelectorAll(".filter-brand");
  const filterFeatures = document.querySelectorAll(".filter-feature");
  const filterRatings = document.querySelectorAll(".filter-rating");
  const filterConditions = document.querySelectorAll('input[name="condition"]');
  const verifiedCheckbox = document.getElementById("verified-only");

  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const sliderMin = document.getElementById("slider-min");
  const sliderMax = document.getElementById("slider-max");
  const sliderTrack = document.getElementById("slider-track");
  const applyPriceBtn = document.getElementById("apply-price-btn");

  // Mobile Elements
  const mobileFilterBtn = document.getElementById("mobile-filter-btn");
  const sidebarFilters = document.getElementById("sidebar-filters");
  const closeFilterBtn = document.getElementById("close-filter-btn");
  const filterOverlay = document.getElementById("filter-overlay");

  if (filters.search)
    document
      .querySelectorAll('input[type="search"]')
      .forEach((input) => (input.value = filters.search));

  // --- 5. MOBILE FILTER MENU LOGIC ---
  function openFilters() {
    sidebarFilters.classList.add("active");
    filterOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeFilters() {
    sidebarFilters.classList.remove("active");
    filterOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileFilterBtn) mobileFilterBtn.addEventListener("click", openFilters);
  if (closeFilterBtn) closeFilterBtn.addEventListener("click", closeFilters);
  if (filterOverlay) filterOverlay.addEventListener("click", closeFilters);

  // --- 6. RENDER ACTIVE FILTERS (The Pills) ---
  function renderActiveFilters() {
    if (!activeFiltersContainer) return;
    activeFiltersContainer.innerHTML = "";
    let filterCount = 0;

    filters.brands.forEach((b) => {
      filterCount++;
      activeFiltersContainer.innerHTML += `<span class="filter-pill">${b} <button data-type="brand" data-val="${b}">✕</button></span>`;
    });
    filters.features.forEach((f) => {
      filterCount++;
      activeFiltersContainer.innerHTML += `<span class="filter-pill">${f} <button data-type="feature" data-val="${f}">✕</button></span>`;
    });
    if (filters.minRating > 0) {
      filterCount++;
      activeFiltersContainer.innerHTML += `<span class="filter-pill">${filters.minRating} star <button data-type="rating">✕</button></span>`;
    }

    if (filterCount > 0)
      activeFiltersContainer.innerHTML += `<a href="#" class="clear-all-filters" id="clear-all-filters">Clear all filter</a>`;

    if (mobileFilterBtn) {
      mobileFilterBtn.innerHTML = `Filter ${filterCount > 0 ? `(${filterCount})` : ""} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`;
    }

    activeFiltersContainer.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const type = e.target.getAttribute("data-type");
        const val = e.target.getAttribute("data-val");
        if (type === "brand") {
          filters.brands = filters.brands.filter((b) => b !== val);
          document.querySelector(`input.filter-brand[value="${val}"]`).checked =
            false;
        }
        if (type === "feature") {
          filters.features = filters.features.filter((f) => f !== val);
          document.querySelector(
            `input.filter-feature[value="${val}"]`,
          ).checked = false;
        }
        if (type === "rating") {
          filters.minRating = 0;
          document
            .querySelectorAll(".filter-rating")
            .forEach((r) => (r.checked = false));
        }
        pagination.currentPage = 1;
        updateUI();
      });
    });

    const clearAll = document.getElementById("clear-all-filters");
    if (clearAll)
      clearAll.addEventListener("click", (e) => {
        e.preventDefault();
        filters.brands = [];
        filters.features = [];
        filters.minRating = 0;
        document
          .querySelectorAll(".filter-brand, .filter-feature, .filter-rating")
          .forEach((cb) => (cb.checked = false));
        pagination.currentPage = 1;
        updateUI();
      });
  }

  // --- 7. RENDER PRODUCTS ---
  function generateStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) starsHTML += "★";
      else starsHTML += '<span class="half-star">★</span>';
    }
    return starsHTML;
  }

  function renderProducts(productsToRender) {
    productContainer.innerHTML = "";
    if (currentView === "grid") productContainer.classList.add("grid-view");
    else productContainer.classList.remove("grid-view");

    if (productsToRender.length === 0) {
      productContainer.innerHTML = `<div style="padding: 40px; text-align: center; color: #8b96a5;"><h3>No products found.</h3><p>Try adjusting your search or filters.</p></div>`;
      return;
    }

    productsToRender.forEach((product) => {
      const oldPriceHTML = product.oldPrice
        ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>`
        : "";
      const starsHTML = generateStars(product.rating);
      const ratingNumberHTML =
        product.rating % 1 === 0 ? product.rating + ".0" : product.rating;

      // This is the URL that links to the specific product details
      const detailUrl = `details.html?id=${product.id}`;

      const productCard = `
                <article class="product-list-card">
                    <a href="${detailUrl}" class="prod-img">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                    <div class="prod-details">
                        <div class="prod-title-row">
                            <a href="${detailUrl}" style="text-decoration: none; color: inherit;">
                                <h3>${product.title}</h3>
                            </a>
                            <button class="fav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
                        </div>
                        <div class="prod-pricing"><span class="price-current">$${product.price.toFixed(2)}</span> ${oldPriceHTML}</div>
                        <div class="prod-stats">
                            <span class="stars">${starsHTML} <span class="rating-num">${ratingNumberHTML}</span></span>
                            <span class="dot">•</span> <span class="orders">${product.orders} orders</span>
                            <span class="dot">•</span> <span class="shipping-badge">Free Shipping</span>
                        </div>
                        <p class="prod-desc">${product.desc}</p>
                        <a href="${detailUrl}" class="view-details-link">View details</a>
                    </div>
                </article>
            `;
      productContainer.innerHTML += productCard;
    });
  }
  function renderPagination(totalPages) {
    if (!paginationNumbers) return;
    paginationNumbers.innerHTML = "";
    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.className = "page-btn nav-arrow";
    prevBtn.innerText = "❮";
    prevBtn.disabled = pagination.currentPage === 1;
    prevBtn.addEventListener("click", () => {
      pagination.currentPage--;
      updateUI();
    });
    paginationNumbers.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `page-btn ${i === pagination.currentPage ? "active" : ""}`;
      pageBtn.innerText = i;
      pageBtn.addEventListener("click", () => {
        pagination.currentPage = i;
        updateUI();
      });
      paginationNumbers.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "page-btn nav-arrow";
    nextBtn.innerText = "❯";
    nextBtn.disabled = pagination.currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      pagination.currentPage++;
      updateUI();
    });
    paginationNumbers.appendChild(nextBtn);
  }

  // --- 8. FILTER, SORT, PAGINATE LOGIC ---
  function updateUI() {
    const searchWords = filters.search
      .toLowerCase()
      .split(" ")
      .filter((w) => w)
      .map((w) => (w.endsWith("s") ? w.slice(0, -1) : w));

    let result = productsDatabase.filter((p) => {
      let searchMatch =
        searchWords.length === 0 ||
        searchWords.every((word) => {
          const searchFields = [
            p.title,
            p.brand,
            p.category,
            p.desc,
            ...(p.keywords || []),
          ];
          return searchFields.some(
            (field) => field && field.toLowerCase().includes(word),
          );
        });
      let catMatch =
        filters.category === "All category" || p.category === filters.category;
      let brandMatch =
        filters.brands.length === 0 || filters.brands.includes(p.brand);
      let featureMatch =
        filters.features.length === 0 ||
        filters.features.some((f) => p.features.includes(f));
      let ratingMatch = p.rating >= filters.minRating;
      let priceMatch =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;
      let conditionMatch =
        filters.condition === "Any" || p.condition === filters.condition;
      let verifiedMatch = !filters.verifiedOnly || p.verified === true;

      return (
        searchMatch &&
        catMatch &&
        brandMatch &&
        featureMatch &&
        ratingMatch &&
        priceMatch &&
        conditionMatch &&
        verifiedMatch
      );
    });

    if (currentSort === "Price: Low to High")
      result.sort((a, b) => a.price - b.price);
    else if (currentSort === "Price: High to Low")
      result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.rating - a.rating);

    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pagination.itemsPerPage) || 1;
    if (pagination.currentPage > totalPages)
      pagination.currentPage = totalPages > 0 ? totalPages : 1;

    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const paginatedResult = result.slice(
      startIndex,
      startIndex + pagination.itemsPerPage,
    );

    renderProducts(paginatedResult);
    renderPagination(totalPages);
    renderActiveFilters();

    if (listCount) listCount.innerText = totalItems;
    const displayName =
      filters.category === "All category" ? "All Products" : filters.category;
    if (activeCategoryText) activeCategoryText.innerText = displayName;
    if (breadcrumbCurrent) breadcrumbCurrent.innerText = displayName;
  }

  // --- 9. PRICE SLIDER UI ---
  function updatePriceSliderUI() {
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);

    if (minVal >= maxVal - 10) {
      sliderMin.value = maxVal - 10;
      minVal = maxVal - 10;
    }

    minPriceInput.value = minVal;
    maxPriceInput.value = maxVal;

    const maxRange = parseInt(sliderMax.max);
    const percentMin = (minVal / maxRange) * 100;
    const percentMax = (maxVal / maxRange) * 100;

    sliderTrack.style.left = percentMin + "%";
    sliderTrack.style.width = percentMax - percentMin + "%";
  }

  if (sliderMin && sliderMax) {
    sliderMin.addEventListener("input", updatePriceSliderUI);
    sliderMax.addEventListener("input", updatePriceSliderUI);
    minPriceInput.addEventListener("change", () => {
      sliderMin.value = minPriceInput.value;
      updatePriceSliderUI();
    });
    maxPriceInput.addEventListener("change", () => {
      sliderMax.value = maxPriceInput.value;
      updatePriceSliderUI();
    });
  }

  // --- 10. EVENT LISTENERS ---
  productContainer.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".fav-btn");
    if (favBtn) {
      e.preventDefault();
      favBtn.classList.toggle("active");
    }
  });

  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener("click", () => {
      currentView = "grid";
      viewGridBtn.classList.add("active");
      viewListBtn.classList.remove("active");
      updateUI();
    });
    viewListBtn.addEventListener("click", () => {
      currentView = "list";
      viewListBtn.classList.add("active");
      viewGridBtn.classList.remove("active");
      updateUI();
    });
  }

  if (sortDropdown)
    sortDropdown.addEventListener("change", (e) => {
      currentSort = e.target.value;
      updateUI();
    });
  if (itemsPerPageDropdown)
    itemsPerPageDropdown.addEventListener("change", (e) => {
      pagination.itemsPerPage = parseInt(e.target.value);
      pagination.currentPage = 1;
      updateUI();
    });
  if (verifiedCheckbox)
    verifiedCheckbox.addEventListener("change", (e) => {
      filters.verifiedOnly = e.target.checked;
      pagination.currentPage = 1;
      updateUI();
    });

  filterCategories.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      filters.category = e.target.getAttribute("data-category");
      filters.search = "";
      pagination.currentPage = 1;
      updateUI();
      if (window.innerWidth <= 900) closeFilters(); // Close drawer on mobile
    });
  });

  filterBrands.forEach((cb) => {
    cb.addEventListener("change", () => {
      filters.brands = Array.from(filterBrands)
        .filter((c) => c.checked)
        .map((c) => c.value);
      pagination.currentPage = 1;
      updateUI();
    });
  });
  filterFeatures.forEach((cb) => {
    cb.addEventListener("change", () => {
      filters.features = Array.from(filterFeatures)
        .filter((c) => c.checked)
        .map((c) => c.value);
      pagination.currentPage = 1;
      updateUI();
    });
  });

  filterRatings.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      if (e.target.checked) {
        filterRatings.forEach((otherCb) => {
          if (otherCb !== e.target) otherCb.checked = false;
        });
        filters.minRating = parseInt(e.target.value);
      } else {
        filters.minRating = 0;
      }
      pagination.currentPage = 1;
      updateUI();
    });
  });

  filterConditions.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      filters.condition = e.target.value;
      pagination.currentPage = 1;
      updateUI();
    });
  });

  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", () => {
      filters.minPrice = parseFloat(minPriceInput.value) || 0;
      filters.maxPrice = parseFloat(maxPriceInput.value) || Infinity;
      pagination.currentPage = 1;
      updateUI();
      if (window.innerWidth <= 900) closeFilters(); // Close drawer on mobile
    });
  }

 // --- 11. MOBILE PILLS LOGIC ---
    const mobilePills = document.querySelectorAll('.mobile-category-pills .pill');
    
    // 1. Set the initial active pill based on the URL
    mobilePills.forEach(pill => {
        if (pill.innerText.trim() === filters.category) {
            pill.classList.add('active');
            // Scroll it into view
            setTimeout(() => pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 100);
        }
    });

    // 2. Handle clicks to filter by category
    mobilePills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            mobilePills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Set the category (NOT search)
            filters.category = this.innerText.trim();
            filters.search = ''; 
            document.querySelectorAll('input[type="search"]').forEach(input => input.value = '');
            
            pagination.currentPage = 1;
            updateUI();
        });
    });

  // Init
  updateUI();
  if (window.innerWidth <= 900 && viewListBtn) {
    viewListBtn.click();
  } else if (viewGridBtn) {
    viewGridBtn.click();
  }
  if (sliderMin) updatePriceSliderUI();
});
