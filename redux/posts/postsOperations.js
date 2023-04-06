import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const addPost =
  ({ title, locationName, photoUrl, userId, login, userAvatar, location }) =>
  async (dispatch, getState) => {
    try {
      await addDoc(collection(db, "posts"), {
        userId,
        login,
        userAvatar,
        title,
        locationName,
        location,
        photoUrl,
      });
    } catch (error) {
      alert(error.message);
    }
  };

const addCommentByPostID =
  (postId, commentData) => async (dispatch, getState) => {
    try {
      const { login, userId, userAvatar } = getState().auth.user;

      const comment = {
        comment: commentData,
        authorName: login,
        authorId: userId,
        authorAvatar: userAvatar,
        postId: postId,
      };

      const docRef = doc(db, "posts", postId);

      await addDoc(collection(docRef, "comments"), { ...comment });
    } catch (error) {
      alert(error.message);
    }
  };

const postsOperations = {
  addPost,
  addCommentByPostID,
};

export default postsOperations;
