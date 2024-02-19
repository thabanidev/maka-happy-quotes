'use client'
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [quote, setQuote] = useState('Your Amazing quote');
  const [author, setAuthor] = useState('By Someone');
  const [loading, setLoading] = useState(false);
  
  function updateQuote() {
    setLoading(true);
    setQuote('😗');
    setAuthor('Loading...');
    axios.get('https://api.quotable.io/random')
      .then(response => {
        setQuote(response.data.content);
        setAuthor(response.data.author);
      })
      .catch(error => {
        console.error('API request error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
      <div className="quote-card">
        <div className={loading ? 'visible' : 'hidden'} id="loader"></div>
        <p id="quote">{quote}</p>
        <button onClick={updateQuote} disabled={loading}>✨</button>
        <span id="author">{author}</span>
    </div>
  );
}
