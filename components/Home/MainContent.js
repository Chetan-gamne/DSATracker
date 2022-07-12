import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import React, { useEffect, useState, Image } from "react";
import Problems from "./Problems";
import Quotes from "./Quotes";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const MainContent = () => {
  const [data, setData] = useState({});
  const problemsRef = collection(db, "problemsContent");
  const [problemsList, setProblemsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://zenquotes.io/api/today");
      var quoteData = await response.json();
      setData({ author: quoteData[0].a, text: quoteData[0].q });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getDocs(problemsRef);
      setProblemsList(
        problems.docs.map((problem) => ({ ...problem.data(), id: problem.id }))
      );
    };
    fetchProblems();
  }, []);

  return (
    <View style={styles.container}>
      <Quotes author={data.author} title={data.text} />
      {/* <Button title="Refresh" onPress={handleNotification} /> */}
      <Text style={styles.problemStmt}>Problems For Today :</Text>
      <ScrollView>
        {problemsList.map((problem) => (
          <Problems
            key={problem.id}
            problem_id={problem.id}
            problem_stmt={problem.problem_stmt}
            problem_url={problem.problem_url}
            solved={problem.solved}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  problemStmt: {
    padding: 5,
    marginBottom: 3,
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MainContent;
