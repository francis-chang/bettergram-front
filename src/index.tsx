import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import ConfigUser from "./Dashboard/ConfigUser";
import Dashboard from "./Dashboard/Dashboard";
import { Global } from "./Landing/LandingStyles";
import { Github } from "./Login/Github";
import Page from "./Page/Page";
import * as serviceWorker from "./serviceWorker";

const Index = (
    <Router>
        <Global />
        <Route path="/" exact component={App} />
        <Route path="/:username" component={Page} />
        <Route path="/github/authorize" component={Github} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/config_user" component={ConfigUser} />
    </Router>
);

ReactDOM.render(Index, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
