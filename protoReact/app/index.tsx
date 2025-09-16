import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>Select a Tab</Text>
      <Button title="Go to Tab 1" onPress={() => router.push("/tab1/index")} />
      <Button title="Go to Tab 2" onPress={() => router.push("/tab2")} />
      <Button title="Go to Tab 3" onPress={() => router.push("/tab3")} />
    </View>
  );
}
