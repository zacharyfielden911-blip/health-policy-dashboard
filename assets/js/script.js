// assets/js/script.js

// وقتی صفحه لود شد، به صورت پیش‌فرض صفحه مقدمه را باز کن
document.addEventListener('DOMContentLoaded', () => {
    loadPage('intro'); 
});

/**
 * تابع اصلی برای بارگذاری محتوا از فایل‌های جداگانه
 * @param {string} pageName - نام فایل بدون پسوند (مثلا 'intro')
 * @param {HTMLElement} btn - دکمه کلیک شده (اختیاری)
 */
async function loadPage(pageName, btn) {
    const displayArea = document.getElementById('content-display');
    
    // 1. نمایش حالت لودینگ (برای زیبایی)
    displayArea.innerHTML = '<div style="text-align:center; padding:50px; color:#999;">در حال بارگذاری... ⏳</div>';

    // 2. مدیریت دکمه‌های فعال منو
    if (btn) {
        document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    try {
        // 3. درخواست فایل از سرور (پوشه pages)
        const response = await fetch(`pages/${pageName}.html`);
        
        if (!response.ok) throw new Error('فایل پیدا نشد!');

        // 4. دریافت متن فایل و نمایش در صفحه
        const htmlContent = await response.text();
        displayArea.innerHTML = htmlContent;

        // 5. اسکرول به بالا
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        displayArea.innerHTML = `<div class="highlight-box box-danger">خطا در بارگذاری محتوا: ${error.message}</div>`;
    }
}

// تابعی برای باز کردن تب‌های داخلی (اگر در فایل‌های HTML استفاده کردید)
function showSubTab(id, btnElement) {
    const parent = btnElement.closest('.content-section') || document.getElementById('content-display');
    parent.querySelectorAll('.sub-content').forEach(sub => sub.style.display = 'none');
    parent.querySelector('#' + id).style.display = 'block';
    
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
}
