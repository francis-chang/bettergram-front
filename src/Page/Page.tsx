import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface RouteParams {
    id: string;
}

const Page: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    return <div>{props.match.params.id}</div>;
};

export default withRouter(Page);
