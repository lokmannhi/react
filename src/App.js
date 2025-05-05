import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AnimeList from "./components/AnimeList/AnimeList";
import ItemList from "./components/ItemList/ItemList";
import AnimeDetail from "./components/AnimeDetails/AnimeDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<AnimeList />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/item" element={<ItemList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
