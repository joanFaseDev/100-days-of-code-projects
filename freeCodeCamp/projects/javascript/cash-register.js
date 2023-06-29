/**
 * Project 5: Cash Register
 * 
 * --INPUT
 * Design a function that accepts three arguments:
 *      - A purchase price
 *      - A payment for the purchase
 *      - The cash-in drawer with the available currency
 * 
 * --OUTPUT
 * The function MUST return an object with two keys: 'status' and 'change'.
 * 
 * If cash-in drawer is less than the change due then the function must return:
 *      - status: "INSUFFICIENT_FUNDS" & change: []
 * 
 * If the exact change cannot be return then the function must also return:
 *      - status: "INSUFFICIENT_FUNDS" & change: []
 * 
 * If the total of the cash-in drawer is equal to the change due then the function must return:
 *      - status: "CLOSED" & change: cash-in drawer (the one passed as argument)
 * 
 * If there's enough in the cash-in drawer, that the exact change can be return and that the total of the cash-in drawer isn't equal to the change due the function must return:
 *      - status: "OPEN" & change: change due in various currencies, sorted in highest to lowest order
 * 
 * --EXAMPLES
 * 1) 
 * INPUT:
 * checkCashRegister(90, 100, [ ["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 100]]);
 * 
 * OUTPUT:
 * { status: "CLOSE", change: [ ["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 100]] }
 * 
 * 2)
 * INPUT:
 * checkCashRegister(249, 300, [ ["PENNY", 0.10], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 3], ["FIVE", 50], ["TEN", 50], ["TWENTY", 80], ["ONE HUNDRED", 100]])
 * 
 * OUTPUT:
 * { status: "INSUFFICIENT_FUNDS", change: [] }
 * 
 * 3)
 * INPUT:
 * checkCashRegister(138.75, 200, [ ["PENNY", 0.5], ["NICKEL", 0.2], ["DIME", 0], ["QUARTER", 0.5], ["ONE", 3], ["FIVE", 10], ["TEN", 30], ["TWENTY", 40], ["ONE HUNDRED", 100]])
 * 
 * OUTPUT:
 * { status: "OPEN", change: [ ["TWENTY", 40], ["TEN", 20], ["FIVE", 5], ["ONE", 2], ["QUARTER", 0.5]] }
 * 
 * PLAN--
 *  - Create a cashRegister variable and assign to it an object with two identifiers, 'status' & 'change'. The value to 'status' is null & the one assigned to 'change' is an empty array.
 *  - Create a changeDue variable and assign to it an object with a 'total' identifier. The value for this key should be the result of the payment minus the price.
 *  - Create a amountPerCurrency variable  and assign to it an object with each currency name as identifiers and each currency value as amount. The currencies should be sorted in highest to lowest order.
 *  - Create a cidCopy variable and assign to it the content of the 'cid' object.
 *  - Use the amountPerCurrency object's identifiers (now sorted) to sort in the same order the arrays in the cidCopy object.
 *  - Create a drawer object and assign to it the content of the cidCopy object.
 *  - Create a totalDrawer variable and assign to is the total of all values in the cidCopy object. Format the result to two digits after the decimal point.
 *  - Create a function checkFunds() that takes two arguments, the 'changeDue' & the 'totalDrawer', and return the result of 'totalDrawer' being superior or equal to the 'changeDue'.
 *  - Create a checkDrawerClose() function that takes two arguments, the 'changeDue' & the 'totalDrawer', and return the result of 'changeDue' & 'totalDrawer' being strictly equal.
 *  - Create an enoughFunds variable and assign to it the result of calling the checkFunds function with 'changeDue' & 'totalDrawer' passed as argument.
 * 
 *  - If enoughFunds is equal to 'false', assign to the 'cashRegister' object 'status' key the 'INSUFFICIENT_FUNDS' string value. Assign to the 'change' key an empty array value.
 *  
 * - If enoughFunds is equal to 'true' , create a drawerClose variable and assign to it the result of calling the checkDrawerClose() function with 'changeDue' and 'totalDrawer' passed as argument.
 * - If drawerClose is equal to 'true', assign to the 'cashRegister' object 'status' key the 'CLOSED' string value. Assign to the 'change' key the 'cid' value passed as the third argument to the checkCashRegister function.
 * 
 * - If drawerClose is equal to 'false', iterate through each identifiers of the 'drawer' object.
 * - For each iteration, if the value corresponding to the identifier is superior to 0 (meaning this currency is available in the drawer), create a loop that only continue if:
 *      - The amount for this particular currency in the drawer is superior to 0.
 *      - AND The 'total' value of the changeDue's property object is more than the amount of money for this particular currency (meaning substracting the minimal value of this currency to changeDue's total WOULD NOT make that value inferior to 0).
 *  - For each iteration of the loop:
 *      - Use the iteration's identifier (the currency name) to access the amount for this particular currenty in the 'amountPerCurrency' object and store it into a currencyAmount variable.
 *      - Substract to the 'total' value of the changeDue's object the value assign to currencyAmount.
 *      - Access this currency identifiers in the 'drawer' object and substract to its value the value assign to currencyAmount.
 *      - Check if the array assigned to the 'change' property of the cashRegister object contains a sub-array with the iteration's identifiers (the currency name actually being evaluated).
 *          - If it does, increment its second element's value by the value assign to the currencyAmount variable.
 *          - If it does not, create a local variable named 'currency' and assign to it an array with two elements: first the currency's name (the identifier of the current iteration) then the value currently assigned to the currencyAmount variable. 
 *  - Once the loop stops (meaning either the changeDue's total is equal to zero or there's no more currencies in the drawer that can be deduced from the changeDue's total), check the changeDue's object 'total' property.
 *  - If the 'total' value of the changeDue's object is superior to 0 then assign to the 'cashRegister' object 'status' key the 'INSUFFICIENT_FUNDS' string value. Assign to the change key an empty array value.
 *  - If the 'total' value of the changeDue's object is strictly equal to 0 (meaning we gave back the change & the transaction is complete) then assign to the 'castRegister' object 'status' key the 'OPEN' string value. Let the 'change' key value as it is now.           
 */

function checkCashRegister(price, cash, cid) {
    const cashRegister = {
        status: null,
        change: [],
    };
    const changeDue = {
        total: price - cash,
    }
    const AMOUNT_PER_CURRENCY = {
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01,
    };
    const cidCopy = [];
    Object.keys(AMOUNT_PER_CURRENCY).forEach(identifier => {
        const currency = cid.filter(arr => arr[0] === identifier)[0];
        cidCopy.push(currency);
    });
    const drawer = Object.fromEntries(cidCopy);
    const totalDrawer = cid.reduce((sum, amount) => {
        sum += amount[1];
        return sum;
    }, 0).toFixed(2);
    const enoughFunds = checkFunds(changeDue, totalDrawer);

    if (enoughFunds === false) {
        cashRegister.status = "INSUFFICIENT_FUNDS";
        cashRegister.change = [];
    }
}

function checkFunds(changeDue, totalDrawer) {
    return totalDrawer >= changeDue;
}

function checkDrawerClose(changeDue, totalDrawer) {
    return totalDrawer === changeDue;
}

checkCashRegister(85, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);