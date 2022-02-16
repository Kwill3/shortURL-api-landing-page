const toggleButton = document.getElementsByClassName('navbar-bar')[0];
const navbarMenu = document.getElementsByClassName('navbar-menu')[0];
const form = document.getElementsByClassName('form')[0];
const link = document.getElementsByClassName('form-link')[0];
const req = document.getElementsByClassName('form-message')[0];
const gridGen = document.getElementsByClassName('grid-item-generated')[0];

toggleButton.addEventListener('click', () => {
    // mobile navbar 3 bar menu toggle
    navbarMenu.classList.toggle('active');
});

form.addEventListener('submit', (e) => {
    // if submitted while input is blank, prompt user to insert link
    if (link.value === '' || link.value == null) {
        if (!req.classList.contains('active')) {
            req.classList.toggle('active');
            link.classList.toggle('active');
        }
        e.preventDefault();
    } else {
        e.preventDefault();
        fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`)
        .then(res => res.json())
        .then(json => {
            if (json.ok) {
                // if api returns ok result, create a div container and elements
                let div = document.createElement('div');
                let original = document.createElement('p');
                let hr = document.createElement('hr');
                let short = document.createElement('p');
                let button = document.createElement('button');

                // assign class names to generated elements
                div.className = "grid-item-generated-link";
                original.className = "grid-item-generated-link-original"
                short.className = "grid-item-generated-link-short"
                button.className = "grid-item-generated-link-copy"

                // fill inner text with results from api
                original.innerText = json.result.original_link;
                short.innerText = json.result.full_short_link;
                button.innerText = 'Copy';

                // change button color and text when clicked and copy input value
                button.addEventListener('click', () => {
                    button.classList.toggle('active', true);
                    button.innerText = 'Copied!';
                    navigator.clipboard.writeText(json.result.full_short_link);
                })

                gridGen.append(div);
                div.append(original, hr, short, button);
                // clear input text
                link.value = '';
            } else {
                console.log(json);
            }
        })

    }
});

form.addEventListener('keypress', () => {
    // if user has been prompted to insert link and user types at input, remove prompt
    if (req.classList.contains('active')) {
        req.classList.toggle('active');
        link.classList.toggle('active');
    }
});