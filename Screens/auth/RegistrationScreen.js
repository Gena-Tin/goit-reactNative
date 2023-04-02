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
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function Registration({ navigation }) {
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
    dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    setstate(initialState);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 110,
              }}
              r
            >
              <Text style={styles.title}>Registration</Text>
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, width: dimensions }}
                  placeholder="Login"
                  placeholderTextColor="#bdbdbd"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16, alignItems: "center" }}>
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
              <View style={{ marginTop: 16, alignItems: "center" }}>
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
                  // onPress={keyboardHide}
                  onPress={() => {
                    navigation.navigate("Home");
                    {
                      keyboardHide;
                    }
                  }}
                >
                  <Text style={styles.btnTitle}>Regiister</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ color: "#1B4371", fontSize: 16 }}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "roboto-regular",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
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
    padding: 16,
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
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    fontFamily: "roboto-regular",
  },
});