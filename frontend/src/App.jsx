import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleCard from 'components/SimpleCard.jsx';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/hello/").then((response) => {
      setData(response.data);
    });
  }, []);

  return <div>{data ? <SimpleCard /> : "Loading..."}</div>;
}

export default App;
