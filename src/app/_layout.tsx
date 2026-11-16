import { Colors } from "@/constants/theme";
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();
setTimeout(() => {
  SplashScreen.hideAsync();
}, 1000);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const colors = isDark ? Colors.dark : Colors.light;
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          background: colors.background,
          card: colors.backgroundElement,
          text: colors.text,
          border: colors.border,
          primary: colors.accent,
          notification: colors.danger,
        },
      }}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundElement,
          },
          headerTintColor: colors.text,
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
