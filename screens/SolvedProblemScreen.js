import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import ProblemCmp from "../components/SolvedScreenComponent/ProblemCmp";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import UsersServices from "../services/Users.services";
import problemServices from "../services/problem.services";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const ExploreProblemStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="explore"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="explore" component={SolvedProblemScreen} />
      <Stack.Screen name="exploreDomain" component={ExploreDomainData} />
    </Stack.Navigator>
  );
};

const ExploreDomainData = ({}) => {
  const route = useRoute();
  const user = useSelector(selectUser);
  const [problemData, setProblemData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const data = await UsersServices.getSolvedProblems(user);
      // const final_data = await problemServices.getSolvedProblems(data);
      const demo_data = await problemServices.getSpecificDomainProblem(
        route.params.domainName
      );
      // console.log(route.params.domainName);
      setProblemData(demo_data);
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
        {route.params.domainName} Problems
      </Text>
      <ScrollView>
        {problemData.length != 0 &&
          problemData.map((problem, index) => (
            <ProblemCmp
              key={index}
              problem_stmt={problem.problem_stmt}
              problem_url={problem.problem_url}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const SolvedProblemScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [problemData, setProblemData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersServices.getSolvedProblems(user);
      const final_data = await problemServices.getSolvedProblems(data);
      setProblemData(final_data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
        Explore Various Problem
      </Text>
      <ScrollView>
        <Pressable
          onPress={() => {
            navigation.navigate("exploreDomain", { domainName: "Arrays" });
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
            Arrays
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("exploreDomain", { domainName: "LinkedList" });
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
            Linked List
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("exploreDomain", { domainName: "Matrix" });
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
            Matrix
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    zIndex: 50,
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
});

export default ExploreProblemStack;
