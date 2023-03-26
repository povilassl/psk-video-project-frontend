import "./App.css";
import React, { useState, useEffect } from "react";
import { getTest } from "./services/videos";


//NERADAU KUR KA GALECIAU PAKEISTI:D
//TESTUOJU, PS NIEKAS MAN NEPATINKA CIA, NIEKO NESUPRANTU :DD\

// (-_-)

function App() {

  /* TESTING API */
  const [test, setTest] = useState([]);
  
  useEffect(() => {
    getTest()
      .then((response) => { setTest(response.data);})
      .catch((error) => { console.log(error); })
  }, []);

  return (
    <div className="App">
      {test}
    </div>
  );
}

export default App;
