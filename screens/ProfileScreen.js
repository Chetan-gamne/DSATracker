import { View, StyleSheet, StatusBar, Pressable, Text } from "react-native";
import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalInfo from "../components/Profile/PersonalInfo";
import ConfigureNotification from "../components/Profile/ConfigureNotification";
import Submission from "../components/Profile/Submission";
import app from "../firebaseConfig";

const Stack = createStackNavigator();

const handleSignOut = async () => {
  try {
    await app.auth().signOut();
    console.log("Signed Out Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InsideProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="InsideProfile" component={ProfileScreen} />
      <Stack.Screen name="Personal" component={PersonalInfo} />
      <Stack.Screen
        name="ConfigureNotification"
        component={ConfigureNotification}
      />
      <Stack.Screen name="Submission" component={Submission} />
    </Stack.Navigator>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <Pressable
        onPress={() => {
          navigation.navigate("Personal");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            marginTop: 14,
            elevation: 2,
            fontWeight: "700",
            fontSize: 17,
          }}
        >
          Personal Info
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Submission");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            marginTop: 14,
            elevation: 2,
            fontWeight: "700",
            fontSize: 17,
          }}
        >
          Submission
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("ConfigureNotification");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#f5f5f5",
            borderRadius: 10,
            marginTop: 14,
            elevation: 2,
            fontWeight: "700",
            fontSize: 17,
          }}
        >
          Configure Notification
        </Text>
      </Pressable>
      <Pressable onPress={handleSignOut}>
        <Text
          style={{
            padding: 10,
            backgroundColor: "#ed4337",
            color: "white",

            marginTop: 14,
            elevation: 2,
            fontWeight: "700",
            fontSize: 17,
          }}
        >
          Log Out
        </Text>
      </Pressable>
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

export default ProfileStack;
