import React from "react";
import { ImageContainer } from "./PageStyles";

interface Props {
    src: string;
    caption?: string;
    first: boolean;
}

export const Image: React.FC<Props> = (props: Props) => {
    return (
        <ImageContainer first={props.first}>
            <img
                src={props.src}
                alt={props.caption ? props.caption : ""}
                width="100%"
            />
        </ImageContainer>
    );
};
