import * as React from "react";
import { ImageContainer } from "./PageStyles";

interface Props {
    src: string;
    caption?: string;
    x: number;
    y: number;
    height: number;
}

export const Image: React.FC<Props> = props => {
    return (
        <ImageContainer x={props.x} y={props.y} height={props.height}>
            <img
                src={props.src}
                alt={props.caption ? props.caption : ""}
                width="100%"
            />
        </ImageContainer>
    );
};
