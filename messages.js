document.addEventListener("DOMContentLoaded", () => {
    function getUserKey(base, user) {
        user = user || JSON.parse(localStorage.getItem('currentUser'));
        return user ? base + '_' + user.id : base;
    }

    const messagesContainer = document.getElementById('messages-container');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // ── AUTH GUARD ──
    if (!currentUser) {
        messagesContainer.innerHTML = `
            <div class="cart-card" style="text-align:center;padding:50px 20px;">
                <i class="ph-fill ph-chat-circle-dots" style="font-size:56px;color:#dee2e6;margin-bottom:16px;display:block;"></i>
                <h3 style="font-size:20px;color:#1c1c1c;margin-bottom:8px;">Sign in to view your messages</h3>
                <p style="color:#8b96a5;margin-bottom:24px;font-size:14px;">Your inquiry messages are saved to your account.</p>
                <a href="index.html" style="background:#0d7dfa;color:#fff;border-radius:8px;padding:11px 28px;font-size:14px;font-weight:600;text-decoration:none;font-family:inherit;">Go to Homepage</a>
            </div>`;
        return;
    }

    const messagesHistory = JSON.parse(localStorage.getItem(getUserKey('messagesHistory', currentUser))) || [];

    if (messagesHistory.length === 0) {
        messagesContainer.innerHTML = `
            <div class="cart-card" style="text-align:center;padding:40px 20px;">
                <i class="ph ph-chat-circle-dots" style="font-size:48px;color:#dee2e6;margin-bottom:15px;display:block;"></i>
                <h3 style="font-size:18px;color:#1c1c1c;margin-bottom:10px;">No messages yet</h3>
                <p style="color:#8b96a5;margin-bottom:20px;">When you send quote inquiries to suppliers, they will appear here.</p>
                <a href="index.html" class="btn-back-shop">Go to Homepage</a>
            </div>`;
        return;
    }

    let html = '';
    messagesHistory.forEach(msg => {
        html += `
            <div class="cart-card" style="margin-bottom:20px;">
                <div style="border-bottom:1px solid #dee2e6;padding-bottom:15px;display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;gap:15px;align-items:center;">
                        <div style="width:40px;height:40px;border-radius:50%;background:#0d7dfa;color:white;display:flex;align-items:center;justify-content:center;font-size:20px;">
                            <i class="ph ph-user"></i>
                        </div>
                        <div>
                            <strong style="display:block;font-size:15px;color:#1c1c1c;">Supplier Inquiry</strong>
                            <span style="color:#8b96a5;font-size:13px;">${msg.date}</span>
                        </div>
                    </div>
                    <span style="background:#eef9ee;color:#00b517;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600;">${msg.status}</span>
                </div>
                <div style="padding-top:15px;">
                    <h4 style="font-size:16px;margin-bottom:10px;color:#1c1c1c;">Requesting: ${msg.item}</h4>
                    <div style="background:#f7fafc;padding:15px;border-radius:6px;border:1px solid #e3e8ee;">
                        <p style="color:#505050;font-size:14px;margin-bottom:10px;"><strong>Details provided:</strong><br>${msg.details ? msg.details : '<i>No extra details provided.</i>'}</p>
                        <p style="color:#505050;font-size:14px;margin:0;"><strong>Requested Quantity:</strong> ${msg.quantity} ${msg.unit}</p>
                    </div>
                </div>
            </div>`;
    });

    messagesContainer.innerHTML = html;
});