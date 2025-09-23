import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Supondo que você exportou 'auth'

const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Usuário criado com sucesso
    const user = userCredential.user;
    console.log('Usuário registrado:', user);
    // Aqui você pode redirecionar o usuário ou atualizar o estado da UI
  } catch (error) {
    // Tratar erros, por exemplo: email já em uso, senha fraca
    console.error('Erro ao registrar:', error.message);
    // Exibir mensagem de erro para o usuário
  }
};
