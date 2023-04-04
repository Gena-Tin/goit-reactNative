import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          headerBackAccessibilityLabel: { display: "none" },
          headerBackImage: false,
          headerBackButtonVisible: false,
          headerBackTitleVisible: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
          title: "Posts",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerRight: () => (
            <View style={{ padding: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <MaterialIcons name="logout" size={28} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{ padding: 15 }}>
              <TouchableOpacity></TouchableOpacity>
            </View>
          ),
        }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        options={{
          tabBarStyle: { display: "none" },
          title: "Comments",
          headerBackTitle: false,
          headerBackTitleVisible: false,
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
        name="Comment"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerShown: true,
          headerBackTitle: false,
          headerBackTitleVisible: false,
          title: "Map",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
