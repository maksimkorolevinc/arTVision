const slider = document.querySelector('.slider');
const navLinks = document.querySelectorAll('.slider-nav a');
const scrollers = document.querySelectorAll('.scroller');

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const slideWidth = slider.offsetWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});
// ...existing code...

// Smooth scroll for all anchor links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ...existing code...
slider.addEventListener('scroll', () => {
    const currentSlide = Math.round(slider.scrollLeft / slider.offsetWidth);
    navLinks.forEach((nav, index) => {
        nav.classList.toggle('active', index === currentSlide);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопок "Подробнее"
    document.querySelectorAll('.more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service');
            const details = serviceCard.querySelector('.service-details');
            details.classList.toggle('active');
        });
    });
    
    // Обработчик для кнопок "Скрыть окно"
    document.querySelectorAll('.hide-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            // Убираем класс active, чтобы окно сдвинулось обратно
            this.parentElement.classList.remove('active');
        });
    });
});
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    addAnimation();
}
function addAnimation(){
    scrollers.forEach(scroller =>{
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item =>{
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.append(duplicatedItem);
        });

    });
}