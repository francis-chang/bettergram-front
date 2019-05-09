import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

library.add(faCheck, faCheckDouble);

interface Props {
    track: string;
    img: any;
    confirm: (hasCaption: boolean, caption: string) => void;
    current: number;
}

export const PhotoWidget: React.FC<Props> = props => {
    const [caption, setCaption] = React.useState("");

    const updateCaption = () => {
        console.log(caption);
        if (caption === "") {
            props.confirm(false, caption);
        } else {
            props.confirm(true, caption);
        }
    };
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
                    <SaveButton onClick={updateCaption}>
                        <FontAwesomeIcon icon="check" />
                        <div>Save</div>
                    </SaveButton>
                    {props.current > 1 && (
                        <SaveButton onClick={updateCaption}>
                            <FontAwesomeIcon icon="check-double" />
                            <div>Save All</div>
                        </SaveButton>
                    )}
                </Buttons>
            </ActionContainer>
        </WidgetContainer>
    );
};
