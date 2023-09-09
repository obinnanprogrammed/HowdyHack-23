import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleCard from "./components/SimpleCard.jsx";
// Import SignupCard from its correct path
import SignupCard from "./components/SignupCard.jsx";

function App() {
  const [data, setData] = useState(null);

  const registerUser = (email, password) => {
    // Your registration logic here.
    console.log("User registered with", email, password);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/hello/").then((response) => {
      setData(response.data);
    });
  }, []);

  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {/* <div>{data ? data.message : "Loading..."}</div> */}

      {showSignup ? (
        <SignupCard
          switchToLogin={() => setShowSignup(false)}
          onRegister={registerUser}
        />
      ) : (
        <SimpleCard switchToSignup={() => setShowSignup(true)} />
      )}
    </>
  );
}

export default App;
