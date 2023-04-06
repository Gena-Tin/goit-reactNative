import uuid from "react-native-uuid";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export default async function uploadUserAvatarToServer(userAvatar) {
  try {
    const response = await fetch(userAvatar);
    const file = await response.blob();

    const uniqueID = uuid.v4();
    const storageRef = ref(storage, `avatars/userAvatar_${uniqueID}`);

    await uploadBytes(storageRef, file);

    const userAvatarUrl = await getDownloadURL(storageRef);

    return userAvatarUrl;
  } catch (error) {
    console.log(error.message);
  }
}
