import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Tab1Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Text style={{ fontSize: 32, color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
        This is Tab 1 Screen
      </Text>
      <View style={{ width: 150, height: 150, backgroundColor: 'red', marginVertical: 20 }} />
      <Button title="Home" onPress={() => router.push("/")} />
    </View>
  );
}
