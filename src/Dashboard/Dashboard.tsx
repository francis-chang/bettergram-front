import * as React from "react";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
    React.useEffect(() => {}, []);
    return <div>Token:{localStorage.getItem("access_token")}</div>;
};
