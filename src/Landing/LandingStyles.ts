import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    @font-face {
        font-family: "Martel";
        src: url("./fonts/NotoSansKR-Black.otf");
    }

    body {
        font-family: "Martel";
        background-color: #e0e5eb;
        color: #202730;
    }
`;

export const Container = styled.div`
    background-color: #333e4d;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23202730' fill-opacity='0.46' fill-rule='evenodd'/%3E%3C/svg%3E");
    width: 50%;
    top: 50%;
    left: 50%;
    position: absolute;
    box-shadow: 10px 10px 0px #667c99;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 2.5rem 2rem;
    border-radius: 4px;
`;

export const Title = styled.div`
    width: 66.66%;
`;

export const Login = styled.div`
    width: 33.33%;
`;

export const LoginContainer = styled.form`
    padding: 1.5rem 1.2rem 1.8rem 1.2rem;
    border-radius: 4px;
    background-color: #e0e5eb;
    display: flex;
    flex-direction: column;
    margin: 3.5rem 0rem;
`;

export const Input = styled.input`
    border: none;
    border-bottom: 2.5px solid black;
    background-color: transparent;
    outline: none;
    font-size: 1.3rem;
    margin-top: 1.8rem;
    transition: 250ms ease-out;

    &:focus {
        border: none;
        border-bottom: 2.5px solid #fc8f00;
        user-select: none;
    }

    &::placeholder {
        color: #202730;
    }
`;

export const SubmitBtn = styled.button`
    font-weight: 900;
    margin: 0rem 0.3rem;
    width: 33.33%;
    margin-left: 66.66%;
    color: #e0e5eb;
    background-color: #202730;
    border: none;
    outline: none;
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    font-size: 1.3rem;
    margin-top: 1rem;
    cursor: pointer;
    backface-visibility: hidden;
    box-shadow: 5px 5px 0px #667c99;

    &:hover {
        transition-duration: 200ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px #667c99;
    }

    &:active {
        transition-duration: 100ms;
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px #667c99;
    }
`;

export const TitleTitle = styled.div`
    font-size: 4rem;
    text-align: center;
    margin: 0 auto;
    color: white;
    width: 80%;
    /* text-decoration: underline; */
`;
