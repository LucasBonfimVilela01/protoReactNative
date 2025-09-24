// app/accountpage.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { User } from 'firebase/auth';
import { handleSignOut, updateUserName, updateUserEmail, updateUserPassword, handleDeleteAccount, checkUserLoggedIn } from './authUser';


export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);;
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Verifica se o usuário está logado
  useEffect(() => {
    (async () => {
      const currentUser = await checkUserLoggedIn();
      if (!currentUser) {
        router.replace('/signup'); // Redireciona se não estiver logado
      } else {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
      }
    })();
  }, []);

  const handleSave = async () => {
  if (!user) return;

  if (name !== user.displayName) await updateUserName(name);
  if (email !== user.email) await updateUserEmail(email);
  if (password.length > 0) await updateUserPassword(password);

  Alert.alert('Informações atualizadas!');
  setEditing(false);
};
  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            Alert.prompt(
              'Digite sua senha',
              'Confirme sua senha para deletar a conta.',
              async (inputPassword) => {
                await handleDeleteAccount(inputPassword);
                router.replace('/signup'); // Redireciona após deletar a conta
              }
            );
          },
        },
      ]
    );
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      <Text>Nome:</Text>
      <TextInput
        value={name}
        editable={editing}
        onChangeText={setName}
        style={styles.input}
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        editable={editing}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <Text>Senha:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          editable={editing}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.eyeIcon} />
        </Pressable>
      </View>

      {editing ? (
        <Button title="Salvar Alterações" onPress={handleSave} />
      ) : (
        <Button title="Editar Informações" onPress={() => setEditing(true)} />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Deletar Conta" color="red" onPress={confirmDelete} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Logout" onPress={() => { handleSignOut(); router.replace('/'); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, flex: 1 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  eyeIcon: { marginLeft: 10 },
});
