import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Flex } from '../components/Elements'
import Header from '../components/Header'

const Chat = () => {

    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <Flex>
            <Header title='Chat' goBack={true} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text>Chat here</Text>
            </ScrollView>
        </Flex>
    )
}

export default Chat