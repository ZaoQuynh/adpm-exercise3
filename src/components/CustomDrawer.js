import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';

export default function CustomDrawer(props) {
    
    const {logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
        <DrawerContentScrollView 
            {...props} 
            style={styles.listOptions}
            contentContainerStyle={{
                backgroundColor: '#F23E50',
                padding: 5,
            }}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.btnLogout} onPress={() => logout()}>
                <Text>Logout</Text>
                <MaterialIcon name="logout" size={20}/>
            </TouchableOpacity>
        </View>
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column'
    },
    footer: {
        padding: 20,
        display: 'flex',
        borderTopWidth: 1,
        borderTopColor: '#ccc', 
    },
    btnLogout: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'space-between',
    },
});
