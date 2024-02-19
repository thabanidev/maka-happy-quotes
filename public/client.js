const quoteP = document.getElementById('quote');
const authorSpan = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

window.onload = updateQuote;


function updateQuote() {
  quoteP.textContent = '';
  authorSpan.textContent = 'Loading...';
  loader.classList.remove('hidden');
  loader.classList.add('visible');
  newQuoteBtn.disabled = true;

  const category = 'life'; // Or any desired category
  fetch(`https://maka-happy-quotes.vercel.app/quotes?category=${category}`)
      .then(response => response.json())
      .then(data => {
          loader.classList.remove('visible');
          loader.classList.add('hidden');
      quoteP.textContent = data.quote;
      authorSpan.textContent = data.author;
      newQuoteBtn.disabled = false;
    });
}

newQuoteBtn.addEventListener('click', updateQuote);
