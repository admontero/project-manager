import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Students from "./components/Students";
import Projects from "./components/Projects";
import Requests from "./components/Requests";
import ProjectInfo from "./components/ProjectInfo";
import ProjectsLeader from "./components/ProjectsLeader";
import NewProject from "./components/NewProject";
import EditProject from "./components/EditProject";
import Advances from "./components/Advances";
import EditProfile from "./components/EditProfile";
import PrivateRoute from "./routes/PrivateRoute";
import Forbidden from "./components/Forbidden";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/projects" element={ <PrivateRoute roles={ ['ADMINISTRADOR', 'ESTUDIANTE'] }> <Projects /> </PrivateRoute> } />
          <Route exact path="/my-projects" element={ <PrivateRoute roles={ ['LIDER'] }> <ProjectsLeader /> </PrivateRoute> } />
          <Route exact path="/project/new" element={ <PrivateRoute roles={ ['LIDER'] }> <NewProject /> </PrivateRoute> } />
          <Route exact path="/project/:id" element={ <PrivateRoute roles={ ['ADMINISTRADOR', 'LIDER'] }> <ProjectInfo /> </PrivateRoute> } />
          <Route exact path="/project/:id/edit" element={ <PrivateRoute roles={ ['LIDER'] }> <EditProject /> </PrivateRoute> } />
          <Route exact path="/project/:id/advances" element={ <PrivateRoute roles={ ['ESTUDIANTE'] }> <Advances /> </PrivateRoute> } />
          <Route exact path="/users" element={ <PrivateRoute roles={ ['ADMINISTRADOR'] }> <Users /> </PrivateRoute> } />
          <Route exact path="/students" element={ <PrivateRoute roles={ ['LIDER'] }> <Students /> </PrivateRoute> } />
          <Route exact path="/requests" element={ <PrivateRoute roles={ ['LIDER'] }> <Requests /> </PrivateRoute> } />
          <Route exact path="/profile" element={ <PrivateRoute roles={ ['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE'] }> <EditProfile /> </PrivateRoute> } />
          <Route exact path="/forbidden" element={ <PrivateRoute roles={ ['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE'] }> <Forbidden /> </PrivateRoute> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
