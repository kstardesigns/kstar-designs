var menuButton = document.querySelector('.menu-button'),
    menuIcon = document.querySelector('.menu'),    headerNav = document.querySelector('.header-nav');

menuButton.addEventListener('click', function(){
    if (menuIcon.classList.contains('close-icon')) {
        headerNav.classList.add('mobile-closed');
        headerNav.classList.remove('mobile-open');
        menuIcon.classList.remove('close-icon');
    } else {
        headerNav.classList.remove('mobile-closed');
        headerNav.classList.add('mobile-open');
        menuIcon.classList.add('close-icon');
    }
});