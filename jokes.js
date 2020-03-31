const buttonText = [
    'really?',
    '🤦‍♂️',
    'ugh...',
    'please stop',
    'seriously',
    'omg dad',
    'that was bad',
    'you are the worst'
];

const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText')
const jokeHolder = document.querySelector('.joke p'); 
const loader = document.querySelector('.loader');

function handleError(error) {
    return `Looks like there was an error: ${error}`; 
}

//reusable utility function 
function randomItemFromArray(array, not) {
    const filteredArary = array.filter( text => text !== not); 
    const arrayNumber = filteredArary[Math.floor(Math.random() * filteredArary.length)];
    return arrayNumber;
}
    
async function handleClick(e) {
    const { joke } = await fetchJoke().catch(handleError);
    jokeHolder.textContent = joke;
    jokeButtonSpan.textContent = randomItemFromArray(buttonText, jokeButtonSpan.textContent);
}

const apiEndPoint = "https://icanhazdadjoke.com/";

async function fetchJoke() {
    loader.classList.remove("hidden");
    jokeButtonSpan.classList.add("hidden");
    const response = await fetch(apiEndPoint, {
        headers: {
            Accept: 'application/json'
        }
        
    });
    const data = await response.json();
    loader.classList.add("hidden");
    jokeButtonSpan.classList.remove("hidden");
    return data;
}

jokeButton.addEventListener('click', handleClick);
