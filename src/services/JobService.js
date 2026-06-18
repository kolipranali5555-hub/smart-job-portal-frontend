import axios from "axios";

const API_URL = "http://localhost:8083/jobs";

export const getAllJobs = () => {
    return axios.get(API_URL);
};