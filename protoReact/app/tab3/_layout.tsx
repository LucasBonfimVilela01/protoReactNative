import { View, Text } from "react-native";

export default function Tab3Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#e8f5e9' }}>
      <Text style={{ textAlign: 'center', marginTop: 40 }}>Tab 3 Layout</Text>
      {children}
    </View>
  );
}
