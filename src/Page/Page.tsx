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
    height: number;
}

const Page: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const [currentHeight, setCurrentHeight] = useState<number>(
        window.innerHeight
    );
    const [images, setImages] = useState<Image[]>([]);
    const [addEL, setAddEL] = useState<boolean>(false);
    const [gotten, setGotten] = useState<boolean>(false);
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
        const allImages = res.data.images;
        setImages(allImages);
        setGotten(true);
    };

    const handleImages = () => {
        const slicedSet = sets.slice();
        for (let x = 0; x < images.length; x++) {
            let shortestCol = 0;
            let shortestColHeight = sets[0].currentHeight;
            for (let y = 0; y < sets.length; y++) {
                if (slicedSet[y].currentHeight < shortestColHeight) {
                    shortestCol = y;
                    shortestColHeight = slicedSet[y].currentHeight;
                }
            }
            const imageToBePushed = {
                url: images[x].url,
                y: slicedSet[shortestCol].currentHeight,
                height: images[x].height
            };

            slicedSet[shortestCol].images.push(imageToBePushed);
            slicedSet[shortestCol].currentHeight += images[x].height;
        }
        setSets(slicedSet);
    };

    useEffect(() => {
        if (gotten) {
            handleImages();
            setGotten(false);
        }
        const setHeight = () => {
            setCurrentHeight(window.scrollY + window.innerHeight);
        };
        const setColumns = () => {
            if (window.innerWidth < 1400) {
                console.log("cool");
                setSets([
                    { currentHeight: 0, x: 0, images: [] },
                    { currentHeight: 0, x: 450, images: [] },
                    { currentHeight: 0, x: 900, images: [] }
                ]);
                setGotten(true);
            }
        };
        if (!addEL) {
            get();
            window.addEventListener("scroll", setHeight);
            window.addEventListener("resize", setColumns);
            setAddEL(true);
        }
        return function cleanup() {
            window.removeEventListener("scroll", setHeight);
            // window.removeEventListener("resize", setColumns);
        };
    }, [gotten, addEL, handleImages, get]);

    return (
        <Container>
            {sets.map(set => {
                return set.images.map(image => {
                    if (image.y < currentHeight) {
                        return (
                            <Image
                                src={image.url}
                                key={image.url}
                                x={set.x}
                                y={image.y}
                                height={image.height}
                            />
                        );
                    }
                    return null;
                });
            })}
        </Container>
    );
};

export default withRouter(Page);
