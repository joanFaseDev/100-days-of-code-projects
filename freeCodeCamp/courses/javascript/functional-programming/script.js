/**
 * In functional programming, code is organized in basic functions that can be combined to build complex programs.
 */

const letSpectatorEnter = () => "One spectator entered the movie theater.";

const countSpectator = (numberSpectators) => {
    const spectators = [];
    for (let i = 0; i < numberSpectators; i++) {
        const entry = letSpectatorEnter();
        spectators.push(entry);
    }

    return spectators;
};

const registerEachSpectator = countSpectator(100);

// console.log(registerEachSpectator);


const prepareHotChocolate = () => "One coffee, coming right up!."
const prepareExpresso = () => "One expresso, coming right up!"

const getDrink = (prepareDrink, numberOfCups) => {
    const cups = [];
    for (let i = 0; i < numberOfCups; i++) {
        const coffee = prepareDrink();
        cups.push(coffee);
    }
    return cups;
}

const cupsOfHotChocolate = getDrink(prepareHotChocolate, 25);
const cupsOfExpresso = getDrink(prepareExpresso, 25);

// console.log(cupsOfHotChocolate, cupsOfExpresso);

function ImperativeWindow(tabs) {
    this.tabs = tabs;
}
 /**
  * Every function can be used as a constructor, except arrow functions as they don't have their own "this" keyword
  */
const DeclarativeWindow = function(tabs) {
    this.tabs = tabs;
}

const RPGTeam = function(characters) {
    this.characters = characters;
};

// By returning the object calling the method, one can call multiple methods one after the other (cf. below)
RPGTeam.prototype.addMember = function(newCharacter) {
    this.characters.push(newCharacter);
    return this;
}

RPGTeam.prototype.removeMember = function(index) {
    const membersBeforeIndex = this.characters.splice(0, index);
    const membersAfterIndex = this.characters.splice(1);
    this.characters = membersBeforeIndex.concat(membersAfterIndex);
    return this;
}

RPGTeam.prototype.joinTeam = function(otherTeam) {
    this.characters = this.characters.concat(otherTeam);
    return this;
}

const team = new RPGTeam(["Ronald the Barbarian", "Elric the Necromancer", "Circe the Sorceress"]);
console.log(team);
const finalTeam = team
    .addMember("Xena the Warrior Princess")
    .removeMember(2)
    .joinTeam(["Conan the Barbarian", "Legolas the Archer", "Alundra the Dream Walker"])
    .removeMember(0);

console.log(finalTeam);

/**
 * Functional Programming is drive by the idea of immutability. Mutation cause side effects and side effects lead to bugs. If something needs to be changed then create a copy.
 * 
 * Another principle of functional programming is to always declare your dependencies explicitly. Computations inside a function depend on the arguments passed to the function, not on any global object or variable.
 */

const comics = ["Batman", "Superman"];

function addComic(comicsList, newComic) {
    return [...comicsList, newComic];
}

function removeComic(comicsList, comicToRemove) {
    const comics = [...comicsList];
    const index = comics.indexOf(comicToRemove);
    if (index !== -1) {
        comics.splice(index, 1);
        return comics;
    }
}

const newComicsCollection = addComic(addComic(comics, "Flash"), "WonderWoman");

console.log(newComicsCollection);

// Using map

const videoGames = [
    {
        title: "Odin Sphere",
        studio: "Vanillaware",
        genre: "Action-RPG",
    },
    {
        title: "Alundra",
        studio: "Matrix Software",
        genre: "Action-Adventure"
    },
    {
        title: "Legacy of Kain: Soul Reaver",
        studio: "Crystal Dynamics",
        genre: "Action-Adventure",
    }
];

const sortedVideoGames = videoGames.map(game => {
    return { 
        "title": game["title"],
        "genre": game["genre"],
    };
});

console.log(sortedVideoGames);

// Implementing custom map method
Array.prototype.customMap = function(callback) {
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        const elem = callback(this[i], i, this);
        newArray.push(elem);
    }
    return newArray;
};

const newArray = [
    "Odin Sphere", 
    "Alundra", 
    "Legacy of Kain: Blood Omen", 
    "Legacy of Kain: Soul Reaver"
].customMap((elem) => elem.toUpperCase());

console.log(newArray);

// Using filter

const books = [
    {
        title: "Six of Crows",
        author: "Leigh Bardugo",
    },
    {
        title: "Hunger Games",
        author: "Suzanne Collins",
    },
    {
        title: "The Knife Of Never Letting Go",
        author: "Patrick Ness",
    },
    {
        title: "Catching Fire",
        author: "Suzanne Collins",
    },
    {
        title: "Crooked Kingdom",
        author: "Leigh Bardugo",
    }
];

const crowBooks = books.filter(book => book["author"] === "Leigh Bardugo");
console.log(crowBooks);

