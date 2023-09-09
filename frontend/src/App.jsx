import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/hello/").then((response) => {
      setData(response.data);
    });
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
}

export default App;
