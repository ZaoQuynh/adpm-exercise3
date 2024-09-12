import {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function SplashScreenView({navigation}) {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Login'); 
        }, 10000);
    
        return () => clearTimeout(timer);
      }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.content}>
            <Text style={styles.title}>Melodica</Text>
            <TouchableOpacity style={styles.btn_start} onPress={() => navigation.navigate('Login')}>
            <MaterialIcon name="play-arrow" size={50} color="#F23E50"/>
            </TouchableOpacity>
        </View>
        <Text style={styles.infor}>Nguyễn Hà Quỳnh Giao - 21110171</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
    },
    content: { 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      color: '#F23E50',
    },
    btn_start: {
      width: 100,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 50
    },
    infor: {
      position: 'absolute',
      bottom: 20,
      fontSize: 15
    }
  });
  
