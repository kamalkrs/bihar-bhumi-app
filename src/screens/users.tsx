import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Flex, Paper } from '../components/Elements'
import Header from '../components/Header'
import { RouteProp, useRoute } from '@react-navigation/native'
import { IUserType, ParamList } from '../utils/types'
import Style from '../utils/styles'
import { apiCall } from '../utils/dataset'
import Skeleton from '../components/Skeleton'
import Usercard from '../components/Usercard'

const Users = () => {
    const router = useRoute<RouteProp<ParamList, 'Users'>>();
    const { title, userType } = router.params;
    const [items, setItems] = useState<IUserType[]>([]);
    const [loader, setLoader] = useState<boolean>(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadData = async () => {
            setLoader(true);
            const result = await apiCall('users', { user_type: userType, page: 1 });
            if (result.success) {
                setItems(result.data);
            }
            setLoader(false)
        }
        loadData();
    }, [page])

    return (
        <Flex>
            <Header title={title + ' - ' + items.length} goBack />
            <ScrollView style={Style.ScrollView}>
                {loader ? <Paper>
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                    <Skeleton.Profile />
                </Paper> : <>
                    {items.map((item, sl) => <Usercard key={sl} {...item} />)}
                </>}
            </ScrollView>
        </Flex>
    )
}

export default Users