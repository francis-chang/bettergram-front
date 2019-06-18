import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Image } from "./Image";
import { Container, ImageColumn } from "./PageStyles";

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

interface ImageWithY extends Image {
    y: number;
}

const NewPage: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const [images, setImages] = useState<Image[]>([]);
    const [initial, setInitial] = useState<boolean>(false);
    const [numCols, setNumCols] = useState<number>(0);
    const [imageList, setImageList] = useState<ImageWithY[][]>([]);
    const [heightList, setHeightList] = useState<number[]>([]);
    const [colsSet, setColsSet] = useState<boolean>(true);
    const [currentHeight, setCurrentHeight] = useState<number>(
        window.innerHeight
    );

    const get = async () => {
        const res = await axios.get(
            `http://127.0.0.1:5000/user/${props.match.params.username}`
        );
        const allImages = res.data.images;
        setImages(allImages);
        setColsSet(true);
    };

    let resizeTimer: number;
    const getCols = (resize: boolean) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(
            () => {
                const width = window.innerWidth;
                if (width <= 450) {
                    if (numCols !== 1) {
                        setNumCols(1);
                        setHeightList([0]);
                        setImageList([]);
                        setColsSet(true);
                    }
                } else if (width > 450 && width <= 900) {
                    if (numCols !== 2) {
                        setNumCols(2);
                        setHeightList([0, 0]);
                        setImageList([]);
                        setColsSet(true);
                    }
                } else if (width > 900 && width <= 1350) {
                    if (numCols !== 3) {
                        setNumCols(3);
                        setHeightList([0, 0, 0]);
                        setImageList([]);
                        setColsSet(true);
                    }
                } else {
                    if (numCols !== 4) {
                        setHeightList([0, 0, 0, 0]);
                        setNumCols(4);
                        setImageList([]);
                        setColsSet(true);
                    }
                }
            },
            resize ? 0 : 250
        );
    };

    const findShortestCol = (hList: number[]) => {
        if (numCols === 1) {
            return 0;
        }
        let shortestCol = 0;
        for (let x = 0; x < hList.length; x++) {
            if (hList[x] < hList[shortestCol]) {
                shortestCol = x;
            }
        }
        return shortestCol;
    };

    const setImageIntoList = () => {
        //insert into here with y
        let hList = heightList.slice();
        let iList = imageList.slice();

        for (let x = 0; x < images.length; x++) {
            const shortestCol = findShortestCol(hList);
            const y = hList[shortestCol];
            hList[shortestCol] += images[x].height;
            const image = { ...images[x], y: y };
            if (iList[shortestCol]) {
                iList[shortestCol].push(image);
            } else {
                iList[shortestCol] = [image];
            }
        }
        setHeightList(hList);
        setImageList(iList);
    };

    useEffect(() => {
        if (colsSet) {
            setImageIntoList();
            setColsSet(false);
        }

        const setHeight = () => {
            setCurrentHeight(window.scrollY + window.innerHeight);
        };

        if (!initial) {
            get();
            getCols(true);
            window.addEventListener("resize", () => getCols(false));
            window.addEventListener("scroll", setHeight);
            setInitial(true);
        }
    });

    return (
        <Container>
            {imageList.map((images, i) => (
                <ImageColumn key={i} numCols={numCols}>
                    {images.map(image => {
                        const width = window.innerWidth;
                        if (
                            width < 1800 &&
                            (image.y * width) / 1800 < currentHeight
                        ) {
                            return <Image key={image.url} src={image.url} />;
                        } else if (image.y < currentHeight) {
                            return <Image key={image.url} src={image.url} />;
                        }
                    })}
                </ImageColumn>
            ))}
        </Container>
    );
};

export default withRouter(NewPage);
