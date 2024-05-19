
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Box, Row } from './Elements'


type IListProps = {
    onPress?: () => {} | void
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    title: React.ReactNode | string
    description?: string,
    badge?: React.ReactNode,
    hideBorder?: boolean
}

interface ListProps {
    children: React.ReactNode
}

const ListBox: FC<ListProps> = ({ children }) => {
    return (
        <View>
            {children}
        </View>
    )
}

export const ListItem = (props: IListProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[Style.menuItem, { borderBottomWidth: props.hideBorder ? 0 : 1 }]}>
            {
                props.iconLeft != null && <Box style={Style.iconLeft}>
                    {props.iconLeft}
                </Box>
            }
            <Box style={{ flex: 1 }}>
                <Row style={{ alignItems: 'center', gap: 10 }}>
                    {typeof props.title == 'string' ? <Text style={Style.labelText}>{props.title}</Text> : props.title}
                    {props.badge}
                </Row>
                {props.description != null && <Text>{props.description}</Text>}
            </Box>
            {
                props.iconRight != null && <Box style={Style.iconRight}>
                    {props.iconRight}
                </Box>
            }
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    menuItem: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#DDD',
        justifyContent: 'space-between'
    },
    iconLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12
    },
    iconRight: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222'
    }
})

export default ListBox;
