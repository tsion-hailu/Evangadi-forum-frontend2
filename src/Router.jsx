import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import  AskQuestion from "./Pages/AskQuestion/AskQuestion"
import Landing from "./Pages/Landing/Landing";
import Answer from "./Pages/Answer/Answer";


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/questions" element={<AskQuestion />} />
      <Route path="/answer/:id" element={<Answer />} />
    </Routes>
  );
}

export default Routing;
