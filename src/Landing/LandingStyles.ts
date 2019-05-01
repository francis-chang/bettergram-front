import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    body {
        background-color: #e0e5eb;
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
    padding: 1rem;
    border-radius: 4px;
`;

export const Title = styled.div`
    width: 66.66%;
`;

export const Login = styled.div`
    width: 33.33%;
`;
