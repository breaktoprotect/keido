import axios from "axios";
import jwt_code from "jwt-decode";
//import daysjs from "dayjs";
import { parse } from "date-fns";

const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;

// Load access token if exist
let authToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

const axiosReq = axios.create({
    baseURL: API_ENDPOINT,
    headers: { Authorization: `Bearer ${authToken}` },
});

axiosReq.interceptors.request.use(async (req) => {
    // Update access token if any changes happened
    let authToken = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

    return req;
});

export default axiosReq;
