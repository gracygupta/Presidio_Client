import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/TestComponents";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
