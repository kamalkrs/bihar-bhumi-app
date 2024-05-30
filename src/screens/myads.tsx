import { Text, RefreshControl, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Row } from '../components/Elements'
import Header from '../components/Header'
import { apiCall } from '../utils/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/stores'
import { ActivityIndicator, Button, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { themes } from '../utils/themes'

const Myads = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);
    const login = useSelector((state: RootState) => state.login)
    const navigation = useNavigation<any>();


    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('my-ads', { user_id: login.id });
        if (result.success) {
            setItems(result.data);
            // console.log(result.data);
        }
        setLoading(false);
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }

    const __singleView = (item: any) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('post-property-details' as never, { id: item.id })}
            >
                <Box style={{ backgroundColor: '#fff', padding: 10, marginBottom: 1 }}>
                    <Row style={{ alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('property-map-view', { id: item.id })}
                        >
                            <Image source={require('../assets/map.png')} style={{ width: 50, height: 50, resizeMode: 'cover' }} />
                        </TouchableOpacity>
                        <Column style={{ flex: 1 }}>
                            <Text numberOfLines={1} style={Style.heading}>{item.site_title}</Text>
                            <Text numberOfLines={1}>612/A, Jagriti Nagar, Ranchi - Jharkhand</Text>
                            <Row style={{ gap: 5, marginTop: 5 }}>
                                {item.status == 1 && <Box style={[Style.labelBadge, Style.labelActive]}>
                                    <Text>Active</Text>
                                </Box>}
                                {item.status == 0 && <Box style={[Style.labelBadge, Style.labelPending]}>
                                    <Text>Pending</Text>
                                </Box>}
                                {item.status == 2 && <Box style={[Style.labelBadge, Style.labelRejectd]}>
                                    <Text>Rejected</Text>
                                </Box>}
                                <Box style={[Style.labelBadge]}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ad-messages' as never, { id: item.id })}>
                                        <Text>{item.messages} Messages</Text>
                                    </TouchableOpacity>
                                </Box>
                            </Row>
                        </Column>
                        <Column>
                            <IconButton
                                onPress={() => navigation.navigate('post-property-photo' as never, { id: item.id })}
                                icon={'file-upload'} size={20} iconColor={themes.colors.primary} />
                        </Column>
                    </Row>
                </Box >
            </TouchableOpacity >
        )
    }

    if (loading) {
        return (
            <Flex style={{ flex: 1 }}>
                <Header title='My Ads' goBack={true} />
                <Column style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </Column>
            </Flex>
        )
    }

    return (
        <Flex style={{ flex: 1 }}>
            <Header title='My Ads' goBack={true}>
                <Button
                    onPress={() => {
                        navigation.navigate('post-property' as never)
                    }}
                    icon={'plus'}
                    labelStyle={{ color: '#fff' }}>Add</Button>
            </Header>
            <FlatList
                data={items}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                renderItem={({ item }) => __singleView(item)}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </Flex>
    )
}

const Style = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelBadge: {
        paddingHorizontal: 10, paddingVertical: 2, borderRadius: 2,
        backgroundColor: '#ddd'
    },
    labelPending: {
        backgroundColor: '#fff200'
    },
    labelActive: {
        backgroundColor: '#6eed68'
    },
    labelRejectd: {
        backgroundColor: '#fc755a'
    }
})

export default Myads