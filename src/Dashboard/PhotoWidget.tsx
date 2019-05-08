import * as React from "react";
import { WidgetContainer } from "./DashboardStyled";

interface Props {
    img: any;
    confirm: () => void;
}

export const PhotoWidget: React.FC<Props> = props => {
    return (
        <WidgetContainer>
            <img
                src={props.img && props.img.upload_url}
                alt={props.img.caption}
            />
            <button onClick={props.confirm}>Okay </button>
        </WidgetContainer>
    );
};
