fetch('navbar.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('navbar-box').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));