import styled from "styled-components";

export const NavBar = styled.div`
    width: 5rem;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 3;
    background-color: #202730;
`;

export const NavigationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30rem;
`;

export const NavigationIcon = styled.div`
    font-size: 1.8rem;
    color: white;
    padding: 1rem 0.5rem;
    cursor: pointer;
`;

export const NavBarContainer = styled.div`
    position: relative;
    z-index: 4;
`;

export const Container = styled.div`
    width: 100%;
`;
export const OffsetContainer = styled.div`
    margin-left: 5rem;
`;

export const MainContainer = styled.div`
    max-width: 1500px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;
`;

export const Upload = styled.div`
    width: 60%;
    margin: 1rem;
    background-color: #202730;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    height: 20rem;
    overflow: hidden;
    box-shadow: 10px 10px 0px #667c99;
    cursor: pointer;

    @media only screen and (max-width: 1050px) {
        width: 90%;
    }
`;

export const UploadLayer = styled.div`
    margin: 1.5rem;
    width: 100%;
    border-radius: 4px;
    border-left: 10px solid #667c99;
    border-top: 10px solid #667c99;
    background-color: #e0e5eb;
    display: flex;
    overflow: hidden;
    justify-content: center;
`;

export const Notifications = styled.div`
    margin-top: 1rem;
    width: 40%;
    background-color: #202730;
    height: 20rem;
    box-shadow: 10px 10px 0px #667c99;
    width: 60%;
    border-radius: 4px;
`;

export const WidgetContainer = styled.div`
    cursor: default;
    margin: 0.5rem 1rem 1rem 1.5rem;
    padding: 1rem 0rem;
    height: 13rem;
    background-color: #202730;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
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
    color: #e0e5eb;
    flex-grow: 1;
    margin: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputContainer = styled.div`
    width: 100%;
    padding: 1rem 3rem 0rem 0.5rem;
    box-sizing: border-box;
`;

export const Input = styled.input`
    border: none;
    width: 100%;
    background-color: #202730;
    color: #d0d8e1;
    outline: none;
    font-size: 1.4rem;
    padding: 0.5rem;
    transition: 250ms ease-out;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
    border-radius: 4px;

    &:focus {
        background-color: #e0e5eb;
        color: #202730;
        transition-duration: 200ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px rgba(102, 124, 153, 0.8);
        &::placeholder {
            color: #202730;
        }
    }

    &::placeholder {
        color: #d0d8e1;
    }
`;

export const Buttons = styled.div`
    width: 90%;
    display: flex;
    padding: 1rem 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 1rem;
`;

export const SaveButton = styled.button`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 900;
    margin: 0rem 1rem 1.5rem 0.3rem;
    width: 12rem;
    color: #202730;
    background-color: #92a4b9;
    border: none;
    outline: none;
    border-radius: 4px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    backface-visibility: hidden;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);

    &:hover {
        transition-duration: 200ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px rgba(102, 124, 153, 0.8);
    }

    &:active {
        transition-duration: 100ms;
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px rgba(102, 124, 153, 0.8);
    }

    @media only screen and (max-width: 700px) {
        padding: 1rem 0.5rem;
    }
`;

export const Photo = styled.div`
    width: 185px;
    height: 185px;
    background-color: blue;
`;

export const CenterWidget = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: 1.8rem;
    animation-name: toTop;
    animation-duration: 600ms;
    animation-timing-function: ease-out;
    width: 100%;
`;

export const DropButton = styled.div`
    padding: 0.5rem 0.8rem;
    background-color: #202730;
    color: #e0e5eb;
    border-radius: 4px;
    box-shadow: 7px 7px 0px rgba(102, 124, 153, 0.8);
    max-width: 70%;
    text-align: center;
`;
