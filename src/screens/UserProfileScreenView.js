import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getUser, saveUser } from '../services/userRealmService';
import useOtpServices from '../apis/services/OtpService';

export default function UserProfileScreenView() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { verifyEmail } = useOtpServices(); 

    useEffect(() => {
        const currentUser = getUser();
        if (currentUser) {
            setUser(currentUser);
            setEmail(currentUser.email || '');
        }
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.profile_title}>User Profile</Text>
            {user ? (
                <View style={styles.profile_info}>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.value}>{user.username}</Text>
                    <Text style={styles.label}>Email:</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    ) : (
                        <Text style={styles.value}>{user.email || 'Not set'}</Text>
                    )}
                    {isEditing ? (
                        <TouchableOpacity style={styles.btn_save} onPress={handleSave}>
                            <Text style={styles.btn_text}>Save</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btn_edit} onPress={() => setIsEditing(true)}>
                            <Text style={styles.btn_text}>Edit</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <ActivityIndicator size="large" color="#FF5C5C" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    profile_title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF5C5C',
    },
    profile_info: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    btn_save: {
        backgroundColor: '#FF5C5C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btn_edit: {
        backgroundColor: '#5c5c5c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});