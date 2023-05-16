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



