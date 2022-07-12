import { View, Text } from "react-native";
import React from "react";

const Todo = ({ title, completed }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        marginVertical: 10,
      }}
    >
      <Text style={{ fontWeight: "bold", flex: 0.6 }}>{title}</Text>
      <Text
        style={{
          color: completed ? "green" : "red",
          flex: 0.4,
          textAlign: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {completed ? "Done" : "Not Completed"}
      </Text>
    </View>
  );
};

export default Todo;
