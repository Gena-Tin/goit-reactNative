import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnqYdCcNFFCbRL2xId9Kuuv70ka8EFEVs",
  authDomain: "goit-reactnative.firebaseapp.com",
  projectId: "goit-reactnative",
  storageBucket: "goit-reactnative.appspot.com",
  messagingSenderId: "950927486360",
  appId: "1:950927486360:web:e95e9d089851bcf4858fed",
  measurementId: "G-B5037P4T4K",
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);

export const db = getFirestore(app);
