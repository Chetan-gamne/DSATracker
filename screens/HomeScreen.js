import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import Header from "../components/Home/Header";
import MainContent from "../components/Home/MainContent";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        zIndex: 50,
        paddingTop: StatusBar.currentHeight || 0,
        padding: 10,
      }}
    >
      <Header />
      <MainContent />
      {/* <BottomNavigation /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
