/**
 * Project 1: Palindrome Checker
 * 
 * Return 'true' if the given string is a palindrome. Otherwise, return false.
 * A palindrome is a word sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
 * 
 * Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces, and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.
 */

function palindrome(str) {
    // Create a copy of the string and put all its elements into an array.
    const copyStr = str;
    const arr = [...copyStr];
    const alphanumericArr = removeSpecialChars(arr);    
    const forwardArr = updateToLowerCase(alphanumericArr);
    const backwardArr = createBackwardArray(forwardArr);
    return forwardArr.join("") === backwardArr.join("");
}

// Remove special characters & underscore from the array.
function removeSpecialChars(arr) {
    const specialCharRegEx = /\w/i;
    const underscoreRegEx = /[^_]/i; 
    return arr.filter(elem => specialCharRegEx.test(elem) && underscoreRegEx.test(elem));
}

// Return a new array with all elements into lower case.
function updateToLowerCase(arr) {
    return arr.map(elem => elem.toLowerCase());
}

// Take an array and create a new one with all content backward.
function createBackwardArray(arr) {
    const newArr = [];
    arr.forEach(char => newArr.unshift(char));
    return newArr;
}

console.log(palindrome("fIve|\_/|fOur"));
console.log(palindrome("My age is 0, 0 si ega ym."));
console.log(palindrome("0_0 (: /-\ :) 0-0"));


/**
 * Project 2: Roman Numeral Converter
 * 
 * Convert the given number into a roman numeral.
 * 
 * Roman numerals     Arabic numerals
 *      M                   1000
 *      CM                  900
 *      D                   500
 *      CD                  400
 *      C                   100
 *      XC                  90
 *      L                   50
 *      XL                  40  
 *      X                   10  
 *      IX                  9
 *      V                   5
 *      IV                  4
 *      I                   1
 * 
 * All roman numerals answers should be provided in upper-case.
 * The highest value tested is 3999.   
 */

function convertToRoman(num) {
    const arabicToRoman = {
        3000: 'MMM',
        2000: 'MM',
        1000: 'M',
        900: 'CM',
        800: 'DCCC',
        700: 'DCC',
        600: 'DC',
        500: 'D',
        400: 'CD',
        300: 'CCC',
        200: 'CC',
        100: 'C',
        90: 'XC',
        80: 'LXXX',
        70: 'LXX',
        60: 'LX',
        50: 'L',
        40: 'XL',
        30: 'XXX',
        20: 'XX',
        10: 'X',
        9: 'IX',
        8: 'VIII',
        7: 'VII',
        6: 'VI',
        5: 'V',
        4: 'IV',
        3: 'III',
        2: 'II',
        1: 'I'
    };
    
    const converter = {
        arabicNum: "",
        idx: 0,
    }

    // Create an array with each digit of the number
    const arrNum = [...String(num)].map(str => Number(str));
    switch (arrNum.length) {
        case 4:
            const charThousand = arrNum.shift();
            const numThousand = `${String(charThousand)}000`;
            converter.arabicNum += arabicToRoman[numThousand];
        case 3:
            const charHundred = arrNum.shift();
            if (charHundred !== 0) {
                const numHundred = `${String(charHundred)}00`;
                converter.arabicNum += arabicToRoman[numHundred];  
            }
        case 2:
            const charTen = arrNum.shift();
            if (charTen !== 0) {
                const numTen = `${String(charTen)}0`;
                converter.arabicNum += arabicToRoman[numTen];
            }
        default:
            const charNum = arrNum.shift();
            if (charNum !== 0) {
                const num =  `${String(charNum)}`;
                converter.arabicNum += arabicToRoman[num];
            }
            break;
    }

    return converter.arabicNum;
}

console.log(convertToRoman(2014));
console.log(convertToRoman(3999));
console.log(convertToRoman(891));


/**
 * Project 3: Caesars Cipher
 * 
 * One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
 * In a shift cipher the meanings of the letters are shifted by some set amount.
 * A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 * Thus A <-- --> N, B <-- --> O and so on.
 * Write a function which takes a ROT13 encoded string as input and returns a decode string.
 * All letters will be uppercase. Do not transform any non-alphabetic character (i.e spaces, punctuation),
 * but do pass them on.
 */

function rot13(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const CIPHER = 13;
    const arr = [...str];
    const alphaRegEx = /[a-zA-Z]/;
    const newArr = arr.map((char, index, arr) => {
        if (alphaRegEx.test(char)) {
            const alphabetIdx = alphabet.indexOf(char);
            const codedLetter = alphabet[alphabetIdx + CIPHER];
            console.log(alphabetIdx, codedLetter);
            return codedLetter;
        }
        return char;        
    });
    return newArr.join("");
}

console.log(rot13("SERR PBQR PNZC"));

/**
 * Project 4: Telephone Number Validator
 * 
 * Return 'true' if the passed string looks like a valid US phone number.
 * The user may fill out the form field any way they choose as long as it has the format of a valid US number.
 * The following are exemples of valid formats for US numbers (refer to the test below for other variants).
 * - 555-555-5555
 * - (555)555-5555
 * - (555) 555-5555
 * - 555 555 5555
 * - 5555555555
 * - 1 555 555 5555
 * 
 * Your job is to validate or reject the US phone number based on any combination of the formats provided above.
 * The area code is required. If the country code is provided, you must confirm that the country code is 1.
 * Return true if the string is a valid US phone number; otherwise return false.
 */

