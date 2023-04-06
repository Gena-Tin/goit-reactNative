import { Link } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import AuthBackground from "../../components/AuthBackground";
import { login } from "../../redux/auth/authOperation";

const initialValues = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(true);

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
    dispatch(login(state));
    setState(initialValues);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <AuthBackground>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 110,
              }}
            >
              <Text style={styles.title}>Login</Text>
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
                    <Text style={styles.btnText}>Sign in</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>
                    Don't have an account?
                    <Link to={{ screen: "Registration" }}> Sign up</Link>
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
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 144,
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
});

export default LoginScreen;
