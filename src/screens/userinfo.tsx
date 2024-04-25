import { View, Text, Image, useWindowDimensions, ScrollView, ImageBackground, RefreshControl, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Paper, Row } from '../components/Elements'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { IPropertyType, IUserType, ParamList } from '../utils/types'
import { apiCall } from '../utils/dataset'
import Skeleton from '../components/Skeleton'
import { Button, Divider, Icon, IconButton } from 'react-native-paper'
import Propertycard from '../components/Propertycard'


const Userinfo = () => {
    const route = useRoute<RouteProp<ParamList, 'Userinfo'>>();
    const { id } = route.params
    const [user, setUser] = useState<IUserType>({ id: 0 });
    const [items, setItems] = useState<IPropertyType[]>([])
    const [loader, setLoader] = useState(true)
    const [tab, setTab] = useState(1)
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        setLoader(true)
        const result = await apiCall('userinfo', { user_id: id });
        if (result.success) {
            setUser(result.data);
        }
        setLoader(false)
        loadProperties();
    }

    const loadProperties = async () => {
        setLoader(true)
        const result = await apiCall('properties');
        if (result.success) {
            setItems(result.data)
        }
        setLoader(false)
    }

    const changeTab = (no: number) => {
        setTab(no)
    }

    const doRefresh = async () => {
        setRefreshing(false)
        await loadData();
        setRefreshing(false)
    }

    if (loader) {
        return (
            <Flex>
                <Skeleton>
                    <Skeleton.Ractangle height={200} />
                </Skeleton>
                <Skeleton>
                    <Skeleton.Body>
                        <Skeleton.Text />
                    </Skeleton.Body>
                </Skeleton>
                <Skeleton>
                    <Skeleton.Body>
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                    </Skeleton.Body>
                </Skeleton>
            </Flex>
        )
    }
    return (
        <Flex>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />}
            >
                <ImageBackground source={require('../assets/profile.png')} style={{ height: 200, }}>
                    <Box style={{ backgroundColor: 'rgba(0,0,0, 0.8)', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={'arrow-left'} iconColor='#fff' style={{ position: 'absolute', left: 10, top: 10 }} />
                        <Column style={{ alignItems: 'center' }}>
                            <Row>
                                <Image source={{ uri: user.image }} width={80} height={80} resizeMode='cover' style={{ borderRadius: 60, borderWidth: 2, borderColor: 'green' }} />
                            </Row>
                            <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold', color: '#fff' }}>{user.name} <Icon source={'check-decagram-outline'} size={18} color='#21AF57' /> </Text>
                            <Text style={{ color: '#ddd' }}>{user.mobile_number}</Text>
                        </Column>
                    </Box>

                </ImageBackground>
                <Row style={{ padding: 10, backgroundColor: '#fff', justifyContent: 'space-between' }}>
                    <Button
                        onPress={() => changeTab(1)}
                        mode={tab == 1 ? 'elevated' : 'text'} icon={'home-city-outline'}>Properties</Button>
                    <Button
                        onPress={() => changeTab(2)}
                        mode={tab == 2 ? 'elevated' : 'text'} icon={'cube-outline'}>Services</Button>
                    <Button
                        onPress={() => changeTab(3)}
                        mode={tab == 3 ? 'elevated' : 'text'} icon={'phone-outline'}>Contact</Button>
                </Row>
                <Box style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                    {tab == 1 && <>
                        <Box style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Land & Properties</Text>
                        </Box>
                        {items.map(((item: IPropertyType) => <Propertycard key={item.id} {...item} />))}
                    </>}
                    {tab == 2 && <>
                        <Box style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Services</Text>
                        </Box>
                    </>}
                    {tab == 3 && <>
                        <Paper style={{ backgroundColor: '#fff' }}>
                            <Row style={Style.useRow}>
                                <Text>Profile Id</Text>
                                <Text>{user.id}</Text>
                            </Row>
                            <Divider />
                            <Row style={Style.useRow}>
                                <Text>Mobile No</Text>
                                <Text>{user.mobile_number}</Text>
                            </Row>
                            <Divider />
                            <Row style={Style.useRow}>
                                <Text>Email Id</Text>
                                <Text>{user.email_id}</Text>
                            </Row>
                            <Divider />
                            <Row style={Style.useRow}>
                                <Text>Aadhar Number</Text>
                                <Text>{user.aadhar_number}</Text>
                            </Row>
                        </Paper>
                        <Button mode='contained' style={{ borderRadius: 4 }}>SEND ENQUIRY</Button>
                    </>}
                </Box>
            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    useRow: {
        justifyContent: 'space-between',
        padding: 15
    }
})

export default Userinfo