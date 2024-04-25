import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Flex, Paper } from '../components/Elements'
import Header from '../components/Header'
import Style from '../utils/styles'
import { IPropertyType } from '../utils/types'
import { apiCall } from '../utils/dataset'
import Skeleton from '../components/Skeleton'
import Propertycard from '../components/Propertycard'

const Properties = () => {
    const [items, setItems] = useState<IPropertyType[]>([])
    const [loader, setLoader] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadData();
        return () => { }
    }, [])

    const loadData = async () => {
        setLoader(true)
        const result = await apiCall('properties');
        if (result.success) {
            setItems(result.data)
        }
        setLoader(false)
    }

    const actionRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }

    return (
        <Flex>
            <Header title='All Properties' goBack />
            <ScrollView contentContainerStyle={Style.ScrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={actionRefresh} />}
            >
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

export default Properties