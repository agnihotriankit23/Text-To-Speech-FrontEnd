import React, { useState } from "react";
import "./TextToSpeech.css"; // Import the CSS file

const TextToSpeechForm = () => {
  const [inputText, setInputText] = useState("");
  const [audioUrl, setAudioUrl] = useState();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getAudio = async (event) => {
    setAudioUrl();
    event.preventDefault();
    try {
      const url = "https://text-to-speech-backend.onrender.com/"; // Replace with your API endpoint
      // const url = "http://localhost:3000/";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      };

      const response = await fetch(url, options);
      const jsonData = await response.json();
      if (jsonData.fileName) setAudioUrl(url + `${jsonData.fileName}.mp3`);
      // setInputText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={getAudio} className="text-to-speech-form">
        <label>
          Enter text:
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="text-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {audioUrl && (
        <div className="audio-container">
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechForm;
