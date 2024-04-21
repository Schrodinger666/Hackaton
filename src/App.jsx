import React from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import './App.css';
import ChatbotButtons from "./ChatbotButtons";

export default function App() {
  return(
    <div className="App">
      <Header />
      {/* <img src="./citypass.png" className="logo" alt="logo" /> */}
      <p>Какие места Вы бы хотели посетить?</p>
      <MessageBox />
    </div>
  )
}