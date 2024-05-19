import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'

const MutationStatus = () => {
    return (
        <View>
            <Header title='Check Status' goBack />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={GlobalStyle.ScrollView}
            >
                <Text>MutationStatus</Text>
            </ScrollView>
        </View>
    )
}

export default MutationStatus