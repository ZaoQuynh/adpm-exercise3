import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';


export default function SettingScreenView() {
    return (
        <SafeAreaView>
        <StatusBar style="auto"/>
        <ScrollView style={styles.content}>
            <Text>Setting View </Text>
        </ScrollView>
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
      flexDirection: 'column',
    },
    content: { 
      display: 'flex',
      flexDirection: 'column',
      marginTop: 35,
      margin: 20,
    },
});
