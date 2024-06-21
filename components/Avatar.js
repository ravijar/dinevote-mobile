import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function Avatar({ image, size, selected, onPressHandler }) {
    const onTouchHandler = () => {
        onPressHandler()
    }

    return (
        <TouchableOpacity className="p-1 rounded-full"
            onPress={onTouchHandler}
            style={{ backgroundColor: selected ? themeColors.bgColor(0.5) : themeColors.bgColor(0.1) }}>
            <View className="rounded-full p-3" style={{ backgroundColor: selected ? themeColors.bgColor(0.3) : themeColors.bgColor(0.1) }}>
                <Image
                    source={image}
                    style={{
                        width: size,
                        height: size,
                    }}
                />
            </View>

        </TouchableOpacity>
    )
}