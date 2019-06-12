import styled from "styled-components";

type ImageProps = {
    x: number;
    y: number;
    height: number;
};

type ContainerProps = {
    width: number;
};

export const Container = styled.div`
    max-width: 1800px;
    position: relative;
    margin: 0 auto;
    display: flex;
`;

export const ImageContainer = styled.div`
    animation-name: toTop;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
    font-size: 0px;
`;

export const ImageColumn = styled.div<ContainerProps>`
    width: 25%;
    display: flex;
    flex-direction: column;
`;
