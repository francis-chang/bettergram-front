import React, { Fragment } from "react";
import { Landing } from "./Landing/Landing";
import { Global } from "./Landing/LandingStyles";

const App: React.FC = () => {
    return (
        <Fragment>
            <Global />
            <Landing />;
        </Fragment>
    );
};

export default App;
