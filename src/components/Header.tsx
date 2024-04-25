import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Appbar } from 'react-native-paper';

interface HeaderInput {
    title: string,
    goBack?: boolean,
    children?: React.ReactNode
}

const Header = ({ title, goBack, children }: HeaderInput) => {
    const navigation = useNavigation();
    return (
        <Appbar.Header style={{ height: 50 }}>
            {goBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
            <Appbar.Content title={title} titleStyle={{ fontSize: 16 }} />
            {children}
        </Appbar.Header>
    )
}

export default Header;
