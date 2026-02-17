import React from "react";
import Upload from "./Components/Upload";
import LiveCamera from "./Components/Live";
import Header from "./Components/Header";
import "./App.css";
import HomePage from "./Components/HomePage";
import About from "./Components/About";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <HomePage />
      <About />
      <div className="comp">
        <Upload />
        <LiveCamera />
      </div>
      <Footer />
    </div>
  );
};

export default App;
