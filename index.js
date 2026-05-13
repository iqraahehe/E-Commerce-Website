document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Side Nav Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sideNav = document.getElementById('side-nav');
    
    // Create the dark overlay for the mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openNav() {
        sideNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeNav() {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    if(menuBtn) menuBtn.addEventListener('click', openNav);
    if(closeBtn) closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav); 

    // --- Deals Countdown Timer Logic ---
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (hoursEl && minsEl && secsEl) {
        let timeInSeconds = (13 * 3600) + (34 * 60) + 56;
        
        const timer = setInterval(() => {
            timeInSeconds--;
            
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;

            // Update DOM
            hoursEl.innerText = String(hours).padStart(2, '0');
            minsEl.innerText = String(minutes).padStart(2, '0');
            secsEl.innerText = String(seconds).padStart(2, '0');

            if (timeInSeconds <= 0) {
                clearInterval(timer);
                hoursEl.innerText = "00";
                minsEl.innerText = "00";
                secsEl.innerText = "00";
            }
        }, 1000);
    }

    // --- Desktop Sidebar Selection Logic ---
    const sidebarItems = document.querySelectorAll('.side-categories ul li');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Allows the link to actually route to products.html, but if it's #, stops jumping
            if(this.querySelector('a').getAttribute('href') === '#') {
                e.preventDefault(); 
            }
            sidebarItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
        });
    });

 // --- NEW: Mobile Pills Routing ---
    const mobilePills = document.querySelectorAll('.mobile-category-pills .pill');
    mobilePills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.innerText.trim();
            // Route to products page with the CATEGORY parameter
            window.location.href = `products.html?category=${encodeURIComponent(categoryName)}`;
        });
    });

    // --- Quote Request Form & Toast Logic ---
    const btnSendQuote = document.querySelector('.quote-form-card .button-primary');
    const quoteInputs = document.querySelectorAll('.quote-form-card input, .quote-form-card textarea');
    const successToast = document.getElementById('success-toast');
    const closeToastBtn = document.getElementById('close-toast');
    let toastTimeout;

    if (btnSendQuote && successToast) {
        btnSendQuote.addEventListener('click', (e) => {
            e.preventDefault(); // Stop page reload
            
            // 1. Slide the toast onto the screen
            successToast.classList.add('show');
            
            // 2. Clear out the form inputs
            quoteInputs.forEach(input => input.value = '');
            
            // 3. Automatically hide it after 4 seconds
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                successToast.classList.remove('show');
            }, 4000);
        });
    }

    // Allow user to manually close the toast with the 'x'
    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', () => {
            successToast.classList.remove('show');
            clearTimeout(toastTimeout);
        });
    }
});