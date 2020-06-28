import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPhotobook from "./components/AddPhotobook";
import Photobook from "./components/Photobook";
import PhotobooksList from "./components/PhotobookList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/photobooks" className="navbar-brand">
            Photobook
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/photobooks"} className="nav-link">
                Photobooks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Photobook
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/photobooks"]} component={PhotobooksList} />
            <Route exact path="/add" component={AddPhotobook} />
            <Route path="/photobooks/:id" component={Photobook} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;