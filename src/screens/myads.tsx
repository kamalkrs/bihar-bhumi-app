import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Flex } from '../components/Elements'
import Header from '../components/Header'

const Myads = () => {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    return (
        <Flex style={{ flex: 1 }}>
            <Header title='My Ads' goBack={true} />
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text>Hello</Text>
            </ScrollView>
        </Flex>
    )
}

export default Myads