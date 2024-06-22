import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { themeColors } from '../theme'
import { StatusBar } from 'expo-status-bar'
import BottomMenu from '../components/BottomMenu'
import Avatar from '../components/Avatar'
import { locationTypes } from '../constants'
import { MaterialIcons } from '@expo/vector-icons'

export default function ChooseLocation() {

  const locationData = {
    latitute: 6.0446697,
    longitude: 80.2186468,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    radius: 0.5
  }

  const [selectedlocationType, setSelectedLocationType] = useState("restaurant")
  const [radius, setRadius] = useState(0);
  const [radiusInput, setRadiusInput] = useState("0");
  const [markerPosition, setMarkerPosition] = useState({
    latitude: locationData.latitute,
    longitude: locationData.longitude
  })

  const locationTypeHandler = (type) => {
    setSelectedLocationType(type)
  }

  const radiusInputHandler = (text) => {
    setRadiusInput(text)
  };

  const radiusValueHandler = () => {
    const parsedRadius = parseFloat(radiusInput);
    if (!isNaN(parsedRadius) && parsedRadius >= 0 && parsedRadius <= 100) {
      const roundedRadius = parseFloat(parsedRadius.toFixed(1));
      setRadius(roundedRadius)
    }
  }

  const incrementRadius = () => {
    setRadius(prevRadius => {
      const newRadius = Math.min(prevRadius + 0.5, 100)
      const roundedRadius = parseFloat(newRadius.toFixed(1))
      setRadiusInput(roundedRadius.toString())
      return roundedRadius
    })
  }

  const decrementRadius = () => {
    setRadius(prevRadius => {
      const newRadius = Math.max(prevRadius - 0.5, 0)
      const roundedRadius = parseFloat(newRadius.toFixed(1))
      setRadiusInput(roundedRadius.toString())
      return roundedRadius
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
      radiusValueHandler()
    }}>
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
            coordinate={markerPosition}
            draggable
            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
            pinColor={themeColors.bgColor(1)}
            title="Your Location"
            description={`${parseFloat(markerPosition.latitude).toFixed(5)}, ${parseFloat(markerPosition.longitude).toFixed(5)}`}
          />
          <Circle
            center={markerPosition}
            radius={radius * 1000}
            strokeColor={themeColors.bgColor(0.8)}
            fillColor={themeColors.bgColor(0.2)}
          />
        </MapView>

        {/* bottom menu */}
        <BottomMenu>
          <Text className="text-xl font-bold text-center text-gray-600 mb-4">Map Options</Text>
          <View className="flex-row mb-5">
            <View className="flex-row basis-3/4 items-center">
              <Text className="text-lg font-semibold text-center text-gray-500 ml-3">Radius (km): </Text>

              {/* radius input */}
              <View className="flex-row flex-1 rounded-full border border-gray-300 p-1 ml-2">
                <TouchableOpacity onPress={decrementRadius}>
                  <View className="rounded-l-full p-2 justify-start" style={{ backgroundColor: themeColors.bgColor(0.2) }}>
                    <MaterialIcons name="remove" />
                  </View>
                </TouchableOpacity>
                <TextInput
                  className="text-lg font-semibold text-center text-gray-800 flex-1"
                  keyboardType="numeric"
                  cursorColor={themeColors.bgColor(0.8)}
                  onChangeText={radiusInputHandler}
                  onSubmitEditing={radiusValueHandler}
                  returnKeyType="done"
                  value={radiusInput.toString()}
                />
                <TouchableOpacity onPress={incrementRadius}>
                  <View className="rounded-r-full p-2 justify-end" style={{ backgroundColor: themeColors.bgColor(0.2) }}>
                    <MaterialIcons name="add" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text className="text-xl font-bold text-center text-gray-600 mb-4">Choose Location Type</Text>
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
    </TouchableWithoutFeedback>
  )
}