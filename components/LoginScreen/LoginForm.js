import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebaseConfig";
import { Formik } from "formik";
import * as Yup from "yup";
import { setUser } from "../../slices/userSlice";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  deleteDoc,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showSpinner, setSpinner] = useState(false);
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Atleast 8 minimum character should be there in your passoword"),
  });

  useEffect(() => {
    return () => {
      setSpinner(false);
    };
  }, []);

  const onLogIn = async (email, password) => {
    try {
      setSpinner(true);
      let useruid = null;
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((Response) => {
          useruid = Response.user.uid;
        });
      let demo = await getDoc(doc(db, "users", useruid));
      dispatch(
        setUser({ name: demo.data().username, email: email, id: useruid })
      );
    } catch (error) {
      setSpinner(false);
      Alert.alert("Enter Valid UserName and Password");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          onLogIn(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={[styles.inputField]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, username or email"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                autoFocus={true}
                name="email"
              />
            </View>
            <View style={styles.inputField}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password"
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                name="password"
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot Password</Text>
            </View>
            <Pressable
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={showSpinner}
            >
              {showSpinner ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Don't have an Account</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6BB0F5", marginLeft: 10 }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 0.8,
  },

  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },

  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9ACAF7",
    alignItems: "center",
    minHeight: 42,
    justifyContent: "center",
    borderRadius: 4,
  }),

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },

  signUpContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default LoginForm;
