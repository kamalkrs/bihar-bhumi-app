import { View, Text, ScrollView, RefreshControl, Dimensions, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Row } from '../components/Elements'
import { apiCall } from '../utils/dataset'
import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel';
import Skeleton from '../components/Skeleton'
import { Button, Divider, Icon, IconButton } from 'react-native-paper'
import { themes } from '../utils/themes'
import Usercard from '../components/Usercard'
import Toast from 'react-native-simple-toast'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/stores'

const PropertyDetails = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [site, setSite] = useState<any | null>(null)
    const [images, setImages] = useState<any[]>([])
    const routes = useRoute<any>();
    const { id } = routes.params
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false)
    const login = useSelector((state: RootState) => state.login);

    useEffect(() => {
        loadDetails();
    }, [id])

    const loadDetails = async () => {
        const result = await apiCall('property-details', { id: id });
        // console.warn(result, id);

        if (result.success) {
            setSite(result.data);
            let items = [
                {
                    id: 1,
                    label: 'Front',
                    uri: result.data.photo_front
                },
                {
                    id: 2,
                    label: 'Back',
                    uri: result.data.photo_back
                },
                {
                    id: 3,
                    label: 'Left',
                    uri: result.data.photo_left
                },
                {
                    id: 4,
                    label: 'Right',
                    uri: result.data.photo_right
                },
            ]
            setImages(items);
            checkWishlistAdded();
        } else {
            Toast.show(result.message, 3000);
            navigation.goBack();
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadDetails();
        setRefreshing(false);
    }

    const checkWishlistAdded = async () => {
        let result = await apiCall('check-wishlist', { user_id: login.id, pid: id });
        setLiked(result.success);
    }

    const handleWishlist = async () => {
        setLiked(liked => !liked);
        if (liked) {
            apiCall('remove-wishlist', { user_id: login.id, pid: id })
            Toast.show('Item removed from Wishlist', 3000);
        } else {
            apiCall('add-wishlist', { user_id: login.id, pid: id })
            Toast.show('Item added to Wishlist', 3000);
        }
    }

    if (site == null) {
        return (
            <Flex style={{ flex: 1, padding: 15 }}>
                <Skeleton>
                    <Skeleton.Ractangle height={120} />
                    <Skeleton.Profile2 />
                    <Skeleton.Profile2 />
                    <Row style={{ gap: 10 }}>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                    </Row>
                    <Row style={{ gap: 10 }}>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                    </Row>
                    <Row style={{ gap: 10 }}>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Skeleton.Ractangle height={40} />
                        </Box>
                    </Row>
                    <Skeleton.Profile2 />
                    <Skeleton.Profile2 />
                    <Skeleton.Profile2 />
                    <Skeleton.Profile2 />
                </Skeleton>
            </Flex>
        )
    }

    return (
        <Flex style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <View style={{ flex: 1, position: 'relative' }}>
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={images}
                        scrollAnimationDuration={2000}
                        renderItem={({ index, item }) => (
                            <View key={item.id} style={{ position: 'relative' }}>
                                <Image source={{ uri: item.uri }} style={{ width: '100%', height: width / 2, resizeMode: 'cover' }} />
                                <Row style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 99 }}>
                                    <View style={{ backgroundColor: 'yellow', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 }}>
                                        <Text>{item.label}</Text>
                                    </View>
                                </Row>
                            </View>
                        )}
                    />
                    <Row style={{ position: 'absolute', left: 5, top: 5, right: 5, justifyContent: 'space-between' }}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={'arrow-left'} size={24} iconColor='#fff' />
                        <IconButton
                            onPress={handleWishlist}
                            icon={liked ? 'heart' : 'heart-outline'} size={20} iconColor={liked ? '#f00' : '#fff'} />
                    </Row>
                </View>
                <Row style={{ gap: 10, alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 4, elevation: 1 }}>
                    <Column style={{ flex: 1 }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontSize: 18, color: '#222', fontWeight: 'bold', marginBottom: 8 }}>{site?.site_title}</Text>
                        <Row style={{ gap: 10, paddingEnd: 10 }}>
                            <Icon source={'map-marker'} size={20} color={themes.colors.primary} />
                            <Text>{site.address}</Text>
                        </Row>
                    </Column>
                    <IconButton
                        onPress={() => { }}
                        icon={'dots-vertical'} size={20} iconColor={themes.colors.primary} />
                </Row>
                <Box style={{ padding: 10 }}>
                    <Box style={Style.box}>
                        <Row style={{ alignItems: 'center', gap: 5 }}>
                            <Icon source={'currency-inr'} size={20} /><Text style={Style.heading}> {site.total_amount}/-</Text>
                        </Row>
                        <Row style={{ paddingTop: 5 }}>
                            <Text>Area: {site.total_area} {site.area_unit}</Text>
                        </Row>
                    </Box>
                    <Box style={Style.box}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Property Details</Text>
                        {site.propDetails.length > 0 && site.propDetails.map((item: any, index: number) => (
                            <Box key={'prop' + index}>
                                <Divider />
                                <Row style={Style.rowItem}>
                                    <Text style={Style.rowLabel}>{item.label}</Text>
                                    <Text style={Style.rowValue}>{item.value}</Text>
                                </Row>
                            </Box>
                        ))}
                    </Box>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Owner Details</Text>
                    <Usercard {...site.owner} />

                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Broker Details</Text>
                    <Usercard {...site.broker} />

                    <Row style={{ gap: 10, justifyContent: 'space-between' }}>
                        <Button mode='contained' buttonColor='purple'>Send SMS</Button>
                        <Button mode='contained' buttonColor='orange'>Enquiry Now</Button>
                        <Button mode='contained' buttonColor='green'>Call Now</Button>
                    </Row>
                </Box>

            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    heading: {
        fontSize: 20,
        color: '#444',
        fontWeight: 'bold'
    },
    box: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 4 },
    rowItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8
    },
    rowLabel: { fontSize: 16 },
    rowValue: { fontSize: 18, color: '#333', fontWeight: 'bold' }
})

export default PropertyDetails