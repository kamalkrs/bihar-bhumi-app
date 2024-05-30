import { View, Text, ScrollView, RefreshControl, FlatList, TouchableWithoutFeedback, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Box, Column, Flex, Row } from '../components/Elements'
import Header from '../components/Header'
import { Avatar, Divider, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Chat = () => {

    const [refreshing, setRefreshing] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const navigation = useNavigation();

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    const __singleView = () => {
        return (
            <Pressable
                onPress={() => navigation.navigate('chat-user' as never)}
            >
                <Box>
                    <Row style={{ justifyContent: 'space-between', gap: 10 }}>
                        <Avatar.Image source={require('../assets/user.jpg')} size={50} />
                        <Column style={{ flex: 1, paddingTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 16 }}>Kamal Kumar</Text>
                            <Text>Last sent messages</Text>
                        </Column>
                        <Text>5:32 am</Text>
                    </Row>
                    <Divider style={{ marginVertical: 10 }} />
                </Box>
            </Pressable >
        )
    }

    return (
        <Flex style={{ backgroundColor: '#fff' }}>
            <Header title='Chat' goBack={true} />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                data={users}
                renderItem={({ item }) => (
                    <Box>
                        <Row>

                            <Text>Name</Text>
                        </Row>
                    </Box>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<>
                    {__singleView()}
                </>}
            />
        </Flex>
    )
}

export default Chat