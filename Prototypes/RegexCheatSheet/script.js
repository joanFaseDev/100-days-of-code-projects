// Quote marks aren't required within regular expression
let regEx = /Jordan/;
let str = "My name is Jordan";

if (regEx.test(str)) {
    console.log("\"Jordan\" is part of the string \"My name is Jordan\".");
}

// The 'alternation' or OR operator (|)
regEx = /head|tail/;
str = "It's either head or tail..."

if (regEx.test(str)) {
    console.log(`Using the pattern ${regEx.toString()} on the string "It's either hear or tail" returns true.`);
}

regEx = /Jean-Claude|JEAN-Claude|Jean-CLAUDE|JEAN-CLAUDE/;
str = "My name is JEAN-Claude";
if (regEx.test(str)) {
    console.log("There are many spellings possible for that name.");
}

// The 'insensitive' flag (i)

// By default, regular expressions are case sensitive.

regEx = /Jonathan/;
str = "My brother's name is jonathan";

if (!regEx.test(str)) {
    console.log(`The regular expression is evaluated to false here because ${regEx.toString()} doesn't match "jonathan"`);
}

// By using the i flag, the searched pattern is made case insensitive.

regEx = /Jonathan/i;

if (regEx.test(str)) {
    console.log("This time, it works like a charm!");
}

/**
 * Contrary to the test() method that only checks if the pattern exists withing a string, the match() method returns an array with the actual match if there is one.
 */

regEx = /dog|cat/i;
str = "I'm a DOG person!";
console.log(str.match(regEx));

// Otherwise, it returns null.

str = "I'm more of a BIRD person!";
console.log(str.match(regEx));

/**
 * The match() method also returns other useful information like the index of the match or the string on which the regEx was performed.
 */
regEx = "BIRD";
result = str.match(regEx);
console.log(result);

// The 'global' flag (g)

/**
 * The global flag is used to match or search a pattern more than once.
 */

regEx = /Bridge/g;
str = `London Bridge is falling down, falling down, falling down...
London Bridge is falling down, my fair Lady.`;

console.log(str.match(regEx));

// It's possible to use multiple flags in a regular expression.

regEx = /Umbasa/gi;
str = "Umbasa! UMBasa! UMBASA!!!!";
console.log(str.match(regEx));

// The 'wildcard' character (.)

/**
 * The wildcard or dot/period is used to match any one character.
 */

regEx = /.ar/gi;
str = "It's not tar, par, car, far or bar! It's VAR!!!";
console.log(str.match(regEx));

regEx = /a..ay/i;
str = "Array are so useful!";
console.log(str.match(regEx));

// The character classes ([])

/**
 * Character classes are used to define a group of characters to match.
 */

regEx = /mo[lrv]e/i;
str = "Mole?";
console.log(regEx.test(str)); // returns true

str = "More?";
console.log(regEx.test(str)); // returns true

str = "Move?";
console.log(regEx.test(str)); // returns true


// Find all the vowels in a string
regEx = /[aeiou]/gi;
str = "ARE YOU SERIOUS NOW?!";
console.log(str.match(regEx));

// The 'range' character (-)

/**
 * The hyphen character is used to define a range of characters to match.
 */

regEx = /[0-9]/g;
str = "There are 7 eggs. With 9 more, i can do pancakes.";

console.log(str.match(regEx));

regEx = /Z[a-z][a-z]da/;
str = "Ocarina of Time gave Zelda a stronger presence in the serie.";
console.log(str.match(regEx));

/**
 * It is possible to combine a range of letters and a range of numbers in a single character set.
 */

regEx = /[a-zA-Z0-9]/g;
str = "2Fight4Being3";
console.log(str.match(regEx));

// The 'negated' character class (^)

/**
 * Inside a character set, the caret character (^) is used to define a set of characters you do not want to match.
 */

regEx = /[^0-9]/gi; // match all characters that are not numbers
str = "0I don't 44like5 n2umbers98. I 3fin4d them1 fri567ghtening!";
console.log(str.match(regEx));

/**
 * Outside a character set, the caret character is used to search for patterns at the beginning of strings.
 */

regEx = /^.Julie.Lescaut/;
str = "There is a French police TV show known as 'Julie Lescaut'.";
console.log(regEx.test(str)); // returns false

regEx = /^.Julie.Lescaut/;
str = "'Julie Lescaut' is a French police tv show.";
console.log(regEx.test(str)); // returns true

// The 'anchor' character ($)

/**
 * Outside a character set, the dollar sign ($) is used to search for patterns at the end of strings. 
 */

regEx = /com$/;
str = "https://gamekult.com?article=elden_ring"
console.log(regEx.test(str)); // returns false

str = "https://gamekult.com";
console.log(regEx.test(str)); // returns true
// The + character

/**
 * The + character is used to match a character that appears once or more times in a row.
 */

regEx = /l+/;
str = "Hello World!";
console.log(str.match(regEx));

// The * character

/**
 * The * character is similar to the + one except it matchs a character that appears 0 or more times in a row.
 */

regEx = /hisss*/;
str = "Snakes are known to hissssssssssss!";
console.log(str.match(regEx));

// The 'lazy' character (?)

/**
 * The ? character is used to find the smallest possible part of the string that satisfies the regex pattern.
 */

regEx = /bu[a-z]*no/i;
str = "BuenoBono!Bueno! You're a mighty pigeon!";
console.log(str.match(regEx)); //returns BuenoBono

regEx = /bu[a-z]*?no/i;
console.log(str.match(regEx)); //return Bueno

// The class character shortcut \w

/**
 * \w is a shortcut for the pattern [a-zA-z0-9_]. It matches all the alphanumeric characters plus the underscore one.
 */

regEx = /j\w+e/;
str = "My login is !!!joan_fase!!!.";
console.log(str.match(regEx)); // returns joan_fase

// The class character shortcut \W

/**
 * \W is the opposite of \w, it matches all the non-alphanumeric characters (and non underscore)
 */

regEx = /\W/g;
str = "There is a lot of money to gain. And i mean a lot$$$$$$$";
console.log(str.match(regEx)); // There are 20 matchs because of the dot, dollars and space characters.

// The class character shortcut \d

/**
 * \d is used to match all digit characters. It is a shortcut for [0-9].
 */

regEx = /\d/g;
str = "It's a 00. He have the licence to kill them all.";
console.log(str.match(regEx));

// The class character shortcut \D

/**
 * \D is used to match any non-digit characters. It is as shortcut for [^0-9].
 */

regEx = /\D/g;
str = "666RoadToHell666";
console.log(str.match(regEx));