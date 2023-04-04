import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "../mainScreen/CreatePostsScreen";
import PostsScreen from "../mainScreen/PostsScreen";
import ProfileScreen from "../mainScreen/ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 9,
            height: 83,
          },
        ],
        tabBarItemStyle: [
          {
            borderRadius: 50,
            height: 40,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-add" size={size} color={color} />
          ),
          title: "Create a post",
          headerStyle: {
            height: 110,
            borderBottomWidth: 2,
          },
          headerLeft: () => (
            <View style={{ padding: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                <Ionicons name="arrow-back-outline" size={28} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
