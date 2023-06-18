// object litteral

let game = {
    title: "BloodBorn",
    hardware: "PS4",
    editor: "From Software",
    "release year": null,
};

// dot & bracket notations
console.log(game.title, game["release year"]);

// methods are an object's functions
game.disclaimer = function() {
    // not ideal as changing the object name will make the reference invalid.
    console.log(`${game.title} is a video game released by ${game.editor} on ${game.hardware}.`);
};

game.disclaimer();

game.disclaimer = function() {
    // better implementation
    console.log(`${this.title} was released by ${this.editor} on ${this.hardware}`);
}

game.disclaimer();

// A constructor is a function used to initialized an object and its properties/behaviors(methods)
function Game(title, hardware, releaseYear) {
    // Inside a constructor, this refers to the new object it will create.
    this.name = title;
    this.hardware = hardware;
    this.releaseYear = releaseYear;
}

game = new Game("Odin Sphere", ["PS3", "PS4"], "Vanillaware");
console.log(game);

// prototype

function Book(title, author) {
    this.title = title; // own property
    this.author = author; // own property
    this.description = function() {
        return `${this.title} is a book written by ${this.author} owned by ${this.owner}.`;
    }
}

Book.prototype.owner = "Jordan Falaise"; // prototype property

let book1 = new Book("Six of Crows", "Leigh Bardugo");
let book2 = new Book("The knife of never letting go", "Patrick Ness");

console.log(book1.description());
console.log(book2.description());

// two ways of checking if an object is an instance of a particular constructor

function PS3Game(title) {
    this.title = title;
}

function PS4Game(title) {
    this.title = title;
}

function PS5Game(title) {
    this.title = title;
}

let theLastOfUs = new PS3Game("The Last of Us");
let theOrder = new PS4Game("The Order");
let theReturnal = new PS5Game("The Returnal");

console.log(theLastOfUs instanceof PS3Game); // true
console.log(theOrder.constructor === PS4Game) // true
console.log(theReturnal instanceof PS4Game); // false

/**
 * instead of adding properties to an object's prototype one by one, a  more efficient way is to assign to prototype an object that already contained the properties. 
 */

function SwitchGame(title) {
    this.title = title;
}

SwitchGame.prototype = {
    "hardware": "Switch",
    "hardwareDeveloper": "Nintendo",
    statement() {
        return `The ${this.hardware} was developped by ${this.hardwareDeveloper}.`;
    }
}

let botw = new SwitchGame("Zelda: Breath of the Wild");

console.log(botw.statement());

// setting an object as the new value of prototype will erase the constructor property's value.

console.log(botw instanceof SwitchGame) // true, which is normal
console.log(botw.constructor === SwitchGame) // false, which should be true

// fix this by manually setting the constructor property when assigning a new object to the prototype.

SwitchGame.prototype.constructor = SwitchGame;
console.log(botw.constructor === SwitchGame);


