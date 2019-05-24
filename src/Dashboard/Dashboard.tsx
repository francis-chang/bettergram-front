import axios from "axios";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { post } from "../axios";
import {
    CenterWidget,
    Container,
    DropButton,
    Notifications,
    TopRow,
    Upload
} from "./DashboardStyled";
import { Navigation } from "./Navbar";
import { PhotoWidget } from "./PhotoWidget";

interface Props {}

const Dashboard: React.FC<RouteComponentProps> = (
    props: RouteComponentProps
) => {
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [uploadedPictures, setUploadedPictures] = React.useState<any[]>([]);
    const [currentPicture, setCurrentPicture] = React.useState<number | null>(
        null
    );
    const [needCred, setNeedCred] = React.useState<boolean>(false);
    const [data, setData] = React.useState<DataType[]>([]);

    const token = localStorage.getItem("access_token");

    React.useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(
                "http://127.0.0.1:5000/userinfo",
                headers
            );
            localStorage.setItem("verified", response.data.is_verified);
            localStorage.setItem("user_id", response.data.user_id);
        } catch (err) {
            console.log(err.message);
        }
    };
    const setCurrentAndPop = (hasCaption: boolean, caption: string) => {
        if (hasCaption) {
            const id = uploadedPictures[currentPicture!].id;
            const data = { caption };
            const headers = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                axios.put(`http://127.0.0.1:5000/image/${id}`, data, headers);
            } catch (err) {
                console.log(err.response);
            }
        }

        if (
            currentPicture !== null &&
            currentPicture >= uploadedPictures.length - 1
        ) {
            setCurrentPicture(null);
        } else if (currentPicture !== null) {
            setCurrentPicture(currentPicture + 1);
        }
    };

    // the reason against promise.all in this case is that
    // the order of the images is necessary and promise.all
    // does not guarentee the order
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
                setUploading(false);
                if (response.error) {
                    if (!needCred) {
                        setNeedCred(true);
                    }
                    setData(prev => [...prev, { formData, headers }]);
                } else {
                    uploadedFiles.push(response.image.data);
                    //this one liner caches the image
                    new Image().src = response.image.data.upload_url;
                    if (!currentPicture) {
                        setCurrentPicture(0);
                    }
                }
            }

            setUploadedPictures(uploadedFiles);
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

    return token ? (
        <Container>
            <Navigation
                needCredentials={needCred}
                setNeedCred={setNeedCred}
                data={data}
                setUploadedPictures={setUploadedPictures}
                setUploading={setUploading}
                setCurrentPicture={setCurrentPicture}
                setData={setData}
            />
            <TopRow>
                <Upload>
                    <TransitionGroup className="transition-container">
                        {uploading ? (
                            <CenterWidget>
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle
                                        className="path"
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        fill="none"
                                        strokeWidth="5"
                                    />
                                </svg>
                            </CenterWidget>
                        ) : currentPicture === null ? (
                            <CenterWidget
                                {...getRootProps({ className: "dropzone" })}
                            >
                                <input {...getInputProps()} />
                                <DropButton>
                                    BROWSE OR DRAGE IMAGES HERE
                                </DropButton>
                            </CenterWidget>
                        ) : (
                            <CSSTransition
                                key={currentPicture}
                                in={currentPicture !== null}
                                appear={true}
                                timeout={1000}
                                classNames="fade"
                                unmountOnExit
                            >
                                <PhotoWidget
                                    track={`${currentPicture + 1} / ${
                                        uploadedPictures.length
                                    }`}
                                    img={uploadedPictures[currentPicture]}
                                    confirm={setCurrentAndPop}
                                    current={uploadedPictures.length}
                                    setCurrentPicture={setCurrentPicture}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </Upload>
                <Notifications />
            </TopRow>
        </Container>
    ) : (
        <></>
    );
};

export default withRouter(Dashboard);
