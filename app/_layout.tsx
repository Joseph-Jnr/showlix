import { toastConfig } from "@/config";
import { ThemeProvider } from "@/theme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Optional: preload fonts, assets, or data here
      } finally {
        await SplashScreen.hideAsync(); // Hides splash screen once app is ready
      }
    };

    prepareApp();
  }, []);
  return (
    <ThemeProvider>
      <Animated.View style={{ flex: 1 }} entering={FadeIn}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
          </Stack>

          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </Animated.View>
    </ThemeProvider>
  );
}
