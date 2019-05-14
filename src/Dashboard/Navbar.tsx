import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faImages,
    faSignOutAlt,
    faTimes,
    faUserCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import {
    NavBar,
    NavBarContainer,
    NavigationContainer,
    NavigationIcon
} from "./DashboardStyled";
import {
    NavBarInput,
    NavBarSubmitButton,
    SettingsContainer,
    SettingsExit,
    SettingsItem,
    SettingsItemDelete,
    SettingsItemVerification,
    SettingsTitle,
    SettingsTitleTitle
} from "./NavbarStyling";

library.add(faUserCog, faSignOutAlt, faImages, faTimes);

interface Props {
    needCredentials: boolean;
}

export const Navigation: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const [emailOpen, setEmailOpen] = React.useState<boolean>(false);
    const [passwordOpen, setPasswordOpen] = React.useState<boolean>(false);

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
        height: emailOpen ? "13rem" : "0rem",
        overflow: "hidden"
    });
    const Email = styled.div`
        height: 13rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
    `;

    const animatePassword = useSpring({
        height: passwordOpen ? "13rem" : "0rem",
        overflow: "hidden"
    });

    return (
        <NavBarContainer>
            <NavBar>
                <NavigationContainer>
                    <NavigationIcon onClick={onClickToggle}>
                        <FontAwesomeIcon icon="user-cog" />
                    </NavigationIcon>
                    <NavigationIcon>
                        <FontAwesomeIcon icon="images" />
                    </NavigationIcon>
                    <NavigationIcon>
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
                    <SettingsItemVerification>
                        NON-VERIFIED ACCOUNT
                    </SettingsItemVerification>
                    <SettingsItem onClick={() => setEmailOpen(!emailOpen)}>
                        UPDATE EMAIL
                    </SettingsItem>
                    <animated.div style={animateEmail}>
                        <Email>
                            <NavBarInput
                                placeholder="PASSWORD"
                                type="password"
                            />
                            <NavBarInput placeholder="NEW EMAIL" />
                            <NavBarSubmitButton>Submit</NavBarSubmitButton>
                        </Email>
                    </animated.div>
                    <SettingsItem>UPDATE PASSWORD</SettingsItem>
                    <SettingsItemDelete>DELETE ACCOUNT</SettingsItemDelete>
                </SettingsContainer>
            </animated.div>
            <animated.div style={credentialsSlideout} />
        </NavBarContainer>
    );
};
