import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { Github } from "./Login/Github";
import * as serviceWorker from "./serviceWorker";

const Index = (
    <Router>
        <Route path="/" exact component={App} />
        <Route path="/github/authorize" component={Github} />
    </Router>
);

ReactDOM.render(Index, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
