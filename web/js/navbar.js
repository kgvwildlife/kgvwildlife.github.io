
/*
document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    const changePoint = 0.2 * window.innerHeight;


    if (scrollPosition > changePoint) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.backgroundColor = 'rgba(180, 180, 180, 0.2)';
    }
});
*/


document.addEventListener('scroll', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');
    const changePointMultiplier = parseFloat(document.body.getAttribute('data-change-point'));
    const changePoint = changePointMultiplier * window.innerHeight;
    const scrollPosition = window.scrollY;

    navbarLinks.forEach(link => {
        if (scrollPosition > changePoint) {
            link.style.color = 'black';
        } else {
            link.style.color = 'white';
        }
    });
});