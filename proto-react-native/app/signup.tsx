import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseconfig.js';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function SignUpPage() {
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      Alert.alert('Cadastro realizado!');
      router.replace('/accountpage');
    } catch (error) {
      Alert.alert('Erro ao cadastrar');
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Crie sua conta</Text>

        {/* Nome */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

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

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttons} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/login')}>
          <Text style={styles.link}>Já possui uma conta? Faça login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 0.8,
    justifyContent: 'center',
    marginHorizontal: '20%'
  },
  inputContainer: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#FFBB56',
    padding: 20,
    borderRadius: 10
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: '25%'
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
    color: 'blue',
    fontFamily: 'Bebas-Neue'
  },
});
