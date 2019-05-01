import axios from "axios";
import * as React from "react";
import { Container, Login, Title } from "./LandingStyles";

interface Props {}

export const Landing: React.FC<Props> = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    const login = async () => {
        const data = { username, password };
        let response = await axios.post("http://127.0.0.1:5000/login", data);
        console.log(response);
    };
    return (
        <Container>
            <Title />
            <Login>
                <form onSubmit={onSubmit}>
                    <input
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <input
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                    />
                    <button type="submit">Submit</button>
                </form>
            </Login>
        </Container>
    );
};
