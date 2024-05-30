import { Text, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react'
import { Box, Column, Flex, Row, TextBox } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Button, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import { pick, types } from 'react-native-document-picker'
import Toast from 'react-native-simple-toast'
import { uploadFiles } from '../../utils/dataset'
import { Appconfig } from '../../config/appconfig'

const ApplyMutations = () => {
    const [saving, setSaving] = useState(false)
    const login = useSelector((state: RootState) => state.login);
    const [form, setForm] = useState({
        user_id: login.id,
        deed_no: '',
        email_id: '',
        whatsapp: ''
    })
    const [selectedFile, setSelectFile] = useState({ name: '', uri: '' });
    const navigation = useNavigation();

    const handleButton = async () => {
        try {
            const [result] = await pick({ type: types.pdf, mode: 'open' });
            if (result?.name != null) {
                setSelectFile({ name: result.name, uri: result.uri });
            }
        } catch (err) {
        }
    }

    const handleFormSubmit = async () => {
        if (form.deed_no == '') {
            Toast.show('Please enter Deed Number', 3000);
            return;
        }
        if (selectedFile.name == '') {
            Toast.show('Please select Deed File (PDF/Doc)', 3000);
            return;
        }
        if (form.whatsapp != '' && form.whatsapp.length != 10) {
            Toast.show('Please enter valid Whatsapp Number', 3000);
            return;
        }
        setSaving(true);

        const formData = new FormData();
        formData.append('user_id', form.user_id);
        formData.append('deed_no', form.deed_no);
        formData.append('email_id', form.email_id);
        formData.append('whatsapp', form.whatsapp);
        formData.append('pdf', { name: 'mutation.pdf', type: 'application/pdf', uri: decodeURI(selectedFile.uri) })

        const result = await uploadFiles('add-mutations', formData);

        Toast.show(result.message, 3000);
        if (result.success) {
            navigation.goBack();
        }
        setSaving(false);
    }

    return (
        <Flex>
            <Header goBack title='Apply Online Mutation Status' />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
            >
                <Box style={{ marginBottom: 10 }}>
                    <TextBox
                        value={form.deed_no}
                        onChangeText={ev => setForm({ ...form, deed_no: ev })}
                        maxLength={100}
                        placeholder='Enter Deed Number' />
                </Box>
                <Text style={{ fontSize: 13, textAlign: 'center', marginBottom: 10 }}>Scan your Deed Registry paper and create a PDF file and upload it. Get mutation receipt sent to your email & whatsapp with in 72 Hours.</Text>
                <Box style={{ marginBottom: 10 }}>
                    <TextBox
                        value={form.email_id}
                        onChangeText={ev => setForm({ ...form, email_id: ev })}
                        maxLength={100}
                        keyboardType='email-address'
                        placeholder='Add E-Mail Address' />
                </Box>
                <Box style={{ marginBottom: 10 }}>
                    <TextBox
                        value={form.whatsapp}
                        onChangeText={ev => setForm({ ...form, whatsapp: ev })}
                        maxLength={10}
                        keyboardType='number-pad'
                        placeholder='Add WhatsApp Number' />
                </Box>
                <Row style={{ alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Icon source={'file-upload-outline'} size={20} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upload Files</Text>
                </Row>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'green', borderRadius: 8, gap: 10, backgroundColor: '#F0FCF2', marginBottom: 10, paddingVertical: 20 }}>
                    <Text style={{ color: 'green' }}>Please upload your files</Text>
                    <Icon source={'file-upload-outline'} size={30} color='green' />
                    <Button
                        onPress={handleButton}
                        mode='contained-tonal'>Choose File</Button>
                    {selectedFile.name.length > 0 && <Text>Selectd File: - {selectedFile.name}</Text>}
                </Box>
                <Box style={{ marginBottom: 15 }}>
                    <Text>Only PDF file less than 500 kb</Text>
                </Box>
                <Column style={{ gap: 10 }}>
                    <Button mode='contained'
                        loading={saving}
                        disabled={saving}
                        onPress={handleFormSubmit}
                        contentStyle={{ height: 45 }}>Submit</Button>
                    <Button mode='contained'
                        onPress={() => navigation.navigate('mutation-status' as never)}
                        contentStyle={{ height: 45 }}>Check Mutation Status</Button>
                    <Button mode='contained'
                        onPress={() => Linking.openURL(Appconfig.WHATSAPP_URL)}
                        contentStyle={{ height: 45 }}>Apply via WhatsApp</Button>
                </Column>
            </ScrollView>
        </Flex>
    )
}

export default ApplyMutations