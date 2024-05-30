import AsyncStorage from "@react-native-async-storage/async-storage"
import { apiCall } from "./dataset";

export const Bihar = {
    districts: async function () {
        let json = await AsyncStorage.getItem('_states');
        if (json == undefined) {
            const result = await apiCall('districts');
            if (result.success) {
                AsyncStorage.setItem('_states', JSON.stringify(result.data));
                return result.data;
            }
        } else if (typeof json == 'string') {
            return JSON.parse(json);
        }
    }
}