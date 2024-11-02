
/*
document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY; // Current scroll position
    const changePoint = 0.7 * window.innerHeight; // The scroll position to trigger the style change


    if (scrollPosition > changePoint) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.backgroundColor = 'rgba(180, 180, 180, 0.2)';
    }
});
*/

document.addEventListener('scroll', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');
    const changePoint = 0.65 * window.innerHeight; // Convert 70vh to pixels
    const scrollPosition = window.scrollY; // Current scroll position

    navbarLinks.forEach(link => {
        if (scrollPosition > changePoint) {
            link.style.color = 'black'; // Change text color
        } else {
            link.style.color = 'white'; // Reset text color
        }
    });
});