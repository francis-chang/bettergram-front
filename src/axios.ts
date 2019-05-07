import axios from "axios";

type dataType = {
    username: string;
    password: string;
    email?: string;
};

export const post = async (
    url: string,
    data: dataType | FormData,
    headers: any
) => {
    try {
        let response = await axios.post(
            `http://127.0.0.1:5000${url}`,
            data,
            headers
        );
        return { image: response, error: false };
    } catch (err) {
        if (err.response.data.message === "EXPIRED_JWT") {
            localStorage.setItem(
                "access_token",
                err.response.data.access_token
            );
            headers.headers.Authorization = `Bearer ${
                err.response.data.access_token
            }`;
            const response = await axios.post(
                `http://127.0.0.1:5000${url}`,
                data,
                headers
            );
            return { image: response, error: false };
        }
        return { image: { data: "" }, error: true };
    }
};
