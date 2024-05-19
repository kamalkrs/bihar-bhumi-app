import { StyleSheet } from "react-native";
import { themes } from "./themes";

const GlobalStyle = StyleSheet.create({
    ScrollView: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    Button: {
    },
    Select: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: themes.colors.primary,
        padding: 0,
        backgroundColor: '#fff'
    }
})
export default GlobalStyle;