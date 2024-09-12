import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';
import useAuthServices from '../apis/services/AuthServices';
import { saveUser } from '../services/userRealmService'; // Import Realm service

export default function LoginScreenView({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const { handleLogin } = useAuthServices();

    const loginProcessing = async () => {
        if (!username || !password) {
            Alert.alert('Validation error', 'Username and password are required');
            return;
        }

        setLoading(true);
        try {
            const response = await handleLogin(username, password);
            const token = response.data.token;

            // Lưu thông tin người dùng vào Realm
            saveUser({
                id: 1,
                username: username,
                token: token,
            });

            login(username, password, token);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.login_title}>Login</Text>
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
            {loading ? (
                <ActivityIndicator size="large" color="#FF5C5C" />
            ) : (
                <TouchableOpacity style={styles.btn_login} onPress={loginProcessing}>
                    <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
                <Text style={styles.text_link}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_register} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text_link}>Haven't account? <Text style={styles.highlightText}>Register</Text></Text>
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
    login_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF5C5C',
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    btn_login: {
        width: 300,
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        margin: 10,
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
        textAlign: 'center',
    },
    highlightText: {
        color: '#FF5C5C',
    },
    btn_register: {
        marginTop: 20,
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
