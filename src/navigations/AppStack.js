import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreenView from '../screens/HomeScreenView';
import SettingScreenView from '../screens/SettingScreenView';
import CustomDrawer from '../components/CustomDrawer';
import UserProfileScreenView from '../screens/UserProfileScreenView';

const Drawer = createDrawerNavigator();

export default function AppStack() {
    return (
        <NavigationContainer>  
            <Drawer.Navigator 
                initialRouteName="Home" 
                screenOptions={{headerShown: false}}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen 
                    name="Home" 
                    component={HomeScreenView} 
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <MaterialIcon
                                name='home'
                                size={size} 
                                color={focused ? '#ffffff' : '#ccc'} />
                        )
                    }}
                />
                <Drawer.Screen 
                    name="Setting" 
                    component={SettingScreenView} 
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <MaterialIcon
                                name='settings'
                                size={size} 
                                color={focused ? '#ffffff' : '#ccc'}/>
                        )
                    }}
                />
                <Drawer.Screen 
                    name="User Profile" 
                    component={UserProfileScreenView} 
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <MaterialIcon
                                name='user'
                                size={size} 
                                color={focused ? '#ffffff' : '#ccc'}/>
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer> 
    );    
}
