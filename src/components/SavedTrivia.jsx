import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToUserTrivia, deleteTriviaQuestion } from "../services/firestore";

const SavedTrivia = () => {
  const { currentUser } = useAuth();
  const [triviaList, setTriviaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToUserTrivia(
      currentUser.uid,
      (trivia) => {
        setTriviaList(trivia);
        setLoading(false);
        setError("");
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trivia?")) return;
    try {
      await deleteTriviaQuestion(id);
      console.log("Deleted trivia:", id);
    } catch (err) {
      console.error("Error deleting trivia:", err);
    }
  };

  if (loading) return <div>Loading your saved trivia...</div>;
  if (error) return <div>Error: {error}</div>;
  if (triviaList.length === 0) return <div>You haven’t saved any trivia yet.</div>;

  return (
    <div className="saved-trivia">
      <h3>Saved Trivia Questions</h3>
      <div className="trivia-list">
        {triviaList.map((trivia) => (
          <div key={trivia.id} className="trivia-item border rounded p-3 mb-3">
            <p><strong>Question:</strong> {trivia.question}</p>
            <p><strong>Answer:</strong> {trivia.correctAnswer}</p>
            <p><strong>Category:</strong> {trivia.category} | <strong>Difficulty:</strong> {trivia.difficulty}</p>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(trivia.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTrivia;