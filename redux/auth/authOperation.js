import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authSlice";
import uploadUserAvatarToServer from "../../firebase/uploadUserAvatarToServer";

const registration =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const avatarUrl = await uploadUserAvatarToServer(avatar);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatarUrl,
      });

      const user = auth.currentUser;

      const payload = {
        userId: user?.uid,
        login: user?.displayName,
        email: user?.email,
        userAvatar: user?.photoURL,
      };

      dispatch(authSlice.actions.updateUserProfile(payload));
    } catch (error) {
      alert(error.message);
    }
  };

const login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      //console.log(user);
    } catch (error) {
      alert(error.message);
    }
  };

const logOut = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
  } catch (error) {
    alert(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const payload = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        userAvatar: user.photoURL,
      };
      dispatch(authSlice.actions.updateUserProfile(payload));
      dispatch(authSlice.actions.authStateChange(true));
    }
  });
};

export { registration, login, logOut, authStateChangeUser };
