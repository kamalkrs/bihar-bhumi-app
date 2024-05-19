import { Text, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Row } from '../../components/Elements'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import Skeleton from '../../components/Skeleton'
import { apiCall } from '../../utils/dataset'
import GlobalStyle from '../../utils/styles'
import Propertycard from '../../components/Propertycard'
import { Button } from 'react-native-paper'
import Toast from 'react-native-simple-toast'

const Wishlist = () => {
    const login = useSelector((state: RootState) => state.login)
    const [items, setItems] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('wishlist', { user_id: login.id });
        if (result.success) {
            setItems(result.data);
        }
        setLoading(false);
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }

    const handleRemoveItem = async (id: number) => {
        Toast.show('Item removed from Wishlist', 3000);
        await apiCall('remove-wishlist', { user_id: login.id, pid: id });
        loadData();
    }

    if (loading) {
        return (
            <Flex>
                <Header title='My Wishlist' goBack />
                <Box style={{ padding: 10 }}>
                    <Skeleton>
                        <Skeleton.Ractangle height={100} />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                    </Skeleton>
                </Box>
            </Flex>
        )
    }
    if (!loading && items.length == 0) {
        return (
            <Flex>
                <Header title='My Wishlist' goBack />
                <Box style={{ padding: 10, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={require('../../assets/empty-wishlist.png')} style={{ width: 240, height: 120, resizeMode: 'contain' }} />
                    <Text>Empty Wishlist</Text>
                </Box>
            </Flex>
        )
    }
    return (
        <Flex>
            <Header title='My Wishlist' goBack />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                {items.map((item: any, sl: number) => (
                    <Box>
                        <Propertycard key={'prop' + sl} {...item} />
                        <Row style={{ marginBottom: 10, justifyContent: 'flex-end' }}>
                            <Button
                                onPress={() => handleRemoveItem(item.id)}
                                mode='contained' buttonColor='#d00'>Remove</Button>
                        </Row>
                    </Box>
                ))}
            </ScrollView>
        </Flex>
    )
}

export default Wishlist