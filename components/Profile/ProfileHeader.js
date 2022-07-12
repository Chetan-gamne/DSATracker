import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
const ProfileHeader = () => {
  const user = useSelector(selectUser);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 10,
          justifyContent: "center",
        }}
      >
        <Text style={styles.textStyle}>{user?.name}</Text>
        <Text style={styles.textStyle}>{user?.email}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVuc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={styles.imgStyle}
        />
      </View>
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
  imgStyle: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 13,
    fontWeight: "700",
  },
});

export default ProfileHeader;
