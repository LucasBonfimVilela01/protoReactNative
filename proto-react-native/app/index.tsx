import { View, Text } from "react-native";
import React, { useEffect, useState, } from 'react';
import { onAuthStateChanged, User  } from 'firebase/auth';
import { auth } from './firebaseconfig.js';


export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário no estado do componente
    });

    // Limpa o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {user ? (
        <Text>Bem-vindo, {user.displayName || user.email}!</Text> // Exibe o nome ou e-mail
      ) : (
        <Text>Por favor, faça login ou registre-se.</Text>
      )}
      {/* ... outros elementos da sua página inicial */}
    </View>
  );
}


