import "./App.css";

// MES DEPENDANCES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

/// MES PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// MES COMPONENTS
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const transferToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 1 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header token={token} transferToken={transferToken} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login transferToken={transferToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
