import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/TestComponents";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
