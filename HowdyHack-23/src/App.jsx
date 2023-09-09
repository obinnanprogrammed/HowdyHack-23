import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleCard from "./components/SimpleCard.jsx";
import ImageHandler from "../components/ImageHandler.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" component={SimpleCard} />
        <Route path="/home" component = {ImageHandler} />
        
      </Routes>
      <SimpleCard />
    </Router>
  );
}

export default App;
