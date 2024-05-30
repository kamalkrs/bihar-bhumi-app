import { View, Text, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Label, Row, TextBox } from '../../components/Elements'
import { Button, IconButton } from 'react-native-paper'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import Toast from 'react-native-simple-toast'
import { themes } from '../../utils/themes'
import { apiCall, uploadFiles } from '../../utils/dataset'
import { setLogin } from '../../stores/userSlices'
import ImagePicker from 'react-native-image-crop-picker'
import Auth from '../../utils/auth'

const EditProfile = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [saving, setSaving] = useState(false);
    const user = useSelector((state: RootState) => state.login)
    const [form, setForm] = useState({ ...user, city: '', image: '' })
    const [isPhotoChanged, setPhotoChanged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await apiCall('userinfo', { user_id: user.id });
        if (result.success) {
            setForm(result.data);
            dispatch(setLogin(result.data));
        }
    }

    const handleUpdate = async () => {
        if (form.first_name == '' || form.last_name == '') {
            Toast.show('Fill all details', 3000);
            return;
        }

        if (isPhotoChanged) {
            const formPost = new FormData();
            formPost.append('user_id', user.id + '');
            formPost.append('photo', {
                uri: form.image,
                name: 'photo.jpg',
                type: 'image/jpeg'
            });
            const resp = await uploadFiles('profile-photo', formPost);
            if (resp.success) {
                Toast.show(resp.message, 3000);
            }
        }
        setSaving(true);
        const formData = {
            first_name: form.first_name,
            last_name: form.last_name,
            whatsapp: form.whatsapp,
            city: form.city,
            address: form.address
        }
        const result = await apiCall('update-details', { user_id: user.id, form: formData });
        if (result.success) {
            dispatch(setLogin(result.data))
            Auth.setLogin(result.data)
        }
        Toast.show(result.message, 3000);
        setSaving(false)
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }

    const handleCameraClick = async () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            width: 100,
            height: 100,
            useFrontCamera: true,
            cropping: true,
            forceJpg: true,
            cropperCircleOverlay: true
        }).then(image => {
            setForm({ ...form, image: image.path })
            setPhotoChanged(true);
        })
    }

    return (
        <Flex>
            <Header goBack title='Edit Profile' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Box style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10, alignItems: 'center' }}>
                        {form.image == '' && <Row>
                            <Box style={{ width: 120, height: 120, borderWidth: 1, borderColor: themes.colors.theme[600], backgroundColor: '#fefefe', borderRadius: 120, justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton
                                    onPress={handleCameraClick}
                                    icon={'camera'} size={24} iconColor={themes.colors.theme[600]} />
                            </Box>
                        </Row>}
                        {form.image != '' && <Row style={{ gap: 10, alignItems: 'center' }}>
                            <Box style={{ width: 120, height: 120, borderWidth: 1, borderColor: themes.colors.theme[600], backgroundColor: '#fefefe', borderRadius: 120, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: form.image }} style={{ width: 110, height: 110, resizeMode: 'cover', borderRadius: 120 }} />
                            </Box>
                            <Column style={{ gap: 10 }}>
                                <Button onPress={handleCameraClick} mode='contained'>Change</Button>
                                <Button
                                    onPress={() => setForm({ ...form, image: '' })}
                                    mode='contained' buttonColor='#f00'>Remove</Button>
                            </Column>
                        </Row>}
                    </Row>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>First name</Label>
                        <TextBox
                            onChangeText={ev => setForm({ ...form, first_name: ev })}
                            value={form.first_name} />
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>Last name</Label>
                        <TextBox value={form.last_name}
                            onChangeText={ev => setForm({ ...form, last_name: ev })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>WhatsApp Number</Label>
                        <TextBox value={form.whatsapp}
                            maxLength={10}
                            keyboardType='number-pad'
                            onChangeText={ev => setForm({ ...form, whatsapp: ev })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>City</Label>
                        <TextBox
                            value={form.city}
                            onChangeText={ev => setForm({ ...form, city: ev })}
                        />
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>Address</Label>
                        <TextBox multiline value={form.address}
                            onChangeText={ev => setForm({ ...form, address: ev })}
                            style={{ height: 100 }} />
                    </Box>

                </Box>
            </ScrollView>
            <Button
                contentStyle={{ height: 50 }}
                onPress={handleUpdate}
                loading={saving}
                mode='contained' theme={{ roundness: 0 }}>UPDATE</Button>
        </Flex>
    )
}

export default EditProfile