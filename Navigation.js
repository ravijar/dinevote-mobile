import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import ChooseLocation from './screens/ChooseLocation';
import ChoosePeople from './screens/ChoosePeople';
import Vote from './screens/Vote';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ChooseLocation" component={ChooseLocation} options={{ presentation: "fullScreenModal"}} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ChoosePeople" component={ChoosePeople} />
                <Stack.Screen name="Vote" component={Vote} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}