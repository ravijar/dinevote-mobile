import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';
import { View } from 'react-native';
import { useEffect } from 'react';

export const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('@userInfo');
    } catch (error) {
        console.log(error);
    }
}

export default function Login({ navigation }) {
    useEffect(() => {
        const checkUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('@userInfo');
            if (userInfo) {
                navigation.navigate('Home');
            }
        };

        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        checkUserInfo();
    }, [navigation]);

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(JSON.stringify(userInfo));
            await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
            navigation.navigate('Home');
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    console.log('cancelled');
                    break;
                case statusCodes.IN_PROGRESS:
                    console.log('in progress');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log('play services not available');
                    break;
                default:
                    console.log(error);
            }
        }
    }

        return (
            <View className="flex-1 items-center justify-center bg-white">
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={googleSignIn}
                />
            </View>
        )
    }
