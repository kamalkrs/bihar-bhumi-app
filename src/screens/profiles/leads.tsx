import { View, Text, ScrollView, RefreshControl, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Row } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import Skeleton from '../../components/Skeleton'
import { apiCall } from '../../utils/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import Toast from 'react-native-simple-toast'
import { Divider, IconButton } from 'react-native-paper'
import { themes } from '../../utils/themes'
import { useNavigation } from '@react-navigation/native'

const Leads = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const login = useSelector((state: RootState) => state.login);
    const navigation = useNavigation();

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('leads', { user_id: login.id });
        if (result.success) {
            console.log(result.data);
            setItems(result.data);
        }
        setLoading(false);
    }


    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        Toast.show("Loaded reloaded", 3000);
        setRefreshing(false);
    }

    const _singleView = (item: any) => {
        return (
            <Box key={item.id} style={{ padding: 8, marginBottom: 8, backgroundColor: '#fff', borderRadius: 4 }}>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8 }}>
                    <Column style={{ gap: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222' }}>{item.first_name + ' ' + item.last_name}</Text>
                        <Text>{item.mobile}</Text>
                        {item.email_id.length > 0 && <Text>{item.email_id}</Text>}
                    </Column>
                    <Row>
                        <IconButton
                            onPress={() => Linking.openURL('tel:+91' + item.mobile)}
                            icon={'phone'} size={20} iconColor={themes.colors.primary} />
                        <IconButton
                            onPress={() => { }}
                            icon={'message-text-outline'} size={20} iconColor={themes.colors.primary} />
                    </Row>
                </Row>
                <Divider />
                <Box style={{ paddingTop: 8 }}>
                    <Text>{item.created}</Text>
                </Box>
            </Box>
        )
    }

    if (loading) {
        return (
            <Flex>
                <Header goBack title='Leads & Enquiries1' />
                <Box style={{ padding: 12 }}>
                    <Skeleton>
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                        <Skeleton.Profile2 />
                    </Skeleton>
                </Box>
            </Flex>
        )
    }
    return (
        <Flex>
            <Header goBack title='Leads & Enquiries' />
            <FlatList
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
                data={items}
                renderItem={({ item }) => _singleView(item)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
            </FlatList>
        </Flex>
    )
}

export default Leads