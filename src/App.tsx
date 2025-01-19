import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewNotes from "./Components/ViewNotes";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
