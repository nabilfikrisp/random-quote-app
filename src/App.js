import './App.scss';
import React, { useState, useEffect } from 'react';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


let quotesDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("A truly rich man is one whose children run into his arms when his hands are empty.");
  const [author, setAuthor] = useState("Unknown");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34")
  // let quote = "A truly rich man is one whose children run into his arms when his hands are empty.";
  // let author = "Unknown";
  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  }

  useEffect(() => {
    fetchQuotes(quotesDBUrl)
  }, [])


  const handleNewQuoteBtn = () => {
    let randInt = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randInt);
    setAccentColor(COLORS_ARRAY[randInt])
    setQuote(quotesArray[randomNumber].quote);
    setAuthor(quotesArray[randomNumber].author);
  }

  // const quotes = [
  //   { value: "A person who never made a mistake never tried anything new.", author: "Dadang" },
  //   { value: "A truly rich man is one whose children run into his arms when his hands are empty.", author: "Amon" },
  //   { value: "Education costs money. But then so does ignorance.", author: "Unknown" },
  //   { value: "Winning isn`t everything, but wanting to win is.", author: "Vince Lombardi" },
  //   { value: "Do what you can, where you are, with what you have.", author: "Teddy Roosevelt" },
  // ]

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor, color: accentColor }}>
        <div className='container w-5/12 p-8'>
          <div id='quote-box' className='bg-white font-mono rounded-md p-8'>
            <p id='text' className='text-3xl mb-2 font-semibold'>
              "{quote}"
            </p>
            <p id='author' className='text-right text-xl font-light mb-8 px-4'>
              - {author}
            </p>
            <div id='action-section' className='flex justify-between mt-3 px-4'>
              <a href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)} id="tweet-quote" className='text-white p-2 text-base rounded-md hover:scale-110 hover:opacity-70 transition duration-300 ease-in-out' style={{ backgroundColor: accentColor }}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <button onClick={() =>
                handleNewQuoteBtn()
              } id='new-quote' className='text-white p-2 text-base rounded-md px-4 font-semibold hover:scale-110 hover:opacity-70 transition duration-300 ease-in-out' style={{ backgroundColor: accentColor }}>
                New Quote
              </button>
            </div>
          </div>
        </div>
        <p className='text-slate-700 font-mono text-sm'>
          created by nabil fikri
        </p>
      </header>
    </div >
  );
}

export default App;
