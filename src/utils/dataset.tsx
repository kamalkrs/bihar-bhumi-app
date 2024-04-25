import axios from "axios";
import { Appconfig } from "../config/appconfig";
import { Restapi } from "./types";

export async function apiCall(m: string, params?: {}, method = 'post') {
    let url = Appconfig.API_URL + m;
    try {
        const result = await axios.post(url, params);
        const resp: Restapi = result.data;
        return resp;
    } catch (error) {
        const resp: Restapi = { success: false, message: 'Unable to connect Server', data: null }
        return resp;
    }
}