import axios from "axios";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface RouteParams {
    username: string;
}

const Page: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const get = async () => {
        const res = await axios.get(
            `http://127.0.0.1:5000/user/${props.match.params.username}`
        );
        console.log(res);
    };

    React.useEffect(() => {
        get();
    }, []);

    return <div>{props.match.params.username}</div>;
};

export default withRouter(Page);
