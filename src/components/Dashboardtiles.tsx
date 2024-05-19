import { Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Paper, Row } from './Elements'
import { useNavigation } from '@react-navigation/native'

type TileType = {
    id: number,
    text: string,
    icon: ImageSourcePropType,
    path: string
}

const tiles: TileType[] = [
    {
        id: 1,
        text: 'Post Property',
        icon: require('../assets/icon-1.jpeg'),
        path: 'post-property'
    },
    {
        id: 2,
        text: 'Property',
        icon: require('../assets/icon-2.jpeg'),
        path: 'properties'
    },
    {
        id: 3,
        text: 'Broker',
        icon: require('../assets/icon-3.jpeg'),
        path: 'users/broker'
    },
    {
        id: 4,
        text: 'Munsi',
        icon: require('../assets/icon-3.jpeg'),
        path: 'users/munsi'
    },
    {
        id: 5,
        text: 'Amin',
        icon: require('../assets/icon-3.jpeg'),
        path: 'users/amin'
    },
    {
        id: 6,
        text: 'CO List',
        icon: require('../assets/icon-3.jpeg'),
        path: 'users/co'
    },
    {
        id: 7,
        text: 'Bhumi Locker',
        icon: require('../assets/icon-3.jpeg'),
        path: 'bhumi-locker'
    },
    {
        id: 8,
        text: 'Mutations',
        icon: require('../assets/icon-3.jpeg'),
        path: 'mutations'
    },
]

const Dashboardtiles = () => {
    const navigation = useNavigation()
    return (
        <Paper style={{ backgroundColor: '#fff' }}>
            <Row style={{ paddingHorizontal: 20, paddingTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>See All</Text>
            </Row>
            <Box style={{ padding: 10, flexWrap: 'wrap', flexDirection: 'row' }}>
                {tiles.map((item: TileType) => <TouchableOpacity onPress={() => navigation.navigate(item.path as never)} key={item.id} style={Style.iconHomeWrapper}>
                    <Image source={item.icon} style={Style.iconHome} />
                    <Text style={Style.iconLabel}>{item.text}</Text>
                </TouchableOpacity>)}
            </Box>
        </Paper>
    )
}

const Style = StyleSheet.create({
    iconHome: {
        width: 60,
        height: 60
    },
    iconHomeWrapper: {
        alignItems: 'center',
        width: '25%',
        flexWrap: 'wrap',
        marginBottom: 5
    },
    ScrollView: {
        paddingHorizontal: 8,
        paddingTop: 8
    },
    iconLabel: {
        fontSize: 12
    }
})

export default Dashboardtiles