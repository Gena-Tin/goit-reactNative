import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

import LogOutIcon from "../../assets/icons/icoLogOut";
import PostsIcon from "../../assets/icons/icoPosts";
import BackIcon from "../../assets/icons/icoBack";
import CreatePostIcon from "../../assets/icons/icoCreatePostIcon";
import ProfileIcon from "../../assets/icons/icoProfile";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authOperation";

const HomeTab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,

          paddingBottom: 34,
          paddingTop: 9,
          paddingHorizontal: 46,

          borderTopWidth: 1,
          borderTopColor: "#b3b3b3",
        },
      }}
    >
      <HomeTab.Screen
        options={{
          title: "Posts",
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

          headerRight: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                right: 16,
              }}
            >
              <LogOutIcon onPress={() => dispatch(logOut())} />
            </TouchableOpacity>
          ),

          tabBarIcon: ({ focused, size, color }) => <PostsIcon />,
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <HomeTab.Screen
        options={{
          title: "Create post",
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

          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                left: 16,
              }}
            >
              <BackIcon onPress={() => navigation.navigate("PostsScreen")} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                backgroundColor: "#FF6C00",
                width: 70,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <CreatePostIcon />
            </View>
          ),
          tabBarStyle: { display: "none" },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <HomeTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => <ProfileIcon />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTab.Navigator>
  );
};

export default HomeScreen;
