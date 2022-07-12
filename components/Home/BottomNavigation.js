import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import SolvedProblemScreen from "../../screens/SolvedProblemScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
const Tab = createBottomTabNavigator();

// const BottomNavigation = () => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity>
//         <Image
//           source={require("../../assets/home.png")}
//           style={styles.bottomIcon}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Image
//           source={require("../../assets/drone.jpg")}
//           style={styles.bottomIcon}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Image
//           source={require("../../assets/profile.jpg")}
//           style={styles.bottomIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Solved"
        component={SolvedProblemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="dots-three-horizontal" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    padding: 10,
  },
  bottomIcon: {
    height: 30,
    width: 30,
  },
});

export default BottomNavigation;
