import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Students from "./components/Students";
import Projects from "./components/Projects";
import Requests from "./components/Requests";
import ProjectInfo from "./components/ProjectInfo";
import ProjectsLeader from "./components/ProjectsLeader";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/projects" element={ <Projects /> } />
          <Route exact path="/my-projects" element={ <ProjectsLeader /> } />
          <Route exact path="/project/:id" element={ <ProjectInfo /> } />
          <Route exact path="/users" element={ <Users /> } />
          <Route exact path="/students" element={ <Students /> } />
          <Route exact path="/requests" element={ <Requests /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
