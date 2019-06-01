import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Image } from "./Image";
import { Container } from "./PageStyles";

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

interface Column {
    currentHeight: number;
    x: number;
    images: ImageType[];
}

interface ImageType {
    url: string;
    y: number;
}

const Page: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const [images, setImages] = useState<Image[]>([]);
    const [sets, setSets] = useState<Column[]>([
        { currentHeight: 0, x: 0, images: [] },
        { currentHeight: 0, x: 450, images: [] },
        { currentHeight: 0, x: 900, images: [] },
        { currentHeight: 0, x: 1350, images: [] }
    ]);
    const get = async () => {
        const res = await axios.get(
            `http://127.0.0.1:5000/user/${props.match.params.username}`
        );
        setImages(res.data.images);
        const slicedSet = sets.slice();
        for (let x = 0; x < res.data.images.length; x++) {
            let shortestCol = 0;
            let shortestColHeight = sets[0].currentHeight;
            for (let y = 0; y < sets.length; y++) {
                if (slicedSet[y].currentHeight < shortestColHeight) {
                    shortestCol = y;
                    shortestColHeight = slicedSet[y].currentHeight;
                }
            }
            const imageToBePushed = {
                url: res.data.images[x].url,
                y: slicedSet[shortestCol].currentHeight
            };

            slicedSet[shortestCol].images.push(imageToBePushed);
            slicedSet[shortestCol].currentHeight += res.data.images[x].height;
        }
        setSets(slicedSet);
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <Container>
            {sets.map(set => {
                return set.images.map(image => (
                    <Image
                        src={image.url}
                        key={image.url}
                        x={set.x}
                        y={image.y}
                    />
                ));
            })}
        </Container>
    );
};

export default withRouter(Page);
