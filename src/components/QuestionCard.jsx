import { useAuth } from "../context/AuthContext";
import Button from 'react-bootstrap/Button'
import ChoiceButton from './ChoiceButton'

const QuestionCard = ({ question, selectedAnswer, onAnswer, showNext, onNext }) => {
  const { currentUser } = useAuth();
  // const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // <Button
    //   variant={saved ? 'outline-success' : 'outline-secondary'}
    //   size="sm"
    //   className="white-background"
    //   onClick={handleSave}
    //   disabled={saved}
    // />

    // if (saved) return // prevent duplicate saves

    // const savedData = {
    //   question: question.question,
    //   answer: question.correct_answer,
    //   category: question.category,
    //   difficulty: question.difficulty,
    // }

    // console.log('Saved:', savedData)
    // setSaved(true)
  }

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
          <Button variant="outline-secondary white-background" size="sm" onClick={handleSave}>Save trivia to profile</Button>
        </div>
      ) : null}
    </div>
  )
}

export default QuestionCard