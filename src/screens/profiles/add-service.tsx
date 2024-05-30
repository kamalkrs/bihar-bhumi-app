import { View, Text, ScrollView, RefreshControl, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Label, Row, TextBox } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Button, Divider, IconButton, Menu, FAB, Modal, TextInput, Icon } from 'react-native-paper'
import { themes } from '../../utils/themes'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Skeleton from '../../components/Skeleton'
import { apiCall } from '../../utils/dataset'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import Toast from 'react-native-simple-toast'
import { useNavigation, useRoute } from '@react-navigation/native'

type CityType = {
    city: string
}
interface ServiceForm {
    service_name: string,
    details: string,
    locations: CityType[],
    amount: number
}

const AddService = () => {
    const login = useSelector((state: RootState) => state.login);
    const [form, setForm] = useState<ServiceForm>({
        service_name: '',
        details: '',
        locations: [],
        amount: 0
    });
    const [city, setCity] = useState('')
    const [saving, setSaving] = useState(false)
    const routes = useRoute()
    const navigation = useNavigation();
    const { id, action } = routes?.params

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        if (id > 0) {
            const result = await apiCall('get-service', { id: id });
            if (result.success) {
                setForm(result.data);
            }
        }
    }

    const saveForm = async () => {
        if (form.service_name == '' || form.details == '') {
            Toast.show("Fill all the details", 3000);
            return;
        }

        setSaving(true);
        let formData = {
            id: id,
            service_name: form.service_name,
            details: form.details,
            locations: JSON.stringify(form.locations),
            user_id: login.id,
            amount: form.amount
        };
        const result = await apiCall('services', { user_id: login.id, action: action, form: formData });
        if (result.success) {
            Toast.show(result.message, 3000);
        }
        setSaving(false);
        setForm({ service_name: '', details: '', locations: [], amount: 0 });
        navigation.goBack();
    }

    const filterCity = (city: string) => {
        let nr = form.locations.filter(item => item.city != city);
        setForm({ ...form, locations: nr });
    }

    return (
        <Flex>
            <Header title={action == 'add' ? 'Add Service' : 'Edit Service'} goBack />
            <ScrollView>
                <Box style={Style.modalContainer}>
                    {/* <Label>Upload Service Photo</Label>
                    <Box style={{ backgroundColor: '#eee', height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: themes.colors.primary, borderRadius: 4 }}>
                        <IconButton
                            onPress={handleUploadClick}
                            icon={'file-upload-outline'} size={30} iconColor='#888' />
                    </Box> */}
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Service name</Label>
                        <TextBox
                            value={form.service_name}
                            onChangeText={ev => setForm({ ...form, service_name: ev })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Details</Label>
                        <TextBox multiline style={{ height: 100 }}
                            value={form.details}
                            onChangeText={ev => setForm({ ...form, details: ev })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Service Charge</Label>
                        <TextBox
                            value={form.amount == 0 ? '' : form.amount + ''}
                            keyboardType='number-pad'
                            maxLength={5}
                            onChangeText={ev => setForm({ ...form, amount: parseInt(ev) })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Service Area</Label>
                        <Row style={{ gap: 10, alignItems: 'center' }}>
                            <TextBox style={{ flex: 1 }}
                                value={city}
                                onChangeText={ev => setCity(ev)}
                            />
                            <Button
                                onPress={() => {
                                    if (city != '') {
                                        let prev = form.locations;
                                        prev.push({ city });
                                        setForm({ ...form, locations: prev })
                                        setCity('');
                                    }
                                }}
                                contentStyle={{ height: 45 }}
                                mode='contained'>Add</Button>
                        </Row>
                    </Box>
                    <Box style={{ backgroundColor: '#fff', padding: 12, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Selected Areas</Text>
                        {form.locations.map((item, sl) => (
                            <Box key={item.city + '-' + sl}>
                                <Row style={{ paddingVertical: 8, justifyContent: 'space-between' }}>
                                    <Text>{item.city}</Text>
                                    <TouchableOpacity
                                        onPress={() => filterCity(item.city)}
                                    >
                                        <Icon source={'close'} size={20} color='#f00' />
                                    </TouchableOpacity>
                                </Row>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                    <Button mode='contained'
                        onPress={saveForm}
                        loading={saving}
                        theme={{ roundness: 0 }}
                        contentStyle={{ height: 45 }}>SAVE</Button>
                </Box>
            </ScrollView>

        </Flex>
    )
}

const Style = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        paddingStart: 15
    },
    heading: {
        fontSize: 16,
        color: '#222', fontWeight: 'bold', marginBottom: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        backgroundColor: themes.colors.primary
    },
    modal: {
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    modalContainer: {
        padding: 12
    }
})


export default AddService