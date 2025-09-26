// app/signup.tsx
import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import useCustomFonts from '../assets/hooks/useCustomFonts';
import ScreenContainer from '../assets/components/ScreenContainer';
import BackgroundWrapper from '../assets/components/BackgroundWrapper';
import AuthContainer from '../assets/components/AuthContainer';
import ScreenTitle from '../assets/components/ScreenTitle';
import InputField from '../assets/components/InputField';
import PasswordField from '../assets/components/PassWordField';
import CustomButton from '../assets/components/CustomButton';
import LinkText from '../assets/components/LinkText';
import { handleSignUp } from './authUser';

export default function SignUpPage() {
  const fontsLoaded = useCustomFonts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUpPress = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await handleSignUp(email, password, name);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/accountpage');
    } catch (error) {
      // Substituindo error.code e error.message por Alert genéricos
      Alert.alert('Erro', 'Falha ao criar conta. Verifique os dados informados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <BackgroundWrapper>
      <ScreenContainer>
        <View style={styles.container}>
          <AuthContainer>
            <ScreenTitle>Crie sua conta</ScreenTitle>

            <InputField
              label="Nome"
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
            />

            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Digite seu email"
            />

            <PasswordField
              label="Senha"
              value={password}
              onChangeText={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder="Digite sua senha (mínimo 6 caracteres)"
            />
          </AuthContainer>

          <View style={styles.buttonContainer}>
            <CustomButton 
              title="Cadastrar" 
              onPress={handleSignUpPress}
              loading={loading}
              disabled={loading}
            />
            
            <LinkText
              text="Já possui uma conta? Faça login"
              onPress={() => router.replace('/login')}
            />
          </View>
        </View>
      </ScreenContainer>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: '50%',
    maxWidth: 200,
    marginTop: 10,
  },
});