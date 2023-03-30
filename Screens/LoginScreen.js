import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View
        style={{
          ...styles.form,
          paddingBottom: isShowKeyboard ? 10 : 110,
        }}
      >
        <Text style={styles.title}>Login</Text>
        <View
          style={{
            marginTop: 16,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ ...styles.input, width: dimensions }}
            placeholder="Email adress"
            placeholderTextColor="#bdbdbd"
            onFocus={() => setIsShowKeyboard(true)}
            value={state.email}
            onChangeText={(value) =>
              setstate((prevState) => ({ ...prevState, email: value }))
            }
          />
        </View>
        <View
          style={{
            marginTop: 16,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ ...styles.input, width: dimensions }}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#bdbdbd"
            onFocus={() => setIsShowKeyboard(true)}
            value={state.password}
            onChangeText={(value) =>
              setstate((prevState) => ({ ...prevState, password: value }))
            }
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.button, width: dimensions }}
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.link}>
          <Text>Don't have an account? Sign up</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#ecf0f1",
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    fontFamily: "roboto-regular",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    marginHorizontal: 16,
    borderRadius: 8,
    color: "#bdbdbd",
    padding: 16,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff6c00",
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
  link: {
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "roboto-regular",
  },
});
