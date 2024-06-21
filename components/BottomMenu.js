import { View } from 'react-native'
import React from 'react'

export default function BottomMenu(props) {
    return (
        <View className="rounded-t-3xl -mt-12 p-4 bg-white relative">
            {props.children}
        </View>
    )
}