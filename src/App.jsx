import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import DetailPost from "./components/post/DetailPost";
import Mypage from "./routes/Mypage";
// import CommentTest from "./routes/CommentTest";
import AddPost from "./components/post/AddPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/demo" element={<Demo />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/posts/:postId" element={<DetailPost />} />
        <Route exact path="/mypage/:userId" element={<Mypage />} />
        <Route exact path="/write" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
