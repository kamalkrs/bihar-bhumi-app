import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Login from "../screens/login";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import Splash from "../components/Splash";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../stores/userSlices";
import Users from "../screens/users";
import { Appconfig } from "../config/appconfig";
import { ParamList } from "../utils/types";
import Properties from "../screens/properties";
import Postproperties from "../screens/post-property";
import Userinfo from "../screens/userinfo";
import { RootState } from "../stores/stores";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "react-native-paper";
import Signup from "../screens/signup";
import Profile from "../screens/profiles";
import Webpage from "../screens/profiles/webpage";
import Chat from "../screens/chat";
import Myads from "../screens/myads";
import PropertyDetails from "../screens/property-details";
import Bhumilogin from "../screens/locker/bhumi-login";
import Bhumilocker from "../screens/locker/bhumi-locker";
import Uploadlockfiles from "../screens/locker/upload-lockfiles";
import Addlockerfile from "../screens/locker/add-locker-files";
import UploadLockerFiles from "../screens/locker/upload-locker-files";
import BusinessSignup from "../screens/profiles/business/business-signup";
import BusinessHome from "../screens/profiles/business/business-home";
import BiharLaboutMemberSignup from "../screens/profiles/bihar-labour-member-signup";
import ApplyMutations from "../screens/profiles/apply-mutations";
import MutationStatus from "../screens/profiles/mutation-status";
import Wishlist from "../screens/profiles/wishlist";
import Notifications from "../screens/profiles/notifications";
import HelpSupport from "../screens/profiles/help-support";
import Leads from "../screens/profiles/leads";
import MyServices from "../screens/profiles/my-services";
import EditProfile from "../screens/profiles/edit-profile";

const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator()

const TabNavigator = () => {
    const theme = useTheme();
    return (
        <TabStack.Navigator screenOptions={{ headerShown: false }}>
            <TabStack.Screen name="home" component={Home} options={
                {
                    tabBarIcon: ({ focused }) => <Icon source={'home-outline'} size={20} color={focused ? theme.colors.primary : 'black'} />,
                    title: 'Home',
                    tabBarActiveTintColor: theme.colors.primary
                }} />
            <TabStack.Screen name="properties" component={Chat}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ focused }) => <Icon source={'message-outline'} size={20} color={focused ? theme.colors.primary : 'black'} />,
                    tabBarActiveTintColor: theme.colors.primary
                }}
            />
            <TabStack.Screen name="accounts" component={Postproperties}
                options={{
                    title: 'Post Ad',
                    tabBarIcon: ({ focused }) => <Icon source={'plus-circle-outline'} size={40} color={focused ? theme.colors.primary : 'black'} />,
                    tabBarActiveTintColor: theme.colors.primary
                }}
            />
            <TabStack.Screen name="my-ads" component={Myads}
                options={{
                    title: 'My Ads',
                    tabBarIcon: ({ focused }) => <Icon source={'heart-outline'} size={20} color={focused ? theme.colors.primary : 'black'} />,
                    tabBarActiveTintColor: theme.colors.primary
                }}
            />
            <TabStack.Screen name="profile" component={Profile}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <Icon source={'account-outline'} size={20} color={focused ? theme.colors.primary : 'black'} />,
                    tabBarActiveTintColor: theme.colors.primary
                }}
            />
        </TabStack.Navigator>
    )
}

const AppRouter = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const login = useSelector((state: RootState) => state.login)


    useEffect(() => {
        Auth.getLogin().then((resp: any) => {
            if (resp != null)
                dispatch(setLogin(resp))
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <Splash />
    }

    if (login?.id == 0) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={'login'} component={Login} />
                    <Stack.Screen name={'signup'} component={Signup} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="/" component={TabNavigator} />
                <Stack.Screen name="users/broker" component={Users} initialParams={{ userType: Appconfig.USER_BROKER, title: 'Brokers' }} />
                <Stack.Screen name="users/munsi" component={Users} initialParams={{ userType: Appconfig.USER_MUNSI, title: 'Munsi List' }} />
                <Stack.Screen name="users/amin" component={Users} initialParams={{ userType: Appconfig.USER_AMIN, title: 'Amin List' }} />
                <Stack.Screen name="users/co" component={Users} initialParams={{ userType: Appconfig.USER_CO, title: 'CO List' }} />
                <Stack.Screen name="properties" component={Properties} />
                <Stack.Screen name="post-property" component={Postproperties} />
                <Stack.Screen name="property-details" component={PropertyDetails} />
                <Stack.Screen name="userinfo" component={Userinfo} />
                <Stack.Screen name="bhumi-login" component={Bhumilogin} />
                <Stack.Screen name="bhumi-locker" component={Bhumilocker} />
                <Stack.Screen name="add-locker-files" component={Addlockerfile} />
                <Stack.Screen name="upload-locker-files" component={UploadLockerFiles} />
                <Stack.Screen name="webpage" component={Webpage} />
                <Stack.Screen name="business-signup" component={BusinessSignup} />
                <Stack.Screen name="business-home" component={BusinessHome} />
                <Stack.Screen name="bihar-labour-member-signup" component={BiharLaboutMemberSignup} />
                <Stack.Screen name="apply-mutations" component={ApplyMutations} />
                <Stack.Screen name="mutation-status" component={MutationStatus} />
                <Stack.Screen name="wishlist" component={Wishlist} />
                <Stack.Screen name="notifications" component={Notifications} />
                <Stack.Screen name="help-support" component={HelpSupport} />
                <Stack.Screen name="leads" component={Leads} />
                <Stack.Screen name="my-services" component={MyServices} />
                <Stack.Screen name="edit-profile" component={EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { AppRouter };