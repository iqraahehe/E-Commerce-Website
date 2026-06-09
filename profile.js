document.addEventListener("DOMContentLoaded", () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if the user is actually logged in
    if (!currentUser) {
        document.getElementById('prof-main').innerHTML = `
            <div style="text-align: center; margin: 80px auto; max-width: 400px; padding: 20px;">
                <i class="ph-fill ph-user-circle" style="font-size: 64px; color: #dee2e6; margin-bottom: 20px;"></i>
                <h2 style="font-size: 20px; color: #1c1c1c; margin-bottom: 10px;">Sign in to view your profile</h2>
                <p style="color: #8b96a5; margin-bottom: 20px;">Access your account details, manage your orders, messages, and saved items.</p>
                <a href="index.html" style="display: inline-block; padding: 10px 20px; text-decoration: none; border-radius: 6px; background: #0d7dfa; color: white; font-weight: 500;">Go to Homepage</a>
            </div>`;
        return;
    }

    // Render the profile immediately
    renderProfilePage(currentUser);
});

/* ══ MAIN RENDER FUNCTION ══ */
function renderProfilePage(user) {
    const orders   = JSON.parse(localStorage.getItem('orderHistory_'   + user.id)) || [];
    const messages = JSON.parse(localStorage.getItem('messagesHistory_' + user.id)) || [];
    const saved    = JSON.parse(localStorage.getItem('savedItems_'      + user.id)) || [];
    
    // Generate initials for avatar
    const initials = user.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) : "U";

    function val(v) {
        return v ? `<span>${escHtml(v)}</span>` : `<span class="empty">Not set</span>`;
    }

    document.getElementById('prof-main').innerHTML = `
        <div class="prof-container">
            <div class="prof-page-title"><i class="ph-fill ph-user-circle" style="font-size:26px;color:#0d7dfa"></i> My Profile</div>
            <div class="prof-alert" id="prof-alert"></div>

            <div class="prof-hero">
                <div class="prof-avatar" id="prof-avatar">${escHtml(initials)}</div>
                <div class="prof-hero-info">
                    <h2 id="prof-hero-name">${escHtml(user.name || "User")}</h2>
                    <p id="prof-hero-email">${escHtml(user.email)}</p>
                    <div class="prof-member-badge"><i class="ph-fill ph-seal-check"></i> Verified Member</div>
                </div>
                <button class="prof-edit-hero-btn" id="prof-edit-toggle-btn" onclick="toggleEditMode()">
                    <i class="ph ph-pencil-simple" style="font-size:15px"></i> Edit profile
                </button>
            </div>

            <div class="prof-stats">
                <div class="prof-stat-card"><div class="prof-stat-num">${orders.length}</div><div class="prof-stat-label">Orders</div></div>
                <div class="prof-stat-card"><div class="prof-stat-num">${messages.length}</div><div class="prof-stat-label">Messages</div></div>
                <div class="prof-stat-card"><div class="prof-stat-num">${saved.length}</div><div class="prof-stat-label">Saved Items</div></div>
            </div>

            <div class="prof-grid">
                <div class="prof-card">
                    <div class="prof-card-title"><i class="ph-fill ph-user"></i> Personal Information</div>
                    ${field('Full Name', 'name', val(user.name), `<input class="prof-input" id="edit-name" type="text" value="${escAttr(user.name)}" placeholder="Full name" />`)}
                    ${field('Email Address', 'email', val(user.email), `<input class="prof-input readonly-styled" id="edit-email" type="email" value="${escAttr(user.email)}" disabled title="Email cannot be changed" />`)}
                    ${field('Date of Birth', 'dob', val(user.dob), `<input class="prof-input" id="edit-dob" type="date" value="${escAttr(user.dob||'')}" />`)}
                    ${field('Gender', 'gender', val(user.gender), genderSelect(user.gender))}
                </div>

                <div class="prof-card">
                    <div class="prof-card-title"><i class="ph-fill ph-phone"></i> Contact Details</div>
                    ${field('Phone Number', 'phone', val(user.phone), `<input class="prof-input" id="edit-phone" type="tel" value="${escAttr(user.phone||'')}" placeholder="+1 234 567 8900" />`)}
                    ${field('WhatsApp', 'whatsapp', val(user.whatsapp), `<input class="prof-input" id="edit-whatsapp" type="tel" value="${escAttr(user.whatsapp||'')}" placeholder="+1 234 567 8900" />`)}
                    ${field('Website / Social', 'website', val(user.website), `<input class="prof-input" id="edit-website" type="url" value="${escAttr(user.website||'')}" placeholder="https://yoursite.com" />`)}
                </div>

                <div class="prof-card">
                    <div class="prof-card-title"><i class="ph-fill ph-map-pin"></i> Address</div>
                    ${field('Country', 'country', val(user.country), countrySelect(user.country))}
                    ${field('City', 'city', val(user.city), `<input class="prof-input" id="edit-city" type="text" value="${escAttr(user.city||'')}" placeholder="Your city" />`)}
                    ${field('Street Address', 'address', val(user.address), `<input class="prof-input" id="edit-address" type="text" value="${escAttr(user.address||'')}" placeholder="123 Main Street" />`)}
                    ${field('ZIP / Postal', 'zip', val(user.zip), `<input class="prof-input" id="edit-zip" type="text" value="${escAttr(user.zip||'')}" placeholder="10001" />`)}
                </div>

                <div class="prof-card">
                    <div class="prof-card-title"><i class="ph-fill ph-lock-key"></i> Password &amp; Security</div>
                    <div class="prof-field">
                        <label>Current Password</label>
                        <div class="prof-field-value password-dots" id="view-password">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
                        <div class="prof-password-group" style="display:none" id="edit-pw-current-wrap">
                            <input class="prof-input" id="edit-pw-current" type="password" placeholder="Enter current password" />
                            <button class="prof-pw-toggle" type="button" onclick="togglePw('edit-pw-current',this)"><i class="ph ph-eye"></i></button>
                        </div>
                    </div>
                    <div class="prof-field" id="new-pw-field" style="display:none">
                        <label>New Password</label>
                        <div class="prof-password-group">
                            <input class="prof-input" id="edit-pw-new" type="password" placeholder="New password (min 6 chars)" />
                            <button class="prof-pw-toggle" type="button" onclick="togglePw('edit-pw-new',this)"><i class="ph ph-eye"></i></button>
                        </div>
                    </div>
                    <div class="prof-field" id="confirm-pw-field" style="display:none">
                        <label>Confirm New Password</label>
                        <div class="prof-password-group">
                            <input class="prof-input" id="edit-pw-confirm" type="password" placeholder="Repeat new password" />
                            <button class="prof-pw-toggle" type="button" onclick="togglePw('edit-pw-confirm',this)"><i class="ph ph-eye"></i></button>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#8b96a5;margin-top:8px" id="pw-hint">To change your password, click <strong>Edit profile</strong> above.</p>
                </div>

                <div class="prof-card prof-danger full-width">
                    <div class="prof-card-title"><i class="ph-fill ph-warning"></i> Danger Zone</div>
                    <p style="font-size:13px;color:#505050;margin-bottom:4px">Sign out of your account or permanently delete it.</p>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px">
                        <button class="prof-btn-danger" onclick="handleSignOut()"><i class="ph ph-sign-out"></i> Sign out</button>
                        <button class="prof-btn-danger" onclick="handleDeleteAccount()" style="border-color:#e53935;background:#fff3f3"><i class="ph ph-trash"></i> Delete account</button>
                    </div>
                </div>
            </div>

            <div class="prof-action-bar" id="prof-action-bar">
                <button class="prof-btn-cancel" onclick="cancelEdit()">Cancel</button>
                <button class="prof-btn-save" onclick="saveProfile()"><i class="ph ph-floppy-disk"></i> Save changes</button>
            </div>
        </div>`;
}

/* ══ BUILDERS & SELECTS ══ */
function field(label, key, viewHtml, editHtml) {
    return `<div class="prof-field">
        <label>${label}</label>
        <div class="prof-field-value" id="view-${key}">${viewHtml}</div>
        <div id="edit-${key}-wrap" style="display:none">${editHtml}</div>
    </div>`;
}

function genderSelect(selected) {
    const opts = ['','Male','Female','Other','Prefer not to say'];
    const labels = ['Select gender','Male','Female','Other','Prefer not to say'];
    return `<select class="prof-input" id="edit-gender">
        ${opts.map((o,i) => `<option value="${o}" ${selected===o?'selected':''}>${labels[i]}</option>`).join('')}
    </select>`;
}

function countrySelect(selected) {
    const countries = ['United States','United Kingdom','Canada','Australia','Germany','France','India','China','Japan','Brazil','Mexico','South Africa','UAE'];
    return `<select class="prof-input" id="edit-country"><option value="">Select country</option>
        ${countries.map(c => `<option value="${c}" ${selected===c?'selected':''}>${c}</option>`).join('')}
    </select>`;
}

/* ══ EDIT MODE LOGIC ══ */
let editMode = false;
const FIELD_KEYS = ['name','email','dob','gender','phone','whatsapp','website','country','city','address','zip'];

