// app/login.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginPage() {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
            <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.eyeIcon} />
        </Pressable>
      </View>
            <Button title="Entrar" onPress={handleLogin} />

            <Pressable onPress={() => router.replace('/signup')}>
                <Text style={styles.link}>Não possui uma conta? Cadastre-se</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
    link: { marginTop: 20, textAlign: 'center', color: 'blue' },
      passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  eyeIcon: { marginLeft: 10 },
});
