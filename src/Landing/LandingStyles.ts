import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    body {
        background-color: #e0e5eb;
        color: #202730;
    }
`;

export const Container = styled.div`
    background-color: #202730;
    width: 50%;
    top: 50%;
    left: 50%;
    position: absolute;
    box-shadow: 5px 10px 10px rgba(20, 25, 31, 0.2);
    transform: translate(-50%, -50%);
    display: flex;
    padding: 3rem 1.2rem;
    border-radius: 4px;
`;

export const Title = styled.div`
    width: 66.66%;
`;

export const Login = styled.div`
    width: 33.33%;
`;

export const LoginContainer = styled.form`
    padding: 1.8rem 1.2rem;
    border-radius: 4px;
    background-color: #e0e5eb;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    border: none;
    margin-bottom: 1rem;
    border-bottom: 2px solid black;
    background-color: transparent;
    outline: none;
    font-size: 1.3rem;

    &:focus {
        border: none;
        border-bottom: 2px solid blue;
        user-select: none;
    }
`;

export const SubmitBtn = styled.button`
    width: 50%;
    margin-left: 50%;
    background-color: #ffce5b;
    border: 2px solid #202730;
    border-radius: 4px;
    padding: 0.7rem 1.3rem;
`;
