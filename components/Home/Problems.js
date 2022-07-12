import { View, Text, StyleSheet, Linking } from "react-native";
import React, { useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector } from "react-redux";
import { selectProblemSolved } from "../../slices/solvedProblemSlice";
import { useDispatch } from "react-redux";
import { addProblem } from "../../slices/solvedProblemSlice";
import { removeProblem } from "../../slices/solvedProblemSlice";

const Problems = ({ problem_stmt, problem_url, problem_id }) => {
  const dispatch = useDispatch();
  const solvedProblem = useSelector(selectProblemSolved);
  const handleProblem = () => {
    dispatch(addProblem(problem_id));
  };
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
        <BouncyCheckbox
          iconStyle={{ borderRadius: 0 }}
          fillColor="green"
          onPress={() => handleProblem()}
        />
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

export default Problems;
