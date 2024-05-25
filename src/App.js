import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./Components/TestComponents";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/SignUpPage";
import HomePage from "./Pages/Home";
import AddProperty from "./Pages/AddProperty";
import OwnedProperties from "./Pages/OwnedProperty";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/owned/properties" element={<OwnedProperties />} />
          <Route path="/add/property" element={<AddProperty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
