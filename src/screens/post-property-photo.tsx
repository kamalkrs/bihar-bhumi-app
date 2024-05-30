import { Text, ScrollView, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Row, TextBox } from '../components/Elements'
import Header from '../components/Header'
import GlobalStyle from '../utils/styles'
import { Button, Divider, Icon } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import PhtotoPlace from '../components/PhtotoPlace'
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
import Toast from 'react-native-simple-toast'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/stores'
import { uploadFiles } from '../utils/dataset'

const PostPropertyPhoto = () => {
    const routes = useRoute();
    const { id } = routes?.params;
    const [frontPhoto, setFrontPhoto] = useState('');
    const [backPhoto, setBackPhoto] = useState('');
    const [leftPhoto, setLeftPhoto] = useState('');
    const [rightPhoto, setRightPhoto] = useState('');
    const [rasid, setRasid] = useState('');
    const login = useSelector((state: RootState) => state.login);

    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setPhotoindex] = useState(0);
    const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });
    const [saving, setSaving] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        requestPermission()
    }, [])

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'We need access to your location to provide you with the best experience.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);

                        const { latitude, longitude } = position.coords;
                        setLatlng({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const handleActionSheet = () => {
        if (!isOpen) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
        setOpen(!isOpen);
    }

    const openCamera = async () => {
        handleActionSheet();
        const result = await launchCamera({ mediaType: 'photo', quality: 1 });
        if (!result.didCancel) {
            if (result.assets != undefined) {
                if (photoIndex == 0) {
                    setFrontPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 1) {
                    setBackPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 2) {
                    setLeftPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 3) {
                    setRightPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 4) {
                    setRasid(result.assets[0].uri + '');
                }
            }
        }
    }

    const openGallery = async () => {
        handleActionSheet();
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
        if (!result.didCancel) {
            if (result.assets != undefined) {
                if (photoIndex == 0) {
                    setFrontPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 1) {
                    setBackPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 2) {
                    setLeftPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 3) {
                    setRightPhoto(result.assets[0].uri + '');
                } else if (photoIndex == 4) {
                    setRasid(result.assets[0].uri + '');
                }
            }
        }
    }

    const handleRegionChange = (ev) => {
        console.log(('Region Change' + ev));

    }

    const finishUpload = async () => {
        if (frontPhoto == '' || backPhoto == '') {
            Toast.show("You must upload, Front and Back Photo", 3000);
            return;
        }
        setSaving(true);
        const formData = new FormData();
        formData.append('user_id', login.id + '');
        formData.append('prop_id', id);
        formData.append('lat', latlng.lat);
        formData.append('lng', latlng.lng);
        formData.append('front', { uri: frontPhoto, type: 'image/jpeg', name: 'front.jpg' });
        formData.append('back', { uri: backPhoto, type: 'image/jpeg', name: 'back.jpg' });
        if (leftPhoto != '') {
            formData.append('left', { uri: leftPhoto, type: 'image/jpeg', name: 'left.jpg' });
        }
        if (rightPhoto != '') {
            formData.append('right', { uri: rightPhoto, type: 'image/jpeg', name: 'right.jpg' });
        }
        if (rasid != '') {
            formData.append('rasid', { uri: rightPhoto, type: 'image/jpeg', name: 'rasid.jpg' });
        }
        const result = await uploadFiles('properties-uploads', formData);
        Toast.show(result.message, 3000);
        if (result.success) {
            navigation.goBack();
        }
        setSaving(false);
    }

    return (
        <Flex style={{ backgroundColor: '#fff' }}>
            <Header goBack title='Upload Photos' subTitle={`Property Ref. No - #${id}`} />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
            >
                <Row gap={10} style={Style.rowView}>
                    <Box style={{ flex: 1 }}>
                        <PhtotoPlace height={80}
                            onPress={() => {
                                setPhotoindex(0)
                                handleActionSheet()
                            }}
                            image={frontPhoto} />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <PhtotoPlace height={80}
                            onPress={() => {
                                setPhotoindex(1)
                                handleActionSheet()
                            }}
                            image={backPhoto} />
                    </Box>
                </Row>
                <Row gap={10} style={Style.rowView}>
                    <Box style={{ flex: 1 }}>
                        <PhtotoPlace height={80}
                            onPress={() => {
                                setPhotoindex(2)
                                handleActionSheet()
                            }}
                            image={leftPhoto}
                        />
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <PhtotoPlace height={80}
                            onPress={() => {
                                setPhotoindex(3)
                                handleActionSheet()
                            }}
                            image={rightPhoto}
                        />
                    </Box>
                </Row>
                <Box style={Style.rowView}>
                    <Text style={Style.heading}>Upload Bhumi Rasid</Text>
                    <PhtotoPlace height={120}
                        onPress={() => {
                            setPhotoindex(4)
                            handleActionSheet()
                        }}
                        image={rasid}
                    />
                </Box>
                <Box style={Style.rowView}>
                    <Text style={Style.heading}>Address on Google Map</Text>
                    {/* <Box style={{ backgroundColor: '#ddd', height: 300, flex: 1 }}></Box> */}
                </Box>
                <MapView
                    style={{ height: 300, width: '100%', marginBottom: 20 }}
                    initialRegion={{
                        latitude: latlng.lat,
                        longitude: latlng.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    liteMode={true}
                    showsUserLocation={true}
                    onRegionChange={handleRegionChange}
                    zoomEnabled={true}
                    provider={PROVIDER_GOOGLE}
                />
                <Box style={Style.rowView}>
                    <Button mode='contained'
                        onPress={finishUpload}
                        loading={saving}
                        disabled={saving}
                        contentStyle={{ height: 45 }}>FINISH</Button>
                </Box>
            </ScrollView>
            <ActionSheet
                ref={actionSheetRef}
                containerStyle={{ padding: 20 }}
                onClose={handleActionSheet}
            >
                <TouchableOpacity onPress={openCamera}>
                    <Row alignItems='center' gap={10}>
                        <Icon source={'camera'} size={24} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Open Camera</Text>
                    </Row>
                </TouchableOpacity>
                <Divider style={{ marginVertical: 20 }} />
                <TouchableOpacity onPress={openGallery}>
                    <Row alignItems='center' gap={10}>
                        <Icon source={'image-multiple-outline'} size={24} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>From Gallery </Text>
                    </Row>
                </TouchableOpacity>
            </ActionSheet>
        </Flex >
    )
}

const Style = StyleSheet.create({
    rowView: {
        marginBottom: 12
    },
    heading: {
        textAlign: 'center',
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
        marginBottom: 15
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    }
})

export default PostPropertyPhoto