import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import DetailPost from "./components/post/DetailPost";
import CommentTest from "./routes/CommentTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/comment" element={<CommentTest />} />
        <Route exact path="/demo" element={<Demo />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/posts" element={<DetailPost />} />
      </Routes>
    </Router>
  );
}

export default App;
