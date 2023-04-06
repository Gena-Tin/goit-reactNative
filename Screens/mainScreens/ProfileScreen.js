import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import BG from "../../components/AuthBackground";

import LogOutIcon from "../../assets/icons/icoLogOut";
import CommentsIcon from "../../assets/icons/icoComments";
import MapIcon from "../../assets/icons/icoMap";
import LikeIcon from "../../assets/icons/Icolike";
import { authSelectors } from "../../redux/auth/authSelectors";
import DeleteAvatarIcon from "../../assets/icons/icoDeleteAvatar";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  const { userId, login, userAvatar } = useSelector(authSelectors.getUser);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <BG>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.userPhoto}>
            <Image
              source={{ uri: userAvatar }}
              style={{ width: 120, height: 120, borderRadius: 16 }}
            />
            <TouchableOpacity style={styles.addIcon}>
              <DeleteAvatarIcon />
            </TouchableOpacity>
          </View>
          <LogOutIcon
            onPress={() => dispatch(logOut())}
            style={{ position: "absolute", top: 22, right: 16 }}
          />
          <Text style={styles.title}>{login}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.photoUrl }}
                  style={{ height: 240, borderRadius: 8 }}
                />
                <View style={styles.imageDetails}>
                  <Text style={styles.name}>{item.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: item.id,
                            photo: item.photoUrl,
                            comment: item.comment,
                          })
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 24,
                        }}
                      >
                        <CommentsIcon />
                        <Text style={{ marginLeft: 6, color: "#BDBDBD" }}>
                          0
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <LikeIcon />
                        <Text style={{ marginLeft: 6, color: "#BDBDBD" }}>
                          0
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Map", { location: item.location })
                      }
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MapIcon />
                      <Text
                        style={{
                          marginLeft: 3,
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        {item.locationName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </BG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 147,
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 147,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  userPhoto: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    borderRadius: 16,
  },
  addIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [{ translateX: 12 }],
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 32,
    height: "100%",
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
  },
});

export default ProfileScreen;
