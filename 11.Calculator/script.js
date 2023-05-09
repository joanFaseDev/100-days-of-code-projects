"use strict";

const nodeScreen = document.querySelector('#screen');

const screen = new Screen(nodeScreen);
const keys = new Keys();
const calculator = new Calculator(screen, keys);

calculator.screen.update(calculator.total);

calculator.keys.digits.forEach((key) => {
    key.addEventListener('click', () => {
        calculator.handlerDigits(key);
    });
});

/**
 * The constructor is not needed here (litteral object would have make more sense). I just
 * wanted to try out what i learned on the 'new' operator the previous day.
 */

function Calculator(screen, keys)
{
    this.icons = {
        twitter: document.querySelector('#twitter'),
        github: document.querySelector('#github'),
        close: document.querySelector('#close'),
    };
    this.screen = screen; 
    this.keys = keys;

    this.total = '0';
    this.leftOperand = null;
    this.rightOperand = null;
    this.operator = null;

    this.getTotal = function() {
        return this.total;
    };
    this.updateTotal = function(digit) {
        this.total += digit; 
    };

    this.checkLeftOperand = () => this.leftOperand;
    this.checkRightOperand = () => this.rightOperand;
    this.checkOperator = () => this.checkOperator;

    this.handlerDigits = function(key) {
        console.log('This is handleDigits function!');
        if (this.checkLeftOperand())
        {

        }
        else
        {
            console.dir(key);
            if (key.dataset.character !== 'zero' && key.dataset.character !== 'dot')
            {
                this.updateTotal(true, key.textContent);
                this.screen.update(this.getTotal());
            }
            else
            {
                // 'zero' or 'dot'
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

function Keys()
{
    this.digits = document.querySelectorAll('.key[data-type="digit"]');
    this.operators = document.querySelectorAll('.key[data-type="operator"]');
    this.others = document.querySelectorAll('.key[data-type="other"]'); 
}
