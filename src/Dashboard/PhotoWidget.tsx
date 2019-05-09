import * as React from "react";
import {
    ActionContainer,
    Buttons,
    ImageContainer,
    Input,
    InputContainer,
    SaveButton,
    WidgetContainer
} from "./DashboardStyled";

interface Props {
    track: string;
    img: any;
    confirm: () => void;
}

export const PhotoWidget: React.FC<Props> = props => {
    const [caption, setCaption] = React.useState("");
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
                <div>{props.track}</div>
                <InputContainer>
                    <Input
                        placeholder="Enter Caption:"
                        value={caption}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCaption(e.target.value);
                        }}
                    />
                </InputContainer>
                <Buttons>
                    <SaveButton onClick={props.confirm}>Save </SaveButton>
                    <SaveButton onClick={props.confirm}>Save All </SaveButton>
                </Buttons>
            </ActionContainer>
        </WidgetContainer>
    );
};
