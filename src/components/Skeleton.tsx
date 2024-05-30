import { View, ViewProps } from "react-native"
import { Column, Row } from "./Elements"

type VProps = {
    children?: React.ReactNode,
    style?: ViewProps
}

const Skeleton = ({ children, style }: VProps) => {
    return (
        <View style={[style, { marginBottom: 10 }]}>
            {children}
        </View>
    )
}

Skeleton.Ractangle = ({ height }: { height: number }) => {
    return (
        <View style={{ height: height, backgroundColor: '#ddd', marginBottom: 12 }} />
    )
}

Skeleton.Body = ({ children }: VProps) => {
    return (
        <View style={{ padding: 10 }}>
            {children}
        </View>
    )
}

Skeleton.Text = () => {
    return (
        <View style={{ justifyContent: 'space-between', gap: 10 }}>
            <View style={{ height: 5, backgroundColor: '#ddd', width: '100%' }}></View>
            <View style={{ height: 5, backgroundColor: '#ddd', width: '75%' }}></View>
            <View style={{ height: 5, backgroundColor: '#ddd', width: '50%' }}></View>
            <View style={{ height: 5, backgroundColor: '#ddd', width: '30%' }}></View>
        </View>
    )
}

Skeleton.Circle = ({ width }: { width: number }) => {
    return (
        <>
            <View style={{ width: width, height: width, backgroundColor: '#ddd', borderRadius: width }}></View>
        </>
    )
}
Skeleton.Square = ({ width }: { width: number }) => {
    return (
        <>
            <View style={{ width: width, height: width, backgroundColor: '#ddd', borderRadius: 4 }}></View>
        </>
    )
}

Skeleton.Profile = () => {
    return (
        <Row style={{ alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Skeleton.Circle width={60} />
            <Column style={{ flex: 1 }}>
                <Skeleton.Text />
            </Column>
        </Row>
    )
}
Skeleton.Profile2 = () => {
    return (
        <Row style={{ alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Skeleton.Square width={60} />
            <Column style={{ flex: 1 }}>
                <Skeleton.Text />
            </Column>
        </Row>
    )
}

export default Skeleton;