import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          {/* <PrivateRoute exact path="/projects" component={ Projects } /> */}
        </Routes>
      </Router>
      {/* <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h4 font-title">Dashboard</h1>
              </div>
          </main>
        </div>
      </div> */}
    </div>
  );
}

export default App;
