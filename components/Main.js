import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import * as SplashScreen from "expo-splash-screen";
import { authStateChangeUser } from "../redux/auth/authOperation";

SplashScreen.preventAutoHideAsync();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator style={{ width: 30, height: 30, color: "blue" }} />
    );
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
};

export default Main;
