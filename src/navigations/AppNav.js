import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';

export default function AppNav() {
    const {isLoading, userToken} = React.useContext(AuthContext);

    if (isLoading) {
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" />
        </View>
    }        

    return (
    <NavigationContainer>
        {userToken !== null ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
    );
}  
