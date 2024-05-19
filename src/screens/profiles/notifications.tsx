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
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
            >
                <Column style={{ justifyContent: 'center', minHeight: 600 }}>
                    <Column style={{ alignItems: 'center', gap: 10 }}>
                        <Icon source={'message-text-outline'} size={60} color='#888' />
                        <Text style={{ fontSize: 16 }}>No New Notications</Text>
                    </Column>
                </Column>
            </ScrollView>
        </Flex>
    )
}

export default Notifications