import { View, Text, ImageBackground, ImageBackgroundProps } from 'react-native'
import React from 'react'
import { Box } from './Elements'
import { Icon, IconButton } from 'react-native-paper'

interface PhotoPlaceType extends ImageBackgroundProps {
    height: number,
    isCircle?: boolean,
    onPress?: () => void,
    image?: string | null
}

const PhtotoPlace = ({ height = 100, isCircle = false, onPress = undefined, image = null }: PhotoPlaceType) => {
    if (image?.length > 0) {
        return (
            <ImageBackground
                source={{ uri: image }}
                style={{ backgroundColor: '#ddd', height: height, justifyContent: 'center', alignItems: 'center', borderRadius: isCircle ? height : 2, width: isCircle ? height : '100%' }}>
                {onPress != undefined && <IconButton
                    onPress={onPress}
                    icon={'camera-outline'} size={24} iconColor='#fff' />}
            </ImageBackground>
        )
    }
    return (
        <Box style={{ backgroundColor: '#ddd', height: height, justifyContent: 'center', alignItems: 'center', borderRadius: isCircle ? height : 2, width: isCircle ? height : '100%' }}>
            {onPress != undefined ? <IconButton
                onPress={onPress}
                icon={'camera-outline'} size={24} /> : <Icon source={'camera-outline'} size={24} />}
        </Box>
    )
}

export default PhtotoPlace