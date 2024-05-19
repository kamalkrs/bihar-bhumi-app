import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Box, Column, Flex, Row } from '../../components/Elements'
import Header from '../../components/Header'
import { Button, Icon, IconButton, ProgressBar } from 'react-native-paper'

const UploadLockerFiles = () => {
    return (
        <Flex style={{ backgroundColor: '#fff' }}>
            <Header goBack title='Upload Files' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            >
                <Row style={{ justifyContent: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, color: '#000', textDecorationLine: 'underline' }}>Upload Your Property Documents</Text>
                </Row>
                <Row style={{ gap: 10, alignItems: 'center' }}>
                    <Icon source={'file-upload-outline'} size={20} color='#444' />
                    <Text style={{ fontSize: 20, color: '#000' }}>Upload Files</Text>
                </Row>
                <View style={{ marginBottom: 20 }}>
                    <Text>Upload Property Documents</Text>
                </View>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'green', borderRadius: 8, gap: 10, backgroundColor: '#F0FCF2', marginBottom: 10, paddingVertical: 20 }}>
                    <Text style={{ color: 'green' }}>Please upload your files</Text>
                    <Icon source={'file-upload-outline'} size={30} color='green' />
                    <Button mode='contained-tonal'>Choose File</Button>
                </Box>
                <Box style={{ marginBottom: 15 }}>
                    <Text>Only JPEG/GIF/PNG file less than 500 kb</Text>
                </Box>
                <Box style={{ marginBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 18 }}>Uploaded Files</Text>
                </Box>
                <Box style={Style.cardRow}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <Icon source={'file-cloud-outline'} size={24} />
                        <Column style={{ gap: 5, flex: 1 }}>
                            <Text style={{ color: '#444', fontSize: 15 }}>Mutations.jpg</Text>
                            <Row style={{ gap: 10 }}>
                                <Text style={Style.subtext}>345 kb</Text>
                                <Text style={Style.subtext}>50% uploaded</Text>
                                <Text style={Style.subtext}>25s left</Text>
                            </Row>
                        </Column>
                        <IconButton icon={'delete-outline'} size={24} />
                    </Row>
                    <ProgressBar progress={0.5} color={'#080'} />
                </Box>
                <Box style={Style.cardRow}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <Icon source={'file-cloud-outline'} size={24} />
                        <Column style={{ gap: 5, flex: 1 }}>
                            <Text style={{ color: '#444', fontSize: 15 }}>Mutations.jpg</Text>
                            <Row style={{ gap: 10 }}>
                                <Text style={Style.subtext}>345 kb</Text>
                                <Text style={Style.subtext}>50% uploaded</Text>
                                <Text style={Style.subtext}>25s left</Text>
                            </Row>
                        </Column>
                        <Row>
                            <IconButton icon={'delete-outline'} size={24} style={{ marginRight: -10 }} />
                            <IconButton icon={'refresh'} size={24} />
                        </Row>
                    </Row>
                </Box>
                <Row style={{ gap: 10 }}>
                    <Button mode='outlined' style={{ flex: 1 }}>Cancel</Button>
                    <Button mode='contained' style={{ flex: 1 }}>Attach File</Button>
                </Row>
                <Column style={{ padding: 20, alignItems: 'center', gap: 10 }}>
                    <Text>If In Case Save Then You Can't Edit</Text>
                    <Row>
                        <Text>Terms & Conditions Apply.</Text>
                        <Text style={{ color: 'green', marginHorizontal: 5 }}>Click Here</Text>
                        <Text>Read and Accept</Text>
                    </Row>
                </Column>
            </ScrollView>
            <Button style={{ borderRadius: 0 }} mode='contained'>Save</Button>
        </Flex>
    )
}

const Style = StyleSheet.create({
    subtext: {
        fontSize: 12
    },
    cardRow: {
        borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 10, paddingBottom: 10,
        marginBottom: 10
    }
})

export default UploadLockerFiles