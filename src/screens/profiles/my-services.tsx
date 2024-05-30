import { Text, RefreshControl, StyleSheet, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Row } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Divider, IconButton, Menu, FAB } from 'react-native-paper'
import { themes } from '../../utils/themes'
import Skeleton from '../../components/Skeleton'
import { apiCall } from '../../utils/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import Toast from 'react-native-simple-toast'
import { useNavigation } from '@react-navigation/native'

const MyServices = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [items, setItems] = useState<any[]>([]);
    const [loader, setLoader] = useState(true);
    const login = useSelector((state: RootState) => state.login);
    const navigation = useNavigation<any>();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await apiCall('services', { user_id: login.id, action: 'view' });
        if (result.success) {
            const tmparr = result.data;
            let nr = tmparr.map(((item: any) => { item.visible = false; return item; }))
            setItems(nr);
        }
        setLoader(false);
    }


    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }

    const handleMenuButton = (index: number) => {
        let tmparr = items.filter(item => {
            if (item.id == index) {
                item.visible = !item.visible;
            }
            return item;
        });
        setItems(tmparr);
    }

    const handleEdit = (id: number) => {
        navigation.navigate('add-service', { id: id, action: 'edit' });
        handleDismiss();
    }

    const handleDelete = async (id: number) => {
        Alert.alert("Delete", "Are you sure to Delete", [
            {
                text: 'Cancel',
                onPress: () => { console.log('Do nothing') }
            },
            {
                text: 'Yes',
                onPress: async () => {
                    const result = await apiCall('services', { user_id: login.id, action: 'delete', id: id });
                    Toast.show(result.message, 3000);
                    if (result.success) {
                        loadData();
                        handleDismiss();
                    }
                }
            }
        ]);
        handleDismiss();
    }

    const handleDismiss = () => {
        let tmp = items.map(item => { item.visible = false; return item; });
        setItems(tmp);
    }

    if (loader) {
        return (
            <Flex>
                <Header goBack title='My Services' />
                <Box style={{ padding: 10 }}>
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
            <Header goBack title='My Services' />
            <FlatList
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                data={items}
                renderItem={({ item }: { item: any }) => (
                    <Box key={item.id} style={Style.box}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
                            <Column style={{ flex: 1 }}>
                                <Text style={Style.heading}>{item?.service_name}</Text>
                                <Row style={{ gap: 5 }}>
                                    {item.locations.slice(0, 3).map((ab: any) => (
                                        <Box key={ab.city} style={{ backgroundColor: '#ddd', paddingHorizontal: 5, borderRadius: 4 }}>
                                            <Text>{ab.city}</Text>
                                        </Box>
                                    ))}
                                    {item.locations.length > 3 && <Box key='key-more' style={{ backgroundColor: '#ddd', paddingHorizontal: 5, borderRadius: 4 }}>
                                        <Text>more...</Text>
                                    </Box>}
                                </Row>
                            </Column>
                            <Menu
                                visible={item.visible}
                                onDismiss={() => handleDismiss()}
                                anchor={<IconButton onPress={() => handleMenuButton(item.id)} icon={'dots-vertical'} size={24} />}>
                                <Menu.Item onPress={() => handleEdit(item.id)} title="Edit" />
                                <Divider />
                                <Menu.Item onPress={() => handleDelete(item.id)} title="Delete" />
                            </Menu>
                        </Row>
                    </Box>
                )}
            >
            </FlatList>
            <FAB
                icon="plus"
                style={Style.fab}
                color={'#fff'}
                onPress={() => navigation.navigate('add-service', { action: 'add', id: 0 })}
            />
        </Flex>
    )
}

const Style = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        paddingStart: 15
    },
    heading: {
        fontSize: 16,
        color: '#222', fontWeight: 'bold', marginBottom: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        backgroundColor: themes.colors.primary
    }
})

export default MyServices