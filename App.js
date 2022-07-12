// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import Navigation from "./Navigation";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return <AuthNavigation />;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
});
