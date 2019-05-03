import axios from "axios";
import * as React from "react";

interface Props {}

export const Github: React.FC<Props> = (props: any) => {
    React.useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const code = params.get("code");
        axios
            .get(`http://localhost:5000/login/github/authorized?code=${code}`)
            .then(res => {
                console.log(res.data);
            });
    }, []);
    return <div>hi</div>;
};
