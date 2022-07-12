import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Quotes = ({ author, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.author}>
        <Text>{author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  author: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // color: "black",
    // backgroundColor: "red",
  },
  title: {
    fontWeight: "700",
  },
});

export default Quotes;
