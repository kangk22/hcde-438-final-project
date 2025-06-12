import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Spinner, Alert, Button, Row, Col } from 'react-bootstrap'
import QuestionCard from '../components/QuestionCard'

const QuizPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const number = state?.number || 10
  const category = state?.category || '0'

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [pendingScore, setPendingScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showNext, setShowNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const API_URL = `https://opentdb.com/api.php?amount=${number}&type=multiple${category !== '0' ? `&category=${category}` : ''}`

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(q => ({
          ...q,
          answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
        }))
        setQuestions(formatted)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [API_URL])

  const shuffle = array => array.sort(() => Math.random() - 0.5)

  const handleAnswer = (answer) => {
    if (selectedAnswer) return

    const question = questions[currentIndex]
    const isCorrect = answer === question.correct_answer

    setSelectedAnswer(answer)
    setShowNext(true)

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
      const difficulty = question.difficulty
      const points = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 200
      setPendingScore(points)
    } else {
      setPendingScore(0)
    }
  }

  const handleNext = () => {
    setScore(prev => prev + pendingScore)
    setPendingScore(0)
    setSelectedAnswer(null)
    setShowNext(false)
    setCurrentIndex(prev => prev + 1)
  }

  const handleRestart = () => {
    if (window.confirm("Are you sure you want to restart the quiz? Your current progress will be lost.")) {
      setScore(0)
      setCorrectAnswers(0)
      setPendingScore(0)
      setSelectedAnswer(null)
      setShowNext(false)
      setCurrentIndex(0)
      setLoading(true)
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const formatted = data.results.map(q => ({
            ...q,
            answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
          }))
          setQuestions(formatted)
          setLoading(false)
        })
    }
  }

  const handleEndQuiz = () => {
    if (window.confirm("Are you sure you want to end the quiz? You will not be able to answer the remaining questions.")) {
      navigate('/results', {
        state: { score: score + pendingScore, correctAnswers, totalQuestions: number }
      })
    }
  }

  const handleSave = async () => {
  const q = questions[currentIndex];
  const entry = {
    question: q.question,
    correctAnswer: q.correctAnswer,
    category: q.category,
    difficulty: q.difficulty,
  };

  try {
    await saveTriviaQuestion(currentUser.uid, entry);
    console.log("Trivia saved:", entry);
  } catch (err) {
    console.error("Error saving trivia:", err);
  }
};

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  if (error || questions.length === 0) {
    return <Alert variant="danger" className="text-center">Something went wrong. Please try again later.</Alert>
  }

  if (currentIndex >= questions.length) {
    navigate('/results', {
      state: { score: score + pendingScore, correctAnswers, totalQuestions: number }
    })
    return null
  }

  return (
    <Container className="my-4 w-75">
      {/* <!-- Restart/End Quiz Buttons --> */}
      <Row className="mb-4">
        {/* <!-- Restart Quiz --> */}
        <Col>
          <Button variant="outline-danger" size="sm" onClick={handleRestart}>
            Restart Quiz
          </Button>
        </Col>
        {/* <!-- End Quiz --> */}
        <Col className="text-end">
          <Button variant="outline-danger" size="sm" onClick={handleEndQuiz}>
            End Quiz
          </Button>
        </Col>
      </Row>

      {/* <!-- Current Question and Score --> */}
      <Row>
        {/* <!-- Current Question --> */}
        <Col>
          <p>Question: {currentIndex + 1} / {questions.length}</p>
        </Col>
        {/* <!-- Score --> */}
        <Col className="text-end">
          <p>
            Score: {score}
            {showNext && pendingScore > 0 && (
              <span> (+{pendingScore})</span>
            )}
          </p>
        </Col>
      </Row>

      {/* <!-- Question Card --> */}
      <QuestionCard
        question={questions[currentIndex]}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        showNext={showNext}
        onNext={handleNext}
        onSave={handleSave}
      />
    </Container>
  )
}

export default QuizPage