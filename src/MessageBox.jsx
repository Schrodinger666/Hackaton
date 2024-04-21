import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./MessageBox.css";
import ParkCard from "./ChatbotButtons";

function MessageBox() {
  const [message, setMessage] = useState("");
  const [generatedText, setGeneratedText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

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
      <div className="response-container">
        {generatedText && (
          <div className="response-box">
            <h3>Наше предложение</h3>
            <div className="container">
              {generatedText.map((museum, index) => {
                const encoded = encodeURIComponent(museum.address);
                const url = `https://yandex.com/maps?rtext=${lat},${lon}~${encoded}&rtt=auto`;
                return (
                  <div key={index}>
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
                      <strong>Описание:</strong> {museum.information}
                    </p>
                    <p>
                      <strong>Цена билета:</strong> {museum.tiket_price}
                    </p>
                    <p>
                      <strong>Время работы:</strong> {museum.working_time}
                    </p>
                    <a className="link_button" target="_blank" href={url}>
                      Яндекс Карты
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
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
        {isLoading ? "..." : <ArrowUpwardIcon />}
      </button>
    </div>
  );
}

export default MessageBox;
