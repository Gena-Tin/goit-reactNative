import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import CameraIcon from "../../assets/icons/icoCamera";
import MapIcon from "../../assets/icons/icoMap";
import TrashIcon from "../../assets/icons/icoTrash";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../redux/auth/authSelectors";
import uploadPhotoToServer from "../../firebase/uploadPhotoToServer";
import postsOperations from "../../redux/posts/postsOperations";

const initialState = {
  title: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [camera, setCamera] = useState(null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [location, setLocation] = useState(null);

  const [borderInputColorTitle, setBorderInputColorTitle] = useState("#E8E8E8");
  const [borderInputColorLocation, setBorderInputColorLocation] =
    useState("#E8E8E8");

  const dispatch = useDispatch();

  const { userId, login, userAvatar } = useSelector(authSelectors.getUser);

  useEffect(() => {
    (async () => {
      try {
        const resCamera = await Camera.requestCameraPermissionsAsync();
        const resMedia = await MediaLibrary.requestPermissionsAsync();
        const resLocation = await Location.requestForegroundPermissionsAsync();

        const statusCamera = resCamera.status;
        const statusMedia = resMedia.status;
        const statusLocation = resLocation.status;

        setHasPermission(
          statusCamera === "granted" &&
            statusMedia === "granted" &&
            statusLocation === "granted"
        );

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cameraIsOpen]);

  const onCameraToggle = () => {
    setCameraIsOpen(!cameraIsOpen);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    const photoUrl = await uploadPhotoToServer(photo);
    dispatch(
      postsOperations.addPost({
        title: state.title,
        locationName: state.location,
        location: location.coords,
        photoUrl,
        userId,
        login,
        userAvatar,
      })
    );
    navigation.navigate("PostsScreen");
    resetForm();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setState(initialState);
    setPhoto(null);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {!cameraIsOpen ? (
            <>
              <View style={styles.cameraWrapper}>
                {photo && (
                  <View style={styles.pickPhoto}>
                    <Image
                      source={{ uri: photo }}
                      style={{ width: 343, height: 240, borderRadius: 8 }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    ...styles.cameraBtn,
                    backgroundColor: photo ? "#FFFFFF4D" : "#fff",
                  }}
                  onPress={onCameraToggle}
                >
                  <CameraIcon />
                </TouchableOpacity>
              </View>
              {photo ? (
                <Text
                  style={{
                    ...styles.loadPhotoText,
                    display: isShowKeyboard ? "none" : "flex",
                  }}
                  onPress={pickImage}
                >
                  Edit photo
                </Text>
              ) : (
                <Text style={styles.loadPhotoText} onPress={pickImage}>
                  Load photo
                </Text>
              )}
            </>
          ) : (
            <>
              <Camera style={styles.openCamera} ref={setCamera}>
                {photo && (
                  <View style={styles.takePhoto}>
                    <Image
                      source={{ uri: photo }}
                      style={{ width: 343, height: 240 }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  onPress={takePhoto}
                  style={{ ...styles.cameraBtn, backgroundColor: "#FFFFFF4D" }}
                >
                  <CameraIcon />
                </TouchableOpacity>
              </Camera>
              {photo ? (
                <Text
                  style={{
                    ...styles.loadPhotoText,
                    display: isShowKeyboard ? "none" : "flex",
                  }}
                  onPress={pickImage}
                >
                  Edit photo
                </Text>
              ) : (
                <Text style={styles.loadPhotoText} onPress={pickImage}>
                  Load photo
                </Text>
              )}
            </>
          )}
          <TextInput
            placeholder="Title..."
            placeholderTextColor={"#BDBDBD"}
            style={{
              ...styles.input,
              borderBottomColor: borderInputColorTitle,
            }}
            value={state.title}
            onFocus={() => {
              setIsShowKeyboard(true), setBorderInputColorTitle("#FF6C00");
            }}
            onBlur={() => setBorderInputColorTitle("#E8E8E8")}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
          <View
            style={{
              ...styles.input,
              borderBottomColor: borderInputColorLocation,
            }}
          >
            <MapIcon styles={styles.icon} />
            <TextInput
              placeholder="Location..."
              placeholderTextColor={"#BDBDBD"}
              style={styles.inputMap}
              value={state.location}
              onFocus={() => {
                setIsShowKeyboard(true), setBorderInputColorLocation("#FF6C00");
              }}
              onBlur={() => setBorderInputColorLocation("#E8E8E8")}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, location: value }))
              }
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={sendPhoto}
          >
            <Text
              style={{ ...styles.btnText, color: photo ? "#FFF" : "#BDBDBD" }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 34,
            paddingTop: 9,
          }}
        >
          <TouchableOpacity style={styles.btnTrash} onPress={resetForm}>
            <TrashIcon style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  cameraWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  pickPhoto: {
    position: "absolute",
  },
  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
    width: 60,
    height: 60,
  },
  loadPhotoText: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
    marginBottom: 32,
  },
  openCamera: {
    height: 240,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
  takePhoto: {
    position: "absolute",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 15,
    marginBottom: 16,
  },
  inputMap: {
    fontSize: 16,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 32,
  },
  btnText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  btnTrash: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});

export default CreatePostsScreen;
