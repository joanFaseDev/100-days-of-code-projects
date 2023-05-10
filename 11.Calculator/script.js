"use strict";

const screenElement = document.querySelector('#screen');
const keys = getKeys();

const screen = new Screen(screenElement);
const calculator = new Calculator(screen, keys);

calculator.keys.forEach((key) => {
    key.element.addEventListener('click', (event) => {
        /** 
         * Have to call the method directly from the calculator object for it is a callback
         * function and using 'this' here will refers to the object calling the callback function
         * which is key, not calculator.
         */
        calculator.handleInputs(key);
    });
});

/**
 * The constructor is not needed here (litteral object would have make more sense). I just
 * wanted to try out what i learned on the 'new' operator the previous day.
 */

function Calculator(screen, keys)
{
    this.screen = screen; 
    this.keys = keys;

    this.previousKey = {
        /**
         * Here the context of 'this' is not the Calculator object but the object 
         * calling the methods get() and set() which is previousKey 
         */
        value: null,
        get() { return this.value; },
        set(newValue) { this.value = newValue; },
    };

    this.total = {
        /**
         * Here the context of 'this' is not the Calculator object but the object 
         * calling the methods get() and set() which is total 
         */
        value: '0',
        get() { return this.value; },
        set(newValue) { this.value = newValue; },
        concatenate(value) { this.value += value; }, 
    };

    this.system = {
        github(screen) {
            screen.update('--> GitHub -->');
        },
        twitter(screen) {
            screen.update('--> Twitter -->');
        },
        close(screen) {
            screen.update('--> Closing... -->');
            setTimeout(() => {
                document.querySelector('#calculator').hidden = true;
                console.dir(document.querySelector('#calculator'));
            }, 2000);
        }, 
    }

    this.handleInputs = function(key) {
        let actualKey = key;
        if (this.previousKey.get()) {

        } else {
            switch (key.type) {
                case "digit":
                    this.total.set(key.value);
                    this.screen.update(this.total.value);
                    break;
                case "system":
                    this.system[key.value](this.screen);
                    break;
                case "operator":
                default:
                    break;
            }
        }

    }
}

/**
 * The screen object is responsible for displaying the calculator's content.
 * It doesn't know what the content is, it just displayed it. 
 */ 
function Screen(node)
{
    this.node = node;
    this.update = function(text) {
        this.node.textContent = text;
    };
}

function Key(element, value, type)
{
    this.element = element;
    this.value = value;
    this.type = type;
}

function getKeys()
{
    let arr = [];
    let keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
        arr.push(new Key(key, key.dataset.key, key.dataset.type));
    });
    return arr;
}
