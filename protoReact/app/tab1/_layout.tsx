import { View, Text } from "react-native";

export default function Tab1Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#e3f2fd' }}>
      <Text style={{ textAlign: 'center', marginTop: 40 }}>Tab 1 Layout</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {children}
      </View>
    </View>
  );
}
