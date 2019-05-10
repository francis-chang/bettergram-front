import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import {
    NavBar,
    NavBarContainer,
    NavigationContainer,
    NavigationIcon
} from "./DashboardStyled";

library.add(faUserCog);

interface Props {}

export const Navigation: React.FC<Props> = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const navSlideout = useSpring({
        width: "20rem",
        backgroundColor: "#3d4a5c",
        height: "100vh",
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: toggle ? "translateX(5rem)" : "translateX(-15rem)"
    });

    const onClickToggle = () => {
        setToggle(!toggle);
    };

    return (
        <NavBarContainer>
            <NavBar>
                <NavigationContainer>
                    <NavigationIcon onClick={onClickToggle}>
                        <FontAwesomeIcon icon="user-cog" />
                    </NavigationIcon>
                </NavigationContainer>
            </NavBar>
            <animated.div style={navSlideout} />
        </NavBarContainer>
    );
};
