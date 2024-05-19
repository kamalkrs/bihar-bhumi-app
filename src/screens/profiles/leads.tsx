import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Flex } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'

const Leads = () => {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }
    return (
        <Flex>
            <Header goBack title='Leads & Enquiries' />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Text>Leads</Text>

            </ScrollView>
        </Flex>
    )
}

export default Leads