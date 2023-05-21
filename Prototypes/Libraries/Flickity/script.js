let links = document.querySelectorAll('.nav-link');
let customStyle = 'is-active';

links.forEach((link) => {
    link.addEventListener('click', () => {
        links.forEach((link) => {
            removeStyle(link, customStyle);
        })
        link.classList.add(customStyle);
    });
});

function removeStyle(elem, style) {
    if (elem.classList.contains(style)) {
        elem.classList.remove(style);
    }
}