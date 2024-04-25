import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, useTheme } from 'react-native-paper'
import { Box, Flex, AIInput, Row } from '../components/Elements'
import Style from '../utils/styles'
import toast from 'react-native-simple-toast'
import { apiCall } from '../utils/dataset'
import { useDispatch } from 'react-redux'
import { setLogin } from '../stores/userSlices'
import Auth from '../utils/auth'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [form, setForm] = useState({ username: '9334628120', password: '1234' })
    const [loading, setLoading] = useState<boolean>(false)
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const doLogin = async () => {
        if (form.username.trim() == '' || form.username.trim() == '') {
            toast.show('Enter Username and Password', 3000);
            return;
        }
        setLoading(true);
        const resp = await apiCall('login', form);
        setLoading(false)
        if (resp.success) {
            Auth.setLogin(resp.data).then(() => {
                dispatch(setLogin(resp.data));
                navigation.navigate('/' as never)
            });
            toast.show(resp.message, 3000)
        } else {
            toast.show(resp.message, 3000)
        }
    }
    return (
        <Flex style={{ justifyContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.ScrollView}>
                <View style={{ paddingTop: 200, paddingHorizontal: 20 }}>
                    <Row style={{ justifyContent: 'center', marginBottom: 40 }}>
                        <Image source={require('../assets/logo.png')} style={{ width: 120, height: 80, resizeMode: 'contain' }} />
                    </Row>
                    <Box style={{ marginBottom: 12 }}>
                        <AIInput
                            value={form.username}
                            onChangeText={ev => setForm({ ...form, username: ev })}
                            maxLength={10}
                            keyboardType='number-pad'
                            placeholder='Mobile number' />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <AIInput placeholder='Password'
                            value={form.password}
                            onChangeText={ev => setForm({ ...form, password: ev })}
                            secureTextEntry={true}
                        />
                    </Box>
                    <Button
                        loading={loading}
                        onPress={doLogin}
                        style={Style.Button}
                        contentStyle={{ height: 42 }}
                        mode='contained'>{loading ? 'Please wait...' : 'Log In'}</Button>
                    <Row style={{ justifyContent: 'center', marginTop: 20 }}>
                        <Text>Forget Password?</Text>
                    </Row>
                </View>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
                <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                    <Text>Don't have an account? </Text>
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
                </Row>
            </View>
        </Flex >
    )
}

export default Login