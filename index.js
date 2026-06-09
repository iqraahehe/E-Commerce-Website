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
    const btnSendQuote = document.getElementById('btn-submit-quote') || document.querySelector('.quote-form-card .button-primary');
    const quoteInputs = document.querySelectorAll('.quote-form-card input, .quote-form-card textarea');
    const successToast = document.getElementById('success-toast');
    const closeToastBtn = document.getElementById('close-toast');
    let toastTimeout;

    if (btnSendQuote && successToast) {
        btnSendQuote.addEventListener('click', (e) => {
            e.preventDefault(); // Stop page reload
            
            // --- NEW: Save the inquiry to Local Storage ---
            const itemInput = document.getElementById('quote-item');
            const detailsInput = document.getElementById('quote-details');
            const qtyInput = document.getElementById('quote-qty');
            const unitInput = document.getElementById('quote-unit');

            // Only save if the user actually typed an item name
            if(itemInput && itemInput.value.trim() !== "") {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    openAuthModal('login');
                    return;
                }
                const msgKey = getUserKey('messagesHistory', currentUser);
                let messagesHistory = JSON.parse(localStorage.getItem(msgKey)) || [];

                const newMessage = {
                    id: 'MSG-' + Math.floor(Math.random() * 100000),
                    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                    item: itemInput.value,
                    details: detailsInput ? detailsInput.value : "",
                    quantity: qtyInput ? qtyInput.value : "",
                    unit: unitInput ? unitInput.value : "Pcs",
                    status: "Sent"
                };

                messagesHistory.unshift(newMessage);
                localStorage.setItem(msgKey, JSON.stringify(messagesHistory));
            }
            // ----------------------------------------------
            
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

    // Allow user to manually close the toast with the 'x'
    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', () => {
            successToast.classList.remove('show');
            clearTimeout(toastTimeout);
        });
    }
});
// ==========================================
// AUTHENTICATION POPUP MODAL LOGIC
// ==========================================

function openAuthModal(mode) {
    document.getElementById('auth-modal').classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    switchAuthMode(mode);
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('popup-login-form');
    const registerForm = document.getElementById('popup-register-form');
    const title = document.getElementById('auth-modal-title');

    if (mode === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        title.innerHTML = '<i class="ph-fill ph-user-plus" style="color:#0d7dfa; font-size: 20px;"></i> Create Account';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        title.innerHTML = '<i class="ph-fill ph-user-circle" style="color:#0d7dfa; font-size: 20px;"></i> Log In';
    }
}

// Close modal if user clicks outside the box
document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    if(authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === this) closeAuthModal();
        });
    }

    // Handle Registration Submit
    const regForm = document.getElementById('popup-register-form');
    if(regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;

            if (users.find(u => u.email === email)) {
                alert("An account with this email already exists!");
                return;
            }

            const newUser = { id: 'USR-'+Date.now(), name, email, pass };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            closeAuthModal();
            updateAuthUI(); // Update header + hero card in place
        });
    }

    // Handle Login Submit
    const loginFormElement = document.getElementById('popup-login-form');
    if(loginFormElement) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;

            const user = users.find(u => u.email === email && u.pass === pass);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                closeAuthModal();
                updateAuthUI(); // Update header + hero card in place
            } else {
                alert("Incorrect email or password. Please try again.");
            }
        });
    }

    // Run on every page load to restore logged-in state
    updateAuthUI();
});

/* ══════════════════════════════════════════
   USER-SCOPED STORAGE KEY HELPER
   All user data is stored under keys like "cart_USR-123"
   so each account has completely separate data.
   ══════════════════════════════════════════ */
function getUserKey(base, user) {
    user = user || JSON.parse(localStorage.getItem('currentUser'));
    return user ? base + '_' + user.id : base;
}

