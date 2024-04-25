import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Column, Row } from './Elements'
import { IUserType } from '../utils/types'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Usercard = (item: IUserType) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('userinfo', { id: item.id })}
            style={Style.cardView}>
            <Row>
                <Image source={{ uri: item.image }} defaultSource={require('../assets/logo.png')} style={Style.userPhoto} />
                <Column style={Style.userInfo}>
                    <Text style={Style.userName}>{item.name}</Text>
                    <Text numberOfLines={2}>{item.address}</Text>
                    <Row style={{ alignItems: 'center', gap: 10, marginVertical: 4 }}>
                        <Icon source={'phone-outline'} size={15} color='#000' />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.mobile_number}</Text>
                    </Row>
                    <Row style={{ alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <Icon source={'whatsapp'} size={15} color='#21AF57' />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.mobile_number}</Text>
                    </Row>
                </Column>
            </Row>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 8
    },
    userPhoto: {
        width: 120,
        height: 120,
        resizeMode: 'cover'
    },
    userInfo: {
        flex: 1,
        padding: 10
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    }
})

export default Usercard