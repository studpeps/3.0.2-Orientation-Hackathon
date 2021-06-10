import React from "react";
import defaultPage from "./default";
import session from "./session";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const routerPage = () => {
  return (
    <Router>
      <Switch>
        <Route path="/session" component={session}></Route>
        <Route path="/default" component={defaultPage}></Route>
        <Route exact path="/" component={defaultPage}></Route>
      </Switch>
    </Router>
  );
};

export default routerPage;
