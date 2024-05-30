import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Column, Flex, Label, Row, TextBox } from '../components/Elements'
import Header from '../components/Header'
import GlobalStyle from '../utils/styles'
import { Picker } from '@react-native-picker/picker'
import { Button, Icon } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/stores'
import { apiCall } from '../utils/dataset'
import Toast from 'react-native-simple-toast'

const PostPropertyDetails = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formError, setFormerror] = useState<string[]>([])
    const login = useSelector((state: RootState) => state.login)
    const navigation = useNavigation<any>();
    const routes = useRoute();
    const { dist_id, zone_id, id } = routes?.params;
    const [form, setForm] = useState({
        dist_id: dist_id,
        zone_id: zone_id,
        site_title: '',
        details: '',
        jamabandi_no: '',
        bhag_vartman: '',
        page_no: '',
        thana_no: '',
        khata_no: '',
        khesra_no: '',
        total_area: '',
        area_unit: '',
        jamabani_raiyat_name: '',
        guardian_name: '',
    })
    const [propId, setPropId] = useState(0);

    useEffect(() => {
        loadDetails();
    }, [])

    const loadDetails = async () => {
        if (id > 0) {
            setPropId(id);
            const result = await apiCall('get-site', { id });
            if (result.success) {
                const data = result.data;
                console.log(data);
                setForm({
                    ...form,
                    site_title: data.site_title,
                    details: data.details,
                    jamabandi_no: data.jamabandi_no,
                    jamabani_raiyat_name: data.jamabani_raiyat_name,
                    page_no: data.page_no,
                    thana_no: data.thana_no,
                    khata_no: data.khata_no,
                    khesra_no: data.khesra_no,
                    total_area: data.total_area,
                    area_unit: data.area_unit,
                    guardian_name: data.guardian_name,
                    dist_id: data.dist_id,
                    zone_id: data.zone_id
                })
            }
        }
    }

    const handleRefresh = () => {
        setRefreshing(false);
    }

    const saveDetails = async () => {
        const errors: string[] = [];
        if (form.site_title.trim() == '') errors.push('Property Title');
        if (form.details.trim() == '') errors.push('Property Details');
        if (form.jamabandi_no == '') errors.push("जमाबंदी संख्या");
        if (form.bhag_vartman == '') errors.push("भाग बर्तमान");
        if (form.page_no == '') errors.push("पृष्ठ संख्या");
        if (form.thana_no == '') errors.push("मौजा थाना संख्या");
        if (form.khata_no == '') errors.push("खाता संख्या");
        if (form.khesra_no == '') errors.push("खेसरा संख्या");
        if (form.total_area == '') errors.push("एकड/डिसमिल");
        if (form.jamabani_raiyat_name == '') errors.push("जमाबंदी रैयत का नाम");
        if (form.guardian_name == '') errors.push("अभिभावक का नाम");

        if (errors.length > 0) {
            setFormerror(errors);
            return;
        }
        setSaving(true);
        const result = await apiCall('add-site', { user_id: login.id, form, id: propId });
        Toast.show(result.message, 3000);
        if (result.success) {
            setPropId(result.data.id);
            navigation.navigate('post-property-photo' as never, { id: result.data.id });
        }
        setSaving(false);
    }

    return (
        <Flex style={{ backgroundColor: '#fff' }}>
            <Header goBack title='Plot Details' />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                {formError.length > 0 && <Box style={{ backgroundColor: '#e00', padding: 8, borderRadius: 4, marginBottom: 10 }}>
                    <Row gap={10}>
                        <Icon source={'alert-outline'} size={16} color='yellow' />
                        <Column gap={2}>
                            <Text style={{ fontWeight: 'bold', color: 'yellow', marginBottom: 4 }}>Please fix following errors.</Text>
                            {formError.map((abc, sl) => <Text key={'er' + sl} style={{ color: '#fff' }}> - {abc}</Text>)}
                        </Column>
                    </Row>
                </Box>}
                <Box style={Style.rowBox}>
                    <Label bold={true} >Property Title</Label>
                    <TextBox
                        value={form.site_title}
                        onChangeText={ev => setForm({ ...form, site_title: ev })}
                        maxLength={100}
                    />
                </Box>
                <Box style={Style.rowBox}>
                    <Label bold={true}>Property Details</Label>
                    <TextBox multiline
                        value={form.details}
                        onChangeText={ev => setForm({ ...form, details: ev })}
                        maxLength={100}
                        style={{ height: 120 }} />
                </Box>
                <Row justifyContent='space-between' gap={10} style={Style.rowBox}>
                    <TextBox placeholder='जमाबंदी संख्या'
                        value={form.jamabandi_no}
                        onChangeText={ev => setForm({ ...form, jamabandi_no: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                    <TextBox placeholder='भाग बर्तमान'
                        value={form.bhag_vartman}
                        onChangeText={ev => setForm({ ...form, bhag_vartman: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                </Row>
                <Row justifyContent='space-between' gap={10} style={Style.rowBox}>
                    <TextBox placeholder='पृष्ठ संख्या'
                        value={form.page_no}
                        onChangeText={ev => setForm({ ...form, page_no: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                    <TextBox placeholder='मौजा थाना संख्या'
                        value={form.thana_no}
                        onChangeText={ev => setForm({ ...form, thana_no: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                </Row>
                <Row justifyContent='space-between' gap={10} style={Style.rowBox}>
                    <TextBox placeholder='खाता संख्या'
                        value={form.khata_no}
                        onChangeText={ev => setForm({ ...form, khata_no: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                    <TextBox placeholder='खेसरा संख्या'
                        value={form.khesra_no}
                        onChangeText={ev => setForm({ ...form, khesra_no: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                </Row>
                <Row justifyContent='space-between' gap={10} style={Style.rowBox}>
                    <TextBox placeholder='एकड/डिसमिल'
                        value={form.total_area}
                        onChangeText={ev => setForm({ ...form, total_area: ev })}
                        maxLength={4} keyboardType='number-pad'
                        style={{ flex: 1 }} />
                    <Box style={[GlobalStyle.Select, { flex: 1, height: 45 }]}>
                        <Picker
                            selectedValue={form.area_unit}
                            style={{ flex: 1 }}
                            mode='dropdown'
                            onValueChange={ev => setForm({ ...form, area_unit: ev })}
                        >
                            <Picker.Item value='dismile' label='Dismile' />
                            <Picker.Item value='acre' label='Acre' />
                            <Picker.Item value='sqft' label='Sq Ft' />
                        </Picker>
                    </Box>
                </Row>
                <Box style={Style.rowBox}>
                    <Label bold={true} >जमाबंदी रैयत का नाम</Label>
                    <TextBox
                        value={form.jamabani_raiyat_name}
                        onChangeText={ev => setForm({ ...form, jamabani_raiyat_name: ev })}
                        maxLength={100}
                    />
                </Box>
                <Box style={Style.rowBox}>
                    <Label bold={true} >अभिभावक का नाम</Label>
                    <TextBox
                        value={form.guardian_name}
                        onChangeText={ev => setForm({ ...form, guardian_name: ev })}
                        maxLength={100}
                    />
                </Box>
                <Button mode='contained'
                    onPress={saveDetails}
                    loading={saving}
                    disabled={saving}
                    style={{ marginBottom: 10 }} contentStyle={{ height: 45 }}>NEXT</Button>
            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    rowBox: {
        marginBottom: 10
    }
})

export default PostPropertyDetails