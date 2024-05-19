import { MD3LightTheme } from "react-native-paper";

import lang from '../utils/lang/hi'

export const themes = {
    ...MD3LightTheme,
    roundness: 0.5,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#0aa699',
        secondary: '#4A635F',
        tertiary: '#46617A',
        theme: {
            50: '#dbfffe',
            100: '#b1fcf6',
            200: '#84f8ee',
            300: '#57f5e8',
            400: '#2ff2e1',
            500: '#1bd8c8',
            600: '#0aa89b',
            700: '#00786f',
            800: '#004943',
            900: '#001a17',
        }
    },
    lang: lang
}
