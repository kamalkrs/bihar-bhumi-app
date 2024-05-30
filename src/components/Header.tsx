import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Appbar, Avatar } from 'react-native-paper';
import { Box, Column, Row } from './Elements';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/stores';

interface HeaderInput {
    title: string,
    subTitle?: string,
    goBack?: boolean,
    children?: React.ReactNode,
    isHome?: boolean
}

const Header = ({ title, goBack, children, isHome = false, subTitle = '' }: HeaderInput) => {
    const navigation = useNavigation();
    const login = useSelector((state: RootState) => state.login);

    return (
        <>
            <Row style={{ backgroundColor: '#0aa699', alignItems: 'center', padding: goBack ? 2 : 4, gap: 10, justifyContent: 'space-between' }}>
                {isHome ? <>
                    <TouchableOpacity onPress={() => navigation.navigate('profile' as never)}>
                        <Avatar.Image size={40} source={{ uri: login.image }} />
                    </TouchableOpacity>
                    <Column style={{ flex: 1 }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontWeight: 'bold', fontSize: 14, color: '#fff' }}>Hi, {login.first_name}</Text>
                        {subTitle.length > 0 && <Text>{subTitle}</Text>}
                    </Column>
                </> : <Row style={{ flex: 1, gap: 5, alignItems: 'center' }}>
                    {goBack ? <Appbar.BackAction onPress={() => navigation.goBack()} color='#fff' /> : null}
                    <Column>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{title}</Text>
                        {subTitle.length > 0 && <Text style={{ color: '#333' }}>{subTitle}</Text>}
                    </Column>
                </Row>}
                <Row style={{ justifyContent: 'flex-end', alignItems: 'center', paddingEnd: 10 }}>
                    {children}
                </Row>
            </Row>
        </>
    )
}

export default Header;
