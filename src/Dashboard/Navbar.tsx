import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowCircleDown,
    faArrowCircleUp,
    faImages,
    faSignOutAlt,
    faTimes,
    faUserCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { post } from "../axios";
import {
    NavBar,
    NavBarContainer,
    NavigationContainer,
    NavigationIcon
} from "./DashboardStyled";
import {
    Email,
    LoginForm,
    NavBarInput,
    NavBarSubmitButton,
    PasswordDropDown,
    SettingsContainer,
    SettingsDeleteConfirm,
    SettingsDeleteConfirmButton,
    SettingsExit,
    SettingsItem,
    SettingsItemDelete,
    SettingsItemVerification,
    SettingsTitle,
    SettingsTitleTitle
} from "./NavbarStyling";

library.add(
    faUserCog,
    faSignOutAlt,
    faImages,
    faTimes,
    faArrowCircleUp,
    faArrowCircleDown
);

interface Props extends RouteComponentProps<any> {
    needCredentials: boolean;
    setNeedCred: React.Dispatch<React.SetStateAction<boolean>>;
    data: DataType[];
    setData: React.Dispatch<React.SetStateAction<DataType[]>>;
    setCurrentPicture: React.Dispatch<React.SetStateAction<number | null>>;
    setUploadedPictures: React.Dispatch<React.SetStateAction<any[]>>;
    setUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const [emailOpen, setEmailOpen] = React.useState<boolean>(false);
    const [passwordOpen, setPasswordOpen] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const [changeEmailUsername, setChangeEmailUsername] = React.useState<
        string
    >("");
    const [changeEmailPassword, setChangeEmailPassword] = React.useState<
        string
    >("");
    const [changeEmail, setChangeEmail] = React.useState<string>("");
    const [loginMessage, setLoginMessage] = React.useState<string>("");
    const loginRef = React.useRef<HTMLButtonElement>(null);
    const [changePasswordUser, setChangePasswordUser] = React.useState<string>(
        ""
    );
    const [changePasswordPassword, setChangePasswordPassword] = React.useState<
        string
    >("");
    const [changeNewPassword, setChangeNewPassword] = React.useState<string>(
        ""
    );
    const [changeRePassword, setChangeRePassword] = React.useState<string>("");

    const navSlideout = useSpring({
        width: "20rem",
        backgroundColor: "#333e4d",
        height: "100vh",
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: toggle ? "translateX(5rem)" : "translateX(-15rem)"
    });

    const credentialsSlideout = useSpring({
        width: "20rem",
        backgroundColor: "#333e4d",
        height: "100vh",
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: props.needCredentials
            ? "translateX(5rem)"
            : "translateX(-15rem)"
    });

    const onClickToggle = () => {
        if (emailOpen) {
            setEmailOpen(false);
        }
        if (passwordOpen) {
            setPasswordOpen(false);
        }
        setToggle(!toggle);
    };

    const animateEmail = useSpring({
        height: emailOpen ? "16rem" : "0rem",
        overflow: "hidden"
    });

    const animatePassword = useSpring({
        height: passwordOpen ? "20rem" : "0rem",
        overflow: "hidden"
    });

    const animateConfirm = useSpring({
        position: "absolute",
        top: confirm ? "0%" : "-100%",
        left: "0rem",
        width: "100%",
        padding: "0.5rem 0.7rem",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    });

    const toggleEmailDrop = () => {
        if (passwordOpen) {
            setPasswordOpen(false);
        }
        setEmailOpen(!emailOpen);
    };

    const togglePasswordDrop = () => {
        if (emailOpen) {
            setEmailOpen(false);
        }
        setPasswordOpen(!passwordOpen);
    };

    const toPage = () => {
        props.history.push(`u/${localStorage.getItem("username")}`);
    };

