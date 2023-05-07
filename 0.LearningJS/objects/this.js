"use strict";

/**
 * Objects are datas used to represent entities.
 * An entity can act and theses actions are represented by functions inside an object's properties.
 * A function that is a property of an object is called a method.
 * 
 * The concept of Object is based on Object-Oriented Programming(00P), a programming paradigm.
 */


// Here greeting is a method of the player object.
let pookaPrince = {
    name: 'Cornelius',
    race: 'Pooka',
    greeting: function() {
        console.log('Hi! I\'m Cornelius, the prince of Titania.');
    },
};

// A function can also be first declared then assigns as an object's method.
function greeting()
{
    console.log('Hi! How are you doing?');
}

// A function is a value. Here, this value is assigned to the greeting variable.
// The variable and the property have the same name so the JS shortcut can be used.
let shadowKnight = {
    name: 'Oswald',
    race: 'Human',
    greeting,
};

shadowKnight.greeting(); // Hi! How are you doing?

// There is a shortcut to declare an object's method
let valkyrie = {
    name: 'Gwendolynn',
    race: 'Human',
    greeting() {
        console.log('Hi! I\'m Gwendolynn, daughter of Odin, King of Vannafare.');
    },
}

valkyrie.greeting(); // Hi! I\'m Gwendolynn, daughter of Odin, King of Vannafare.
console.log(valkyrie.greeting);

/**
 * The keyword 'this' can be used inside a function to reference the object calling it.
 * More precisely, in a function, 'this' is referencing the object placed before the '.'.
 * Below, 'this' is referencing the object faeryQueen.
 */

let faeryQueen = {
    name: 'Mercedes',
    race: 'Faery',
    greeting() {
        console.log(`I'm ${this.name}, queen of the faeries.`);
    },
};

faeryQueen.greeting(); // I'm Mercedes, queen of the faeries.

/**
 * The value of this is defined at run-time which means that 'this' has no value until the
 * function is called. 'this' can be used in any function, even if it is not a method of an
 * object.
 * 
 * Arrow functions are an exception though, they have no 'this'. If 'this' is used inside an
 * arrow function then it's used from outside.
 */

function presentation()
{
    console.log(`My name is ${this.name}. I'm a ${this.job} from the country of ${this.country}.`);
}

let warrior = {
    name: 'Conan',
    job: 'warrior',
    country: 'Hebonia',
    presentation,
};

let necromancer = {
    name: 'Eldric',
    job: 'necromancer',
    country: 'Saravos',
    presentation,
};

warrior.presentation(); // My name is Conan. I'm a warrior from the country of Hebonia.
necromancer.presentation(); // My name is Eldric. I'm a necromancer from the country of Saravos.

// When a function using 'this' is called without an object, the value of 'this' is undefined.
function getReference()
{
    return {
        name: 'Ref',
        reference: this,
    };
}

let user = {
    name: 'Nathan',
    getReference,
};

let ref = getReference();

try
{
    console.log(user.getReference().reference.name); // Nathan     At run-time, 'this' is referencing user
    console.log(ref.reference.name); // Will trigger an error because at run-time 'this' is equal to undefined
}
catch(error)
{
    console.log(error); // TypeError: Cannot read properties of undefined (reading 'name')
}

// Exercice: create a calculator
let calculator = {
    read() {
        this.a = Number(prompt('Enter a first value', 0));
        this.b = Number(prompt('Enter a second value', 0));
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul())

// Chaining
let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // shows the current step
      alert( this.step );
      return this;
    }
  };

console.log(ladder.up().up().down().showStep().down().showStep());