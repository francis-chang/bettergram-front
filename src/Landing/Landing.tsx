import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as React from "react";
import { useSpring } from "react-spring";
import {
    Container,
    GithubLogin,
    GithubLogo,
    GithubText,
    Input,
    Login,
    LoginContainer,
    SubmitBtn,
    Title,
    TitleText,
    TitleTitle
} from "./LandingStyles";

library.add(faGithub);

interface Props {}

export const Landing: React.FC<Props> = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    const animateForm = useSpring({});

    const login = async () => {
        const data = { username, password };
        let response = await axios.post("http://127.0.0.1:5000/login", data);
        console.log(response);
    };
    return (
        <Container>
            <Title>
                <TitleTitle>bettergram</TitleTitle>
                <TitleText>ig clone for fun</TitleText>
            </Title>
            <Login>
                <LoginContainer onSubmit={onSubmit}>
                    <Input
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Username"
                    />
                    <Input
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                    />

                    <SubmitBtn type="submit">Log in</SubmitBtn>
                    <GithubLogin>
                        <GithubLogo>
                            <FontAwesomeIcon icon={["fab", "github"]} />
                        </GithubLogo>
                        <GithubText>Sign in with Github</GithubText>
                    </GithubLogin>
                </LoginContainer>
            </Login>
        </Container>
    );
};
