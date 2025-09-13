fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        const navbarBox = document.getElementById('navbar-box');
        navbarBox.innerHTML = data;

        const navbar = navbarBox.querySelector('.navbar');
        if (navbar) { navbar.classList.add('black-navbar'); }
    })
    .catch(error => console.error('Error loading footer:', error));