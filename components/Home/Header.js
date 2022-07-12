import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";

const handleSignOut = async () => {
  try {
    await app.auth().signOut();
    console.log("Signed Out Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const Header = () => {
  const [ProfileModalStatus, setStatus] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log("User: ", user);
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <View>
        <Text style={styles.smallText}>{new Date().toUTCString()}</Text>
        <Text style={styles.largeText}>Daily Activity</Text>
      </View>
      <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => setStatus(!ProfileModalStatus)}>
          <View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVuc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={styles.imgStyle}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: ProfileModalStatus ? "flex" : "none",
            zIndex: 100,
          }}
        >
          <View style={{ ...styles.smallNotch, ...styles.shadowCss }}></View>
          <View
            style={{
              ...styles.ProfileModal,
              ...styles.shadowCss,
            }}
          >
            <View>
              {user?.name && (
                <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                  {user.name}
                </Text>
              )}

              {user?.email && (
                <Text style={{ textAlign: "left", fontSize: 10 }}>
                  {user.email}
                </Text>
              )}
            </View>

            <View style={{ marginHorizontal: 5, marginVertical: 3 }}>
              <Button title="Log Out" onPress={handleSignOut} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    fontSize: 11,
  },
  largeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imgStyle: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  ProfileModal: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#f5f5f5",
    marginVertical: 13,
    height: 80,
    padding: 5,
    borderRadius: 10,
    resizeMode: "contain",
    width: 150,
    height: 100,
    justifyContent: "space-between",
  },
  smallNotch: {
    position: "absolute",
    top: "100%",
    backgroundColor: "#f5f5f5",
    right: 0,
    marginTop: 5,
    marginHorizontal: 7,

    transform: [{ rotate: "49deg" }],
    height: 30,
    width: 30,
  },
  shadowCss: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default Header;
