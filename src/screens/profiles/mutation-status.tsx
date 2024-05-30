import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Box, Label, Row, TextBox } from '../../components/Elements'
import { Button, Divider } from 'react-native-paper'
import Skeleton from '../../components/Skeleton'
import Toast from 'react-native-simple-toast'
import { apiCall } from '../../utils/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'

const MutationStatus = () => {
    const [deed_no, setDeed_no] = useState('')
    const [loading, setLoading] = useState(false);
    const login = useSelector((state: RootState) => state.login)
    const [item, setItem] = useState({
        id: 0,
        created: '',
        status: -1,
        comments: ''
    });

    const getDetails = async () => {
        if (deed_no == '') {
            Toast.show('Enter Deed Number', 3000);
            return;
        }
        setLoading(true);
        const result = await apiCall('track-mutations', { user_id: login.id, deed_no: deed_no });
        if (result.success) {
            setItem(result.data);
        } else {
            Toast.show(result.message, 3000);
            setItem({ ...item, id: 0 })
        }
        setLoading(false);
    }

    return (
        <View>
            <Header title='Check Status' goBack />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={GlobalStyle.ScrollView}
            >
                <Box style={{ marginBottom: 10 }}>
                    <Label>Enter Deed Number</Label>
                    <TextBox
                        value={deed_no}
                        onChangeText={ev => setDeed_no(ev)}
                    />
                </Box>
                <Button
                    contentStyle={{ height: 45 }}
                    onPress={getDetails}
                    mode='contained'>GET DETAILS</Button>
                {loading && <Box style={{ marginVertical: 10, backgroundColor: '#fff', padding: 12 }}>
                    <Skeleton>
                        <Skeleton.Text />
                    </Skeleton>
                </Box>}
                {!loading && item.id > 0 && <Box style={{ marginVertical: 10, backgroundColor: '#fff', padding: 12 }}>
                    <Row justifyContent='space-between' alignItems='center'>
                        <Text>Application Id</Text>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{item.id}</Text>
                    </Row>
                    <Divider style={{ marginVertical: 10 }} />
                    <Row justifyContent='space-between' alignItems='center'>
                        <Text>Submitted</Text>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{item.created}</Text>
                    </Row>
                    <Divider style={{ marginVertical: 10 }} />
                    <Row justifyContent='space-between' alignItems='center'>
                        <Text>Status</Text>
                        <View>
                            {item.status == 0 && <View style={{ backgroundColor: 'yellow', paddingHorizontal: 5, paddingVertical: 2 }}>
                                <Text>Pending</Text>
                            </View>}
                            {item.status == 1 && <View style={{ backgroundColor: 'green', paddingHorizontal: 5, paddingVertical: 2 }}>
                                <Text>Complted</Text>
                            </View>}
                            {item.status == 1 && <View style={{ backgroundColor: '#f00', paddingHorizontal: 5, paddingVertical: 2 }}>
                                <Text>Rejected</Text>
                            </View>}
                        </View>
                    </Row>
                    <Divider style={{ marginVertical: 10 }} />
                    <Row justifyContent='space-between' alignItems='center'>
                        <Text>Comments</Text>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{item.comments}</Text>
                    </Row>
                </Box>}
            </ScrollView>
        </View>
    )
}

export default MutationStatus