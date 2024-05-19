import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Column, Flex, Label, Row, TextBox } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Button, Divider, IconButton, Menu, FAB, Modal, TextInput, Icon } from 'react-native-paper'
import { themes } from '../../utils/themes'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const MyServices = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    const handleUploadClick = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' })
        if (!result.didCancel) {
            console.log(result.assets[0].uri);
        }
    }

    return (
        <Flex>
            <Header goBack title='My Services'>
                {/* <Button icon={'plus'} mode='elevated'>Add</Button> */}
            </Header>
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <Box style={Style.box}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
                        <Column style={{ flex: 1 }}>
                            <Text style={Style.heading}>Service name</Text>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        </Column>
                        <Menu
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            anchor={<IconButton onPress={() => setVisible(true)} icon={'dots-vertical'} size={24} />}>
                            <Menu.Item onPress={() => { }} title="Edit" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Delete" />
                        </Menu>
                    </Row>
                </Box>
            </ScrollView>
            <Modal visible={open}
                contentContainerStyle={Style.modal}
                onDismiss={() => setOpen(false)}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ color: '#000', fontSize: 15 }}>Service Form</Text>
                    <IconButton
                        onPress={() => setOpen(false)}
                        icon={'close'} size={20} />
                </Row>
                <Divider />
                <Box style={Style.modalContainer}>
                    <Label>Upload Service Photo</Label>
                    <Box style={{ backgroundColor: '#eee', height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: themes.colors.primary, borderRadius: 4 }}>
                        <IconButton
                            onPress={handleUploadClick}
                            icon={'file-upload-outline'} size={30} iconColor='#888' />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Service name</Label>
                        <TextBox />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Details</Label>
                        <TextBox multiline style={{ height: 100 }} />
                    </Box>
                    <Box style={{ marginBottom: 12 }}>
                        <Label>Service Area</Label>
                        <TextBox multiline style={{ height: 60 }} />
                    </Box>
                    <Button mode='contained' contentStyle={{ height: 45 }}>SAVE</Button>
                </Box>
            </Modal>
            <FAB
                icon="plus"
                style={Style.fab}
                color={'#fff'}
                onPress={() => setOpen(true)}
            />
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
        fontSize: 18,
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

export default MyServices