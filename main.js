const author = document.querySelector('.author');
const tags = document.querySelector('.tags');
const quote = document.querySelector('.quote');

const refresh = document.querySelector('#refresh');
const link = document.querySelector('#link');

const card = document.querySelector('.card');
const buttons = document.querySelector('.buttons');
const loader = document.querySelector('.loader');

function fetchQuote() {
    addLoader();
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            removeLoader();
            displayQuote(data);
            setUpLinkButton(data._id);
        })
}

function displayQuote(data) {
    author.textContent = data.author;
    quote.textContent = `“${data.content}”`;
    tags.replaceChildren(...data.tags.map(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        return span;
    }));
}

function addLoader() {
    loader.classList.remove('hidden');
    card.classList.add('hidden');
    buttons.classList.add('hidden');
}

function removeLoader() {
    loader.classList.add('hidden');
    card.classList.remove('hidden');
    buttons.classList.remove('hidden');
}

function setUpLinkButton(quoteId) {
    const url = `https://api.quotable.io/quotes/${quoteId}`;
    link.onclick = () => {
        navigator.clipboard.writeText(url)
            .then(() => console.log(`copied ${url} to clipboard`))
            .catch(() => console.log("couldn't save link to clipboard"))
    }
}

refresh.addEventListener('click', fetchQuote);
fetchQuote();