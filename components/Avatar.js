import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'

export default function Avatar({ image, size }) {
    return (
        <TouchableOpacity className="p-1 rounded-full"
            style={{ backgroundColor: themeColors.bgColor(0.1) }}>
                <View className="rounded-full p-3" style={{ backgroundColor: themeColors.bgColor(0.2) }}>
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