import { Stack, router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'My App',
          headerTitleAlign: 'center',
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
              {/* Corrected onPress handler */}
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
  Text: {
    fontFamily: 'Bebas-Neue',
  },
});