import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Label } from '../components/Elements'
import Header from '../components/Header'
import GlobalStyle from '../utils/styles'
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native-paper'
import { Bihar } from '../utils/bihar'
import { apiCall } from '../utils/dataset'
import { useNavigation } from '@react-navigation/native'

const Postproperties = () => {
    const [distlist, setDistlist] = useState([]);
    const [zonelist, setZonelist] = useState([])
    const [form, setForm] = useState({
        dist_id: 0,
        zone_id: 0,
        id: 0
    })
    const navigation = useNavigation<any>();

    useEffect(() => {
        const loadDist = async () => {
            const dlist = await Bihar.districts();
            setDistlist(dlist)
        }
        loadDist();
    }, [])

    useEffect(() => {
        loadAnchal();
    }, [form.dist_id])

    const loadAnchal = async () => {
        const result = await apiCall('zones', { dist_id: form.dist_id });
        if (result.success) {
            setZonelist(result.data);
        }
    }

    return (
        <Flex>
            <Header title='Plot Locations' goBack />
            <ScrollView
                contentContainerStyle={GlobalStyle.ScrollView}

            >
                <Text style={Style.heading}>Select Plot Location</Text>
                <Box style={{ paddingHorizontal: 25 }}>
                    <Box style={{ marginBottom: 10 }}>
                        <Label>Select District</Label>
                        <Box style={GlobalStyle.Select}>
                            <Picker
                                selectedValue={form.dist_id}
                                onValueChange={ev => setForm({ ...form, dist_id: ev })}
                            >
                                <Picker.Item value={0} label='Select District' />
                                {distlist.map((item: any) => <Picker.Item key={'st' + item.id} value={item.id} label={item.dist_name} />)}
                            </Picker>
                        </Box>
                    </Box>
                    <Box style={{ marginBottom: 20 }}>
                        <Label>Select Anchal</Label>
                        <Box style={GlobalStyle.Select}>
                            <Picker
                                selectedValue={form.zone_id}
                                onValueChange={ev => setForm({ ...form, zone_id: ev })}
                                mode='dropdown'
                            >
                                <Picker.Item value={0} label='Select Anchal' />
                                {zonelist.map((item: any) => <Picker.Item key={'ct' + item.id} value={item.id} label={item.zone_name} />)}
                            </Picker>
                        </Box>
                    </Box>
                    <Button
                        contentStyle={{ height: 45 }}
                        disabled={form.dist_id == 0 || form.zone_id == 0}
                        onPress={() => navigation.navigate('post-property-details' as never, form)}
                        mode='contained'>NEXT</Button>
                </Box>
            </ScrollView>
        </Flex>
    )
}

const Style = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
        color: '#222'
    }
})

export default Postproperties