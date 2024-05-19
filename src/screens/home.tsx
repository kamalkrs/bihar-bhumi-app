import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/stores'
import { useNavigation } from '@react-navigation/native'
import { Flex, Paper, Row } from '../components/Elements'
import Header from '../components/Header'
import Propertycard from '../components/Propertycard'
import Skeleton from '../components/Skeleton'
import { apiCall } from '../utils/dataset'
import Dashboardtiles from '../components/Dashboardtiles'
import { IPropertyType } from '../utils/types'
import Footer from '../components/Footer'
import { Button, Icon, IconButton, Text } from 'react-native-paper'

const Home = () => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setLoader(true)
            const result = await apiCall('properties');
            if (result.success) {
                setItems(result.data)
            }
            setLoader(false)
        }
        loadData();
        return () => { }
    }, [])

    const navigation = useNavigation();
    const login = useSelector((state: RootState) => state.login)

    return (
        <Flex>
            <Header title='Bihar Bhumi Seva' isHome={true}>
                <TouchableOpacity
                    style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2 }}
                    onPress={() => navigation.navigate('post-property' as never)}
                >
                    <Row style={{ alignItems: 'center', gap: 5 }}>
                        <Icon source={'bullhorn-outline'} color='#f00' size={20} />
                        <Text>Post Ad</Text>
                    </Row>
                </TouchableOpacity>
                <IconButton
                    onPress={() => Linking.openURL('tel: +91')}
                    icon={'phone-outline'} size={20} iconColor='#fff' />
                <IconButton
                    onPress={() => navigation.navigate('notifications' as never)}
                    icon={'bell-outline'} size={20} iconColor='#fff' />
            </Header>
            <ScrollView showsVerticalScrollIndicator={false} style={Style.ScrollView}>
                <Dashboardtiles />
                {loader ? <Paper style={{ backgroundColor: '#fff', paddingVertical: 10 }}>
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                </Paper> : <>
                    {items.map(((item: IPropertyType) => <Propertycard key={item.id} {...item} />))}
                </>}
            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    ScrollView: {
        paddingHorizontal: 8,
        paddingTop: 8
    }
})

export default Home