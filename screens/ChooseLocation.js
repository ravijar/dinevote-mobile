import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { themeColors } from '../theme'

export default function ChooseLocation() {

  const locationData = {
    latitute: 6.0446697,
    longitude: 80.2186468,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    radius: 0.5
  }

  return (
    <View className="flex-1">
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
    </View>
  )
}