/**
 * Function Expression
 * 
 * By using function expression, one can create a function in any expression.
 * Below, the function is created to the right of an assignment operator in an assignment expression.
 */

// Function's name can be omitted in a function expression as the function is assign to a variable.
let sayHi = function() {
    alert('Hi!');
};

/**
 * No matter how they are created, functions are values.
 * Both function declaration and function expression store a value inside a variable.
 * This value can be seen by omitting the parentheses. That way, the function won't be executed.
 */

// Function declaration
function add(x, y)
{
    return x + y;
}

// Function expression
let substract = function(x, y)
{
    return x - y;
};

// Return the string representation of theses functions, their source code.
console.log(`${add}\n${substract}`);

// Being a value, a function can be declared, assigned or copied like any other value.
function multiply(x, y)
{
    return x * y;
}

// Without the parentheses, what's copied is the function itself, not the result returned by the function call.
let copy = multiply;

console.log(multiply(100, 2)); // 200
console.log(copy(100, 2)); // 200
console.log(`${multiply}\n${copy}`); // Same source code

// It works exactly the same way with function expression
let divide = function(x, y)
{
    return x / y;
};

let anotherCopy = divide;
console.log(divide(200, 2)); // 100
console.log(anotherCopy(200, 2)) // 100
console.log(`${divide}\n${anotherCopy}`); // Same source code

/**
 * Callback functions
 * 
 * As the name implies, callback functions are passed as argument to another function
 * which has the responsability to call it back at a later time.
 */

function ask(question, yes, no)
{
    if (confirm(question))
    {
        // If true, call back the yes function.
        yes();
    }
    else
    {
        // Otherwise call back the no function.
        no();
    }
}

let question = 'Did you score a B or more on the last test?';

function grantAccess()
{
    console.log('Congratulation! You\'re granted access to our new promotion!');
}

function denyAccess()
{
    console.log('Unfortunately, you need to do better on the next exam to possibly be qualified for our new promotion.\nBe patient, put the effort and you\'ll be alright.');
}

// Here grantAccess and denyAccess are callback functions which can possibly be called back by the ask function.
ask(question, grantAccess, denyAccess);

// Callback functions can also be used with function expressions.
function checkAge(question, yes, no)
{
    if (confirm(question))
    {
        yes();    
    }
    else
    {
        no();
    }
}

/** 
 * Functions without names are called anonymous functions.
 * Here, the two callbacks don't exist outside the checkAge function's scope. 
 * The reason being they are not assigned to any variables.
 */
checkAge(
    'Are you eighteen or more?',
    function() { console.log('You can enter sir.') },
    function() { console.log('I\'m sorry sir, you\'too young to enter. Please come back again in a few years.') }
);

/**
 * Function declaration is created through separate statement.
 * Function expression is created inside an expression or syntax construct.
 * 
 * Function expression is created when THE EXECUTION REACHS IT.
 * Function declaration are different. JavaScript engine create them BEFORE RUNNING THE SCRIPT.
 * Function declaration with a global scope are processed before the code is executed.
 * For this reason, function declaration can be called earlier in the code than it is defined. 
 */

// Function is called before it is declared yet it works perfectly.
displayMyFavoriteDisneyMovie(); // The beauty and the beast.

function displayMyFavoriteDisneyMovie()
{
    console.log('The beauty and the beast');
}

// It doesn't work with function expression as it is created when execution reachs it.
try
{
    // Function is called before execution reachs it...
    displayMyFavoriteDisneyAnimator();
}
catch(error)
{
    // ... so an error occurs.
    console.log(error); // ReferenceError: Cannot access 'displayMyFavoriteDisneyAnimator' before initialization
}

let displayMyFavoriteDisneyAnimator = function()
{
    console.log('Glen Keane');
}

/**
 * While in 'strict mode', function declaration is only visible in the block code where it was declared.
 * It is called 'block scope'.
 */

function askHowLazyYouFeel(isLazy)
{
    if (isLazy)
    {
        // Function declaration means it's processed before execution. The scope is also ok.
        action(); // I feel tired. I'm going back to bed.

        function action()
        {
            console.log('I feel tired. I\'m going back to bed.');
        }

    }
    else
    {
        action(); // I feel ok. I can still code one more hour.

        function action()
        {
            console.log('I feel ok. I can still code one more hour.');
        }

    }
}

askHowLazyYouFeel(false); // I feel ok. I can still code one more hour.

try
{
    action() // This will trigger an error as the function is called outside its block scope.
}
catch(error)
{
    console.log(error); // ReferenceError: action is not defined 
}

// Function expression can be used to prevent a problem of scope
let answer;

function areYouComingWithMe(isComing)
{
    if (isComing)
    {
        answer = function()
        {
            console.log('Thanks. I don`t want to be alone tonight.');
        };
    }
    else
    {
        answer = function()
        {
            console.log('Thanks. I prefer to be alone tonight');
        };
    }
    /**
     * answer() has a global scope so as long as the function is called after its assignment
     * (because it's a function expression) there will be no problem.
     */
    answer(); // Thanks. I don`t want to be alone tonight.
}

areYouComingWithMe(true); // Thanks. I don`t want to be alone tonight.
answer(); // Thanks. I don`t want to be alone tonight.

/**
 * In most cases, function declarations are to be preferred to function expressions as
 * they can be called before declaration. They are also more readable.
 * Function expressions are more situational. They're usually a good fit in conditional
 * statements.
 */

