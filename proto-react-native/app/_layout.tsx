import { Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function AppLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: true, // Padrão é mostrar, cada tela pode esconder
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My App',
          headerLeft: () => (
            router.canGoBack() ? (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            ) : null
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable onPress={() => router.push('/settingspage')}>
                <FontAwesome
                  name="cog"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
              <Pressable onPress={() => router.push('/accountpage')}>
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      
      {/* Tela de Login */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: true,
          headerLeft: () => (
            router.canGoBack() ? (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            ) : null
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable onPress={() => router.push('/settingspage')}>
                <FontAwesome
                  name="cog"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
              <Pressable onPress={() => router.push('/accountpage')}>
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      
      {/* Tela de Cadastro - Header Escondido */}
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 15,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
});