import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext";
import Button from 'react-bootstrap/Button'
import ChoiceButton from './ChoiceButton'
import { saveTriviaQuestion } from "../services/firestore";

const QuestionCard = ({ question, selectedAnswer, onAnswer, showNext, onNext }) => {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);

  // Saves the trivia question to the user's profile
  const handleSave = async () => {
    if (saved) return // prevents duplicate saves apparently

    const savedData = {
      question: question.question,
      correctAnswer: question.correct_answer,
      category: question.category,
      difficulty: question.difficulty,
    }

    console.log('Saved:', savedData)
    setSaved(true)

    try {
      await saveTriviaQuestion(currentUser.uid, savedData);
      console.log("Saved to Firestore:", savedData);
    } catch (err) {
      console.error("Error saving trivia:", err);
    }
  }

  // Reset save state when new question is shown
  useEffect(() => {
    setSaved(false)
  }, [question])

  return (
    <div className="bg-secondary-subtle py-4 px-3 rounded-2">
      {/* Question Category/Title/Difficulty */}
      <p className="text-center">{question.category}</p>
      <h2 className="text-center px-5" dangerouslySetInnerHTML={{ __html: question.question }} />
      <p className="text-center text-muted">Difficulty: {question.difficulty}</p>

      {/* Choices List */}
      <div className="d-grid gap-2 col-6 mx-auto my-3">
        {question.answers.map((ans, idx) => (
          <ChoiceButton
            key={idx}
            answer={ans}
            isCorrect={ans === question.correct_answer}
            isSelected={ans === selectedAnswer}
            showCorrect={!!selectedAnswer}
            onClick={() => onAnswer(ans)}
          />
        ))}
      </div>

      {/* Next Button */}
      {showNext && (
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={onNext}>
            Next
          </Button>
        </div>
      )}

      {/* Option to save trivia question if user is logged in */}
      {showNext && currentUser ? (
        <div className="text-center mt-4">
          <Button
            variant={saved ? 'outline-success' : 'outline-secondary'}
            size="sm"
            className="white-background"
            onClick={handleSave}
          // disabled={saved}
          >
            {saved ? 'Saved!' : 'Save trivia to profile'}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default QuestionCard