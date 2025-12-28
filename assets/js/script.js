// assets/js/script.js
// نسخه نهایی و کامل: مدیریت بارگذاری صفحات + تب‌ها + آکاردئون + نمودارها

// وقتی صفحه لود شد، به صورت پیش‌فرض فصل ۱ را باز کن
document.addEventListener('DOMContentLoaded', () => {
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
        // اضافه کردن زمان تصادفی (?t=...) برای جلوگیری از کش شدن مرورگر
        const response = await fetch(`pages/${pageName}.html?t=${new Date().getTime()}`);
        
        if (!response.ok) throw new Error('فایل پیدا نشد!');

        // 4. دریافت متن فایل و نمایش
        const htmlContent = await response.text();
        displayArea.innerHTML = htmlContent;

        // 5. اسکرول به بالا
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // ===============================================
        // مدیریت اجرای کدهای خاص برای هر صفحه
        // ===============================================
        
        // اگر صفحه "فصل ۲" (تحلیل محیطی) بود، نمودار را رسم کن
        if (pageName === 'chapter2') {
            renderAgingChart();
        }

    } catch (error) {
        displayArea.innerHTML = `<div class="highlight-box box-danger">
            <strong>خطا:</strong> محتوا بارگذاری نشد. <br>
            لطفا بررسی کنید فایل <code>pages/${pageName}.html</code> وجود داشته باشد.
            <br>جزئیات: ${error.message}
        </div>`;
    }
}

/**
 * تابع اختصاصی رسم نمودار برای فصل ۲
 * (نیاز به کتابخانه Chart.js دارد که در index.html فراخوانی شده)
 */
function renderAgingChart() {
    // یک تاخیر کوچک می‌دهیم تا مطمئن شویم المان HTML در صفحه قرار گرفته است
    setTimeout(() => {
        const ctx = document.getElementById('agingChart');
        
        // شرط: المان وجود داشته باشد و کتابخانه Chart.js لود شده باشد
        if (ctx && typeof Chart !== 'undefined') {
            
            // جلوگیری از رسم تکراری (اگر نمودار قبلی روی این بوم هست، پاکش کن)
            const existingChart = Chart.getChart(ctx);
            if (existingChart) existingChart.destroy();

            // رسم نمودار جدید
            new Chart(ctx, {
                type: 'line', // نوع نمودار: خطی
                data: {
                    labels: ['۱۴۰۰', '۱۴۰۵', '۱۴۱۰', '۱۴۱۵', '۱۴۲۰'], // محور افقی
                    datasets: [{
                        label: 'درصد جمعیت سالمند (بالای ۶۰ سال)',
                        data: [10.5, 12.8, 16.2, 21.4, 25.1], // داده‌ها
                        borderColor: '#3498db', // رنگ خط
                        backgroundColor: 'rgba(52, 152, 219, 0.2)', // رنگ زیر خط
                        fill: true, // پر کردن زیر خط
                        tension: 0.4, // نرمی خط
                        pointRadius: 5,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#3498db'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            labels: { font: { family: 'Vazirmatn', size: 14 } } 
                        },
                        tooltip: {
                            titleFont: { family: 'Vazirmatn' },
                            bodyFont: { family: 'Vazirmatn' }
                        }
                    },
                    scales: {
                        x: { ticks: { font: { family: 'Vazirmatn' } } },
                        y: { ticks: { font: { family: 'Vazirmatn' } } }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
    }, 100);
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
