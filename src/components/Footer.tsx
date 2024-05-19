import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Row } from './Elements'
import { Icon } from 'react-native-paper'

const Footer = ({ tab }: { tab: number }) => {
    return (

        <Row style={Style.footer}>
            <TouchableOpacity style={Style.button}>
                <Icon source={'home-outline'} size={20} />
                <Text style={Style.label}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.button}>
                <Icon source={'cube-outline'} size={20} />
                <Text style={Style.label}>Properties</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.button}>
                <Icon source={'account-outline'} size={20} />
                <Text style={Style.label}>Accounts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.button}>
                <Icon source={'menu'} size={20} />
                <Text style={Style.label}>Menu</Text>
            </TouchableOpacity>
        </Row>
    )
}

const Style = StyleSheet.create({
    button: {
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    label: {
        fontSize: 12
    },
    footer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 10,
        shadowOffset: { width: 0, height: -10 }
    }
})

export default Footer