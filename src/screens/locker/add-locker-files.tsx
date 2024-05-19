import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Flex, Row, TextBox } from '../../components/Elements'
import Header from '../../components/Header'
import { Button, IconButton } from 'react-native-paper'
import { themes } from '../../utils/themes'
import { Picker } from '@react-native-picker/picker';
import Style from '../../utils/styles'
import { useNavigation } from '@react-navigation/native'

const Addlockerfile = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const navigation = useNavigation();

    return (
        <Flex>
            <Header goBack title=''>
                <IconButton icon={'help-circle-outline'} size={20} iconColor='#fff' />
            </Header>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            >
                <View style={{ backgroundColor: '#fff', borderRadius: 10, elevation: 1, marginBottom: 10, padding: 15 }}>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>{themes.lang.dist} </Text>
                        <Box style={Style.Select}>
                            <Picker
                                mode='dropdown'
                                selectedValue={selectedLanguage}
                                style={{ height: 30, paddingTop: 0 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </Box>

                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>{themes.lang.zone} </Text>
                        <Box style={Style.Select}>
                            <Picker
                                mode='dropdown'
                                selectedValue={selectedLanguage}
                                style={{ height: 30, paddingTop: 0 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </Box>
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>जमाबंदी रैयत का नाम</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>अभिभावक का नाम</Text>
                        <TextBox placeholder='' />
                    </View>
                    <Row style={{ justifyContent: 'space-between', gap: 10 }}>
                        <View style={Style1.formRow1}>
                            <Text style={Style1.formLabel}>खाता सख्या</Text>
                            <TextBox placeholder='' />
                        </View>
                        <View style={Style1.formRow1}>
                            <Text style={Style1.formLabel}>खेसरा सख्या</Text>
                            <TextBox placeholder='' />
                        </View>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', gap: 10 }}>
                        <View style={Style1.formRow1}>
                            <Text style={Style1.formLabel}>हल्का सख्या</Text>
                            <TextBox placeholder='' />
                        </View>
                        <View style={Style1.formRow1}>
                            <Text style={Style1.formLabel}>मौजा  सख्या</Text>
                            <TextBox placeholder='' />
                        </View>
                    </Row>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>जमाबंदी सख्या</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>रकबा / डिसमिल</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>जमाबंदी सख्या</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>रकबा / डिसमिल</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>जमाबंदी सख्या</Text>
                        <TextBox placeholder='' />
                    </View>
                    <View style={Style1.formRow}>
                        <Text style={Style1.formLabel}>रकबा / डिसमिल</Text>
                        <TextBox placeholder='' />
                    </View>
                </View>
                <Row style={{ justifyContent: 'center', marginVertical: 15 }}>
                    <Button
                        onPress={() => navigation.navigate('upload-locker-files' as never)}
                        mode='contained'>NEXT</Button>
                </Row>
            </ScrollView>
        </Flex>
    )
}

const Style1 = StyleSheet.create({
    formRow: {
        marginBottom: 10,
    },
    formRow1: {
        marginBottom: 10,
        flex: 1
    },
    formLabel: {
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333'
    }
})

export default Addlockerfile