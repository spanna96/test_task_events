import { Routes, Route, Link } from "react-router-dom";
import { Home, History } from "../pages";
import { Header, Loader } from "../components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>

        <Loader />
      </main>
    </div>
  );
}

export default App;
