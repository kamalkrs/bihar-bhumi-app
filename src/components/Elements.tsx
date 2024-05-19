import React, { forwardRef, ForwardRefRenderFunction } from "react"
import { Text, View, ViewProps } from "react-native"
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
        <View style={[{ flex: 1, backgroundColor: '#eee' }, style]}>
            {children}
        </View>
    )
}

export const Label: React.FC<ViewProps> = ({ children, style }) => {
    return (
        <Text style={[{ color: '#444', marginBottom: 8, fontSize: 16 }, style]}>
            {children}
        </Text>
    )
}

interface TextFieldProps extends TextInputProps {
    placeholder?: string;
}

const ITextBox: ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = ((props, ref) => {
    const theme = useTheme();
    return <TextInput {...props}
        ref={ref}
        style={[{ padding: 0, height: 45 }, props?.style]}
        mode="outlined" outlineColor={theme.colors.primary} theme={{ roundness: 4 }} />
})

export const TextBox = forwardRef<HTMLInputElement, TextFieldProps>(ITextBox);