    const emailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username: changeEmailUsername,
            password: changeEmailPassword
        };
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                data
            );
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            const headers = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${response.data.access_token}`
                }
            };
            const updateEmailResponse = await axios.put(
                "http://127.0.0.1:5000/user",
                { email: changeEmail },
                headers
            );
            console.log(updateEmailResponse.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const passwordLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username: changePasswordUser,
            password: changePasswordPassword
        };
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                data
            );
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            const headers = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${response.data.access_token}`
                }
            };

            if (changeNewPassword !== changeRePassword) {
                throw new Error("password is not the same");
            }
            const updateEmailResponse = await axios.put(
                "http://127.0.0.1:5000/user",
                { password: changeNewPassword },
                headers
            );
            console.log(updateEmailResponse.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const onChangeEmailUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEmailUsername(e.target.value);
    };
    const onChangeEmailPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEmailPassword(e.target.value);
    };
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEmail(e.target.value);
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { username, password };
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                data
            );
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            let uploadedFiles: any[] = [];
            props.setNeedCred(false);
            props.setUploading(true);
            await props.data.forEach(async dat => {
                const headers = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`
                    }
                };
                const response = await post("/image", dat.formData, headers);
                uploadedFiles.push(response.image.data);
                //this one liner caches the image
                new Image().src = response.image.data.upload_url;
                props.setCurrentPicture(0);
            });
            props.setUploadedPictures(uploadedFiles);
            props.setUploading(false);
        } catch (err) {
            if (err.response.status === 401 && loginRef.current) {
                setLoginMessage(err.response.data.message);

                loginRef.current.classList.add("shake");
                setTimeout(() => {
                    if (loginRef.current) {
                        loginRef.current.classList.remove("shake");
                    }
                }, 900);
            }
        }
    };

    const logout = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };
        try {
            await axios.get("http://127.0.0.1:5000/logout", headers);
            localStorage.clear();
            props.history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const del = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        };
        try {
            await axios.delete(
                `http://127.0.0.1:5000/user/${localStorage.getItem(
                    "username"
                )}`,
                headers
            );
            localStorage.clear();
            props.history.push("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <NavBarContainer>
            <NavBar>
                <NavigationContainer>
                    <NavigationIcon onClick={onClickToggle}>
                        <FontAwesomeIcon icon="user-cog" />
                    </NavigationIcon>
                    <NavigationIcon onClick={toPage}>
                        <FontAwesomeIcon icon="images" />
                    </NavigationIcon>
                    <NavigationIcon onClick={logout}>
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </NavigationIcon>
                </NavigationContainer>
            </NavBar>

            <animated.div style={navSlideout}>
                <SettingsContainer>
                    <SettingsTitle>
                        <SettingsTitleTitle>SETTINGS</SettingsTitleTitle>
                        <SettingsExit onClick={onClickToggle}>
                            <FontAwesomeIcon icon="times" />
                        </SettingsExit>
                    </SettingsTitle>

                    {!localStorage.getItem("verified") && (
                        <SettingsItemVerification>
                            NON-VERIFIED ACCOUNT
                        </SettingsItemVerification>
                    )}
                    <SettingsItem onClick={toggleEmailDrop}>
                        UPDATE EMAIL
                        <FontAwesomeIcon
                            icon={
                                emailOpen
                                    ? "arrow-circle-up"
                                    : "arrow-circle-down"
                            }
                            className="arrow"
                        />
                    </SettingsItem>
                    <animated.div style={animateEmail}>
                        <Email onSubmit={emailLogin}>
                            <NavBarInput
                                placeholder="USERNAME"
                                value={changeEmailUsername}
                                onChange={onChangeEmailUser}
                            />
                            <NavBarInput
                                placeholder="PASSWORD"
                                type="password"
                                value={changeEmailPassword}
                                onChange={onChangeEmailPassword}
                            />
                            <NavBarInput
                                placeholder="NEW EMAIL"
                                value={changeEmail}
                                onChange={onChangeEmail}
                            />
                            <NavBarSubmitButton type="submit">
                                Submit
                            </NavBarSubmitButton>
                        </Email>
                    </animated.div>
                    <SettingsItem onClick={togglePasswordDrop}>
                        UPDATE PASSWORD
                        <FontAwesomeIcon
                            icon={
                                passwordOpen
                                    ? "arrow-circle-up"
                                    : "arrow-circle-down"
                            }
                            className="arrow"
                        />
                    </SettingsItem>
                    <animated.div style={animatePassword}>
                        <PasswordDropDown onSubmit={passwordLogin}>
                            <NavBarInput
                                placeholder="USERNAME"
                                value={changePasswordUser}
                                onChange={e =>
                                    setChangePasswordUser(e.target.value)
                                }
                            />
                            <NavBarInput
                                placeholder="PASSWORD"
                                type="password"
                                value={changePasswordPassword}
                                onChange={e =>
                                    setChangePasswordPassword(e.target.value)
                                }
                            />
                            <NavBarInput
                                placeholder="NEW PASSWORD"
                                value={changeNewPassword}
                                type="password"
                                onChange={e =>
                                    setChangeNewPassword(e.target.value)
                                }
                            />
                            <NavBarInput
                                placeholder="RETYPE NEW PASSWORD"
                                type="password"
                                value={changeRePassword}
                                onChange={e =>
                                    setChangeRePassword(e.target.value)
                                }
                            />
                            <NavBarSubmitButton type="submit">
                                Submit
                            </NavBarSubmitButton>
                        </PasswordDropDown>
                    </animated.div>
                    <SettingsItemDelete onClick={() => setConfirm(!confirm)}>
                        DELETE ACCOUNT
                    </SettingsItemDelete>
                    <SettingsDeleteConfirm>
                        <animated.div style={animateConfirm}>
                            <SettingsDeleteConfirmButton
                                confirm={true}
                                onClick={del}
                            >
                                DELETE
                            </SettingsDeleteConfirmButton>
                            <SettingsDeleteConfirmButton
                                confirm={false}
                                onClick={() => setConfirm(!confirm)}
                            >
                                CANCEL
                            </SettingsDeleteConfirmButton>
                        </animated.div>
                    </SettingsDeleteConfirm>
                </SettingsContainer>
            </animated.div>
            <animated.div style={credentialsSlideout}>
                <SettingsContainer>
                    <SettingsTitle>
                        <SettingsTitleTitle>
                            LOGIN TO PROCEED
                        </SettingsTitleTitle>
                        <SettingsExit onClick={() => props.setNeedCred(false)}>
                            <FontAwesomeIcon icon="times" />
                        </SettingsExit>
                    </SettingsTitle>
                    <SettingsItem>
                        <LoginForm onSubmit={login}>
                            <NavBarInput
                                placeholder="USERNAME"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <NavBarInput
                                placeholder="PASSWORD"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <NavBarSubmitButton ref={loginRef} type="submit">
                                LOG IN
                            </NavBarSubmitButton>
                        </LoginForm>
                    </SettingsItem>
                </SettingsContainer>
            </animated.div>
        </NavBarContainer>
    );
};

export default withRouter(Navigation);
