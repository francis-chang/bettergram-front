import * as React from "react";
import { WidgetContainer } from "./DashboardStyled";

interface Props {
    img: any;
}

export const PhotoWidget: React.FC<Props> = props => {
    React.useEffect(() => {
        console.log(props.img);
    });
    return (
        <WidgetContainer>
            <img src={props.img && props.img.upload_url} />
        </WidgetContainer>
    );
};
