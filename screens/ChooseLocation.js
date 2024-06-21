import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { themeColors } from '../theme'
import { StatusBar } from 'expo-status-bar'
import BottomMenu from '../components/BottomMenu'
import Avatar from '../components/Avatar'
import { locationTypes } from '../constants'

export default function ChooseLocation() {

  const locationData = {
    latitute: 6.0446697,
    longitude: 80.2186468,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    radius: 0.5
  }

  const [selectedlocationType, setSelectedLocationType] = useState("restaurant")

  const locationTypeHandler = (type) => {
    setSelectedLocationType(type)
  }

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      {/* map */}
      <MapView
        initialRegion={{
          latitude: locationData.latitute,
          longitude: locationData.longitude,
          latitudeDelta: locationData.latitudeDelta,
          longitudeDelta: locationData.longitudeDelta
        }}
        className="flex-1"
        mapType='standard'
      >
        <Marker
          coordinate={{
            latitude: locationData.latitute,
            longitude: locationData.longitude
          }}
          pinColor={themeColors.bgColor(1)}
          title="Your Location"
          description={`${locationData.latitute}, ${locationData.longitude}`}
        />
        <Circle
          center={{
            latitude: locationData.latitute,
            longitude: locationData.longitude
          }}
          radius={locationData.radius * 1000}
          strokeColor={themeColors.bgColor(1)}
          fillColor={themeColors.bgColor(0.3)}
        />
      </MapView>

      {/* bottom menu */}
      <BottomMenu>
        <View className="flex-row justify-evenly">
          {Object.values(locationTypes).map(locationType => {
            let isSelected = locationType.key === selectedlocationType
            let textClass = isSelected ? "font-extrabold text-gray-800" : "font-semibold text-gray-500"

            return (
              <View key={locationType.key}>
                <Avatar
                  key={locationType.key}
                  image={locationType.image}
                  size={40}
                  selected={isSelected}
                  onPressHandler={() => locationTypeHandler(locationType.key)}
                />
                <Text className={"text-xs text-center mt-1 " + textClass}>{locationType.displayName}</Text>
              </View>
            )
          })}
        </View>
      </BottomMenu>
    </View>
  )
}