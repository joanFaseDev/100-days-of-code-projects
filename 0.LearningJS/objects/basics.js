/**
 * Objects
 * 
 * Basics
 * Object is the only JavaScript's data type that isn't primitive (composed of a single data).
 * Object are used to store collections of datas / complex entities.
 * Object can contain multiple properties which are pairs of key/value: key being a string and value being any data possible.
 * Object are sometimes called 'associative arrays'.
 * Object can be created by using two different syntaxes: constructor or "object litteral".
 */

let constructorObj = new Object(); // constructor
let litteralObj = {}; // object literal -> preferred method

let user = {
    name: 'Jordan', // key (also known as name/identifier): 'name' - value: 'Jordan'
    age: 37, // key: 'age' - value: 37
    isEmployed: false, // key: 'isEmployed' - value: false
};

// A property can be removed using the delete operator
console.log(user); // { name: 'Jordan', age: 37, isEmployed: false }
delete user.isEmployed;
console.log(user) // { name: 'Jordan, age: 37 }

// Property's name can be composed of multiple separate words. In that case, the quotes are mandatory.
user = {
    name: 'Jordan',
    age: 37,
    "is Employed": false, // Last property can also have a comma. That way, all properties look alike and can be switched.
}

// Properties can be accessed using two notations: dot and brackets.
console.log(user.name) // 'Jordan'
console.log(user['age']) // 37

// Dot notation doesn't work with separated words because it requires the property's name to be a valid variable identifier: no space, doesn't start with a digit and doesn't include special character except for $ or _
// console.log(user.is Employed) -> Error

// There's no problems with the bracket notations.
console.log(user['is Employed']); // false

// Using square brackets, one can also obtain a property's name through the result of an expression
let key = 'is Employed';
console.log(user[key]); // false
console.log(user['AGE']); // undefined -> property's name is case sensitive
console.log(user['AGE'.toLowerCase()]); // 37 

let collections = {
    manga: ['One Piece', 'Eyeshield 21', 'Berserk'],
    comics: ['Batman', 'Green Lantern', 'Wonder Woman'],
    movies: ['The Thing', 'Predator', 'Aliens'],
};

let promptUser = prompt('What collection do you want to see? (manga, comics or movies)', 'movies');
console.log(collections[promptUser]) // ['The Thing', 'Predator', 'Aliens'] if prompt === 'movies'

/**
 * When creating an object, one can use the square bracket notation as a property name.
 * That's called computed property and is used to dynamically named a property.
 */

promptUser = prompt('What collection do you want to create?', 'novels');

collections = {
    [promptUser]: ['The Knife of Never Letting Go', 'Red Rising', 'Six of Crows'],
};

console.log(collections['novels']); // ['The Knife of Never Letting Go', 'Red Rising', 'Six of Crows']

/**
 * Property value shorthand
 * JavaScript object properties are often created from variables like this:
 */

let name = 'Jordan';
let age = 37;

function makeUser(name, age)
{
    return {
        name: name,
        age: age,
    };
}

// Making a property from a variable is so frequent that there's a shortcut for it
let x = 100;
let y = 100;
let width = 32;
let height = 32;

function makePlayer(x, y, width, height)
{
    return {
        x,
        y,
        width,
        height,
    }
}

let player = makePlayer(x, y, width, height);
console.log(player); // { x: 100, y: 100, width: 32, height: 32 } 

/*
 * Accessing a property that doesn't exist will not trigger an error but will return undefined.
 * It's also possible to check an existing property using the 'in' operator.
 * The advantage of 'in' is that it can check for an existing property initialized with undefined (very specific case)
 */
let book = {
    page: 400,
    title: 'A developer\'s nightmare.',
    editor: undefined,
};

console.log(book.author); // undefined

console.log(`Page is a property of the book object: ${"page" in book}
Title is a property of the book object: ${"title" in book}
Author is a property of the book object: ${"author" in book}
Editor is a property of the book object: ${"editor" in book}
`);

/**
 * The for...in loop is used to walk over all keys in an object.
 */

let character = {
    name: 'Safran',
    race: 'Dollman',
    level: 1,
    specialSkills: [
        'Presence: null',
        'Immunity to masses and hammers',
        'Immunity to status change'
    ],
};

for (let keys in character) 
{
    console.log(`${keys} => ${character[keys]}`); // keys -> values
}




