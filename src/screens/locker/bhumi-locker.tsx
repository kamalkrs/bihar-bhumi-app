import { Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box, Flex, Paper, Row } from '../../components/Elements'
import { Button, Icon, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/stores'
import { themes } from '../../utils/themes'

type itemProps = {
    label: string,
    verified: boolean,
    expanded: boolean
}

const Bhumilocker = () => {
    const navigation = useNavigation<any>();
    const login = useSelector((state: RootState) => state.login)
    const [updated, setUpdated] = useState(false)

    const [items, setItems] = useState<itemProps[]>([
        {
            label: 'Plot Abc',
            verified: true,
            expanded: true
        },
        {
            label: 'Plot Abc',
            verified: false,
            expanded: false
        },
        {
            label: 'Plot Abc',
            verified: true,
            expanded: false
        }
    ]);

    const handleExpand = (index: number) => {
        items.map((item, sl) => {
            if (sl == index) {
                item.expanded = !item.expanded
            }
            return item;
        });
        setItems(items);
        setUpdated(updated => !updated)
    }

    return (
        <Flex>
            <ScrollView>
                <Paper style={{ backgroundColor: '#0aa699', width: '100%', padding: 15 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <Image source={{ uri: login.image }} style={{ width: 60, height: 60, borderRadius: 60, resizeMode: 'cover' }} />
                        <Box style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{login.first_name + ' ' + login.last_name}</Text>
                            <Row style={{ alignItems: 'center', columnGap: 5 }}>
                                <Text style={{ color: '#ddd', fontSize: 16 }}>BBLocker ID - {login.mobile_number}</Text>
                            </Row>
                        </Box>
                        <IconButton
                            onPress={() => navigation.navigate('/')}
                            icon={'close'} size={24} iconColor='#fff' />
                    </Row>
                </Paper>

                <Box style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                    <Box style={Style.description}>
                        <Text style={{ color: '#fff', textAlign: 'justify' }}>Name of property registry paper. The name of your Aadhar card and PAN card should match. If the name does not match then your property will not be added to Bihar Bhumi Locker. It will be rejected.
                        </Text>
                    </Box>

                    {items.map((item: itemProps, sl: number) => (
                        <Box key={'k' + sl} style={Style.BoxRow}>
                            <Row style={item.expanded ? Style.PropRowOpened : Style.PropRow}>
                                <Row style={{ gap: 10 }}>
                                    <Icon source={'map-marker-outline'} size={24} color={themes.colors.secondary} />
                                    <Text style={Style.labelText}>{item.label}</Text>
                                    {item.verified && <Icon source={'check-decagram-outline'} size={24} color="green" />}
                                </Row>
                                <TouchableOpacity onPress={() => handleExpand(sl)}>
                                    <Icon source={item.expanded ? 'chevron-down' : 'chevron-right'} size={20} />
                                </TouchableOpacity>
                            </Row>
                            {item.expanded && <Box style={{ padding: 15 }}>
                                <Row style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, justifyContent: 'center', marginBottom: 10 }}>
                                    <Text>View Plot Details</Text>
                                </Row>
                                <Row style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8, justifyContent: 'center', marginBottom: 10 }}>
                                    <Text>Plot Documents</Text>
                                </Row>
                                <Row style={{ justifyContent: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 8 }}>
                                    <Button mode='contained' style={{ paddingHorizontal: 40 }}>Donwnload</Button>
                                </Row>
                            </Box>}
                        </Box>
                    ))}

                    <Box style={{ marginVertical: 20, alignItems: 'center' }}>
                        <Button
                            contentStyle={{ height: 45, paddingHorizontal: 25 }}
                            onPress={() => navigation.navigate('add-locker-files' as never)}
                            icon={'plus'}
                            mode='contained' theme={{ roundness: 1 }}>Look Property</Button>
                    </Box>
                </Box>
            </ScrollView >
        </Flex>
    )
}

const Style = StyleSheet.create({
    description: {
        backgroundColor: '#46617A',
        padding: 8,
        borderRadius: 4,
        marginBottom: 12
    },
    PropRow: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        gap: 10,
        justifyContent: 'space-between'
    },
    PropRowOpened: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        gap: 10,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    labelText: {
        color: themes.colors.theme[600],
        fontSize: 18,
    },
    BoxRow: {
        backgroundColor: '#eee', borderRadius: 10, marginBottom: 10,
        borderWidth: 2, borderColor: '#ddd'
    }
})

export default Bhumilocker