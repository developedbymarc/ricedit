import { useTheme } from "@/hooks/useTheme";
import AppView from "@/components/ui/general/AppView";
import AppText from "@/components/ui/general/AppText";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Spacing } from "@/constants/theme";

export type TAppLoaderProps = {
  text?: string;
}

export default function AppLoader({ text = "Loading..."}: TAppLoaderProps) {
  const theme = useTheme();

  return (
    <AppView style={styles.container}>
      <ActivityIndicator size="large" color={theme.accent} />
      <AppText themeColor="textSecondary">{text}</AppText>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three
  }
})
