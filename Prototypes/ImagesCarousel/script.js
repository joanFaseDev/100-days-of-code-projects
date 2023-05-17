/**
 * SECTION 1
 */

let images = Array.from(document.querySelectorAll('.carousel-image'));
let icons = Array.from(document.querySelectorAll('.icons'));
let title = document.querySelector('#carousel-title');
let carouselManager = new CarouselManager(images, title);

icons.forEach((icon) => {
    icon.addEventListener('click', carouselManager, images);
});

function CarouselManager(images, title) {
    this.images = images;
    this.title = title;
    this.firstIndex = 0;
    this.lastIndex = this.images.length - 1,
    this.currentIndex = this.firstIndex;
    this.lightColor = '#e0fbfc';
    this.darkColor = '#231942';

    this.incrementIndex = function() {
        this.currentIndex = this.currentIndex + 1;
        if (this.currentIndex > this.lastIndex) {
            this.currentIndex = this.firstIndex;
        }
    };

    this.decrementIndex = function() {
        this.currentIndex = this.currentIndex - 1;
        if (this.currentIndex < this.firstIndex) {
            this.currentIndex = this.lastIndex;
        }
    };

    this.updateCarousel = function(navigation) {
        this.images[this.currentIndex].style.display = "none";
        (navigation === 'left') ? this.decrementIndex() : this.incrementIndex();
        this.images[this.currentIndex].style.display = 'block';
        this.updateTitle();
    };

    this.updateTitle = function() {
        this.title.style.color = (this.currentIndex === 1 || this.currentIndex === this.lastIndex) ?
            this.darkColor :
            this.lightColor;
    };

    this.handleEvent = function(event) {
        let navigation = event.target.dataset.navigation;
        this.updateCarousel(navigation);
    };
}

/**
 * SECTION 2
*/

let imagesCarousel2 = Array.from(document.querySelectorAll(".carousel-2-img"));
let buttonsCarousel2 = document.querySelectorAll("#carousel-2 #nav .nav-btn");
let titleCarousel2 = document.querySelector('#carousel-2 #nav #label #title');
let secondCarousel = new Carousel2(
    imagesCarousel2, 
    buttonsCarousel2,
    titleCarousel2
);

buttonsCarousel2.forEach((btn) => {
    btn.addEventListener('click', secondCarousel);
});

function Carousel2(images, buttons, title) {
    console.dir(images);
    console.dir(buttons);

    this.images = images;
    this.buttons = buttons;
    this.title = title;
    this.firstIndex = 0;
    this.lastIndex = this.images.length - 1;
    this.imagesPosition = {

        main : this.lastIndex,
        previous : 3,
        next : this.firstIndex,
        first : 2,
        last : 1,
    };
    this.navigationClasses = [
        'c2-first',
        'c2-previous',
        'c2-main',
        'c2-next',
        'c2-last'
    ];

    this.incrementIndex = function(imgsPosition) {
        for (let img in imgsPosition) {
            let position = imgsPosition[img];
            imgsPosition[img] = position + 1;

            if(imgsPosition[img] > this.lastIndex) {
                imgsPosition[img] = this.firstIndex;
            }
        }

    };

    this.decrementIndex = function(imgsPosition) {
        for (let img in imgsPosition) {
            let position = imgsPosition[img];
            imgsPosition[img] = position - 1;

            if(imgsPosition[img] < this.firstIndex) {
                imgsPosition[img] = this.lastIndex;
            }
        };
    }

    this.resetImagesClass = function() {
        this.images.forEach((img) => {
            img.classList.remove(...this.navigationClasses);
        });
    };

    this.updateCarousel = function(navigation) {
        this.resetImagesClass();
        if (navigation === 'previous') {
            this.decrementIndex(this.imagesPosition);
        } else {
            this.incrementIndex(this.imagesPosition);
        }

        let main = this.imagesPosition.main;
        let previous = this.imagesPosition.previous;
        let next = this.imagesPosition.next;
        let first = this.imagesPosition.first;
        let last = this.imagesPosition.last;

        this.images[main].classList.add(this.navigationClasses[2]);
        this.images[previous].classList.add(this.navigationClasses[1]);
        this.images[next].classList.add(this.navigationClasses[3]);
        this.images[first].classList.add(this.navigationClasses[0]);
        this.images[last].classList.add(this.navigationClasses[4]);

        this.title.textContent = this.images[main].dataset.title;
    };

    this.handleEvent = function(event) {
        let navigation = event.target.dataset.navigation;
        this.updateCarousel(navigation);
    };
}




