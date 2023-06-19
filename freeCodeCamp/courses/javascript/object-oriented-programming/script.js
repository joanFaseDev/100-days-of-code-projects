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

/**
 * an object inherit its prototype from the constructor function that created it. One can verify it using the isPrototypeOf() function.
 */

function Movie(title, director) {
    this.title = title;
    this.director = director;
}

Movie.prototype.format = ["DVD", "Blu-ray"];

let theThing = new Movie("The Thing", "John Carpenter");

console.log(Movie.prototype.isPrototypeOf(botw)); // false;
console.log(Movie.prototype.isPrototypeOf(theThing)); // true

console.dir(theThing.constructor);
console.log(Movie.prototype);

/**
 * An object's prototype is an object. So a prototype being an object also have a prototype. 
 */

console.log(Object.prototype.isPrototypeOf(Movie)); // true

console.log(Movie instanceof Object); // true
console.log(theThing instanceof Movie); // true
console.log(Object instanceof Movie); // false

// inheritance

/**
 * The two objects below have the same method defined in their prototype.
 */

function SegaCharacter(name) {
    this.name;
}

SegaCharacter.prototype = {
    constructor: SegaCharacter,
    jump() {
        return `${this.name} jumps!`;
    },
};

function NintendoCharacter(name) {
    this.name = name;
}

NintendoCharacter.prototype = {
    constructor: NintendoCharacter,
    jump() {
        return `${this.name} jumps!`;
    }
}


/**
 * this is not ideal as repeated code means more work to modify/correct the code in every place it has been repeated plus higher chances to make a mistakes.
 * 
 * to solve that problem, one can create a supertype, a parent object, with the method nested in its prototype.
 */

function GameCharacter() {}
GameCharacter.prototype = {
    name: this.name,
    constructor: GameCharacter,
    jump() {
        return `${this.name} jumps like a boss!`;
    }
};

function SonyCharacter(name) {
    this.name = name;
}

let sprite = Object.create(GameCharacter.prototype);
sprite.name = "Sprity";
console.log(sprite.jump()); // Sprity jumps like a boss!

SonyCharacter.prototype = Object.create(GameCharacter.prototype);

let jax = new SonyCharacter("Jax"); 
console.log(jax.jump());

// again
function OS() {}

OS.prototype = {
    name: null,
    description() {
        return `Operating System: ${this.name}`;
    }
};

function Microsoft() {}
function Ubuntu(name) {
    this.name = name;
}

Microsoft.prototype = Object.create(OS.prototype);
Ubuntu.prototype = Object.create(OS.prototype);

let microsoft = new Microsoft();
let ubuntu = new Ubuntu("Ubuntu");

// name isn't a property of Microsoft so JS search it in the prototype, which is the OS prototype. 
console.log(microsoft.description());

// name is a property of Ubuntu so JS can use its value and do not have to search in the prototype.
console.log(ubuntu.description());

console.log(Microsoft.prototype.constructor);
console.log(Ubuntu.prototype.constructor);

Microsoft.prototype.constructor = Microsoft;
Ubuntu.prototype.constructor = Ubuntu;

console.log(Microsoft.prototype.constructor);
console.log(Ubuntu.prototype.constructor);

// add methods after inheritance

function Character() {}

Character.prototype = {
    name: "Ronald",
    level: 1,
    job: "Barbarian",
    greeting() {
        return `Hi! I'm ${this.name}, a ${this.job}. I'm currently level ${this.level}.`;
    }
}

function Wizard() {}
function Rogue() {}

Wizard.prototype = Object.create(Character.prototype);
Wizard.prototype.constructor = Wizard;

Rogue.prototype = Object.create(Character.prototype);
Rogue.prototype.constructor = Rogue;

let wizard = new Wizard();
let rogue = new Rogue();

console.log(wizard.greeting());
rogue.name = "Garret";
rogue.job = "Thief"
console.log(rogue.greeting());

Wizard.prototype.cast = function(spellName = "Fireball") {
    return `The ${this.job} ${this.name} is casting the spell ${spellName}!`;
}

Rogue.prototype.steal = function(item = "chest") {
    return `${this.name} is stealing a ${item}!`;
}

console.log(wizard.cast("Frostball"));
console.log(rogue.steal());

wizard.name = "Vivi"
wizard.job = "sorcerer";
console.log(wizard.cast());

// override inherited methods

function Dragon() {}
Dragon.prototype = {
    attack() {
        return `The dragon breaths fire on the intruders!`;
    },
};

Dragon.prototype.constructor = Dragon;
let normalDragon = new Dragon();

console.log(normalDragon.attack());

function IceDragon() {}
IceDragon.prototype = Object.create(Dragon.prototype);
IceDragon.prototype.constructor = IceDragon;
let iceDragon = new IceDragon();
console.log(iceDragon.attack());

IceDragon.prototype.attack = function() {
    return "The dragon breaths ice on the intruders while breathing fire on its afternoon snack... Wait?! It's a bicephalous dragon?!!!";
}
console.log(iceDragon.attack());

// mixins -> 

function gunAction(obj) {
    obj.shoot = function() {
        return "Pan Pan Pan!";
    }
}

function AssaultRifle() {}
function Revolver() {}

let ak47 = new AssaultRifle();
let colt = new Revolver();

gunAction(ak47);
gunAction(colt);
console.log(ak47.shoot());
console.log(colt.shoot());

// closure 

function SecretAgent() {
    let name = "James Bond";
    let id = "OO7";
    this.getName = function() {
        return name;
    }
    this.getId = function() {
        return id;
    }
}

let agent = new SecretAgent();
console.log(agent.getName(), agent.getId()); // James Bond 007

// iife (Immediately Invoked Function Expression)

(function() {
    console.log("Hello World!");
})()





