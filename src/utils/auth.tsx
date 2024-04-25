import AsyncStorage from "@react-native-async-storage/async-storage";

const Auth = {
    AUTH_KEY: '@login',
    setLogin: async (user: IUserType) => {
        await AsyncStorage.setItem(Auth.AUTH_KEY, JSON.stringify(user));
        return true;
    },
    getLogin: async () => {
        const json = await AsyncStorage.getItem(Auth.AUTH_KEY);
        if (json != null) {
            return JSON.parse(json);
        }
    },
    logout: async() => {
        await AsyncStorage.removeItem(Auth.AUTH_KEY);
        return true;
    }
}

export default Auth;