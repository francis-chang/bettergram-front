import styled from "styled-components";

type ImageProps = {
    x: number;
    y: number;
    height: number;
};

type ContainerProps = {
    numCols: number;
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
    width: ${p =>
        p.numCols === 1
            ? "100%"
            : p.numCols === 2
            ? "50%"
            : p.numCols === 3
            ? "33.33%"
            : "25%"};
    display: flex;
    flex-direction: column;
`;
