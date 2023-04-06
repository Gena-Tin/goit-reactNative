import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewComponent,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";

import SendCommentIcon from "../../assets/icons/icoSendComment";
import { authSelectors } from "../../redux/auth/authSelectors";
import postsOperations from "../../redux/posts/postsOperations";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const dispatch = useDispatch();

  const [borderInputColorComment, setBorderInputColorComment] =
    useState("#E8E8E8");

  const { userId } = useSelector(authSelectors.getUser);

  const addComment = () => {
    dispatch(postsOperations.addCommentByPostID(postId, comment));
  };

  const getAllComments = async () => {
    const docRef = doc(db, "posts", postId);
    await onSnapshot(collection(docRef, "comments"), (data) => {
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onReserForm = () => {
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />
      </View>
      <View style={{ ...styles.containerList }}>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.containerItem,
                flexDirection: item.authorId === userId ? "row-reverse" : "row",
              }}
            >
              <Image
                source={{ uri: item.authorAvatar }}
                style={{
                  ...styles.authorAvatar,
                  marginRight: item.authorId === userId ? 0 : 16,
                  marginLeft: !item.authorId === userId ? 0 : 16,
                }}
              />
              <View
                style={{
                  ...styles.commentWrapper,
                  borderTopRightRadius: item.authorId === userId ? 0 : 16,
                  borderTopLeftRadius: !item.authorId === userId ? 0 : 16,
                }}
              >
                <Text style={styles.commentAuthor}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          ...styles.inputWrapper,
        }}
      >
        <TextInput
          onChangeText={setComment}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
          placeholder="Comments..."
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
        />
        <TouchableOpacity onPress={addComment}>
          <SendCommentIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  containerList: {
    paddingTop: 32,
    height: 323,
  },
  containerItem: {
    display: "flex",
    flexDirection: "row",

    paddingBottom: 24,

    backgroundColor: "#FFFFFF",
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,

    backgroundColor: " rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  commentAuthor: {
    marginBottom: 8,

    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  inputWrapper: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingRight: 8,
  },
});

export default CommentsScreen;
