import { View, Text } from 'react-native'
import React from 'react'
import { Flex } from '../components/Elements'
import Header from '../components/Header'

const Postproperties = () => {
    return (
        <Flex>
            <Header title='Post your property' goBack />
            <Text>Postproperties</Text>
        </Flex>
    )
}

export default Postproperties