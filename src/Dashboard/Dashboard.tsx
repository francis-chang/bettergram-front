import * as React from "react";
import { useDropzone } from "react-dropzone";
import { animated, useSpring } from "react-spring";
import {
    Container,
    NavBar,
    NavBarContainer,
    Notifications,
    TopRow,
    Upload
} from "./DashboardStyled";
import { PhotoWidget } from "./PhotoWidget";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    React.useEffect(() => {}, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const navSlideout = useSpring({
        width: "20rem",
        backgroundColor: "red",
        height: "100vh",
        position: "absolute",
        top: "0%",
        left: "0%",
        transform: toggle ? "translateX(5rem)" : "translateX(-15rem)"
    });

    const onClickToggle = () => {
        setToggle(!toggle);
    };

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <Container>
            <NavBarContainer>
                <NavBar>
                    <button onClick={onClickToggle}>Toggle</button>
                </NavBar>
                <animated.div style={navSlideout} />
            </NavBarContainer>
            <TopRow>
                <Upload>
                    {files.length > 0 ? (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <p>Drag image files here or Select...</p>
                        </div>
                    ) : (
                        <PhotoWidget />
                    )}
                </Upload>
                <Notifications />
            </TopRow>
        </Container>
    );
};
