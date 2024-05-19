import { View, Text } from 'react-native'
import React from 'react'
import { Flex } from '../../components/Elements'
import Header from '../../components/Header'

const HelpSupport = () => {
    return (
        <Flex>
            <Header title='Notifications' goBack />
            <Text>Help & Support</Text>
        </Flex>
    )
}

export default HelpSupport