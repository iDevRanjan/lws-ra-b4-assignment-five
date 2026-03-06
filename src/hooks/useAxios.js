import axios from "axios";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});
export default function useAxios() {
    // useEffect(() => {

    // }, []);

    return <div>useAxios</div>;
}
