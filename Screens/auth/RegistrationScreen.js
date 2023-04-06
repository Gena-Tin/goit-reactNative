import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "@react-navigation/native";
import { registration } from "../../redux/auth/authOperation";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";

import AuthBackground from "../../components/AuthBackground";
import UserAvatar from "../../components/UserAvatar";

const initialValues = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialValues);
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  const [borderInputColorLogin, setBorderInputColorLogin] = useState("#E8E8E8");
  const [borderInputColorEmail, setBorderInputColorEmail] = useState("#E8E8E8");
  const [borderInputColorPassword, setBorderInputColorPassword] =
    useState("#E8E8E8");

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(registration({ ...state, avatar }));
    setState(initialValues);
    setAvatar(null);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <AuthBackground>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "margin"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 110,
              }}
            >
              <UserAvatar avatar={avatar} setAvatar={setAvatar} />
              <Text style={styles.title}>Registration</Text>
              <TextInput
                placeholder="Login"
                placeholderTextColor={"#BDBDBD"}
                style={{ ...styles.input, borderColor: borderInputColorLogin }}
                value={state.login}
                onFocus={() => {
                  setIsShowKeyboard(true), setBorderInputColorLogin("#FF6C00");
                }}
                onBlur={() => setBorderInputColorLogin("#E8E8E8")}
                onSubmitEditing={keyboardHide}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#BDBDBD"}
                style={{ ...styles.input, borderColor: borderInputColorEmail }}
                value={state.email}
                onFocus={() => {
                  setIsShowKeyboard(true), setBorderInputColorEmail("#FF6C00");
                }}
                onBlur={() => setBorderInputColorEmail("#E8E8E8")}
                onSubmitEditing={keyboardHide}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={showPassword}
                  style={{
                    ...styles.input,
                    borderColor: borderInputColorPassword,
                  }}
                  value={state.password}
                  onFocus={() => {
                    setIsShowKeyboard(true),
                      setBorderInputColorPassword("#FF6C00");
                  }}
                  onBlur={() => setBorderInputColorPassword("#E8E8E8")}
                  onSubmitEditing={keyboardHide}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                {showPassword ? (
                  <Text
                    style={styles.btnShowPassword}
                    onPress={handleShowPassword}
                  >
                    Show
                  </Text>
                ) : (
                  <Text
                    style={styles.btnShowPassword}
                    onPress={handleShowPassword}
                  >
                    Hide
                  </Text>
                )}
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.btnText}>Sign up</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>
                    Have an account?
                    <Link to={{ screen: "Login" }}> Sign in</Link>
                  </Text>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 78,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
  },
  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  showPassword: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 27,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  userPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
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
});

export default RegistrationScreen;
