import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React from "react";
import SignUpForm from "../components/SignUpScreen/SignUpForm";

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        zIndex: 50,
        paddingTop: StatusBar.currentHeight || 0,
        padding: 10,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          flex: 0.2,
          paddingTop: "15%",
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        SIgn Up
      </Text>
      <SignUpForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default SignUpScreen;
