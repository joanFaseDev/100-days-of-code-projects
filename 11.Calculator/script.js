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

    this.expression = {
        leftOperand: {
            value: '0',
            isDecimal: false,
            isNegative: false,
            get() { return this.value },
            set(newValue) { this.value = newValue },
            concatenate(newValue) { this.value += newValue },
        },
        rightOperand: {
            value: null,
            isDecimal: false,
            isNegative: false,
            get() { return this.value },
            set(newValue) { this.value = newValue },
            concatenate(newValue) { this.value += newValue },
        },
        operator: {
            key: null,
            get() { return this.key },
            set(newValue) { this.key = newValue },
        },
        calculate(
            leftOperand = this.leftOperand,
            rightOperand = this.rightOperand,
            operator = this.operator) {
                let result = null;
            switch(operator.key.value) {
                case "add":
                    result = Number(leftOperand) + Number(rightOperand);
                    return result.toString();
                    break;
            }
        },
        changeIntoPercent(str) {
            console.log('--- Method called: percent() ---');
            let result = Number(str) / 100;
            return result.toString();
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
        if (key.type === 'system') {
            switch (key.value) {
                case "twitter":
                    let twitterProfile = 'https://twitter.com/joan_fase';
                    window.open(twitterProfile, '_blank', 'noopener');
                    break;
            
                case "github":
                    let githubProfile = 'https://github.com/joanFaseDev';
                    window.open(githubProfile, '_blank', 'noopener');
                    break;

                case "close":
                    // Close the calculator then display a funny message and a button to reload the page.
                    break;

                // This means that the key clicked is the 'all clear' key
                default:
                    this.expression.leftOperand.set('0');
                    this.expression.leftOperand.isDecimal = false;
                    this.expression.leftOperand.isNegative = false;

                    this.expression.rightOperand.set(null);
                    this.expression.rightOperand.isDecimal = false;
                    this.expression.rightOperand.isNegative = false;

                    this.expression.operator.set(null);
                    this.screen.updateBig(this.expression.leftOperand.get());
                    this.screen.updateSmall('');
            }
        }

        if (this.expression.operator.get()) {
            if (this.expression.rightOperand.get()) {

            } else {
                /**
                 * If there is a left operand and a operator but the right operand isn't known yet.
                 */
                switch (key.type) {
                    case "digit":
                        this.expression.rightOperand.concatenate(key.value);
                        this.screen.updateBig(key.value);
                        break;
                    
                    case "operator":
                        // With our implementation, only '+', '-', '*' and '/' can be checked as operator.
                        if (["add", "substract", "multiply", "divide"].includes(key.value)) {
                            this.expression.operator.set(key);
                            let updateText = `${this.expression.leftOperand.get()} ${this.expression.operator.get().content}`;
                            this.screen.updateSmall(updateText);
                        } else if (key.value === 'comma') {
                            this.expression.rightOperand.set('0,');
                            this.screen.updateBig(this.expression.rightOperand.get());
                            this.expression.rightOperand.isDecimal = true;
                        }
                        break;
                        
                    default:
                        break;
                }
            }
            
        } else {
            /**
             * If there is no operator, that means that there's currently only a left
             * operand.
             */
            let leftOperand = this.expression.leftOperand.get();
            console.log(key, leftOperand);
            switch (key.type) {
                case "digit":
                    if (leftOperand === '0') {
                        this.expression.leftOperand.set(key.value);
                    } else {
                        this.expression.leftOperand.concatenate(key.value);
                    }
                    this.total.set(this.expression.leftOperand.get());
                    this.screen.updateBig(this.total.get()); 
                    break;
                    
                case "operator":
                    if (["add", "substract", "multiply", "divide", "equal"].includes(key.value)) {
                        let expression = `${this.expression.leftOperand.get()} ${key.content}`;
                        this.expression.operator.set(key);
                        this.screen.updateSmall(expression);
                    } else {
                        // Comma, changeSign and percent doesn't update the operator property.
                        switch (key.value) {
                            // Comma is only added if the left operand is not a decimal yet.
                            case "comma":
                                if ((!this.expression.leftOperand.isDecimal)) {
                                    this.expression.leftOperand.isDecimal = true;
                                    this.expression.leftOperand.concatenate(key.content);
                                    this.screen.updateBig(this.expression.leftOperand.get());   
                                }
                                break;
                            case "changeSign":
                                console.log('this is the CS case!');
                                if (this.expression.leftOperand.get() !== '0') {
                                    let leftOperand = null;
                                    if (this.expression.leftOperand.isNegative) {
                                        leftOperand = this.expression.leftOperand.get().substring(1);
                                        this.expression.leftOperand.isNegative = false;
                                    } else {
                                        leftOperand = `-${this.expression.leftOperand.get()}`;
                                        this.expression.leftOperand.isNegative = true;
                                    }
                                    this.expression.leftOperand.set(leftOperand);
                                    this.screen.updateBig(this.expression.leftOperand.get());
                                }
                                break;
                            case "percent":
                                console.log('This is the percent case!');
                                let percent = this.expression.changeIntoPercent(this.expression.leftOperand.get());
                                this.screen.updateSmall(`${this.expression.leftOperand.get()}%`);
                                this.screen.updateBig(percent);
                                this.expression.leftOperand.set(percent);
                                break;
                        }
                    }
                    break;
            }
        }
        
        
    }

    this.screen.updateBig(this.total.get());
}

/**
 * The screen object is responsible for displaying the calculator's content.
 * It doesn't know what the content is, it just displayed it. 
 */ 
function Screen(node)
{
    this.node = node;
    this.updateBig = function(text) {
        // Calculator's screen can't handle more than 16 characters.
        let screenValue = text;
        if (screenValue.length > 16) {
            console.log('ALERT -> 16 characters limit!');
            screenValue = screenValue.substring(0, 16);
        }
        this.node.lastElementChild.textContent = screenValue;
    };

    /**
     * This method is only here to give user a visual feedback on the current 
     * calculation. That's why it should only be called once an operator key is pressed.
     */
    this.updateSmall = function(text) {
        this.node.firstElementChild.textContent = text;
    }
}

function Key(element, value, type, content)
{
    this.element = element;
    this.value = value;
    this.type = type;
    this.content = content;
}

function getKeys()
{
    let arr = [];
    let keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
        arr.push(new Key(key, key.dataset.key, key.dataset.type, key.textContent));
    });
    return arr;
}
