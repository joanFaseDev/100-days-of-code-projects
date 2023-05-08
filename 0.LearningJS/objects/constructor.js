"use strict";

/**
 *  A constructor is a regular function with two specificities:
 *      - Its name starts with a capital letter (it's a convention to recognize constructor function).
 *      - It should only be executed with the 'new' operator (more on this below).
 */

function Player(name)
{
    this.name = name;
}

let p1 = new Player('Harvey');
let p2 = new Player('Rosalie');
console.log(`Player one: ${p1.name}\nPlayer two: ${p2.name}`);

// Again the first letter being capital is a convention. Without it, the result is the same:

function player(name)
{
    this.name = name;
}

// But still less readable so better stick with convention.
let p3 = new player('Romuald');
let p4 = new player('Lynn');

console.log(`Player three: ${p3.name}\nPlayer four: ${p4.name}`);

/**
 * Using constructors, one can create many instances of an object type. Something that cannot be done
 * with object litterals.
 */

/**
 * The 'new' operator can be used with any functions (except arrow functions as they don't have 'this'). 
 * Any functions following the 'new' operator becomes a constructor.
 */

function SayMyName(name)
{
    this.name = name;
    console.log(`Your name is ${name}.`);
}

let sayName = new SayMyName('Joan'); // Your name is Joan.

/**
 * When it is used, 'new' do the following things:
 *      - Creates a blank JavaScript object.
 *      - Executes the constructor function and binds the blank object to 'this' context. That means that
 * 'this' is now a reference to the blank object.
 *      - The value binded to 'this' is returned.
 * 
 * Example:
 */

function Ennemy(type, location)
{
    // 1) {} is created.
    // 2) {} is binded to 'this' so 'this' = {}

    this.type = type;
    this.location = location;
    this.feedback = function()
    {
        console.log(`A monster of class ${this.type} has just spawned on the map in ${this.location}.`);
    }; 
    // 3) 'this' is returned
}

let mob = new Ennemy('Swamp thing', 'D9');
mob.feedback();

/**
 * The main benefit of using the new / constructor pair is to implement reusable object creation code.
 */

/**
 * Most of the time, constructor functions don't have a return statement as they automatically return 
 * the blank object assigned to 'this' context.
 * If there is an explicit 'return' statement then here what happens:
 *      - if the returned value is an object or a non primitive type data, then this object is returned
 * instead of the blank one created by 'new'.
 *      - if the returned value is a primitive one then this value is ignored and the blank object is
 * returned exactly as planned.
 * 
 * Example:
 */

function SupportCharacter(name, alias)
{
    // A blank object is created and assigned to 'this' context.
    // The function's code is executed.
    this.name = name;
    this.alias = alias;
    this.introduction = function() {
        console.log(`I'm ${this.name} also known as ${this.alias}!`);
    };

    // Throw the blank object out the window and return the following one instead.
    return {
        name: 'Bruce Wayne',
        alias: 'Batman',
        introduction() {
            console.log(`I'm ${this.name} also known as ${this.alias}`);
        }
    };

}

let mainCharacter = new SupportCharacter('Dick Grayson', 'Robin');
mainCharacter.introduction(); // I'm Bruce Wayne also known as Batman!

// Another example:

function MainCharacter(name, alias)
{
    // A blank object is created and assigned to 'this' context.
    // The function's code is executed.
    this.name = name;
    this.alias = alias;
    this.introduction = function() {
        console.log(`My name is ${this.name} but i also use many aliases like ${this.alias}.\nDoesn't matter which one 
        they're all AWESOME!`);
    };

    // A function is an object so the following function will be returned in place of the blank object.
    return function() {
        console.log("Hey i'm Ted Mosby and i'm the true main character of the...");
    }
}

let heMetHer = new MainCharacter('Barney Stinson', 'John Package');
heMetHer(); // Hey i'm Ted Mosby and i'm the true main character of the...

// Exercices:

// 1) Create two constructor functions which are equal to each other
let C = { claim() { console.log('A, B and C are equal because they\'re all referencing the same object!') } };

function A()
{
    return C;
}

function B()
{
    return C;
}

let a = new A();
let b = new B();

alert(a == b);

/**
 * 2) Create a constructor function Calculator that creates object with three methods:
 *      read() -> prompt for two values and saves them as properties a & b respectively.
 *      sum() -> returns the sum of this properties.
 *      mul() -> returns the multiplication product of these properties.
 */

function Calculator()
{
    this.read = function() {
        // Here 'this' is a reference at the object calling the read function.
        this.a = Number(prompt('Number a?', 2));
        this.b = Number(prompt('Number b?', 5));
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };
}

let calculator = new Calculator();
calculator.read();
console.log(`Sum of ${calculator.a.toString()} and ${calculator.b.toString()}: ${calculator.sum()}`);
console.log(`Multiplication of ${calculator.a.toString()} and ${calculator.b.toString()}: ${calculator.mul()}`);

/**
 * 3) Create a constructor function Accumulator(startingValue).
 */

function Accumulator(startingValue)
{
    this.value = startingValue;
    this.read = function() {
        let userValue = Number(prompt('Enter a value', 5));
        this.value += userValue;
    };
}

let acc = new Accumulator(1);
acc.read();
acc.read();
console.log(`The current value of acc is ${acc.value.toString()}.`); // Per default, the current value is 11 (1 + 5 + 5).