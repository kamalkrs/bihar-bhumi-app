import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Column, Row } from './Elements'
import { Button, TextInput } from 'react-native-paper'
import toast from 'react-native-simple-toast'
import { apiCall } from '../utils/dataset'

const OTPInput = ({ user_id, onClick }: { user_id: number, onClick?: () => {} }) => {
    const [otpcode, setOptcode] = useState('')
    const [loading, setLoading] = useState(false)

    const verifyOTP = async () => {
        setLoading(true)
        const resp = await apiCall('verify-otp', { user_id: user_id, otp: otpcode });
        if (resp?.message) {
            toast.show(resp?.message, 3000);
        }
        setLoading(false)
        // onClick();
    }
    return (
        <Column style={{ columnGap: 4, padding: 4 }}>
            <TextInput
                onChangeText={ev => setOptcode(ev)}
                placeholder='xxxx' style={{ marginBottom: 10 }} />
            <Button
                mode='outlined'
                disabled={otpcode.length < 4 || loading} onPress={verifyOTP}>VERIFY</Button>
        </Column>
    )
}

export default OTPInput