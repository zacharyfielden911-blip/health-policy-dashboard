// =========================================
// assets/js/script.js
// نسخه کامل: مدیریت بارگذاری صفحات + تب‌ها + آکاردئون
// =========================================

// وقتی صفحه لود شد، به صورت پیش‌فرض فصل ۱ را باز کن
document.addEventListener('DOMContentLoaded', () => {
    // اگر فایل chapter1 را ساخته‌اید، اینجا chapter1 باشد
    // اگر هنوز نساخته‌اید و intro دارید، intro بگذارید
    loadPage('chapter1'); 
});

/**
 * تابع اصلی برای بارگذاری محتوا از فایل‌های HTML جداگانه
 * @param {string} pageName - نام فایل بدون پسوند (مثلا 'chapter1')
 * @param {HTMLElement} btn - دکمه کلیک شده (اختیاری)
 */
async function loadPage(pageName, btn) {
    const displayArea = document.getElementById('content-display');
    
    // 1. نمایش حالت لودینگ
    displayArea.innerHTML = '<div style="text-align:center; padding:50px; color:#999;">در حال بارگذاری... ⏳</div>';

    // 2. مدیریت دکمه‌های فعال منو
    if (btn) {
        document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    try {
        // 3. درخواست فایل از سرور (پوشه pages)
        // اضافه کردن زمان تصادفی برای جلوگیری از کش شدن (اختیاری)
        const response = await fetch(`pages/${pageName}.html?t=${new Date().getTime()}`);
        
        if (!response.ok) throw new Error('فایل پیدا نشد!');

        // 4. دریافت متن فایل و نمایش
        const htmlContent = await response.text();
        displayArea.innerHTML = htmlContent;

        // 5. اسکرول به بالا
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        displayArea.innerHTML = `<div class="highlight-box box-danger">
            <strong>خطا:</strong> محتوا بارگذاری نشد. <br>
            لطفا بررسی کنید فایل <code>pages/${pageName}.html</code> وجود داشته باشد.
            <br>جزئیات: ${error.message}
        </div>`;
    }
}

/**
 * مدیریت تب‌های داخلی (مثل بخش آمیخته سیاستی)
 * @param {string} id - شناسه تب (مثلا 'tab-reg')
 * @param {HTMLElement} btnElement - دکمه تب کلیک شده
 */
function showSubTab(id, btnElement) {
    // پیدا کردن والد (کانتینر اصلی)
    const parent = document.getElementById('content-display');
    
    // مخفی کردن همه تب‌های محتوا
    parent.querySelectorAll('.sub-content').forEach(sub => sub.style.display = 'none');
    
    // نمایش تب انتخاب شده
    const target = parent.querySelector('#' + id);
    if(target) target.style.display = 'block';
    
    // مدیریت کلاس اکتیو دکمه‌ها
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
}

/**
 * مدیریت باز و بسته شدن آکاردئون‌ها (بخش تحلیل محیطی)
 * @param {HTMLElement} btn - دکمه هدر آکاردئون
 */
function toggleAccordion(btn) {
    // پیدا کردن محتوا (المان بعدی بعد از دکمه)
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.icon');

    // بررسی وضعیت فعلی
    if (content.classList.contains('active')) {
        // بستن
        content.classList.remove('active');
        if (icon) icon.textContent = '+';
    } else {
        // باز کردن
        content.classList.add('active');
        if (icon) icon.textContent = '-';
    }
}
