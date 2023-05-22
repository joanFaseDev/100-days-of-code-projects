let itemsWrapper1 = document.querySelectorAll('#wrapper-1 .grid-item');

itemsWrapper1.forEach((item) => {
    item.addEventListener('click', (event) => {
        itemsWrapper1.forEach((item) => {
            removeStyle(item, 'is-selected');
        });
        event.target.classList.add('is-selected');
    });
});

function removeStyle(elem, style) {
    elem.classList.remove(style);
}

// --------------------------------------------------------------------------------

let wrapper2 = document.querySelector('#wrapper-2');
let itemsWrapper2 = document.querySelectorAll('#wrapper-2 .grid-item');
itemsWrapper2.forEach((item) => {
    item.addEventListener('click', (event) => {
        itemsWrapper2.forEach((item) => {
            removeStyle(item, 'is-selected');
            if (wrapper2.classList.contains(`cg-${item.dataset.gutter}`)) {
                wrapper2.classList.remove(`cg-${item.dataset.gutter}`);
            }
        });
        event.target.classList.add('is-selected');
        wrapper2.classList.add(`cg-${item.dataset.gutter}`);
    });
});