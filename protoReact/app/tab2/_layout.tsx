import { View, Text } from "react-native";

export default function Tab2Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fce4ec' }}>
      <Text style={{ textAlign: 'center', marginTop: 40 }}>Tab 2 Layout</Text>
      {children}
    </View>
  );
}
