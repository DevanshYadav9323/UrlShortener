import React, { useState } from 'react';
import axios from 'axios';
import "./Hero.css";

function Hero() {
  const token = "503bf5006708dc769617c571f07206858ef8c018";

  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  /* function to handle errors */
  const handleError = (error) => {
    console.log(error);
    setError("Please enter a valid URL.");
    setShortUrl('');
  }

  const handleShortenUrl = () => {
    axios.post("https://api-ssl.bitly.com/v4/shorten", {
      long_url: inputUrl,
      domain: "bit.ly"
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      setShortUrl(response.data.link);
      setError('');
      setShowOutput(true);
    })
    .catch(handleError);
  };

  const handleCopyUrl = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    
    // Set the value of the textarea to the short URL
    textarea.value = shortUrl;
    
    // Append the textarea to the DOM
    document.body.appendChild(textarea);
    
    // Select the text within the textarea
    textarea.select();
    
    // Execute the copy command
    document.execCommand('copy');
    
    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
    
    // Display a message to indicate that the URL has been copied
    alert('Short URL copied!');
  };
  

  const handleClear = () => {
    setInputUrl('');
    setShortUrl('');
    setError('');
    setShowOutput(false);
  };

  return (
    <main>
      <div id="header-div" className="">
        <h1 className="">URL Shortener</h1>
      </div>
      {/* link input and shorten button */}
      <div id="content-div">
        <div id="input-div">
          <input
            type="text"
            className="text-field content-row"
            placeholder="Enter URL here . . ."
            id="input-field"
            value={inputUrl}
            onChange={handleInputChange}
            required
          />
          <button
            id="shorten"
            type="button"
            className="content-row button"
            onClick={handleShortenUrl}
          >
            Generate
          </button>
          <button
            type="button"
            id="clear-btn"
            className="content-row button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {showOutput && ( // Render output only if showOutput is true
          <div id="output-div">
            <div className="content-row" id="new-url-label">
              New URL:
            </div>
            <div id="new-url" className="content-row">
              {shortUrl}
            </div>
            <button
              type="button"
              id="copy-btn"
              data-clipboard-target="#new-url"
              className="content-row button"
              onClick={handleCopyUrl}
            >
              Copy
            </button>
          </div>
        )}
        <div className="" id="error-div">
          <p className="content-row" id="error-text">
            {error}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Hero;
