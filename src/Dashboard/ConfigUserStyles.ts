import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 23rem;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30rem;
    height: 40rem;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Message = styled.div`
    width: 100%;
    margin: 0.3rem;
    padding: 0.3rem 0.5rem;
    font-size: 1.2rem;
    text-align: center;
`;

export const Input = styled.input`
    border: none;
    outline: none;
    padding: 0.3rem;
    margin: 0.3rem;
    background-color: grey;
    box-shadow: 5px 5px 0px blue;
`;
