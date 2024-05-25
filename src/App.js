import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/TestComponents";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/SignUpPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
