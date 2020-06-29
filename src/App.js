import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import menu from "./pages/menu";
import main from "./pages/main";
import develop from "./pages/develop";
import menujp from "./pages/menujp";

class App extends Component {
  render() {
    return (
      <Router>
        {/*<div className="container">*/}
        <Switch>
          <Route exact path="/" component={menu} />
          <Route exact path="/jp" component={menujp} />
          <Route exact path="/main/:id" component={main} />
          <Route exact path="/develop" component={develop} />
        </Switch>
        {/*</div>*/}
      </Router>
    );
  }
}
export default App;
