import React from "react";
import { Container } from "./components/FormContainer";

function App() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center text-white font-sans"
      style={{
        backgroundImage: 'url("https://tailwindui.com/img/beams-bottom.jpg")',
      }}
    >
      <Container />
    </div>
  );
}

export default App;
