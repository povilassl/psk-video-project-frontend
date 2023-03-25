import "./App.css";
import React, { useState, useEffect } from "react";
import { getTest } from "./services/videos";
import {apiUrl} from "./services/config";


//NERADAU KUR KA GALECIAU PAKEISTI:D
//TESTUOJU, PS NIEKAS MAN NEPATINKA CIA, NIEKO NESUPRANTU :DD

function App() {

  /* TESTING API */
  const [test, setTest] = useState([]);
  
  useEffect(() => {
    getTest().then((response) => console.log(response)).catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
