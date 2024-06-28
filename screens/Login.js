import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "789525025385-o14e3i8kq8agcg5ukbqt5o91l0d2il13.apps.googleusercontent.com",
        iosClientId: "789525025385-h6adl8ude2ne8l4nqrdn79vu3elhkcu1.apps.googleusercontent.com",
        webClientId: "789525025385-huvg1nuokos6nk2j3fsavh64lt6o3qav.apps.googleusercontent.com"
    })

    useEffect(() => {
        handleSignIn()
    }, [response])

    async function handleSignIn() {
        const user = await AsyncStorage.getItem("@user")
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken)
            }
        } else {
            setUserInfo(JSON.parse(user))
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            const user = await response.json()
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Text>{JSON.stringify(userInfo)}</Text>
            <Button title='Sign in' onPress={() => promptAsync()}/>
            <Button title='Sign out' onPress={() => AsyncStorage.removeItem("@user")}/>
        </View>
    )
}
