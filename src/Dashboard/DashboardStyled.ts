import styled from "styled-components";

export const NavBar = styled.div`
    width: 5rem;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 3;
    background-color: blue;
`;
export const NavBarContainer = styled.div`
    position: relative;
`;
export const Container = styled.div`
    width: 100%;
`;

export const TopRow = styled.div`
    max-width: 1500px;
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

export const Upload = styled.div`
    width: 50%;
    background-color: red;
`;

export const Notifications = styled.div`
    width: 50%;
    background-color: green;
    height: 20rem;
`;
