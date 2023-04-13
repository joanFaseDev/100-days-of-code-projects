const mainCtn = document.querySelector('#main-ctn');
const leftBtn= document.querySelector('#left-btn');
const rightBtn= document.querySelector('#right-btn');
const generateBtn = document.querySelector('#generate-btn');

let idxProfile = 0;
let users = null;

leftBtn.addEventListener('click', lastProfile);
rightBtn.addEventListener('click', nextProfile);
generateBtn.addEventListener('click', addRandomUser);

const httpRequest = new XMLHttpRequest();
const xhr = new XMLHttpRequest();
const url = 'https://randomuser.me/api/?format=json&results=5';

// Set the function that will handle the server's response
// There's no parentheses or parameters after the function's name because what is assigned here is a reference to the function.
// The function is not directly called.
httpRequest.onreadystatechange = generateUsersProfile;

// Ask for a random user data object formatted to JSON
// Local cache is indexed by URL so by appening a timestamp to the URL every request become unique and therefore the cache is bypassed.
httpRequest.open('GET', url + (/\?/.test(url) ? "&" : "?") + new Date().getTime());
httpRequest.send();

// Display the different steps the XMLHttpRequest client is in
function printUserData()
{
    switch (httpRequest.readyState) {
        case 0:
            console.log('0: Client has been created. open() not called yet.');
            break;
        case 1:
            console.log('1: open() has been called');
            break;
        case 2:
            console.log('2: send() has been called, and headers and status are available.');
            break;
        case 3:
            console.log('3: Downloading; responseText holds partial data.');
            break;
        default:
            console.log('4: The operation is complete.');
            if (httpRequest.status === 200)
            {
                // Parse the JSON response into an object.
                const obj = JSON.parse(httpRequest.response);
                console.dir(obj);
            }
            else
            {
                console.log(`Problem: ${httpRequest.status}`);
            }
            break;
    }
}

// Request a JSON file of random users, parse it as an object and use it to get an array of five users. 
function generateUsersProfile()
{
    // Try this...
    try 
    {
       if (httpRequest.readyState === XMLHttpRequest.DONE)
       {
            if (httpRequest.status === 200)
            {
                const profiles = JSON.parse(httpRequest.response);
                users = profiles.results;
                
                displayUserProfile(users, idxProfile);
            } 
       } 
    }
    // If not possible, execute that...
    catch(error)
    {
        console.log(error.description);
    }
}

// Display the identity (name, city, photo) of one of the users send by the Random User Generator server
function displayUserProfile(arr, idx)
{
    try
    {
        const name = document.createElement('div');
        name.textContent = `${arr[idx].name.last.toUpperCase()} ${arr[idx].name.first}`;

        const address = document.createElement('div');
        address.textContent = `${arr[idx].location.street.number} ${arr[idx].location.street.name}`;

        const city = document.createElement('div');
        city.textContent = `${arr[idx].location.postcode} ${arr[idx].location.city} (${arr[idx].location.state}) ${arr[idx].location.country}`;

        const photo = document.createElement('div');
        const image = document.createElement('img');
        photo.append(image);
        image.src = `${arr[idx].picture.thumbnail}`;

        const body = document.querySelector('body');
        const profile = document.createElement('div');
        
        profile.append(name, address, city, photo);
        mainCtn.append(profile);
    }
    catch(error)
    {
        console.log(error.message);
    }
}

// Display the previous user, if there's not then display the last one of the list
function lastProfile()
{
    try
    {
        cleanMainContent();
        idxProfile -= 1;
        if (idxProfile < 0)
        {
            idxProfile = users.length - 1;
        }

        if (users)
        {
            displayUserProfile(users, idxProfile);
        }
    }
    catch(error)
    {
        console.dir(error);
    }
}

// Display the next user, if there's not then display the first one of the list
function nextProfile()
{
    try
    {
        cleanMainContent();
        idxProfile += 1;
        if (idxProfile > users.length - 1)
        {
            idxProfile = 0;
        }

        if (users)
        {
            displayUserProfile(users, idxProfile);
        }
    }
    catch(error)
    {
        console.dir(error);
    }
}

// Send a request to the Random User Generator API, parse the JSON response as an Object then add its content (user profile)
// in the array 'users'. Finally display to screen the latest entry in the array.
function addRandomUser()
{
    xhr.onreadystatechange = requestRandomUser;
    xhr.open('GET', 'https://randomuser.me/api/', true);
    xhr.send();
}

// Clear the content of the container used to display the user's data
function cleanMainContent()
{
    if (mainCtn.children.length > 0)
    {
        const childrens = Array.from(mainCtn.children);
        childrens.forEach((children) => children.remove());
    }
}

function requestRandomUser()
{
    try
    {
        if (xhr.readyState === XMLHttpRequest.DONE)
        {
            if (xhr.status === 200)
            {
                const obj = JSON.parse(xhr.response);
                console.dir(obj);
                if (users)
                {
                    console.dir(obj.results[0]);
                    users.push(obj.results[0]);
                    cleanMainContent();
                    displayUserProfile(users, users.length - 1);
                }
            }
        }
    }
    catch (error)
    {
        console.log(error);
    }
}