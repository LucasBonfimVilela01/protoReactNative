import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User  } from 'firebase/auth';
import { auth } from './firebaseConfig';


function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário no estado do componente
    });

    // Limpa o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <h1>Bem-vindo, {user.displayName || user.email}!</h1> // Exibe o nome ou e-mail
      ) : (
        <h1>Por favor, faça login ou registre-se.</h1>
      )}
      {/* ... outros elementos da sua página inicial */}
    </div>
  );
}


