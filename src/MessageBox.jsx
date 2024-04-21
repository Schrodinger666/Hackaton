import React, { useState } from "react";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./MessageBox.css";
import ParkCard from "./ChatbotButtons";

function MessageBox() {
  const [message, setMessage] = useState("");
  const [generatedText, setGeneratedText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/get-question", {
        prompt: message,
      });
      console.log(response);
      setGeneratedText(response.data.answer);
      setMessage("");
    } catch (error) {
      console.error("Failed to generate response:", error);
      console.error("Error details:", error.response?.data); // Log detailed error response
      setGeneratedText("Error generating response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="message-box">
      {generatedText && (
        <div className="response-box">
          <h3>Generated Response:</h3>
          <div className="container">
            <div>
              {generatedText.map((museum, index) => (
                <div
                  key={index}
                  style={{
                    margin: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <h2>{museum.Place_name}</h2>
                  <p>
                    <strong>Категория:</strong> {museum.Category}
                  </p>
                  <p>
                    <strong>Адрес:</strong> {museum.address}
                  </p>
                  <p>
                    <strong>Город:</strong> {museum.city}
                  </p>
                  <p>
                    <strong>Культурное значение:</strong>{" "}
                    {museum.cult_significance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message here"
        className="message-input"
      />
      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : <ArrowUpwardIcon />}
      </button>
    </div>
  );
}

export default MessageBox;
