import { DefaultTheme, MD3LightTheme, configureFonts } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

export const themes: ThemeProp = {
    ...DefaultTheme,
    roundness: 100,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#37AA9D',
        secondary: '#4A635F',
        tertiary: '#46617A'
    }
}
