import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { Flex } from './Elements'

const Splash = () => {
    return (
        <Flex style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar translucent={true} />
            <View style={{ marginBottom: 15 }}>
                <Image source={require('../assets/logo.png')} style={{ width: 160, height: 100, resizeMode: 'contain' }} />
            </View>
        </Flex>
    )
}

export default Splash