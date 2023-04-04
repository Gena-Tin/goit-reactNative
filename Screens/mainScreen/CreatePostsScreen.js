import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // console.log(data.uri);
      const location = await Location.getCurrentPositionAsync({});
      // console.log("location", location);
      setLocation(location);
      setImageUri(data.uri);
    }
  };

  const sentPicture = () => {
    // console.log(navigation);
    navigation.navigate("Posts", {
      screen: "DefaultScreen",
      params: { photo: imageUri, name: name, place: place },
    });
    setImageUri(null);
    setName("");
    setPlace("");
  };

  const resetData = () => {
    setImageUri(null);
    setName("");
    setPlace("");
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
        <TouchableOpacity style={styles.wrap} onPress={takePicture}>
          <Ionicons
            style={styles.img}
            name="camera"
            size={30}
            color="#BDBDBD"
          />
        </TouchableOpacity>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imageWrap} />
        )}
      </Camera>
      {imageUri ? (
        <Text style={styles.text}>Edit photo</Text>
      ) : (
        <Text style={styles.text}>Upload photo</Text>
      )}

      <View style={{ marginTop: 32 }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#BDBDBD"
          value={name}
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Locality"
          value={place}
          placeholderTextColor="#BDBDBD"
          onChangeText={(place) => setPlace(place)}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={sentPicture}
          activeOpacity={0.8}
          style={imageUri ? styles.buttonActive : styles.button}
        >
          <Text style={styles.btnTitle}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          onPress={resetData}
          activeOpacity={0.8}
          style={styles.wrap}
        >
          <AntDesign
            style={styles.img}
            name="delete"
            size={30}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    borderRadius: 20,
    color: "#E8E8E8",
    height: 300,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    zIndex: 0,
  },
  wrap: {
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  text: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 300,
    width: 400,
    zIndex: 2,
  },
  input: {
    fontFamily: "roboto-regular",
    borderBottomWidth: 2,
    borderBottomColor: "#E8E8E8",
    padding: 16,
    borderRadius: 8,
    color: "#212121",
    padding: 16,
  },
  delete: {
    marginTop: 70,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BDBDBD",
    borderRadius: 100,
    alignItems: "center",
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
  },
  buttonActive: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "roboto-regular",
    color: "#f0f8ff",
    fontSize: 16,
  },
});
export default CreatePostsScreen;
