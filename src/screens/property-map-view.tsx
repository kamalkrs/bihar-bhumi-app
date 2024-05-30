import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Flex } from '../components/Elements'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { apiCall } from '../utils/dataset'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper'

const PropertyMapview = () => {
    const [item, setItem] = useState({
        lat: 0,
        lng: 0,
        id: '',
        site_title: ''
    })
    const routes = useRoute();
    const { id } = routes.params;
    const window = useWindowDimensions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('get-site', { id });
        if (result.success) {
            setItem(result.data);
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Flex>
                <Header goBack title='#' />
                <Box style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </Box>
            </Flex>
        )
    }

    return (
        <Flex>
            <Header goBack title='#' />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: window.width, flex: 1 }}
                showsMyLocationButton={true}
                scrollEnabled={true}
                initialRegion={{
                    latitude: item.lat,
                    longitude: item.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker
                    draggable={true}
                    title='Ab'
                    coordinate={{ latitude: item.lat, longitude: item.lng }}
                /> */}
            </MapView>
        </Flex>
    )
}

export default PropertyMapview