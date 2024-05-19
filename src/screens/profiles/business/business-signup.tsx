import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Column, Flex, Label, Row, TextBox } from '../../../components/Elements'
import { Button, IconButton } from 'react-native-paper'
import { themes } from '../../../utils/themes'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import GlobalStyle from '../../../utils/styles'



const BusinessSignup = () => {
    const [step, setStep] = useState(1);
    const navigation = useNavigation();
    const [userType, setUserType] = useState(0);


    return (
        <Flex>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Box style={{ position: 'relative' }}>
                    <Image source={{ uri: 'https://picsum.photos/300/140' }} alt='Business' style={{ width: '100%', height: 240, resizeMode: 'stretch' }} />
                    <Box style={{ position: 'absolute', left: 10, top: 10 }}>
                        <IconButton onPress={() => {
                            if (step == 1) {
                                navigation.goBack();
                            } else {
                                setStep(step - 1);
                            }
                        }} icon={'arrow-left'} size={20} iconColor='#fff' />
                    </Box>
                </Box>
                <Box style={{ padding: 10 }}>
                    {step == 1 && <Box>
                        <Column style={{ alignItems: 'center', gap: 15, marginBottom: 30 }}>
                            <Text style={{ fontSize: 20, color: themes.colors.theme[800], fontWeight: 'bold' }}>Let's Start</Text>
                            <Box style={{ paddingHorizontal: 15 }}>
                                <Text style={{ textAlign: 'center' }}>Please select your store Category type below to process with the onboarding.</Text>
                            </Box>
                        </Column>
                        <Column style={{ alignItems: 'center', gap: 15, marginBottom: 20 }}>
                            <Text style={{ fontSize: 16, color: themes.colors.theme[800], fontWeight: 'bold' }}>Select Category</Text>
                        </Column>
                        <Box style={{ paddingHorizontal: 30 }}>
                            <TouchableOpacity style={Style.button}>
                                <Text>Plot Broker</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Style.buttonActive}>
                                <Text style={Style.textActive}>Plot Broker</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Style.button}>
                                <Text>Plot Broker</Text>
                            </TouchableOpacity>
                            <Box style={{ height: 50 }}></Box>
                            <Button
                                onPress={() => setStep(2)}
                                contentStyle={{ height: 45 }} style={{ borderRadius: 8 }} mode='contained'>NEXT</Button>
                        </Box>
                    </Box>}
                    { /*  Step 2 Start here  */}
                    {step == 2 && <>
                        <Box style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#444' }}>Business Type</Text>
                        </Box>
                        <View style={GlobalStyle.Select}>
                            <Picker
                                placeholder='Select Type'
                                selectedValue={userType}
                                mode='dropdown'
                                onValueChange={ev => setUserType(ev)}
                            >
                                <Picker.Item label='Select Type' value={0} />
                                <Picker.Item label='Individual' value={1} />
                                <Picker.Item label='Sole Proprietorship' value={2} />
                                <Picker.Item label='Partnership Firm' value={3} />
                                <Picker.Item label='Private Limited Company' value={4} />
                            </Picker>
                        </View>
                        <Box style={{ height: 20 }}></Box>

                        {userType == 1 && <>
                            <Text>Indididual Profile</Text>

                        </>}
                        {userType > 1 && <>
                            <Box style={{ marginBottom: 15 }}>
                                <Label>Business Name</Label>
                                <TextBox placeholder='' />
                            </Box>
                            <Box style={{ marginBottom: 15 }}>
                                <Label>GSTIN/CIN/PAN Number</Label>
                                <TextBox />
                            </Box>
                            <Box style={{ marginBottom: 15 }}>
                                <Label>Mobile Number</Label>
                                <TextBox />
                            </Box>
                            <Box style={{ marginBottom: 15 }}>
                                <Label>Address</Label>
                                <TextBox multiline={true} style={{ height: 100 }} />
                            </Box>
                        </>}

                        {userType > 0 && <Box style={{ marginVertical: 20 }}>
                            <Button
                                onPress={() => navigation.navigate('business-home' as never)}
                                mode='contained' contentStyle={{ height: 45 }}>NEXT</Button>
                        </Box>}
                    </>}
                    {/* Step 3 Moddule */}
                    {step == 3 && <>
                        <Text>Step 3</Text>
                    </>}
                </Box>
            </ScrollView>

        </Flex>
    )
}

const Style = StyleSheet.create({
    button: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 2, borderColor: themes.colors.theme[50], alignItems: 'center' },
    buttonActive: {
        backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10,
        borderWidth: 2, borderColor: themes.colors.theme[600], alignItems: 'center'
    },
    textActive: { color: themes.colors.theme[600] }
})

export default BusinessSignup