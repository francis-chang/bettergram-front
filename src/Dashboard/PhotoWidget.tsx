import * as React from "react";
import {
    ActionContainer,
    ImageContainer,
    WidgetContainer
} from "./DashboardStyled";

interface Props {
    img: any;
    confirm: () => void;
}

export const PhotoWidget: React.FC<Props> = props => {
    return (
        <WidgetContainer>
            <ImageContainer>
                <img
                    src={props.img && props.img.upload_url}
                    alt={props.img.caption}
                    width="100%"
                    height="100%"
                />
            </ImageContainer>
            <ActionContainer>
                <button onClick={props.confirm}>Okay </button>
            </ActionContainer>
        </WidgetContainer>
    );
};
