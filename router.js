import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { authSelectors } from "./redux/auth/authSelectors";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import HomeScreen from "./Screens/mainScreens/HomeScreen";

import MapScreen from "./Screens/nestedScreens/MapScreen";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";

const AuthStack = createStackNavigator();
const MainTab = createStackNavigator();

const useRoute = () => {
  const isAuth = useSelector(authSelectors.getIsAuth);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        ></AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <MainTab.Screen
        options={{
          headerLeftLabelVisible: false,
          title: "Map",
          headerStyle: {
            height: 88,

            borderBottomWidth: 1,
            borderBottomColor: "#b3b3b3",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontWeight: "bold",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
        name="Map"
        component={MapScreen}
      />
      <MainTab.Screen
        options={{
          headerLeftLabelVisible: false,
          title: "Comments",
          headerStyle: {
            height: 88,

            borderBottomWidth: 1,
            borderBottomColor: "#b3b3b3",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontWeight: "bold",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </MainTab.Navigator>
  );
};

export { useRoute };
