import * as React from "react";
import { animated, useSpring } from 'react-spring';
import { Container, NavBar, NavBarContainer } from "./DashboardStyled";


interface Props {}



export const Dashboard: React.FC<Props> = () => {
    const [toggle, setToggle] = React.useState<boolean>(false)
    React.useEffect(() => {}, []);

    const navSlideout = useSpring({
        width: "20rem",
        backgroundColor: "red",
        height: "100vh",
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: toggle ? "translateX(5rem)" : "translateX(-15rem)"
    })

    const onClickToggle = () => {
        setToggle(!toggle)
    }

    return (
        <Container>
            <NavBarContainer>
                <NavBar>
                    <button onClick={onClickToggle} >Toggle</button>
                </NavBar>
                <animated.div style={navSlideout}></animated.div>
            </NavBarContainer>
        </Container>
    );
};