function telephoneCheck(str) {
    const verifiedStr = checkCountryCode("1", str);
    const regEx = /^\d{3}-\d{3}-\d{4}$|^\(\d{3}\)[ ]?\d{3}-\d{4}$|^\d{3}[ ]\d{3}[ ]\d{4}$|^\d{10}$|^1[ ]\d{3}[ ]\d{3}[ ]\d{4}$/;
    return regEx.test(verifiedStr);
}

function checkCountryCode(countryCode, str) {
    if (str[0] === countryCode && str[1] === " ") {
        return str.slice(2);
    } else if (str[0] === countryCode) {
        return str.slice(1);
    }
    return str;
}

console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("(555)555-5555"));
console.log(telephoneCheck("(555) 555-5555"));
console.log(telephoneCheck("555 555 5555"));
console.log(telephoneCheck("5555555555"));
console.log(telephoneCheck("1 555 555 5555"));

/**
 * Project 5: Cash Register
 * 
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price)
 * , payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
 * cid is 2D array listing available currency.
 * 
 * The checkCashRegister() function should always return an object with a 'status' key and a 'change' key.
 * 
 * Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in drawer is less than the change due, or if you cannot return the exact change.
 * 
 * Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key 'change' if it is equal to the change due.
 * 
 * Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the 'change' key.
 */

/* function checkCashRegister(price, cash, cid) {
    const drawer = [...cid];
    const changeToGiveBack = cash - price;
    const totalDrawer = getTotalDrawer(drawer);

    // Get the amount per currency unit.
    const ref = getRef();

    // Check if there is enough money in the drawer to give back the change.
    const enoughMoney = totalDrawer >= changeToGiveBack;

    // Delete all currencies with 0 as value.
    const checkedDrawer = deleteZeroCurrency(drawer);

    // Sort currencies fromt the highest to the lowest.
    const sortedDrawer = [];
    checkedDrawer.forEach(elem => sortedDrawer.unshift(elem));

    // Delete all reference currencies not in the drawer
    const sortedRef = deleteZeroRef(sortedDrawer, ref);
    console.log(sortedDrawer, sortedRef);

    // If there's enough money in the drawer to pay back.
    if (enoughMoney) {
        // If there's just enough money to pay back.
        if (changeToGiveBack === totalDrawer) {
            return {
                status: "CLOSED",
                change: cid,
            };
        }
        
        const obj = {
            idx: 0,
            change: changeToGiveBack,
        }
           
        while (sortedDrawer.length !== 0) {
            const idx = obj.idx;
            const amountCurrency = sortedRef[idx][1];
            if (amountCurrency < obj.change) {
                
            }

        }

    // If there's not enough money to pay back.    
    } else {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
        };
    }

    
}

function getTotalDrawer(drawer) {
    const obj = {
        total: 0,
    };
    drawer.forEach((elem) => {
        obj.total += elem[1];
    });

    return obj.total.toFixed(2);
}

function deleteZeroCurrency(drawer) {
    const newArr = [];
    drawer.forEach((elem, idx, arr) => {
        if (elem[1]) {
            newArr.push(elem);
        }
    });
    return newArr;
}

function deleteZeroRef(drawer, ref) {
    const arr = [];
    for (let i = 0; i < ref.length; i++) {
        const refElem = ref[i];
        for (let j = 0; j < drawer.length; j++) {
            const drawerElem = drawer[j];
            if (drawerElem[0] === refElem[0]) {
                arr.push(refElem);
            }
        }
    }
    return arr;
}

function getRef() {
    const arr = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100]
    ];
    const sortedArr = [];
    arr.forEach(elem => sortedArr.unshift(elem));
    return sortedArr;
} */

function checkCashRegister(price, cash, cid) {
    const change = {
        total: cash - price,
        currencies: [],
    };
    change.isFloat = (Number.isInteger(change.total)) ? false : true;

    if (change.isFloat) {
        const decimIdx = (String(change.total).indexOf(".") + 1);
        change.firstDecimal = String(change.total).slice(decimIdx)[0];
        change.secondDecimal = String(change.total).slice(decimIdx)[1];
        console.log(`First decimal: ${change.firstDecimal}`);
        console.log(`Second decimal: ${change.secondDecimal}`);
    }

    // Get the total amount in the drawer fixed to 2 decimals.
    const drawer = {
        total: cid.reduce((sum, amount) => {
            return sum += amount[1];
        }, 0).toFixed(2),
    };

    if (change.isFloat && change.secondDecimal) {
        if (change.secondDecimal === 5 || change.secondDecimal === 0 ) {

        } else {
            
        }
    }

    console.log(`Change total: ${change.total}, isFloat: ${change.isFloat}`);
    console.log(`Total drawer: ${drawer.total}`);
    console.log(`----------------------------------------------`);
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);