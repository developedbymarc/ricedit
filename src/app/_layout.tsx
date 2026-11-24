import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import AppProvider, { useApp } from "@/context/AppContext";
import { useTheme } from "@/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const { isLoading } = useApp();
  const theme = useTheme();

  useEffect(() => {
    if (isLoading === false) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundElement },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="walkthrough" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ title: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ title: "Create account" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="setup/[id]" options={{ title: "Setup details" }} />
      <Stack.Screen name="setup-form" options={{ title: "Setup" }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit profile" }} />
      <Stack.Screen name="change-password" options={{ title: "Reset password" }} />
    </Stack>
  );
}

export default function RootLayout() {
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
      <AppProvider>
        <RootStack />
      </AppProvider>
    </ThemeProvider>
  );
}
