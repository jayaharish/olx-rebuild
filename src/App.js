// library imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//component imports
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route path="/home/" component={Home}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
