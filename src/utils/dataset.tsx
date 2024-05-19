import axios from "axios";
import { Appconfig } from "../config/appconfig";
import { Restapi } from "./types";


export async function apiCall(m: string, params?: {}) {
    const url = Appconfig.API_URL + m;
    try {
        const result = await axios.post(url, params);
        const resp: Restapi = result.data;
        return resp;
    } catch (error) {
        console.log(url, params, error);
        const resp: Restapi = { success: false, message: 'Unable to connect Server', data: null }
        return resp;
    }
}

export async function uploadFiles(m: string, params?: {}) {
    const url = Appconfig.UPLOAD_API_URL + m;
    try {
        const result = await axios.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } });
        const resp: Restapi = result.data;
        return resp;
    } catch (error) {
        console.log(url, params, error);
        const resp: Restapi = { success: false, message: 'Unable to connect Server', data: null }
        return resp;
    }
}