import { createUserWithEmailAndPassword, updateProfile, updateEmail, 
        updatePassword, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Para registrar um novo usuário:
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

// Para fazer logout:
const handleSignOut = async () => {
    try {
        await signOut(auth);
        console.log('Usuário deslogado.');
        // A UI será atualizada automaticamente por onAuthStateChanged
    } catch (error) {
        console.error('Erro ao deslogar:', error.message);
    }
};

// Para atualizar o nome de exibição:
const updateUserName = async (newDisplayName) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateProfile(user, {
                displayName: newDisplayName
            });
            console.log('Nome de exibição atualizado para:', user.displayName);
            // A UI pode precisar de um refresh ou o onAuthStateChanged pode disparar novamente
        } catch (error) {
            console.error('Erro ao atualizar nome:', error.message);
        }
    }
};

// Para atualizar email (pode requerer re-autenticação se for uma sessão antiga)
const updateUserEmail = async (newEmail) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateEmail(user, newEmail);
            console.log('E-mail atualizado para:', newEmail);
        } catch (error) {
            console.error('Erro ao atualizar e-mail:', error.message);
        }
    }
};

// Para atualizar senha (pode requerer re-autenticação)
const updateUserPassword = async (newPassword) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updatePassword(user, newPassword);
            console.log('Senha atualizada.');
        } catch (error) {
            console.error('Erro ao atualizar senha:', error.message);
        }
    }
};

// Para deletar a conta do usuário (pode requerer re-autenticação)
const handleDeleteAccount = async (password) => { // Pode ser necessário pedir a senha para re-autenticar
    const user = auth.currentUser;
    if (user) {
        try {
            // Re-autenticar o usuário se a sessão for antiga
            // Este passo é crucial para operações sensíveis como exclusão de conta
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await deleteUser(user);
            console.log('Conta do usuário deletada com sucesso.');
            // Redirecionar para a tela de login ou inicial
        } catch (error) {
            console.error('Erro ao deletar conta:', error.message);
            // Exibir mensagem de erro, talvez informando que a re-autenticação é necessária
        }
    }
};

import { handleSignUp, handleSignOut, updateUserName, updateUserEmail, updateUserPassword, handleDeleteAccount } from './authUser';