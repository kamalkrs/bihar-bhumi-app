import { View, Text, useWindowDimensions, ScrollView, StyleSheet, TextInput, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Box, Column, Flex, Row, TextBox } from '../../components/Elements'
import AutoHeightImage from 'react-native-auto-height-image'
import { themes } from '../../utils/themes'
import { Button, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Bhumilogin = () => {
    const window = useWindowDimensions();
    const [password, setPassword] = useState({ a: '', b: '', c: '', d: '' })
    const navigation = useNavigation()
    const [checking, setChecking] = useState(false)

    const ref_a = useRef<TextInput>(null)
    const ref_b = useRef<TextInput>(null)
    const ref_c = useRef<TextInput>(null)
    const ref_d = useRef<TextInput>(null)

    const handleLogin = () => {
        setChecking(true);
        setTimeout(() => {
            navigation.navigate('bhumi-locker' as never);
            setChecking(false)
        }, 1000)
    }

    return (
        <Flex style={{ backgroundColor: '#fff' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Box style={{ position: 'relative' }}>
                    <Image source={require('../../assets/locker.png')} alt='Locker' style={{ width: window.width, height: 220, resizeMode: 'stretch' }} />
                    <Box style={{ position: 'absolute', left: 5, top: 5 }}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={'arrow-left'} size={30} iconColor='#fff' />
                    </Box>
                </Box>
                <Box style={{ paddingHorizontal: 10, paddingTop: 30 }}>
                    <Column style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={Style.heading}>Login with MPIN</Text>
                        <Text style={Style.subHeading}>Please enter 4 digit MPIN</Text>
                    </Column>
                    <Row style={{ justifyContent: 'space-around', gap: 5, marginBottom: 20, paddingHorizontal: 50 }}>
                        <TextBox mode="flat"
                            ref={ref_a}
                            theme={{ roundness: 0 }}
                            style={Style.passTextbox}
                            maxLength={1}
                            outlineStyle={{ borderWidth: 0, borderBottomColor: themes.colors?.primary, borderBottomWidth: 1 }}
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            value={password.a}
                            onChangeText={ev => {
                                setPassword({ ...password, a: ev })
                                if (ev != '') {
                                    ref_b.current?.focus();
                                }
                            }}

                        />
                        <TextBox mode="flat"
                            secureTextEntry={true}
                            ref={ref_b}
                            theme={{ roundness: 0 }}
                            style={Style.passTextbox}
                            maxLength={1}
                            outlineStyle={{ borderWidth: 0, borderBottomColor: themes.colors?.primary, borderBottomWidth: 1 }}
                            keyboardType="number-pad"
                            value={password.b}
                            onChangeText={ev => {
                                setPassword({ ...password, b: ev })
                                if (ev != '') {
                                    ref_c.current?.focus();
                                } else if (ev == '') {
                                    ref_a.current?.focus();
                                }
                            }}
                        />
                        <TextBox mode="flat"
                            secureTextEntry={true}
                            ref={ref_c}
                            theme={{ roundness: 0 }}
                            style={Style.passTextbox}
                            maxLength={1}
                            outlineStyle={{ borderWidth: 0, borderBottomColor: themes.colors?.primary, borderBottomWidth: 1 }}
                            keyboardType="number-pad"
                            value={password.c}
                            onChangeText={ev => {
                                setPassword({ ...password, c: ev })
                                if (ev != '') {
                                    ref_d.current?.focus();
                                } else if (ev == '') {
                                    ref_b.current?.focus();
                                }
                            }}
                        />
                        <TextBox mode="flat"
                            secureTextEntry={true}
                            ref={ref_d}
                            theme={{ roundness: 0 }}
                            style={Style.passTextbox}
                            maxLength={1}
                            outlineStyle={{ borderWidth: 0, borderBottomColor: themes.colors?.primary, borderBottomWidth: 1 }}
                            keyboardType="number-pad"
                            value={password.d}
                            onChangeText={ev => {
                                setPassword({ ...password, d: ev })
                                if (ev == '') {
                                    ref_c.current?.focus();
                                }
                            }}
                        />
                    </Row>
                    <Row style={{ justifyContent: 'center', marginVertical: 15 }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#ddd', borderRadius: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000' }}>OR</Text>
                        </View>
                    </Row>
                    <Row style={{ paddingHorizontal: 50, justifyContent: 'center', gap: 20, alignItems: 'center', marginBottom: 50 }}>
                        <Text style={{ color: '#222', fontSize: 15 }}>Login with OTP</Text>
                        <Text style={{ color: '#222', fontSize: 15 }}>Forgot MPIN</Text>
                    </Row>
                    <Row style={{ justifyContent: 'center', marginBottom: 20 }}>
                        <Image source={require('../../assets/logo.png')} alt='Logo' style={{ width: 120, height: 65, resizeMode: 'cover' }} />
                    </Row>
                    <Column style={{ alignItems: 'center', paddingHorizontal: 40, gap: 5 }}>
                        <Text>Copyright &copy; 2024. BIHAR BHUMI SEVA</Text>
                        <Text>Version 1.0</Text>
                    </Column>
                </Box>
            </ScrollView>
            <Button mode='contained'
                loading={checking}
                onPress={handleLogin}
                style={{ borderRadius: 0 }} contentStyle={{ height: 45 }}>CONTINUE</Button>
        </Flex>
    )
}

const Style = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111'
    },
    subHeading: {
        fontSize: 16
    },
    passTextbox: {
        textAlign: 'center',
        flex: 1,
        borderWidth: 0,
        borderRadius: 0
    }
})

export default Bhumilogin