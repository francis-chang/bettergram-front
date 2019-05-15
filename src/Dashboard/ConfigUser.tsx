import * as React from "react";
import { Container, Input, Message } from "./ConfigUserStyles";

interface Props {}

export const ConfigUser: React.FC<Props> = () => {
    return (
        <Container>
            <Message>
                Before proceeding we ask that you enter these fields
            </Message>
            <Input placeholder="EMAIL" />
            <Input placeholder="PASSWORD" />
            <Input placeholder="RETYPE PASSWORD" />
        </Container>
    );
};
