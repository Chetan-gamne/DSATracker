import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  setDoc,
  deleteDoc,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { setUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
const SignUpForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showSpinner, setSpinner] = useState(false);
  const userRef = collection(db, "users");
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(8, "Atleast 8 minimum character should be there in your passoword"),
  });

  useEffect(() => {
    return () => {
      setSpinner(false);
    };
  }, []);

  const onSignUp = async (email, username, password) => {
    try {
      setSpinner(true);
      let useruid = null;
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          useruid = response.user.uid;
          console.log(useruid);
        });
      dispatch(setUser({ name: username, email: email, id: useruid }));
      await setDoc(doc(db, "users", useruid), {
        email: email,
        username: username,
        password: password,
      }).then("Successfully added user to user collection");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          onSignUp(values.email, values.username, values.password);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          isValid,
        }) => (
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
            <View style={[styles.inputField]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="User Name"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.username}
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
                name="username"
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
            <Pressable
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={showSpinner}
            >
              {showSpinner ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Already have an Account</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6BB0F5", marginLeft: 10 }}>
                  Sign In
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

export default SignUpForm;
