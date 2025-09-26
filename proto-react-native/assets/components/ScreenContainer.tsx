// assets/components/ScreenContainer.tsx
import React from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleProp, 
  ViewStyle 
} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenContainer({ children, style }: ScreenContainerProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[{ flexGrow: 1, justifyContent: 'center' }, style]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}