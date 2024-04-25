import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Login from "../screens/login";
import { useEffect, useState } from "react";
import Auth from "./auth";
import Splash from "../components/Splash";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../stores/userSlices";
import Users from "../screens/users";
import { Appconfig } from "../config/appconfig";
import { IUserType, ParamList } from "./types";
import Properties from "../screens/properties";
import Postproperties from "../screens/post-property";
import Userinfo from "../screens/userinfo";
import { RootState } from "../stores/stores";

const Stack = createNativeStackNavigator<ParamList>();

const AppRouter = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const login = useSelector((state: RootState) => state.login)
    useEffect(() => {
        Auth.getLogin().then((resp: IUserType) => {
            setLoading(false);
            dispatch(setLogin(resp))
        })
    }, [loading])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="/" component={loading ? Splash : (login.id == 0 ? Login : Home)} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="users/broker" component={Users} initialParams={{ userType: Appconfig.USER_BROKER, title: 'Brokers' }} />
                <Stack.Screen name="users/munsi" component={Users} initialParams={{ userType: Appconfig.USER_MUNSI, title: 'Munsi List' }} />
                <Stack.Screen name="users/amin" component={Users} initialParams={{ userType: Appconfig.USER_AMIN, title: 'Amin List' }} />
                <Stack.Screen name="users/co" component={Users} initialParams={{ userType: Appconfig.USER_CO, title: 'CO List' }} />
                <Stack.Screen name="properties" component={Properties} />
                <Stack.Screen name="post-property" component={Postproperties} />
                <Stack.Screen name="userinfo" component={Userinfo} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter;