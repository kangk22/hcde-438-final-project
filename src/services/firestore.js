import { 
    collection, 
    addDoc, 
    query, 
    where, 
    orderBy,
    getDocs, 
    Timestamp,
    deleteDoc
  } from "firebase/firestore";
  import { db } from "./firebase";
  import { onSnapshot } from "firebase/firestore";

// Save a trivia question for a user
export const saveTriviaQuestion = async (uid, trivia) => {
  return await addDoc(collection(db, "SavedTrivia"), {
    uid,
    question: trivia.question,
    correctAnswer: trivia.correct_answer,
    category: trivia.category,
    difficulty: trivia.difficulty,
    savedAt: new Date(),
  });
};

// Subscribe to a user's saved trivia
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