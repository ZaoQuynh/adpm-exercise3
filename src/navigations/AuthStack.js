
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreenView from '../screens/LoginScreenView';
import SplashScreenView from '../screens/SplashScreenView';
import RegisterScreenView from '../screens/RegisterScreenView';
import ForgetPasswordView from '../screens/ForgetPasswordScreenView';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Splash" component={SplashScreenView} />
            <Stack.Screen name="Login" component={LoginScreenView} />
            <Stack.Screen name="Register" component={RegisterScreenView} />
            <Stack.Screen name="Forget" component={ForgetPasswordView} />
        </Stack.Navigator>
    );
}
