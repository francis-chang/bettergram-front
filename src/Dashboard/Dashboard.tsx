import * as React from "react";
import { useDropzone } from "react-dropzone";
import { RouteComponentProps, withRouter } from "react-router-dom";
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

const Dashboard: React.FC<RouteComponentProps> = (
    props: RouteComponentProps
) => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const onDrop = React.useCallback(files => {
        console.log(files);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop
    });
    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));
    React.useEffect(() => {
        if (!localStorage.getItem("access-token")) {
            props.history.push("/");
        }
    }, []);
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
                    {files.length === 0 ? (
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

export default withRouter(Dashboard);
