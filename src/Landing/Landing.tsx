import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import {
    Container,
    GithubLogin,
    GithubLogo,
    GithubText,
    Input,
    Login,
    LoginContainer,
    SignUpToggle,
    SubmitBtn,
    Title,
    TitleText,
    TitleTitle
} from "./LandingStyles";

library.add(faGithub, faInstagram);

interface Props {}

export const Landing: React.FC<Props> = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [signup, setSignup] = React.useState<boolean>(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    const animateForm = useSpring({
        height: "44rem",
        width: "100%",
        padding: "0rem 1.2rem 1.8rem 1.2rem",
        borderRadius: "4px",
        backgroundColor: "#e0e5eb",
        display: "flex",
        flexDirection: "column",
        margin: "0rem 0rem",
        transform: signup ? "translateY(-18rem)" : "translateY(0rem)",
        position: "relative"
    });

    const animatedBars = useSpring({
        borderTop: "10px solid #667c99",
        transform: signup ? "translateY(18rem)" : "translateY(0rem)",
        fontSize: "0px",
        width: "100%",
        position: "absolute",
        left: "0%",
        top: "0%"
    });

    const login = async () => {
        const data = { username, password };
        let response = await axios.post("http://127.0.0.1:5000/login", data);
        console.log(response);
    };

    return (
        <Container>
            <Title>
                <TitleTitle>bettergram</TitleTitle>
                <TitleText>
                    <FontAwesomeIcon icon={["fab", "instagram"]} /> instagram
                    clone
                </TitleText>
            </Title>
            <Login>
                <LoginContainer onSubmit={onSubmit}>
                    <animated.div style={animateForm}>
                        <animated.div style={animatedBars} />
                        <Input
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setUsername(e.target.value);
                            }}
                            placeholder="Username"
                        />
                        <Input
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="Password"
                        />

                        <SubmitBtn type="submit">Log In</SubmitBtn>
                        <GithubLogin>
                            <GithubLogo>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                            </GithubLogo>
                            <GithubText>Sign In with Github</GithubText>
                        </GithubLogin>
                        <SignUpToggle
                            onClick={() => {
                                setSignup(!signup);
                            }}
                        >
                            {" "}
                            Or Sign Up{" "}
                        </SignUpToggle>
                    </animated.div>
                </LoginContainer>
            </Login>
        </Container>
    );
};
