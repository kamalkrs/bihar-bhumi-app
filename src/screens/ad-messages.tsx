import { View, Text, ScrollView, RefreshControl, FlatList, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Box, Flex, Row } from '../components/Elements';
import Header from '../components/Header';
import GlobalStyle from '../utils/styles';
import { apiCall } from '../utils/dataset';
import { ActivityIndicator, Divider, Icon, IconButton } from 'react-native-paper';
import Toast from 'react-native-simple-toast'
import { themes } from '../utils/themes';

const AdMessages = () => {
    const routes = useRoute();
    const { id } = routes.params;
    const [refreshing, setRefreshing] = useState(false)
    const [item, setItem] = useState({
        site_title: ''
    })
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('get-site', { id });
        if (result.success) {
            setItem(result.data);
        }

        // Set messages
        apiCall('lead-messages', { prop_id: id }).then(result => {
            console.log(result);

            if (result.success) {
                setMessages(result.data);
            }
        }).finally(() => setLoading(false))
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    }

    const handleRemove = (id: number) => {
        Alert.alert("Alert", "Are you sure to Delete?", [
            {
                text: 'NO'
            },
            {
                text: 'YES',
                onPress: () => {
                    apiCall('del-message', { msgId: id }).then(result => {
                        Toast.show(result.message, 3000);
                        if (result.success) {
                            loadData();
                        }
                    })
                }
            }
        ])

    }

    const __singleView = (item: any) => {
        return (
            <Box style={Style.msgbox}>
                <Row justifyContent='space-between' style={{ padding: 12 }}>
                    <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 16 }}>{item.first_name + ' ' + item.last_name} </Text>
                    <Text style={{ fontSize: 12 }}>{item.created}</Text>
                </Row>
                <Divider />
                <Box style={{ padding: 12 }}>
                    <Text>{item.details}</Text>
                </Box>
                <Divider />
                <Row justifyContent='space-between' alignItems='center' style={{ paddingHorizontal: 12 }}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('tel:' + item.mobile)}
                    >
                        <Row gap={4} alignItems='center'>
                            <Icon source={'cellphone'} size={16} color={themes.colors.primary} />
                            <Text style={{ fontSize: 16 }}>{item.mobile}</Text>
                        </Row>
                    </TouchableOpacity>
                    <IconButton
                        containerColor='pink'
                        onPress={() => handleRemove(item.id)}
                        icon={'trash-can-outline'} iconColor='#f00' size={16} />
                </Row>
            </Box>
        )
    }

    if (loading) {
        return (
            <Flex>
                <Header title={item.site_title} subTitle={'#' + id} goBack />
                <Box style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator />
                </Box>
            </Flex>
        )
    }

    if (!loading && messages.length == 0) {
        return (
            <Flex>
                <Header title={item.site_title} subTitle={'#' + id} goBack />
                <Box style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Icon source={'message-text-outline'} size={24} />
                    <Text>No Message Found</Text>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex>
            <Header title={item.site_title} subTitle={'#' + id} goBack />
            <FlatList
                contentContainerStyle={GlobalStyle.ScrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                data={messages}
                renderItem={({ item }) => __singleView(item)}
                keyExtractor={item => item.id}
            />
        </Flex>
    )
}

const Style = StyleSheet.create({
    msgbox: {
        backgroundColor: '#fff',
        elevation: 1,
        marginBottom: 4,
        borderRadius: 4,
        overflow: 'hidden'
    }
})

export default AdMessages