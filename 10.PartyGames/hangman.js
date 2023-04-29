/**
 * Instances of XMLHttpRequest can communicate with servers.
 * It can send and receive information in various formats (JSON, XML, HTML, ...)
 * 
 * XMLHttpRequest is asynchronous, meaning it can exchange datas with server and
 * update the page without having to refresh it.
 */

document.querySelector('#requestBtn').addEventListener('click', (event) => {
    requestHandler();
    document.querySelector('#requestBtn').setAttribute('disabled', '');
});


// Handle the request
function responseHandler(xmlHttpRequest)
{
    try {
        if (xmlHttpRequest.target.readyState === XMLHttpRequest.DONE)
        {
            if (xmlHttpRequest.target.status === 200)
            {
                document.querySelector('#word').textContent = JSON.parse(xmlHttpRequest.target.response);
                createHangmanSlots(JSON.parse(xmlHttpRequest.target.response).join(''));
            }
            else
            {
                console.log(`There was a problem with the request.\nRequest status: ${xmlHttpRequest.target.status}`);
            }
        }
        else
        {
            console.log(`The response is not ready yet.\nCurrent state is ${xmlHttpRequest.target.readyState}`);
        }    
    } 
    catch (error) 
    {
        console.log(`Caught exception: ${error.description}`);
    }
    
}

function createRequestObj(method, url)
{
    return {
        method: method,
        url: url,
        isAsynchronous: true
    };
}

function requestHandler()
{
    const httpRequest = new XMLHttpRequest();
    const request = createRequestObj(
    'GET',
    'https://random-word-api.vercel.app/api?words=1'
    );

    httpRequest.onreadystatechange = (httpRequest) => {
        responseHandler(httpRequest);
    };

    httpRequest.open(
        request.method,
        request.url,
        request.isAsynchronous
    );

    httpRequest.send();
}

function createHangmanSlots(word)
{
    const divParent = document.createElement('div');
    divParent.setAttribute('id', 'letters-ctn');
    console.log(word);

    for (let i = 0; i < word.length; i++)
    {
        const div = document.createElement('div');
        div.setAttribute('class', 'letters');
        div.textContent = word[i];
        divParent.append(div);
    }

    document.querySelector('#main').append(divParent);
}