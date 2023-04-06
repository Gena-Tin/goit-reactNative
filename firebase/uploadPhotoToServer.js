import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { storage } from "./config";

export default async function uploadPhotoToServer(photo) {
  try {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePhotoId = uuid.v4();
    const storageRef = ref(storage, `photos/photo_${uniquePhotoId}`);

    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(storageRef);
    return photoUrl;
  } catch (error) {
    console.log(error.message);
  }
}
