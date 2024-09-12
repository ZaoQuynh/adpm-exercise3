import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuthServices from '../apis/services/AuthServices';

export default function RegisterScreenView({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleRegister } = useAuthServices();

    const registerProcessing = async () => {
        if (!fullName || !email || !phoneNumber || !username || !password || !confirmPassword) {
            Alert.alert('Validation error', 'All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Validation error', 'Password and confirm password do not match');
            return;
        }

        setLoading(true);
        try {
            await handleRegister(fullName, email, phoneNumber, username, password);
            Alert.alert('Success', 'Registration successful');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Registration error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.register_title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Full name"
                onChangeText={setFullName}
                value={fullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#5c5c5c" />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#5c5c5c" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#FF5C5C" />
            ) : (
                <TouchableOpacity style={styles.btn_register} onPress={registerProcessing}>
                    <Text style={styles.btn_text}>Register</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btn_login} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text_link}> Already have an account? 
                    <Text style={styles.highlightText}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    register_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF5C5C'
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    btn_register: {
        width: 300,
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 25,
    },
    text_link: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    highlightText: {
        color: '#FF5C5C'
    }
});
