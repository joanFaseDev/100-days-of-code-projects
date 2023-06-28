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
 */

function checkCashRegister(price, cash, cid) {

}