/* ══════════════════════════════════════════
   AUTH UI — updates header + hero card
   ══════════════════════════════════════════ */
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    /* ── Desktop header profile action ── */
    const headerProfileAction = document.getElementById('header-profile-action');
    if (headerProfileAction) {
        if (currentUser) {
            const initials = currentUser.name
                ? currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
                : 'U';
            headerProfileAction.innerHTML = `
                <a href="profile.html" style="text-decoration:none;color:#0d7dfa;display:flex;flex-direction:column;align-items:center;gap:2px;">
                    <span class="icon">
                        <span style="width:28px;height:28px;border-radius:50%;background:#0d7dfa;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1;">${initials}</span>
                    </span>
                    <span class="label" style="font-size:11px;max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escIndexHtml(currentUser.name.split(' ')[0])}</span>
                </a>`;
        } else {
            headerProfileAction.innerHTML = `
                <span class="icon"><i class="ph-fill ph-user" style="font-size:24px"></i></span>
                <span class="label">Profile</span>`;
            headerProfileAction.onclick = () => openAuthModal('login');
        }
    }

    /* ── Mobile header profile icon ── */
    const mobileProfileIcon = document.getElementById('mobile-profile-icon');
    if (mobileProfileIcon) {
        if (currentUser) {
            mobileProfileIcon.href = 'profile.html';
            mobileProfileIcon.innerHTML = `<i class="ph-fill ph-user-circle" style="font-size:24px;color:#0d7dfa"></i>`;
        } else {
            mobileProfileIcon.href = '#';
            mobileProfileIcon.innerHTML = `<i class="ph ph-user" style="font-size:24px"></i>`;
            mobileProfileIcon.onclick = (e) => { e.preventDefault(); openAuthModal('login'); };
        }
    }

    /* ── Hero user card ── */
    const heroCard = document.getElementById('hero-user-card');
    if (heroCard) {
        if (currentUser) {
            const initials = currentUser.name
                ? currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
                : 'U';
            heroCard.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar" style="background:#0d7dfa;font-weight:700;font-size:15px;">
                        ${initials}
                    </div>
                    <h4>Hi, <strong>${escIndexHtml(currentUser.name.split(' ')[0])}</strong><br/><span style="font-weight:400;font-size:12px;color:#505050;">Welcome back!</span></h4>
                </div>
                <a href="profile.html" class="btn-join" style="display:block;width:100%;cursor:pointer;text-align:center;text-decoration:none;padding:6px;border-radius:6px;background:#0d7dfa;color:#fff;font-weight:500;font-size:13px;margin-bottom:6px;">
                    <i class="ph ph-user-circle"></i> My Profile
                </a>
                <button class="btn-login" onclick="openSignOutModal()" style="display:block;width:100%;cursor:pointer;">
                    <i class="ph ph-sign-out"></i> Sign out
                </button>
                <div class="card card-promo">
                    Get US $10 off <br />with a new <br />supplier
                </div>
                <div class="card card-quotes">
                    Send quotes with <br />supplier <br />preferences
                </div>`;
        } else {
            heroCard.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar">
                        <img src="Assets/avatar=pic1.jpg" alt="User Profile" />
                    </div>
                    <h4>Hi, user <br/>let's get started</h4>
                </div>
                <button class="btn-join" onclick="openAuthModal('register')" style="display:block;width:100%;cursor:pointer;">Join now</button>
                <button class="btn-login" onclick="openAuthModal('login')" style="display:block;width:100%;cursor:pointer;">Log in</button>
                <div class="card card-promo">
                    Get US $10 off <br />with a new <br />supplier
                </div>
                <div class="card card-quotes">
                    Send quotes with <br />supplier <br />preferences
                </div>`;
        }
    }

    /* ── Mobile side nav ── */
    const authText = document.querySelector('.auth-text');
    if (authText) {
        authText.textContent = currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Sign in | Register';
        authText.style.cursor = currentUser ? 'default' : 'pointer';
        if (!currentUser) authText.onclick = () => openAuthModal('login');
    }
}

function openSignOutModal() {
    const modal = document.getElementById('index-signout-modal');
    if (modal) modal.classList.add('open');
}

function doSignOut() {
    localStorage.removeItem('currentUser');
    const modal = document.getElementById('index-signout-modal');
    if (modal) modal.classList.remove('open');
    updateAuthUI();
}

function escIndexHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
