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

const problemRef = collection(db, "ProblemsData");

class ProblemData {
  getAllProblems = async () => {
    let final_array = [];
    const collectionData = collectionGroup(db, "Problems");
    const data = await getDocs(collectionData);
    data.forEach((doc) => {
      final_array.push(doc.data());
    });
    return final_array;
  };

  getSpecificProblem = async (doc_id) => {
    const collectionData = query(collectionGroup(db, "Problems"));
    const data = await getDocs(collectionData);
    let objectInfo;
    data.forEach((doc) => {
      if (doc.id === doc_id) {
        objectInfo = doc.data();
      }
    });
    return objectInfo;
  };

  getSolvedProblems = async (solved_problem_array) => {
    const collectionData = query(collectionGroup(db, "Problems"));
    let final_array = [];
    const data = await getDocs(collectionData);
    data.forEach((doc) => {
      if (solved_problem_array.includes(doc.id)) {
        final_array.push(doc.data());
      }
    });
    return final_array;
  };

  getSpecificDomainProblem = async (domain_str) => {
    let final_array = [];
    const collectionData = query(
      collectionGroup(db, "Problems"),
      where("root_id", "==", domain_str)
    );
    const data = await getDocs(collectionData);
    data.forEach((doc) => {
      final_array.push(doc.data());
    });
    return final_array;
  };
}

export default new ProblemData();
