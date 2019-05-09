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
    setCurrentPicture: React.Dispatch<React.SetStateAction<number | null>>;
}

export const PhotoWidget: React.FC<Props> = props => {
    const [caption, setCaption] = React.useState("");

    const updateCaption = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                <form onSubmit={updateCaption} style={{ width: "100%" }}>
                    <InputContainer>
                        <Input
                            autoFocus
                            placeholder="Enter Caption:"
                            value={caption}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setCaption(e.target.value);
                            }}
                        />
                    </InputContainer>
                    <Buttons>
                        <SaveButton type="submit">
                            <FontAwesomeIcon icon="check" />
                            <div>Save</div>
                        </SaveButton>
                        {props.current > 1 && (
                            <SaveButton
                                type="button"
                                onClick={() => props.setCurrentPicture(null)}
                            >
                                <FontAwesomeIcon icon="check-double" />
                                <div>Save All</div>
                            </SaveButton>
                        )}
                    </Buttons>
                </form>
            </ActionContainer>
        </WidgetContainer>
    );
};
