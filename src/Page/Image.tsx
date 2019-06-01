import * as React from "react";
import { ImageContainer } from "./PageStyles";

interface Props {
    src: string;
    caption?: string;
    x: number;
    y: number;
}

export const Image: React.FC<Props> = props => {
    return (
        <ImageContainer x={props.x} y={props.y}>
            <img src={props.src} />
        </ImageContainer>
    );
};
