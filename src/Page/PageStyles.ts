import styled from "styled-components";

type ImageProps = {
    x: number;
    y: number;
    height: number;
};

export const Container = styled.div`
    max-width: 1800px;
    position: relative;
    margin: 0 auto;
`;

export const ImageContainer = styled.div<ImageProps>`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    height: ${props => props.height}px;
    width: 25%;
    animation-name: toTop;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
`;
