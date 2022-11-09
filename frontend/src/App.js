import "./App.css";

// MES DEPENDANCES
// import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/// MES PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";

// MES COMPONENTS
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
