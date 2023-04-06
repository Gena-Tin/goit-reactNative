import React from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

import AddUserAvatar from "../assets/icons/icoAddUserAvatar";
import DeleteAvatarIcon from "../assets/icons/icoDeleteAvatar";

const UserAvatar = ({ avatar, setAvatar }) => {
  const addAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const deleteAvatar = () => {
    setAvatar(null);
  };

  return (
    <View style={styles.imageWrapper}>
      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={{ width: "100%", height: "100%", borderRadius: 16 }}
        />
      )}
      {avatar ? (
        <View style={styles.userDeleteAvatar}>
          <TouchableOpacity onPress={deleteAvatar}>
            <DeleteAvatarIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userAddAvatar}>
          <TouchableOpacity onPress={addAvatar}>
            <AddUserAvatar />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    zIndex: 1000,
  },
  userAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: 0,

    width: 25,
    height: 25,

    transform: [{ translateX: 12 }],
  },
  userDeleteAvatar: {
    position: "absolute",
    bottom: 20,
    right: 0,

    width: 25,
    height: 25,

    backgroundColor: "transparent",

    transform: [{ translateX: 14 / 2 }],
    zIndex: 10000,
  },
});

export default UserAvatar;
