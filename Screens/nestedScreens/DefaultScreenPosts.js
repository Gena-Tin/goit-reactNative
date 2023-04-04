import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  //   console.log("post", post);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={post}
        renderItem={({ item }) => (
          <View style={styles.wrap}>
            <View style={styles.wrapImage}>
              <Image source={{ uri: item.photo }} style={styles.picture} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.wrapIcon}>
              <TouchableOpacity
                activeOpacity={0.8}
                // style={styles.wrap}
                onPress={() => navigation.navigate("Comment")}
              >
                <FontAwesome5
                  style={styles.icon}
                  name="comment"
                  size={25}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <View style={styles.location}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Map")}
                >
                  <EvilIcons
                    style={styles.icon}
                    name="location"
                    size={25}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.wrap}
                  onPress={() => navigation.navigate("Map")}
                >
                  <Text style={styles.place}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  wrap: {
    // marginTop:32,
    marginBottom: 32,
  },
  wrapImage: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    borderRadius: 20,
    height: 240,
    width: 370,
  },
  text: {
    fontFamily: "roboto-medium",
    marginHorizontal: 16,
    color: "#212121",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  wrapIcon: {
    marginHorizontal: 16,
    // alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  place: {
    textDecorationLine: "underline",
    color: "#212121",
    fontSize: 16,
  },
});
export default DefaultScreenPosts;
