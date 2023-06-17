//One-dimensional array
let simpleArray = [
    "Charlie",
    25,
    true,
    undefined,
    null
];

//Multi-dimensional array
let complexArray = [
    [
        "Hunger Games",
        "Catching Fire",
        "Mockingjay"
    ],
    [
        "The knife of never letting go",
        "The Ask and the Answer",
        "Monster of men"
    ],
    [
        {
            "firstName": "Kaz",
            "lastName": "Brekker",
        },
        {
            "firstName": "Inej",
            "lastName": "Ghafa",
        }
    ]
];

// Retrieve data from data structure with indexes (most programming languages start at index 0)

let arr = [
    "The little mermaid",
    "The beauty and the beast",
    "The lion king"
];

let bestDisneyMovie = arr[1] // The beauty and the beast

arr[2] = "Pocahontas";

console.log(arr); // [The little mermaid, The beauty and the beast, Pocahontas]

// Arrays are mutable, one can add elements to arrays or remove elements from them.

let oldDisney = "The black cauldron";
let notSoOldDisney = "Wreck-it Ralph";

arr.unshift(oldDisney); // add to the beginning
arr.push(notSoOldDisney); // add to the end
console.log(arr);

// One can also add multiple elements at once

arr.unshift("Snow White and the seven dwarfs", "The rescuers");
arr.push("The treasure planet", "Atlantis: the lost empire");
console.log(arr);

// There is opposite methods but elements can only be removed one at a time.

arr.pop(); // remove Atlantis: the lost empire
arr.shift(); // remove Snow White and the seven dwarfs
console.log(arr);

// pop() and shift() both return the removed element

let theRescuers = arr.shift();
let theTreasurePlanet = arr.pop();
console.log(theRescuers + " & " +  theTreasurePlanet);

// splice(startIndex, numberOfElementToRemoved)

let onlyVowels = ['a', 'b', 'c', 'd', 'e'];
let consonants = onlyVowels.splice(1, 3);
console.log(onlyVowels); // ['a', 'e'];
console.log(consonants); // ['b', 'c', 'd'];

// splice can also be used to add new elements at the indexes where previous ones were removed

let dcOnly = ["SuperMan", "Batman", "Spider-man", "Iron Man", "Black Panther", "WonderWoman"];
dcOnly.splice(2, 3, "Green Lantern", "Flash");
console.log(dcOnly); // ["SuperMan", "Batman", "Green Lantern", "Flash", "WonderWoman"]

// slice(startIndex, endIndexExcluded) returns a copy of the 'extracted' elements in an array but do not modify the original array.

let onlyTheBest = dcOnly.slice(0, 2);
console.log(onlyTheBest); // ["SuperMan", "Batman"]
console.log(dcOnly); // ["SuperMan", "Batman", "Green Lantern", "Flash", "WonderWoman"]

// Using the spread operator (...), it's very easy to make a new copy of an array without modifying it

let kojimaGames = ["Metal Gear Solid", "Death Stranding"];
let sameKojimaGames = [...kojimaGames];
console.log(sameKojimaGames);

// What makes the spread operator so useful is it's ability to easily insert an array content at any index of any array.

let shonens = ["Naruto", "Eyeshield 21", "HunterXHunter"];
let moreShonens = ["One Piece", ...shonens, "Dragon Ball"];
console.log(moreShonens); // ["One Piece, "Naruto", "Eyeshield 21", "HunterXHunter", "Dragon Ball"]

// indexOf(elementToSearch) returns the index of an element in an array or -1 if that element isn't within the array.

let isWithin = moreShonens.indexOf("Dragon Ball");
let isNotWithin = moreShonens.indexOf("Dragon Quest: Dai's adventure");
console.log(isWithin) // returns 4
console.log(isNotWithin) // returns -1

// Using for loop to iterate through array and retrieve specific elements

let words = [
    "shiny",
    "awesome",
    "beautiful",
    "fast",
    "brave",
    "heroic"    
];

let sixLettersOrMore = [];
for (let i = 0; i < words.length; i++) {
    if (words[i].length >= 6) {
        sixLettersOrMore.push(words[i]);
    }    
}

console.log(sixLettersOrMore);

// Objects are collection of key/value pairs. Each pair is a property with an identifier (key) and a data (value).

let user = {
    firstName: "John",
    lastName: "Package",
    age: 38,
    premium: true,
    canBeTrusted: undefined,
};

console.log(user);

//Dot and bracket notations

user.mail = "alpha_package@hotmail.com";
user["phone"] = "5555-555-555";
let otherAlpha = "bro";
user[otherAlpha] = {
    firstName: "Barney",
    lastName: "Stinson",
    bros: {
        "alpha": "me",
        "others": "Ted Mosby",
    },
};

console.log(user);

let mainCharacter = user.bro.bros.others;
console.log(mainCharacter); // Ted Mosby

let gameGrade = {
    "Uncharted 4": 7,
    "Death Stranding": 8,
    "The last case of Benedict Fox": 6,
    "Hollow Knight": 9,
}

// Can switch with any of the other identifiers
let game = "The last case of Benedict Fox";

function retrieveGrade(game) {
    return gameGrade[game];
}

console.log(`The last case of Benedict Fox was graded ${retrieveGrade(game)}.`);

// The delete operator

let notInfogramesGames = {
    "Spirou": "Infogrames",
    "The Last of Us": "Naughty Dog",
    "Secret of Evermore": "Square Enix",
    "Tintin": "Infogrames",
    "Lucky Luck": "Infogrames",
};

let identifiers = Object.keys(notInfogramesGames);

for (let i = 0; i < identifiers.length; i++) {
    if (
            identifiers[i] === "Spirou" ||
            identifiers[i] === "Tintin" ||
            identifiers[i] === "Lucky Luck" 
        ) {
            delete notInfogramesGames[identifiers[i]];
        }
}

console.log(notInfogramesGames);

// Checking if a property is within an object or not.

let promisingWhale = {
    firstName: "François",
    lastName: "Perrin",
    bankAccount: "xxx-xxx-xxx-xxx",
};

console.log(promisingWhale.hasOwnProperty("bankAccount")); // true
console.log("bankAccount" in promisingWhale);

// The for...in loop is used to iterate over an object's property identifiers.

let gamesByHardware = {
    "PS2": 47,
    "PS3": 24,
    "PS4": 15,
    "PS5": null,
}

for (const hardware in gamesByHardware) {
    console.log(`${hardware}: ${gamesByHardware[hardware]}`);
}