function toggleEditMode() {
    editMode = !editMode;
    const editBtn = document.getElementById('prof-edit-toggle-btn');

    FIELD_KEYS.forEach(k => {
        const v = document.getElementById('view-' + k);
        const e = document.getElementById('edit-' + k + '-wrap');
        if (v) v.style.display = editMode ? 'none' : 'flex';
        if (e) e.style.display = editMode ? '' : 'none';
    });

    const vp = document.getElementById('view-password');
    const ep = document.getElementById('edit-pw-current-wrap');
    if (vp) vp.style.display = editMode ? 'none' : 'flex';
    if (ep) ep.style.display = editMode ? '' : 'none';

    ['new-pw-field','confirm-pw-field'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = editMode ? '' : 'none';
    });

    const pwHint = document.getElementById('pw-hint');
    if (pwHint) pwHint.style.display = editMode ? 'none' : '';

    const bar = document.getElementById('prof-action-bar');
    if (bar) bar.classList.toggle('visible', editMode);

    if (editBtn) {
        if (editMode) {
            editBtn.innerHTML = '<i class="ph ph-x" style="font-size:15px"></i> Cancel edit';
            editBtn.classList.add('active');
        } else {
            editBtn.innerHTML = '<i class="ph ph-pencil-simple" style="font-size:15px"></i> Edit profile';
            editBtn.classList.remove('active');
        }
    }
    clearAlert();
}

function cancelEdit() { if (editMode) toggleEditMode(); }

/* ══ SAVE LOGIC ══ */
function saveProfile() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    clearAlert();

    let name = (document.getElementById('edit-name-wrap').querySelector('input') || {}).value;
    if (name) name = name.trim();
    if (!name) return showAlert('error','Full name cannot be empty.');

    const pwCurrent = (document.getElementById('edit-pw-current') || {}).value || '';
    const pwNew     = (document.getElementById('edit-pw-new')     || {}).value || '';
    const pwConfirm = (document.getElementById('edit-pw-confirm') || {}).value || '';

    // Check Password changes
    if (pwCurrent || pwNew || pwConfirm) {
        if (!pwCurrent) return showAlert('error','Please enter your current password.');
        if (pwCurrent !== currentUser.pass) return showAlert('error','Current password is incorrect.');
        if (!pwNew) return showAlert('error','Please enter a new password.');
        if (pwNew.length < 6) return showAlert('error','New password must be at least 6 characters.');
        if (pwNew !== pwConfirm) return showAlert('error','New passwords do not match.');
    }

    const g = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };

    // Update object
    const updated = {
        ...currentUser,
        name:     name,
        dob:      g('edit-dob'),
        gender:   g('edit-gender'),
        phone:    g('edit-phone'),
        whatsapp: g('edit-whatsapp'),
        website:  g('edit-website'),
        country:  g('edit-country'),
        city:     g('edit-city'),
        address:  g('edit-address'),
        zip:      g('edit-zip'),
        pass:     pwNew || currentUser.pass
    };

    // Save to database logic
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) users[idx] = updated;
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updated));

    /* Refresh View UI manually to avoid full page reload */
    const sv = (key, v) => {
        const el = document.getElementById('view-' + key);
        if (!el) return;
        el.innerHTML = v ? `<span>${escHtml(v)}</span>` : `<span class="empty">Not set</span>`;
        el.classList.toggle('empty', !v);
    };
    
    sv('name', updated.name); sv('email', updated.email); sv('dob', updated.dob);
    sv('gender', updated.gender); sv('phone', updated.phone); sv('whatsapp', updated.whatsapp);
    sv('website', updated.website); sv('country', updated.country); sv('city', updated.city);
    sv('address', updated.address); sv('zip', updated.zip);

    const heroName = document.getElementById('prof-hero-name');
    const avatar   = document.getElementById('prof-avatar');
    if (heroName) heroName.textContent = updated.name;
    if (avatar)   avatar.textContent   = updated.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

    ['edit-pw-current','edit-pw-new','edit-pw-confirm'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
    });

    if (editMode) toggleEditMode();
    showAlert('success','Profile updated successfully!');
    window.scrollTo({top:0, behavior:'smooth'});
}

/* ══ HELPERS ══ */
function showAlert(type, msg) {
    const el = document.getElementById('prof-alert');
    if (!el) return;
    el.className = 'prof-alert ' + type;
    el.innerHTML = `<i class="ph-fill ${type==='success'?'ph-check-circle':'ph-warning'}"></i> ${escHtml(msg)}`;
}
function clearAlert() {
    const el = document.getElementById('prof-alert');
    if (el) { el.className = 'prof-alert'; el.innerHTML = ''; }
}
function togglePw(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    const icon = btn.querySelector('i');
    if (icon) icon.className = isText ? 'ph ph-eye' : 'ph ph-eye-slash';
}

/* ══ MODAL DANGER ACTIONS ══ */
function handleSignOut() {
    document.getElementById('prof-signout-modal').classList.add('open');
}
function handleDeleteAccount() {
    document.getElementById('prof-delete-modal').classList.add('open');
}
function closeProfModal(id) {
    document.getElementById(id).classList.remove('open');
}
function confirmSignOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
function confirmDeleteAccount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Remove user from the database array
    users = users.filter(u => u.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear out session
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(str) { return escHtml(str); }