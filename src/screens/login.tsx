import { View, Text, Image, ScrollView, TextInput, StyleSheet, KeyboardEvent, KeyboardEventListener } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, useTheme } from 'react-native-paper'
import { Box, Column, Flex, Row, TextBox } from '../components/Elements'
import Style from '../utils/styles'
import { apiCall } from '../utils/dataset'
import { useDispatch } from 'react-redux'
import { setLogin } from '../stores/userSlices'
import Auth from '../utils/auth'
import { useNavigation } from '@react-navigation/native'
import { themes } from '../utils/themes'
import Toast from 'react-native-simple-toast'

type IScreenType = "login" | "password"

const Login = () => {

    const [loading, setLoading] = useState(false)
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [screen, setScreen] = useState<IScreenType>('login')
    const [mobileError, setMobileError] = useState<string>('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState({ a: '', b: '', c: '', d: '' })
    const [second, setSecond] = useState(0)
    const timeInSeconds = 59;

    const ref_1 = useRef<TextInput>(null);

    const ref_a = useRef<TextInput>(null);
    const ref_b = useRef<TextInput>(null);
    const ref_c = useRef<TextInput>(null);
    const ref_d = useRef<TextInput>(null);

    useEffect(() => {
        ref_1.current?.focus();
    }, [])

    const actionLogin = async () => {
        setMobileError('');
        if (mobile == '') {
            setMobileError("Enter Mobile Number");
            return;
        }
        if (mobile.length != 10) {
            setMobileError("Enter valid mobile number");
            return;
        }
        const result = await apiCall('login', { mobile });
        if (result.success) {
            Toast.show(result.message, 3000);
            setScreen('password');
            ref_a.current?.focus();
            startTimer();
        } else {
            setMobileError(result.message);
        }
    }

    const startTimer = () => {
        var index = 0;
        var timer = setInterval(() => {
            index++;
            setSecond(index)
            if (index >= timeInSeconds) {
                clearInterval(timer)
                setSecond(0)
                index = 0;
            }
        }, 1000)
    }

    const resendPass = () => {
        apiCall("login", { mobile: mobile })
            .then(us => {
                if (us.success) {
                    startTimer();
                }
                Toast.show(us.message, 3000);
            });
    }

    const actionValidate = () => {
        let userotp = password.a + '' + password.b + '' + password.c + '' + password.d;
        if (userotp.length != 4) {
            Toast.show("Validation Error", 3000);
            return;
        }
        setLoading(true);
        apiCall("otp-verification", { mobile: mobile, otp: userotp })
            .then(resp => {
                Toast.show(resp.message, 3000);
                if (resp.success) {
                    dispatch(setLogin(resp.data));
                    Auth.setLogin(resp.data);
                }
            }).finally(() => setLoading(false));

    };

    if (screen == 'login') {
        return (
            <Flex style={{ justifyContent: 'center', backgroundColor: '#fff' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={Style.ScrollView}>
                    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
                        <Row style={{ justifyContent: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/logo.png')} style={{ width: 120, height: 80, resizeMode: 'contain' }} />
                        </Row>
                        <Box style={{ marginBottom: 12 }}>
                            <Box style={{ position: 'relative' }}>
                                <TextBox
                                    ref={ref_1}
                                    placeholder='Enter Mobile number'
                                    maxLength={10}
                                    value={mobile}
                                    onChangeText={ev => {
                                        setMobile(ev)
                                    }}
                                    style={{ paddingLeft: 60 }}
                                    outlineStyle={{ borderWidth: 1 }}
                                    keyboardType="phone-pad"
                                />
                                <View style={{ position: 'absolute', top: 1, left: 1, bottom: 1, width: 60, backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: themes.colors?.primary, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>+91</Text>
                                </View>
                            </Box>
                            {mobileError.length > 0 && <Text style={{ color: 'red' }}>{mobileError}</Text>}
                        </Box>
                        <Row style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Text>Don't worry, your details is safe with us. </Text>
                            <Icon source={'shield-check'} size={20} color='#dbad3b' />
                        </Row>
                    </View>

                </ScrollView>

                <View style={{ marginBottom: 20 }}>
                    <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                        <Text>Don't have an account? </Text>
                        <Text onPress={() => navigation.navigate('signup' as never)} style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
                    </Row>
                </View>
                <Button
                    onPress={actionLogin}
                    style={{ height: 40 }}
                    mode='contained'>NEXT</Button>
            </Flex>
        )
    } else if (screen == 'password') {
        return (
            <Flex style={{ justifyContent: 'center', backgroundColor: '#fff' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[Style.ScrollView]}>
                    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
                        <Row style={{ justifyContent: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/logo.png')} style={{ width: 120, height: 80, resizeMode: 'contain' }} />
                        </Row>
                        <Column style={{ alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                You Will receive an OTP (One Time Password) on your mobile number.
                            </Text>
                            <Row style={{ gap: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>+91 {mobile}</Text>
                                <Text style={{ color: themes.colors?.primary, fontSize: 16 }}>Not You?</Text>
                            </Row>
                        </Column>
                        <Row style={{ justifyContent: 'space-around', gap: 5, marginBottom: 20 }}>
                            <TextBox mode="flat"
                                ref={ref_a}
                                theme={{ roundness: 0 }}
                                style={MyStyle.passTextbox}
                                maxLength={1}
                                outlineStyle={{ borderWidth: 0, borderBottomColor: themes.colors?.primary, borderBottomWidth: 1 }}
                                keyboardType="number-pad"
                                value={password.a}
                                onChangeText={ev => {
                                    setPassword({ ...password, a: ev })
                                    if (ev != '') {
                                        ref_b.current?.focus();
                                    }
                                }}

                            />
                            <TextBox mode="flat"
                                ref={ref_b}
                                theme={{ roundness: 0 }}
                                style={MyStyle.passTextbox}
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
                                ref={ref_c}
                                theme={{ roundness: 0 }}
                                style={MyStyle.passTextbox}
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
                                ref={ref_d}
                                theme={{ roundness: 0 }}
                                style={MyStyle.passTextbox}
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
                                onSubmitEditing={actionValidate}
                            />
                        </Row>
                        <Row style={{ justifyContent: 'center', gap: 10 }}>
                            <Text style={{ fontSize: 16 }}>Didn't receive code?</Text>
                            {second > 0 ? <Text> Wait {timeInSeconds - second} Seconds</Text> : <Text onPress={resendPass} style={{ textDecorationLine: 'underline', color: theme.colors.primary }} >Resend OTP</Text>}
                        </Row>
                    </View>
                </ScrollView>

                <View style={{ marginBottom: 20 }}>
                    <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                        <Text>Don't have an account? </Text>
                        <Text
                            onPress={() => navigation.navigate('signup' as never)}
                            style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
                    </Row>
                </View>
                <Row style={{ justifyContent: 'space-between', backgroundColor: themes.colors?.primary }}>
                    <Button
                        onPress={() => setScreen("login")}
                        style={{ height: 40, flex: 1 }}
                        mode='contained'>PREVIOUS</Button>
                    <Button
                        loading={loading}
                        style={{ height: 40, flex: 1 }}
                        onPress={actionValidate}
                        mode='contained'>NEXT</Button>
                </Row>
            </Flex>
        )
    }
}

const MyStyle = StyleSheet.create({
    passTextbox: {
        textAlign: 'center',
        flex: 1,
        borderWidth: 0,
        borderRadius: 0
    }
})

export default Login