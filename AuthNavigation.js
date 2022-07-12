import React, { useEffect, useState } from "react";
import { SignedInStack, SignedOutStack } from "./Navigation";
import app from "./firebaseConfig";
import { Provider } from "react-redux";
import { store } from "./store";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(
    () => app.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );
  return (
    <Provider store={store}>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </Provider>
  );
};

export default AuthNavigation;
