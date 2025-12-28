// ... (کدهای قبلی loadPage و غیره سر جایشان بمانند) ...

/**
 * مدیریت باز و بسته شدن آکاردئون‌ها
 * @param {HTMLElement} btn - دکمه هدر آکاردئون
 */
function toggleAccordion(btn) {
    // 1. پیدا کردن محتوا و آیکون مربوط به همین دکمه
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.icon');

    // 2. تغییر وضعیت (باز/بسته)
    if (content.classList.contains('active')) {
        // اگر باز بود، ببند
        content.classList.remove('active');
        if (icon) icon.textContent = '+';
        btn.classList.remove('active-header'); // اختیاری برای استایل
    } else {
        // اگر بسته بود، باز کن
        content.classList.add('active');
        if (icon) icon.textContent = '-';
        btn.classList.add('active-header');
    }
}
