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
    margin: 1rem;
    border: 2px dashed black;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    height: 20rem;
    overflow: hidden;
`;

export const Notifications = styled.div`
    width: 50%;
    background-color: green;
    height: 20rem;
`;

export const WidgetContainer = styled.div`
    z-index: 1;
    margin: 1rem;
    width: 100%;
    height: 15rem;
    background-color: #202730;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
    /* animation-name: toTopLong;
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.3, 0.9, 0.3, 0.9); */
`;

export const Photo = styled.div`
    width: 185px;
    height: 185px;
    background-color: blue;
`;
