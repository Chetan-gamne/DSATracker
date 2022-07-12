import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";

const Submission = () => {
  return (
    <View style={styles.container}>
      <Text>Submission</Text>
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

export default Submission;
