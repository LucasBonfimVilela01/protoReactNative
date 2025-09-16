import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Tab2Screen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is Tab 2 Screen</Text>
      <Button title="Home" onPress={() => router.push("/")} />
    </View>
  );
}
