import { View, Text, StyleSheet, StatusBar, Image, Button } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";

const PersonalInfo = () => {
  const user = useSelector(selectUser);
  const updateInfo = async () => {
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      username: "Chetan Gamne",
    }).then(() => {
      console.log("Update Data Successfully");
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVuc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.textWrap}>
          <Text style={styles.profileText}>{user.name}</Text>
          <AntDesign name="user" size={30} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.profileText}>{user.email}</Text>
          <Fontisto name="email" size={30} />
        </View>
      </View>
      <Button title="Update Info" onPress={updateInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    zIndex: 50,
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  imgContainer: {
    flex: 0.3,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    height: 130,
    width: 130,
    resizeMode: "cover",
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 13,
    fontWeight: "700",
  },
  profileInfo: {
    flex: 0.7,
    paddingVertical: 15,
  },
  textWrap: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#F5F5F5",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileText: {},
});

export default PersonalInfo;
