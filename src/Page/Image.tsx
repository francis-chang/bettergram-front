import React from "react";
import { ImageContainer } from "./PageStyles";

interface Props {
    src: string;
    caption?: string;
}

export const Image: React.FC<Props> = (props: Props) => {
    return (
        <ImageContainer>
            <img
                src={props.src}
                alt={props.caption ? props.caption : ""}
                width="100%"
            />
        </ImageContainer>
    );
};
