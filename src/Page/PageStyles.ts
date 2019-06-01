import styled from "styled-components";

type ImageProps = {
    x: number;
    y: number;
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
`;
