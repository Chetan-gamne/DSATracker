import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProblem } from "../../slices/solvedProblemSlice";

const ProblemCmp = ({ problem_stmt, problem_url }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.statment}>{problem_stmt}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          onPress={() => Linking.openURL(`${problem_url}`)}
          style={styles.link}
        >
          Link to Reference
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 11,
  },
  statment: {
    fontWeight: "700",
    marginBottom: 10,
  },
  link: {
    color: "#104a8e",
    // textAlign: "right",
    fontWeight: "500",
  },
});

export default ProblemCmp;
