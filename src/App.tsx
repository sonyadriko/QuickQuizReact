import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import HighScores from "./pages/HighScores";
import End from "./pages/End";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </Router>
  );
};

export default App;
