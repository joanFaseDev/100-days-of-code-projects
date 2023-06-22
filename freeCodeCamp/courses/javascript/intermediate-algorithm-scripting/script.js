/**
 * For all of the following exercises, my personal goal was to only use functional programming and only declare variables with the const declaration.
 * 
 * Exercise 1: Sum All Numbers in a Range
 * 
 * We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.
 */

function sumAll(arr) {
    const obj = { sum: 0 };
    const newArr = arr
        .concat([])
        .sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);

    for (let i = newArr[0]; i <= newArr[1]; i++) {
        obj["sum"] += i;
    }

    return obj["sum"];
        
}

const test = sumAll([10, 5]);
console.log(test);

/**
 * Exercise 2: Diff Two Arrays 
 * 
 * Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.
 */

// First solution
function diffArray(arr1, arr2) {
    const differenceArr = [];
    arr1.forEach(elem => {
        if (arr2.indexOf(elem) === -1) {
            differenceArr.push(elem);
        }
    });
    arr2.forEach(elem => {
        if (arr1.indexOf(elem) === -1) {
            differenceArr.push(elem);
        }
    });

    return differenceArr.sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
}

console.log(diffArray(
    ["Hello World", "Yes sir!", "Alea Jacta Est", "There will be blood", "Umbasa!"],
    ["Umbasa!", "This beautiful world...", "Winter is coming.", "There will be blood"]
));

//Second solution
function diffArrayV2(arr1, arr2) {
    const differenceArr = [];
    const arrs = [arr1, arr2];
    for (let i = 0, j = 1; i < arrs.length; i++, j--) {
        arrs[i].forEach(elem => {
            if (arrs[j].indexOf(elem) === -1) {
                differenceArr.push(elem);
            }
        });
    }

    return differenceArr.sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
}

console.log(diffArrayV2(
    ["Hello World", "Yes sir!", "Alea Jacta Est", "There will be blood", "Umbasa!"],
    ["Umbasa!", "This beautiful world...", "Winter is coming.", "There will be blood"]
));

/**
 * Exercise 3: Seek and Destroy
 * 
 * You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.
 * You have to use the arguments object. 
 */

function destroyer(arr) {
    const copyArr = [...arguments];
    console.log(copyArr);
    const initialArr = copyArr.shift();
    console.log(initialArr);
    const newArr = initialArr.filter(elem => {
        console.log(elem);
        return copyArr.indexOf(elem) === -1;
    });
    return newArr;
}

console.log(destroyer([1, 10, 50, "Hello World", 100, 1000], "Umbasa!", "Praise the Sun!", 1000, "Hello World"));

/**
 * Exercise 4: Wherefore art thou
 * 
 * Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument).
 * Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.
 */

function whatIsInAName(collection, source) {
    const newArr = [];
    for (const identifier in source) {
        collection.forEach((obj, idx, arr) => {
            if (obj.hasOwnProperty(identifier)) {
                if (obj[identifier] === source[identifier]) {
                    const obj = {};
                    obj[identifier] = source[identifier];
                    newArr.push(obj);
                }
            }
        });
    }
    return newArr;
}

console.log(whatIsInAName(
    [
        {
            firstName: "Kaz",
            lastName: "Brekker",
        },
        {
            firstName: "Inej",
            lastName: "Gahfa",
        },
        {
            firstName: "Katniss",
            lastName: "Everdeen",
        },
        {
            firstName: "Peeta",
            lastName: "Meelark",
        },
    ],
    {
        lastName: "Gahfa",
        firstName: "Katniss",
    }
));