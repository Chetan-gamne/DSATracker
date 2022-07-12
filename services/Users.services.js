import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  deleteDoc,
  collectionGroup,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

class UserService {
  getUser = async (user) => {
    const docRef = doc(db, "users", user.id);
    const data = await getDoc(docRef);
    console.log(data.data());
    return data.data();
  };

  getSolvedProblems = async (user) => {
    let demo = await getDoc(doc(db, "users", user.id));
    return demo.data().solvedProblems;
  };
}

export default new UserService();
