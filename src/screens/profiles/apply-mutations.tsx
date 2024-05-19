import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Box, Column, Flex, Row, TextBox } from '../../components/Elements'
import Header from '../../components/Header'
import GlobalStyle from '../../utils/styles'
import { Button, Icon } from 'react-native-paper'
import { themes } from '../../utils/themes'
import { useNavigation } from '@react-navigation/native'

const ApplyMutations = () => {
    const navigation = useNavigation();
    return (
        <Flex>
            <Header goBack title='Apply Online Mutation Status' />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                showsVerticalScrollIndicator={false}
            >
                <Box style={{ marginBottom: 10 }}>
                    <TextBox placeholder='Enter Deed Number' />
                </Box>
                <Text style={{ fontSize: 13, textAlign: 'center', marginBottom: 10 }}>Scan your Deed Registry paper and create a PDF file and upload it. Get mutation receipt sent to your email & whatsapp with in 72 Hours.</Text>
                <Box style={{ marginBottom: 10 }}>
                    <TextBox placeholder='Add E-Mail Address' />
                </Box>
                <Box style={{ marginBottom: 10 }}>
                    <TextBox placeholder='Add WhatsApp Number' />
                </Box>
                <Row style={{ alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Icon source={'file-upload-outline'} size={20} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upload Files</Text>
                </Row>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'green', borderRadius: 8, gap: 10, backgroundColor: '#F0FCF2', marginBottom: 10, paddingVertical: 20 }}>
                    <Text style={{ color: 'green' }}>Please upload your files</Text>
                    <Icon source={'file-upload-outline'} size={30} color='green' />
                    <Button mode='contained-tonal'>Choose File</Button>
                </Box>
                <Box style={{ marginBottom: 15 }}>
                    <Text>Only JPEG/GIF/PNG file less than 500 kb</Text>
                </Box>
                <Column style={{ paddingHorizontal: 30, gap: 10 }}>
                    <Button mode='contained' contentStyle={{ height: 45 }}>Submit</Button>
                    <Button mode='contained'
                        onPress={() => navigation.navigate('mutation-status' as never)}
                        contentStyle={{ height: 45 }}>Check Mutation Status</Button>
                    <Button mode='contained' contentStyle={{ height: 45 }}>Apply via WhatsApp</Button>
                </Column>
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

export default ApplyMutations