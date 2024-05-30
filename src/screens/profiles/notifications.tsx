import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Box, Column, Flex } from '../../components/Elements'
import Header from '../../components/Header'
import { Icon } from 'react-native-paper'
import GlobalStyle from '../../utils/styles'

const Notifications = () => {
    return (
        <Flex>
            <Header title='Notifications' goBack />
            {/* <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
            > */}
            <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon source={'message-text-outline'} size={60} color='#888' />
                <Text style={{ fontSize: 16 }}>No New Notications</Text>
            </Box>
            {/* </ScrollView> */}
        </Flex>
    )
}

export default Notifications