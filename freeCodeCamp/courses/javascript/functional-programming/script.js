/**
 * In functional programming, code is organized in basic functions that can be combined to build complex programs.
 */

const letSpectatorEnter = () => "One spectator entered the movie theater.";

const countSpectator = (numberSpectators) => {
    const spectators = [];
    for (let i = 0; i < numberSpectators; i++) {
        const entry = letSpectatorEnter();
        spectators.push(entry);
    }

    return spectators;
};

const registerEachSpectator = countSpectator(100);

// console.log(registerEachSpectator);


const prepareHotChocolate = () => "One coffee, coming right up!."
const prepareExpresso = () => "One expresso, coming right up!"

const getDrink = (prepareDrink, numberOfCups) => {
    const cups = [];
    for (let i = 0; i < numberOfCups; i++) {
        const coffee = prepareDrink();
        cups.push(coffee);
    }
    return cups;
}

const cupsOfHotChocolate = getDrink(prepareHotChocolate, 25);
const cupsOfExpresso = getDrink(prepareExpresso, 25);

// console.log(cupsOfHotChocolate, cupsOfExpresso);

function ImperativeWindow(tabs) {
    this.tabs = tabs;
}
 /**
  * Every function can be used as a constructor, except arrow functions as they don't have their own "this" keyword
  */
const DeclarativeWindow = function(tabs) {
    this.tabs = tabs;
}

const RPGTeam = function(characters) {
    this.characters = characters;
};

// By returning the object calling the method, one can call multiple methods one after the other (cf. below)
RPGTeam.prototype.addMember = function(newCharacter) {
    this.characters.push(newCharacter);
    return this;
}

RPGTeam.prototype.removeMember = function(index) {
    const membersBeforeIndex = this.characters.splice(0, index);
    const membersAfterIndex = this.characters.splice(1);
    this.characters = membersBeforeIndex.concat(membersAfterIndex);
    return this;
}

RPGTeam.prototype.joinTeam = function(otherTeam) {
    this.characters = this.characters.concat(otherTeam);
    return this;
}

const team = new RPGTeam(["Ronald the Barbarian", "Elric the Necromancer", "Circe the Sorceress"]);
console.log(team);
const finalTeam = team
    .addMember("Xena the Warrior Princess")
    .removeMember(2)
    .joinTeam(["Conan the Barbarian", "Legolas the Archer", "Alundra the Dream Walker"])
    .removeMember(0);

console.log(finalTeam);

/**
 * Functional Programming is drive by the idea of immutability. Mutation cause side effects and side effects lead to bugs. If something needs to be changed then create a copy.
 * 
 * Another principle of functional programming is to always declare your dependencies explicitly. Computations inside a function depend on the arguments passed to the function, not on any global object or variable.
 */

const comics = ["Batman", "Superman"];

function addComic(comicsList, newComic) {
    return [...comicsList, newComic];
}

function removeComic(comicsList, comicToRemove) {
    const comics = [...comicsList];
    const index = comics.indexOf(comicToRemove);
    if (index !== -1) {
        comics.splice(index, 1);
        return comics;
    }
}

const newComicsCollection = addComic(addComic(comics, "Flash"), "WonderWoman");

console.log(newComicsCollection);

// Using map

const videoGames = [
    {
        title: "Odin Sphere",
        studio: "Vanillaware",
        genre: "Action-RPG",
    },
    {
        title: "Alundra",
        studio: "Matrix Software",
        genre: "Action-Adventure"
    },
    {
        title: "Legacy of Kain: Soul Reaver",
        studio: "Crystal Dynamics",
        genre: "Action-Adventure",
    }
];

const sortedVideoGames = videoGames.map(game => {
    return { 
        "title": game["title"],
        "genre": game["genre"],
    };
});

console.log(sortedVideoGames);

// Implementing custom map method
Array.prototype.customMap = function(callback) {
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        const elem = callback(this[i], i, this);
        newArray.push(elem);
    }
    return newArray;
};

const newArray = [
    "Odin Sphere", 
    "Alundra", 
    "Legacy of Kain: Blood Omen", 
    "Legacy of Kain: Soul Reaver"
].customMap((elem) => elem.toUpperCase());

console.log(newArray);

// using filter

const books = [
    {
        title: "Six of Crows",
        author: "Leigh Bardugo",
    },
    {
        title: "Hunger Games",
        author: "Suzanne Collins",
    },
    {
        title: "The Knife Of Never Letting Go",
        author: "Patrick Ness",
    },
    {
        title: "Catching Fire",
        author: "Suzanne Collins",
    },
    {
        title: "Crooked Kingdom",
        author: "Leigh Bardugo",
    }
];

const crowBooks = books.filter(book => book["author"] === "Leigh Bardugo");
console.log(crowBooks);