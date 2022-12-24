import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/demo" element={<Demo />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
