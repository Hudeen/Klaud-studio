/// <reference types="vite-plugin-svgr/client" />

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@components/header";
import { Home } from "@pages/home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
