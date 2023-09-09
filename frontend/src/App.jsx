import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleCard from "./components/SimpleCard";
import SimpleSidebar from "./components/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/hello/").then((response) => {
      setData(response.data);
    });
  }, []);

  // return <div>{data ? <SimpleCard /> : "Loading..."}</div>;
  return (
    <Router>
      <Routes>
        <Route path="/login" component={SimpleCard} />
        <Route path="/home" component = {SimpleSidebar} />
        
      </Routes>
      <SimpleCard />
    </Router>
  )
}

export default App;
