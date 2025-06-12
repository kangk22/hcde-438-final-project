import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";

// Saves a trivia question to Firestore
export const saveTriviaQuestion = async (uid, trivia) => {
  return await addDoc(collection(db, "SavedTrivia"), {
    uid,
    question: trivia.question,
    correctAnswer: trivia.correctAnswer,
    category: trivia.category,
    difficulty: trivia.difficulty,
    savedAt: new Date(),
  });
};

// Real-time listener for saved trivia
export const subscribeToUserTrivia = (uid, callback) => {
  const q = query(
    collection(db, "SavedTrivia"),
    where("uid", "==", uid),
    orderBy("savedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const trivia = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(trivia);
  });
};

// Delete a single saved trivia
export const deleteTriviaQuestion = async (id) => {
  await deleteDoc(doc(db, "SavedTrivia", id));
};