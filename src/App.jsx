import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import CommentTest from "./routes/CommentTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/comment" element={<CommentTest />} />
        <Route exact path="/demo" element={<Demo />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
