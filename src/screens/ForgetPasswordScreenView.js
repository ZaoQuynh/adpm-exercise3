import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import useUserServices from '../apis/services/UserService';
import useOtpServices from '../apis/services/OtpService';

export default function ForgetPasswordView() {
    const [loading, setLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { handleGetUserByEmail, handleUpdatePassword } = useUserServices();
    const { handleSendOtp, handleVerifyOtp } = useOtpServices();

    const checkEmail = async () => {
        setLoading(true);
        setIsEnable(false);
        setUser(null);
        if (email === '') {
            Alert.alert('Email is required');
            setLoading(false);
            return;
        }

        try {
            const response = await handleGetUserByEmail(email);
            setIsEnable(true);
            setUser(response);
            await handleSendOtp(email, 'reset');
            Alert.alert('OTP has been sent to your email');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        if (otp === '' || newPassword === '' || confirmPassword === '') {
            Alert.alert('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Password and confirm password do not match');
            return;
        }

        try {
            const otpResponse = await handleVerifyOtp(email, 'reset', otp);
            if (otpResponse.status === 200) {
                const updateResponse = await handleUpdatePassword(user.id, newPassword);
                if (updateResponse.status === 200) {
                    Alert.alert('Success', 'Password has been reset');
                    setEmail('');
                    setOtp('');
                    setNewPassword('');
                    setConfirmPassword('');
                } else {
                    Alert.alert('Error', 'Failed to reset password');
                }
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={setEmail}
                value={email}
            />
            <TouchableOpacity style={styles.button} disabled={loading} onPress={checkEmail}>
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Get OTP</Text>
                )}
            </TouchableOpacity>

            {isEnable && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        onChangeText={setOtp}
                        value={otp}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        onChangeText={setNewPassword}
                        value={newPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} disabled={loading} onPress={resetPassword}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Reset Password</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} disabled={loading} onPress={checkEmail}>
                        <Text style={styles.buttonText}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
