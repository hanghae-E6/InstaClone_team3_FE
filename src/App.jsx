import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import DetailPost from "./components/post/DetailPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/demo" element={<Demo />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/posts/:postId" element={<DetailPost />} />
      </Routes>
    </Router>
  );
}

export default App;
