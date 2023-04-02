import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "../mainScreen/CreatePostsScreen";

function Create() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CreatePostsScreen />
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
    </View>
  );
}

function Posts() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Posts</Text>
    </View>
  );
}

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
        component={Posts}
        options={{
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Login", {
                    sessionId: 45,
                    userId: "22e24",
                  })
                }
              >
                <MaterialIcons name="logout" size={28} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        component={Create}
        options={{
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
        component={Profile}
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
