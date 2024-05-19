import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Column, Flex, Row, TextBox } from '../../../components/Elements'
import Header from '../../../components/Header'
import { Avatar, Button, Icon, IconButton } from 'react-native-paper'
import { themes } from '../../../utils/themes'
import { useNavigation } from '@react-navigation/native'

type TabType = "about" | "contact" | "post"

const BusinessHome = () => {
    const [tab, setTab] = useState<TabType>('about')
    const navigation = useNavigation()
    return (
        <Flex>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Box style={{ position: 'relative' }}>
                    <Image source={{ uri: 'https://picsum.photos/300/140' }} alt='Business' style={{ width: '100%', height: 140, resizeMode: 'stretch' }} />
                    <Box style={{ position: 'absolute', left: 10, top: 10 }}>
                        <IconButton onPress={() => navigation.goBack()} icon={'arrow-left'} size={20} iconColor='#fff' />
                    </Box>
                </Box>
                <Box style={{ padding: 10 }}>
                    <Row style={{ alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <Box style={{ borderWidth: 5, borderColor: '#fff', marginTop: -50, borderRadius: 100, elevation: 5 }}>
                            <Avatar.Image source={require('../../../assets/user.jpg')} size={100} />
                        </Box>
                        <Column style={{ gap: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Deep Sheetal Private Limited</Text>
                            <Row style={{ gap: 10 }}>
                                <Image source={require('../../../assets/facebook.png')} style={Style.iconSocial} />
                                <Image source={require('../../../assets/twitter.png')} style={Style.iconSocial} />
                                <Image source={require('../../../assets/youtube.png')} style={Style.iconSocial} />
                                <Image source={require('../../../assets/instagram.png')} style={Style.iconSocial} />
                                <Image source={require('../../../assets/snapchat.png')} style={Style.iconSocial} />
                            </Row>
                        </Column>
                    </Row>
                    <Row style={{ marginBottom: 15, justifyContent: 'space-between', gap: 4 }}>
                        <Button mode={tab == 'about' ? 'contained' : 'outlined'}
                            onPress={() => setTab('about')}
                            style={tab == 'about' ? Style.buttonActive : Style.button}>About us</Button>
                        <Button mode={tab == 'contact' ? 'contained' : 'outlined'}
                            onPress={() => setTab('contact')}
                            style={tab == 'contact' ? Style.buttonActive : Style.button}>Contact us</Button>
                        <Button mode={tab == 'post' ? 'contained' : 'outlined'}
                            onPress={() => setTab('post')}
                            style={tab == 'post' ? Style.buttonActive : Style.button}>Posts</Button>
                    </Row>
                    {tab == 'about' && <Box>
                        <Box style={{ borderWidth: 1, borderColor: themes.colors.primary, borderRadius: 10, padding: 12, backgroundColor: '#fff', marginBottom: 20 }}>
                            <Row style={{ justifyContent: 'flex-end', }}>
                                <Icon source={'pencil-outline'} size={20} color={themes.colors.primary} />
                            </Row>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Box>
                        <Row style={{ justifyContent: 'center' }}>
                            <Button mode='contained'>UPDATE</Button>
                        </Row>
                    </Box>}
                    {tab == 'contact' && <Box>
                        <Row style={{ gap: 10, alignItems: 'center' }}>
                            <Icon source={'phone-outline'} size={30} />
                            <Column style={{ gap: 5 }}>
                                <Text style={Style.labelText}>+91 93345 28120</Text>
                                <Text style={Style.labelText}>+91 99537 09380</Text>
                            </Column>
                        </Row>
                        <Row style={{ gap: 10, alignItems: 'center', marginVertical: 12 }}>
                            <Icon source={'email-outline'} size={30} />
                            <Column style={{ gap: 5 }}>
                                <Text style={Style.labelText}>support@abcd.in</Text>
                                <Text style={Style.labelText}>info@abcd.in</Text>
                            </Column>
                        </Row>
                        <Row style={{ gap: 10 }}>
                            <Icon source={'map-marker-outline'} size={30} />
                            <Column style={{ flex: 1, gap: 10 }}>
                                <Text style={Style.labelText}>612/A, Jagriti Nagar, Ranchi - JH</Text>
                                <Box style={{ backgroundColor: '#fff', padding: 2, borderRadius: 4 }}>
                                    <Image source={require('../../../assets/map.png')} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
                                </Box>
                            </Column>
                        </Row>
                    </Box>}
                    {tab == 'post' && <Box>
                        <Row style={{ gap: 10, backgroundColor: '#fff', padding: 5, borderRadius: 8, marginBottom: 8 }}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 8 }} />
                            <Box>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Post title comes here</Text>
                                    <Text>2024-02-12 7:30 am</Text>
                                </Column>
                            </Box>
                        </Row>
                        <Row style={{ gap: 10, backgroundColor: '#fff', padding: 5, borderRadius: 8, marginBottom: 8 }}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 8 }} />
                            <Box>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Post title comes here</Text>
                                    <Text>2024-02-12 7:30 am</Text>
                                </Column>
                            </Box>
                        </Row>
                        <Row style={{ gap: 10, backgroundColor: '#fff', padding: 5, borderRadius: 8, marginBottom: 8 }}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 8 }} />
                            <Box>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Post title comes here</Text>
                                    <Text>2024-02-12 7:30 am</Text>
                                </Column>
                            </Box>
                        </Row>
                        <Row style={{ gap: 10, backgroundColor: '#fff', padding: 5, borderRadius: 8, marginBottom: 8 }}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 8 }} />
                            <Box>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Post title comes here</Text>
                                    <Text>2024-02-12 7:30 am</Text>
                                </Column>
                            </Box>
                        </Row>
                        <Row style={{ gap: 10, backgroundColor: '#fff', padding: 5, borderRadius: 8, marginBottom: 8 }}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 8 }} />
                            <Box>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Post title comes here</Text>
                                    <Text>2024-02-12 7:30 am</Text>
                                </Column>
                            </Box>
                        </Row>
                    </Box>}
                </Box>
            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    iconSocial: {
        width: 20,
        height: 20,
        resizeMode: 'cover'
    },
    buttonActive: { borderColor: themes.colors.primary, flex: 1 },
    button: { borderColor: themes.colors.primary, flex: 1, backgroundColor: '#fff' },
    labelText: {
        fontSize: 15,
        color: '#222'
    }
})

export default BusinessHome