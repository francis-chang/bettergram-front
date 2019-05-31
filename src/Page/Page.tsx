import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface RouteParams {
    username: string;
}

interface Image {
    id: number;
    url: string;
    upload_url: string;
    full_url: string;
    height: number;
}

const Page: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const [images, setImages] = useState<Image[]>([]);
    const get = async () => {
        const res = await axios.get(
            `http://127.0.0.1:5000/user/${props.match.params.username}`
        );
        setImages(res.data.images);
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            {images.map(image => (
                <img src={image.url} key={image.url} />
            ))}
        </>
    );
};

export default withRouter(Page);
