const toggleButton = document.getElementsByClassName('navbar-bar')[0];
const navbarMenu = document.getElementsByClassName('navbar-menu')[0];
const form = document.getElementsByClassName('form')[0];
const link = document.getElementsByClassName('form-link')[0];
const req = document.getElementsByClassName('form-message')[0];

toggleButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

form.addEventListener('submit', (e) => {
    if (link.value === '' || link.value == null) {
        if (!req.classList.contains('active')) {
            req.classList.toggle('active');
            link.classList.toggle('active');
        }
        e.preventDefault();
    }
})

form.addEventListener('keypress', () => {
    if (req.classList.contains('active')) {
        req.classList.toggle('active');
        link.classList.toggle('active');
    }
})