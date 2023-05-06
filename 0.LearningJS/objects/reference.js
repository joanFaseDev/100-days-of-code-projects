let word = 'Developer';
let job = word;

console.log(word, job); // Two independant variables, each storing a 'Developer' string as value.

/**
 * Contrary to primitive types, objects are stored by reference.
 * When a variable is assigned to an object, it is assigned to its address in memory. That is to say a reference.
 * When a variable storing an object is copied, the copy get the address in memory pointing to the same Object...
 * ... BUT the object itself isn't copied.
 */

let user = {
    name: "Jordan",
    job: "Developper",
    languages: ["JavaScript"],
};

let me = user;

me.languages.push("Lua", "HTML", "CSS");

console.log(user.languages); // [JavaScript, Lua, HTML, CSS]

console.log(user === me); // true Variables referencing the same object are equals.

let userTwin = {
    name: "Jordan",
    job: "Developper",
    languages: ["JavaScript", "Lua", "HMTL", "CSS"],
};

console.log(user === userTwin) // false The objects'content is the same but the two objects are different.

/**
 * Objects declared with the const keyword can be modified as long as the reference stays the same.
 */

const books = {
    lastReview: 'The Knife of Never Letting Go',
    favorite: 'Six of Crows',
};

books.lastReview = 'Red Rising'; // No error.

try
{
    books = {
        lastReview: 'Red Rising',
        favorite: 'Catching Fire',
    };
}
catch (error)
{
    console.log(error); // TypeError: Assignment to constant variable.
}

/**
 * Here's two ways to effectively copy an object's content without copying its reference.
 */

let brotherGames = {
    "PlayStation 2": ["Metal Gear Solid 3: Snake Eater"],
    "Game Cube": ["Eternal Darkness"],
};

let myGames = {};

// 1)
for (key in brotherGames)
{
    myGames[key] = brotherGames[key];
}

console.log(myGames["PlayStation 2"]); // Metal Gear Solid 3: Snake Eater

// 2)
let sonGames = {};
Object.assign(sonGames, brotherGames);
console.log(sonGames["Game Cube"]); // Eternal Darkness
