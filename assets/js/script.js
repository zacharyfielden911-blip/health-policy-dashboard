// =========================================
// assets/js/script.js
// مدیریت عملکردها و جابجایی بین صفحات
// =========================================

/**
 * نمایش بخش‌های اصلی (منوی سایدبار)
 * @param {string} id - شناسه بخشی که باید نمایش داده شود
 * @param {HTMLElement} btn - دکمه‌ای که کلیک شده است
 */
function showSection(id, btn) {
    // 1. مخفی کردن تمام بخش‌های محتوایی
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // 2. نمایش بخش انتخاب شده
    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 3. غیرفعال کردن تمام دکمه‌های منو
    document.querySelectorAll('.menu-btn').forEach(button => {
        button.classList.remove('active');
    });

    // 4. فعال کردن دکمه کلیک شده
    if (btn) {
        btn.classList.add('active');
    }

    // 5. اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * نمایش تب‌های داخلی (زیرمجموعه‌ها)
 * @param {string} id - شناسه تب داخلی
 * @param {HTMLElement} btnElement - دکمه تب کلیک شده
 */
function showSubTab(id, btnElement) {
    // پیدا کردن کانتینر والد (بخش اصلی)
    const parent = btnElement.closest('.content-section');
    
    // مخفی کردن محتوای سایر تب‌ها در همین بخش
    parent.querySelectorAll('.sub-content').forEach(sub => {
        sub.classList.remove('active');
    });

    // نمایش محتوای تب انتخاب شده
    const targetTab = parent.querySelector('#' + id);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // آپدیت کلاس اکتیو دکمه‌ها
    parent.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
}
