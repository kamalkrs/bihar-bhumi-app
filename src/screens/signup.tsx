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

type IScreenType = "signup" | "password"

const Signup = () => {

    const [loading, setLoading] = useState(false)
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [screen, setScreen] = useState<IScreenType>('signup')
    const [mobileError, setMobileError] = useState<string>('')
    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [password, setPassword] = useState({ a: '', b: '', c: '', d: '' })
    const [second, setSecond] = useState(0)
    const timeInSeconds = 59;

    const ref_1 = useRef<TextInput>(null);
    const ref_2 = useRef<TextInput>(null);

    const ref_a = useRef<TextInput>(null);
    const ref_b = useRef<TextInput>(null);
    const ref_c = useRef<TextInput>(null);
    const ref_d = useRef<TextInput>(null);

    useEffect(() => {
        ref_1.current?.focus();
    }, [])

    const actionSignup = async () => {
        setMobileError('');
        setNameError('');
        if (name == '') {
            setNameError("Enter Fullname");
            return;
        }
        if (mobile == '') {
            setMobileError("Enter Mobile Number");
            return;
        }

        if (mobile.length != 10) {
            setMobileError("Enter valid mobile number");
            return;
        }
        const result = await apiCall('signup', { name, mobile });
        if (result.success) {
            Toast.show(result.message, 3000);
            setScreen("password");
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
        apiCall("resend-otp", { mobile: mobile })
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

    if (screen == 'signup') {
        return (
            <Flex style={{ justifyContent: 'center', backgroundColor: '#fff' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={Style.ScrollView}>
                    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
                        <Row style={{ justifyContent: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/logo.png')} style={{ width: 120, height: 80, resizeMode: 'contain' }} />
                        </Row>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 12, color: '#222', fontWeight: 'bold' }}>Create an Account</Text>
                        <Box style={{ marginBottom: 12 }}>
                            <Box style={{ position: 'relative' }}>
                                <TextBox
                                    ref={ref_1}
                                    placeholder='Your Fullname'
                                    maxLength={60}
                                    value={name}
                                    onChangeText={ev => {
                                        setName(ev)
                                    }}
                                    style={{ paddingLeft: 60 }}
                                    outlineStyle={{ borderWidth: 1 }}
                                    onSubmitEditing={() => ref_2.current?.focus()}
                                />
                                <View style={{ position: 'absolute', top: 1, left: 1, bottom: 1, width: 60, backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: themes.colors?.primary, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                    <Icon source={'account-outline'} size={24} color='#666' />
                                </View>
                            </Box>
                            {nameError.length > 0 && <Text style={{ color: 'red' }}>{nameError}</Text>}
                        </Box>
                        <Box style={{ marginBottom: 12 }}>
                            <Box style={{ position: 'relative' }}>
                                <TextBox
                                    ref={ref_2}
                                    placeholder='Enter Mobile number'
                                    maxLength={10}
                                    value={mobile}
                                    onChangeText={ev => {
                                        setMobile(ev)
                                    }}
                                    style={{ paddingLeft: 60 }}
                                    outlineStyle={{ borderWidth: 1 }}
                                    keyboardType="phone-pad"
                                    onSubmitEditing={actionSignup}
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
                <Row style={{ justifyContent: 'space-between', backgroundColor: themes.colors?.primary }}>
                    <Button
                        onPress={() => navigation.navigate("login" as never)}
                        style={{ height: 40, flex: 1 }}
                        mode='contained'>PREVIOUS</Button>
                    <Button
                        loading={loading}
                        style={{ height: 40, flex: 1 }}
                        onPress={actionSignup}
                        mode='contained'>NEXT</Button>
                </Row>
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
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Dear {name}</Text>
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
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>
                            <Text style={{ fontSize: 16 }}>Didn't receive code?</Text>
                            {second > 0 ? <Text> Wait {timeInSeconds - second} Seconds</Text> : <Text onPress={resendPass} >Resend OTP</Text>}</Text>

                    </View>
                </ScrollView>

                <View style={{ marginBottom: 20 }}>
                    <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                        <Text>Already have an account? </Text>
                        <Text
                            onPress={() => navigation.navigate('login' as never)}
                            style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                    </Row>
                </View>
                <Row style={{ justifyContent: 'space-between', backgroundColor: themes.colors?.primary }}>
                    <Button
                        onPress={() => setScreen("signup")}
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

export default Signup