import { MaxContentWidth, Spacing } from "@/constants/theme";
import type { ReactNode } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import AppView from '@/components/ui/general/AppView';


type TAppScreenProps = {
  children: ReactNode;
  centered?: boolean;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
};

export default function AppScreen({
  children,
  centered = false,
  edges = ["bottom"],
  style
}: TAppScreenProps) {
  return (
    <AppView>
      {/* AppView first to apply the background on the full screen */}
      <SafeAreaView style={styles.safeArea} edges={edges}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.content,
            centered && styles.centered,
            style
          ]}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    padding: Spacing.four,
    paddingBottom: Spacing.eight,
    gap: Spacing.three,
  },
  centered: { justifyContent: "center" }
})
