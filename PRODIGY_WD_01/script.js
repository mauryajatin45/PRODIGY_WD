window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#855';
    } else {
        navbar.style.backgroundColor = '#333';
    }
});
