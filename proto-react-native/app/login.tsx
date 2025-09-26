// app/login.jsx
import React, { useState, useLayoutEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, Alert, Pressable,
    ScrollView, KeyboardAvoidingView, Platform,
    ImageBackground, Image} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseconfig.js';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function LoginPage() {
    const [fontsLoaded] = useFonts({
        'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Login realizado!');
            router.replace('/accountpage');
        } catch (error) {
            Alert.alert('Erro ao fazer login');
        }
    };

    if (!fontsLoaded) return null;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Background Image */}
            <ImageBackground
                source={require('../assets/images/Textura.png')}
                resizeMode="repeat"
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Container principal */}
                    <View style={styles.container}>

                        {/* Container de entrada com fundo */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Login</Text>

                            {/* Email */}
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            {/* Senha */}
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Senha</Text>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        style={styles.passwordInput}
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                                        <Ionicons
                                            name={showPassword ? 'eye-off' : 'eye'}
                                            size={24}
                                            style={styles.eyeIcon}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        {/* Container de botões */}
                        <View style={styles.buttonContainer}>

                            {/* Botão de login */}
                            <Pressable style={styles.buttons} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </Pressable>

                            {/* Link para a página de cadastro */}
                            <Pressable onPress={() => router.replace('/signup')}>
                                <Text style={styles.link}>Não possui uma conta? Cadastre-se</Text>
                            </Pressable>

                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

{/* Estilos */ }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFBB56',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '50%',
        maxWidth: 200,
        marginTop: 10,
    },
    buttons: {
        marginTop: 10,
        backgroundColor: '#FF9800',
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Bebas-Neue'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Bebas-Neue'
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        color: '#7253B5',
        fontFamily: 'Bebas-Neue',
        fontSize: 18,
        marginBottom: 5,
        padding: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        minHeight: 40,
        fontFamily: 'Bebas-Neue',
        fontSize: 16,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    passwordInput: {
        flex: 1,
        minHeight: 40,
        paddingVertical: 10,
        fontFamily: 'Bebas-Neue',
        fontSize: 16,
    },
    eyeIcon: {
        marginLeft: 10,
        color: '#888',
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bebas-Neue'
    },
});
