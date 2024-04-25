import { Text, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import React from 'react'
import { Box, Column, Row } from './Elements'
import { IconButton } from 'react-native-paper'
import { IPropertyType } from '../utils/types'

const window = Dimensions.get('window')

const Propertycard = (item: IPropertyType) => {
    return (
        <Row key={item.id} style={Style.cardView}>
            <Box style={{ width: 130 }}>
                <Image source={{ uri: item.photo_front }} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            </Box>
            <Box style={{ padding: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{item.site_title}</Text>
                <Text numberOfLines={2} style={{ marginBottom: 5 }}>{item.address}</Text>
                <Text>Price: {item.total_amount} </Text>
            </Box>
            <Column style={{ padding: 5 }}>
                <IconButton icon={'bookmark-outline'} iconColor='#FFA500' size={20} onPress={() => Alert.alert('hello')} style={{ margin: 0 }} />
                <IconButton icon={'message-outline'} iconColor='#800884' size={20} onPress={() => Alert.alert('hello')} style={{ margin: 0 }} />
                <IconButton icon={'whatsapp'} size={20} iconColor='#21AF57' onPress={() => Alert.alert('hello')} style={{ margin: 0 }} />
            </Column>
        </Row>
    )
}

const Style = StyleSheet.create({
    cardView: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 10,
        overflow: 'hidden',
        width: window.width - 20
    }
})

export default Propertycard