// Building a custom filter method

const students = [
    {
        firstName: "Leopold",
        lastName: "Trumpcard",
        grade: "88",
        gender: "M",
    },
    {
        firstName: "Nathaël",
        lastName: "Querouac",
        grade: "72",
        gender: "M",
    },
    {
        firstName: "Alicia",
        lastName: "Forrest",
        grade: "79",
        gender: "F",
    },
    {
        firstName: "Alphonso",
        lastName: "Messine",
        grade: "92",
        gender: "M",
    },
    {
        firstName: "Josie",
        lastName: "Manssinie",
        grade: "68",
        gender: "F",
    },
    {
        firstName: "Tara",
        lastName: "Vaudrum",
        grade: "94",
        gender: "F",
    }
];

Array.prototype.myFilter = function(callback) {
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
        const elem = this[i];
        if (callback(elem) == true) {
            newArr.push(elem);
        }
    }
    return newArr;
}

const filteredArr = students.myFilter(elem => Number(elem["grade"]) >= 80);
console.log(filteredArr);

Array.prototype.customFilter = function(callback) {
    const newArr = [];
    this.forEach((elem, index, arr) => {
        const student = this[index];
        if (callback(student) == true) {
            newArr.push(student);
        }       
    });
    return newArr;
}

const genderArr = students.customFilter(elem => elem["gender"] === "F");

console.log(genderArr);

// Using slice() instead of splice() to not mutate arrays.

Array.prototype.removeWithoutMutating = function(startIndex, endIndex) {
    return this.slice(startIndex, endIndex);
}

console.log(students.removeWithoutMutating(2, 4));

// JavaScript has a lot of built-in non-mutating methods that can be used in functional programming (and other paradigms too)

const otherStudents = [
    {
        firstName: "Laëticia",
        lastName: "Gros",
        grade: "67",
        gender: "F",
    },
    {
        firstName: "Frederick",
        lastName: "Michet",
        grade: "62",
        gender: "M",
    },
];

function nonMutatingConcat(base, appendix) {
    return base.concat(appendix);
}

const moreStudents = nonMutatingConcat(students, otherStudents);
console.log(moreStudents);

// The all might reduce() method

function getNameAndGrade(arr) {
    return arr.reduce((obj, student) => {
        obj[student["firstName"] + " " + student["lastName"]] = student["grade"];
        return obj;
    }, {});
}

const nameAndGradeObj = getNameAndGrade(moreStudents);
console.log(nameAndGradeObj);

// Filter all female students with grade above 79 and then display their first name & last name's first character + their grade

const femaleStudents = moreStudents
    .filter(student => student["gender"] === "F" && Number(student["grade"]) >= 80)
    .reduce((arr, student) => {
        const key = `${student["firstName"]}.${student["lastName"][0]}`;
        const value = student["grade"];
        const obj = {};
        obj[key] = value;
        arr.push(obj);
        return arr;
    }, []);

console.log(femaleStudents);

/**
 * Exercice: Complete the code for the squareList function using any combination of map(), filter(), and reduce(). The function should return a new array containing the squares of only the positive integers (decimal numbers are not integers) when an array of real numbers is passed to it.
 */

const squareList = arr => {
    
    // Check if there are only real numbers among the array's elements
    const onlyRealNumbers = arr.reduce((bool, element) => {
      if (typeof element !== "number") {
        return;
      }
    }, true);
  
    arr = arr
      .filter((numb) => Number.isInteger(numb) && numb > 0)
      .map((integer) => integer * integer);
  
    return arr;
    // Only change code above this line
  };
  
  const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
  console.log(squaredIntegers);

  // Using the sort() method

  function alphabeticalOrder(arr) {  
    return arr.sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
  }
  
  console.log(alphabeticalOrder(["a", "d", "c", "a", "z", "g"]));

  // Using the sort() method without mutating the original array

  const actors = [
    "Leonardo Dicaprio",
    "Russel Crow",
    "Cameron Diaz",
    "Sandra Bullock",
    "Rachel Weiz",
    "John Cena",
    "Dwayn Johnson"
  ];

  const sortActors = actors
    .concat([])
    .sort((a, b) => (a === b) ? 0 : a < b ? -1 : 1);
console.log(sortActors);
console.log(actors);

// Using split() & join()

function sentensify(str) {
    const transformedStr = str
      .split(/[\s-.,;]/)
      .join(" ");
    console.log(transformedStr);
    return transformedStr;
    // Only change code above this line
  }
  
  sentensify("May-the-force-be-with-you");

  // Exercice: Apply Functional Programming to Convert Strings to URL Slugs

function urlSlug(title) {
    const hyphenString = title
      .split(/[\s]/g)
      .filter(word => word)
      .map(word => word.toLowerCase())
      .join("-");
    return hyphenString;
  }
  console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"));