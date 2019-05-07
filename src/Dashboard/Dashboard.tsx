import axios from "axios";
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
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [uploadedPictures, setUploadedPictures] = React.useState<any>([]);
    const token = localStorage.getItem("access_token");
    const onDrop = React.useCallback(async files => {
        let formData = new FormData();
        formData.set("caption", "");
        formData.append("image", files[0]);
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            setUploading(true);
            const response = await axios.post(
                "http://127.0.0.1:5000/image",
                formData,
                headers
            );
            setUploading(false)
            setUploadedPictures(response.data);
        } catch (err) {
            console.log(err.response);
        }
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
        if (!localStorage.getItem("access_token")) {
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

    return token ? (
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
                    ) : uploading ? (
                        <p>Loading...</p>
                    ) : (
                        <PhotoWidget />
                    )}
                </Upload>
                <Notifications />
            </TopRow>
        </Container>
    ) : (
        <></>
    );
};

export default withRouter(Dashboard);