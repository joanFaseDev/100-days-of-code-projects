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

    this.computation = {
        leftOperand: {
            value: null,
            get() { return this.value },
            set(newValue) { this.value = newValue },
        },
        rightOperand: {
            value: null,
            get() { return this.value },
            set(newValue) { this.value = newValue },
        },
        operator: {
            key: null,
        },
        calculate(
            leftOperand = this.leftOperand,
            rightOperand = this.rightOperand,
            operator = this.operator) {
            switch(operator.key.value) {
                case "add":
                    let result = Number(leftOperand) + Number(rightOperand);
                    return result.toString();
                    break;
            }
        }
    };

    this.system = {
        github(screen) {
            screen.update('Open: github');
            window.open('https://github.com/joanFaseDev', '_blank', 'noopener');
        },
        twitter(screen) {
            screen.update('Open: twitter');
            window.open('https://twitter.com/joan_fase', '_blank', 'noopener');
        },
        close(screen) {
            screen.update('Close: application');
            setTimeout(() => {
                const calculator = document.querySelector('#calculator');
                calculator.remove();
            }, 2000);
        },
        allClear(screen, previousKey, total ) {
            previousKey.set(null);
            total.set('0');
            screen.update(total.get());
        },
        load(key, screen, previousKey, total) {
            (key.value === 'allClear') ? this[key.value](
                screen,
                previousKey,
                total
                ) : this[key.value](screen);
        }, 
    }

    this.handleInputs = function(key) {
        let actualKey = key;
        // If a key was registered before that one
        if (this.previousKey.get()) {
            switch (this.previousKey.get().type) {
                // If that previous key was a digit...
                case "digit":
                    // and if the actual one is a digit too
                    if (actualKey.type === 'digit') {
                        this.total.concatenate(actualKey.value);
                        this.screen.update(this.total.get());
                    }
                    break;
                
                case "system":
                    this.system.load(
                        actualkey,
                        this.screen,
                        this.previousKey,
                        this.total
                    );
                    break;

                case "operator":

                    break;

                default:
                    break;
            }
        } else {
            // If no previous key was registered
            switch (key.type) {
                case "digit":
                    this.total.set(key.value);
                    this.screen.update(this.total.value);
                    break;

                case "system":
                    this.system.load(
                        key,
                        this.screen,
                        this.previousKey,
                        this.total
                    );
                    break;

                case "operator":
                    if (key.value === '.') {
                        this.total.concatenate(key.value);
                        this.screen.update(this.total.get());
                    }
                    break;

                default:
                    break;
            }

        }

        this.previousKey.set(key);
        console.dir(this);
    }

    this.screen.update(this.total.get());
}

/**
 * The screen object is responsible for displaying the calculator's content.
 * It doesn't know what the content is, it just displayed it. 
 */ 
function Screen(node)
{
    this.node = node;
    this.update = function(text) {
        // Calculator's screen can't handle more than 16 characters.
        let screenValue = text;
        if (screenValue.length > 16) {
            console.log('ALERT -> 16 characters limit!');
            screenValue = screenValue.substring(0, 16);
        }
        this.node.textContent = screenValue;
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
