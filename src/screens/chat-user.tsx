import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from '../components/Elements'
import Header from '../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatUser = () => {

    const [refreshing, setRefreshing] = useState(false)
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages: any[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <Flex>
            <Header title='Kamal Kumar' subTitle='Last active today 5:00 am' goBack={true} />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </Flex>
    )
}

export default ChatUser