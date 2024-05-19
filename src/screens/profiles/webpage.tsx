import React from 'react'
import { Flex } from '../../components/Elements'
import Header from '../../components/Header'
import { useRoute } from '@react-navigation/native'
import WebView from 'react-native-webview'
import { ActivityIndicator } from 'react-native'

const Webpage = () => {
    const routes = useRoute<any>();
    const { title, url } = routes.params;
    return (
        <Flex>
            <Header goBack title={title} />
            <WebView source={{ uri: url }}
                javaScriptEnabled={true}
                renderLoading={() => <ActivityIndicator />}
                startInLoadingState={true}
            />
        </Flex>
    )
}

export default Webpage