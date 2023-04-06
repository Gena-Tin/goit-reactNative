import { ImageBackground, StyleSheet } from "react-native";

const imageBG = require("../assets/images/bg.png");

const AuthBackground = ({ children }) => {
  return (
    <ImageBackground source={imageBG} style={styles.imageBG}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
});

export default AuthBackground;
