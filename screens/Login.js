import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
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
