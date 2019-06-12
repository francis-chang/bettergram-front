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

const NewPage: React.FC<RouteComponentProps<RouteParams>> = (
    props: RouteComponentProps<RouteParams>
) => {
    const [images, setImages] = useState<Image[]>([]);
    const [initial, setInitial] = useState<boolean>(false);
    const [numCols, setNumCols] = useState<number>(0);
    const [imageList, setImageList] = useState<Image[][]>([]);
    const [heightList, setHeightList] = useState<number[]>([]);
    const [colsSet, setColsSet] = useState<boolean>(true);

    const get = async () => {
        const res = await axios.get(
            `http://127.0.0.1:5000/user/${props.match.params.username}`
        );
        const allImages = res.data.images;
        setImages(allImages);
        setColsSet(true);
    };

    const getCols = () => {
        const width = window.innerWidth;
        if (width <= 450) {
            setNumCols(1);
            setHeightList([0]);
        } else if (width > 450 && width <= 900) {
            setNumCols(2);
            setHeightList([0, 0]);
        } else if (width > 900 && width <= 1350) {
            setNumCols(3);
            setHeightList([0, 0, 0]);
        } else {
            setNumCols(4);
            setHeightList([0, 0, 0, 0]);
        }
        setColsSet(true);
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
        let hList = heightList.slice();
        let iList = imageList.slice();

        for (let x = 0; x < images.length; x++) {
            const shortestCol = findShortestCol(hList);

            hList[shortestCol] += images[0].height;
            if (iList[shortestCol]) {
                iList[shortestCol].push(images[x]);
            } else {
                iList[shortestCol] = [images[x]];
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

        if (!initial) {
            get();
            getCols();
            window.addEventListener("resize", getCols);
            setInitial(true);
        }
    });

    return (
        <Container>
            {imageList.map(images => (
                <ImageColumn width={imageList.length}>
                    {images.map(image => (
                        <Image src={image.url} />
                    ))}
                </ImageColumn>
            ))}
        </Container>
    );
};

export default withRouter(NewPage);
