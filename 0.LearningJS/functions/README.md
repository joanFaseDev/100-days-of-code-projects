```javascript

// Function Declaration
function name(parameter1, parameter2, ... parameterN)
{
    // body
}

```

```javascript

// Global and local scope
let myName = 'Jordan';
function showMyName()
{
    let myName = 'Nadroj';
    alert(myName); // 'Nadroj'
}

```

```javascript

// Parameters, default parameters and arguments
function showCoupleName(firstName = 'Inej', secondName ='Kaz')
{
    alert(firstName, secondName);
}

showCoupleName('Katniss', 'Peeta'); // Katniss Peeta
showCoupleName(); // Inej Kaz
```

```javascript

// Returning a value
function checkAge(age)
{
    if (age >= 18)
    {
        return 'You can enter.';
    }
    else
    {
        return 'Go back to your parents, kid.';
    }
}

console.log(checkAge(22)); // You can enter;
console.log(checkAge(16)); // Go back to your parents, kid.;

function doNothing()
{

}

console.log(doNothing()) // undefined
```

Functions are actions so their name should be a verb. It should be brief, accurate and descriptive.
A good named function should immediately tell what it does and what it returns.
Ideally, a function should do one action (the one suggested by its name) and no more.
A good named function is called **self-describing** because it prevent the use of comment by being clear enough.

```javascript

// Function expression
let greetings = function()
{
    console.log('Hello everyone!');
}

greetings() // Hello everyone

let sameGreetings = greetings; // Functions, declared or expressed, are values.
sameGreetings() // Hello everyone
console.log(sameGreetings) // Return the code source of the function.
```

```javascript

// Callback functions
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

function authorize()
{
    console.log('You can enter sir.');
}

checkAge(
    'Are you eighteen years old or more?',
    authorize,
    function() { console.log('You`re too young to enter sir. Come back in a few years.') }
);

```

```javascript

// Arrow functions
let showFavoriteVideoGames = ([...videoGames]) => console.log(...videoGames); 

showFavoriteVideoGames(['Secret of Evermore', 'Odin Sphere']) // Secret of Evermore Odin Sphere

```