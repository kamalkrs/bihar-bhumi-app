import React from "react"
import { View, ViewProps } from "react-native"
import { TextInput, TextInputProps, useTheme } from "react-native-paper"

export const Box: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <View style={style}>
            {children}
        </View>
    )
}
export const Paper: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <View style={[style, { borderRadius: 4, marginBottom: 10 }]}>
            {children}
        </View>
    )
}

export const Row: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <View style={[style, { flexDirection: 'row' }]}>
            {children}
        </View>
    )
}

export const Column: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <View style={[{ flexDirection: 'column' }, style]}>
            {children}
        </View>
    )
}

export const Flex: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <View style={[style, { flex: 1, backgroundColor: '#eee' }]}>
            {children}
        </View>
    )
}

export const AIInput = (props: TextInputProps) => {
    const theme = useTheme();
    return <TextInput {...props}
        style={{ padding: 0, height: 45 }}
        mode="outlined" outlineColor={theme.colors.primary} theme={{ roundness: 100 }} />
}
