import * as React from "react";
import { useDropzone } from "react-dropzone";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { post } from "../axios";
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

type ImageFile = {
    image: File;
    error: boolean;
};

const Dashboard: React.FC<RouteComponentProps> = (
    props: RouteComponentProps
) => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [uploadedPictures, setUploadedPictures] = React.useState<any[]>([]);
    const [currentPicture, setCurrentPicture] = React.useState<number | null>(
        null
    );

    const token = localStorage.getItem("access_token");

    const setCurrentAndPop = () => {
        if (
            currentPicture !== null &&
            currentPicture >= uploadedPictures.length - 1
        ) {
            setCurrentPicture(null);
        } else if (currentPicture !== null) {
            setCurrentPicture(currentPicture + 1);
        }
    };

    const onDrop = React.useCallback(
        async files => {
            setUploading(true);
            let uploadedFiles = [];
            for (const file in files) {
                let formData = new FormData();
                formData.set("caption", "");
                formData.append("image", files[file]);
                const headers = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await post("/image", formData, headers);

                if (!response.error) {
                    uploadedFiles.push(response.image.data);
                    //this one liner caches the image
                    new Image().src = response.image.data.upload_url;
                }
            }
            setUploadedPictures(uploadedFiles);
            setCurrentPicture(0);
            setUploading(false);
        },
        [token]
    );

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop
    });

    React.useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            props.history.push("/");
        }
    }, [props.history]);
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
                    {uploading ? (
                        <p>Loading...</p>
                    ) : currentPicture === null ? (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <p>Drag image files here or Select...</p>
                        </div>
                    ) : (
                        <TransitionGroup className="transition-container">
                            <CSSTransition
                                key={currentPicture}
                                in={currentPicture !== null}
                                appear={true}
                                timeout={750}
                                classNames="fade"
                                unmountOnExit
                            >
                                <PhotoWidget
                                    img={uploadedPictures[currentPicture]}
                                    confirm={setCurrentAndPop}
                                />
                            </CSSTransition>
                        </TransitionGroup>
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
