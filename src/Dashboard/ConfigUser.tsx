import axios from "axios";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Container, Input, Message } from "./ConfigUserStyles";

interface Props {}

const ConfigUser: React.FC<RouteComponentProps> = (
    props: RouteComponentProps
) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [retypePassword, setRetypePassword] = React.useState("");
    const [message, setMessage] = React.useState(
        "Before proceeding we ask that you enter these fields"
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };
        try {
            const response = await axios.put(
                "http://127.0.0.1:5000/user",
                data,
                headers
            );
            localStorage.setItem(
                "github_activated",
                response.data.github_verified
            );
        } catch (err) {
            setMessage(err.data.message);
        }
        props.history.push("/");
    };
    return (
        <Container>
            <Message>{message}</Message>
            <form onSubmit={submit}>
                <Input
                    placeholder="EMAIL"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <Input
                    placeholder="PASSWORD"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <Input
                    placeholder="RETYPE PASSWORD"
                    value={retypePassword}
                    onChange={e => {
                        setRetypePassword(e.target.value);
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </Container>
    );
};

export default withRouter(ConfigUser);
