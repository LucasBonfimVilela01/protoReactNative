import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Tab1Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, color: 'red', fontWeight: 'bold' }}>This is Tab 1 Screen</Text>
      <Button title="Home" onPress={() => router.push("/")} />
    </View>
  );
}
