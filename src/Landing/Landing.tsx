import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faGithub,
    faGoogle,
    faInstagram,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { animated, useSpring } from "react-spring";
import {
    BotMessage,
    Container,
    GithubLogin,
    GithubLogo,
    GithubText,
    GoogleLogin,
    GoogleLogo,
    Input,
    Login,
    LoginContainer,
    LoginForm,
    SignUpToggle,
    SquareOne,
    SubmitBtn,
    Title,
    TitleText,
    TitleTitle,
    TopErrorMessage,
    TopMessage
} from "./LandingStyles";

library.add(faGithub, faInstagram, faGoogle, faTwitter);

interface Props {}

const Landing: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [signup, setSignup] = React.useState<boolean>(false);
    const [loginMessage, setLoginMessage] = React.useState<string>("");
    const loginRef = React.useRef<HTMLButtonElement>(null);

    const [regUsername, setRegUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [regPassword, setRegPassword] = React.useState<string>("");
    const [regRePassword, setRegRePassword] = React.useState<string>("");
    const [signupMessage, setSignupMessage] = React.useState<string>("");

    React.useEffect(() => {
        if (localStorage.getItem("access_token")) {
            props.history.push("/dashboard");
        }
        setInterval(() => {
            if (localStorage.getItem("access_token")) {
                props.history.push("/dashboard");
            }
        }, 1000);
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        register();
    };

    const login = async () => {
        const data = { username, password };
        try {
            let response = await axios.post(
                "http://127.0.0.1:5000/login",
                data
            );
        } catch (err) {
            if (err.response.status === 401 && loginRef.current) {
                if (!username) {
                    setLoginMessage("missing username");
                } else if (!password) {
                    setLoginMessage("missing password");
                } else {
                    setLoginMessage(err.response.data.message);
                }
                loginRef.current.classList.add("shake");
                setTimeout(() => {
                    if (loginRef.current) {
                        loginRef.current.classList.remove("shake");
                    }
                }, 900);
            }
        }
    };

    const register = async () => {
        if (!regUsername || !regPassword || !email) {
            setSignupMessage("Missing fields");
            setRegPassword("");
            setRegRePassword("");
        } else if (regRePassword !== regPassword) {
            setSignupMessage("passwords do not match");
            setRegPassword("");
            setRegRePassword("");
        } else if (regPassword.length < 8) {
            setSignupMessage("password must be greater than 7 characters");
            setRegPassword("");
            setRegRePassword("");
        }
        const data = {
            username: regUsername,
            email,
            password: regPassword
        };

        try {
            await axios.post("http://127.0.0.1:5000/register", data);
            let response = await axios.post(
                "http://127.0.0.1:5000/login",
                data
            );
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            props.history.push("/dashboard");
        } catch (err) {
            console.log(err.response);
        }
    };

    const toggle = () => {
        setSignup(!signup);
        setUsername("");
        setPassword("");
        setLoginMessage("");
    };

    const githubLogin = () => {
        window.open(
            "http://127.0.0.1:5000/login/github",
            "name",
            "width=500,height=600"
        );
    };

    const animateForm = useSpring({
        height: "65rem",
        width: "100%",
        padding: "0rem 1.2rem 1.8rem 1.2rem",
        borderRadius: "4px",
        backgroundColor: "#d0d8e1",
        display: "flex",
        flexDirection: "column",
        margin: "0rem 0rem",
        transform: signup ? "translateY(-23.8rem)" : "translateY(0rem)",
        position: "relative"
    });

    const animatedBars = useSpring({
        borderTop: "10px solid #667c99",
        transform: signup ? "translateY(23.8rem)" : "translateY(0rem)",
        fontSize: "0px",
        width: "100%",
        position: "absolute",
        left: "0%",
        top: "0%"
    });

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
                <LoginContainer>
                    <animated.div style={animateForm}>
                        <animated.div style={animatedBars} />
                        <SquareOne />
                        <LoginForm onSubmit={onSubmit}>
                            {loginMessage ? (
                                <TopErrorMessage>
                                    {loginMessage}
                                </TopErrorMessage>
                            ) : (
                                <TopMessage>Log in: </TopMessage>
                            )}
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                value={username}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setUsername(e.target.value);
                                }}
                                placeholder="Username"
                            />
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                placeholder="Password"
                            />

                            <SubmitBtn ref={loginRef} type="submit">
                                Log In
                            </SubmitBtn>
                        </LoginForm>
                        <GithubLogin onClick={githubLogin} type="button">
                            <GithubLogo>
                                <FontAwesomeIcon icon={["fab", "github"]} />
                            </GithubLogo>
                            <GithubText>Sign In with Github</GithubText>
                        </GithubLogin>
                        <GoogleLogin>
                            <GoogleLogo>
                                <FontAwesomeIcon icon={["fab", "google"]} />
                            </GoogleLogo>
                            <GithubText>Sign In with Google</GithubText>
                        </GoogleLogin>
                        <SignUpToggle type="button" onClick={toggle}>
                            {signup ? "Back to Log in" : "Or Sign Up"}
                        </SignUpToggle>
                        <LoginForm onSubmit={onSignUpSubmit}>
                            <BotMessage>Sign up: </BotMessage>
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                placeholder="Username"
                                value={regUsername}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRegUsername(e.target.value);
                                }}
                            />
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                placeholder="Email"
                                value={email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                type="password"
                                placeholder="Password"
                                value={regPassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRegPassword(e.target.value);
                                }}
                            />
                            <Input
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                type="password"
                                placeholder="Re-type Password"
                                value={regRePassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setRegRePassword(e.target.value);
                                }}
                            />
                            <SubmitBtn type="submit">Sign Up</SubmitBtn>
                        </LoginForm>
                    </animated.div>
                </LoginContainer>
            </Login>
        </Container>
    );
};

export default withRouter(Landing);
