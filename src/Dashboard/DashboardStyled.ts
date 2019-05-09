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
    width: 60%;
    margin: 1rem;
    border: 2px dashed black;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    height: 20rem;
    overflow: hidden;
`;

export const Notifications = styled.div`
    width: 40%;
    background-color: green;
    height: 20rem;
`;

export const WidgetContainer = styled.div`
    margin: 2.5rem 1rem 2.5rem 1.8rem;
    height: 15rem;
    background-color: #3d4a5c;
    box-shadow: 8px 8px 0px rgba(102, 124, 153, 0.7);
    /* animation-name: toTopLong;
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.3, 0.9, 0.3, 0.9); */
    position: absolute;
    top: 0;
    left: 0;
    right: 1rem;
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

export const ImageContainer = styled.div`
    margin: 1rem;
    width: 10rem;
    height: 10rem;
`;

export const ActionContainer = styled.div`
    flex-grow: 1;
    margin: 1;
    display: flex;
    flex-direction: column;
`;

export const InputContainer = styled.div`
    width: 100%;
    padding: 1rem 2rem 0rem 0.5rem;
    box-sizing: border-box;
`;

export const Input = styled.input`
    border: none;
    width: 100%;
    background-color: #d0d8e1;
    color: #202730;
    outline: none;
    font-size: 1.4rem;
    padding: 0.5rem;
    transition: 250ms ease-out;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
    border-radius: 4px;

    &:focus {
        background-color: #202730;
        color: #e0e5eb;
        transition-duration: 200ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px rgba(102, 124, 153, 0.8);
        &::placeholder {
            color: #e0e5eb;
        }
    }

    &::placeholder {
        color: #202730;
    }
`;

export const Buttons = styled.div`
    width: 100%;
    display: flex;
    padding: 1rem 0.5rem 1rem;
`;

export const Photo = styled.div`
    width: 185px;
    height: 185px;
    background-color: blue;
`;
