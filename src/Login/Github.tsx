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
                localStorage.setItem("access_token", res.data.access_token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                localStorage.setItem(
                    "github_activated",
                    res.data.github_activated
                );
                window.close();
            });
    }, [props.location.search]);
    return <div>Closing shortly...</div>;
};
