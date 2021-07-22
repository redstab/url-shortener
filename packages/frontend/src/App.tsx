import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from "./components/FormContainer";

function App() {
  return (
    <Router>
      <div
        className="w-screen h-screen flex justify-center items-center text-white font-sans"
        style={{
          backgroundImage: 'url("https://tailwindui.com/img/beams-bottom.jpg")',
        }}
      >
        <Container />
      </div>
    </Router>
  );
}

export default App;
