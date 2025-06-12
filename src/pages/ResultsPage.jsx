import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import QuizForm from "../components/QuizForm";
import kirby from '../assets/kirby-star.gif'

const ResultsPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { score = 0, correctAnswers = 0, totalQuestions = 0 } = state || {}

    return (
        <Container className="my-4 w-75">
            {/* <!-- Results Container --> */}
            <div className="bg-primary-subtle pt-4 pb-1 mt-3 rounded-2">
                <h1 className="text-center pb-3">Congratulations! ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</h1>
                <h4 className="px-5 py-2">Your final score was: <strong>{score}</strong> points</h4>
                <h4 className="px-5 py-2">
                    You correctly answered: <strong>{correctAnswers} / {totalQuestions}</strong> questions
                </h4>
                <div className="text-center pb-3">
                    <img src={kirby} alt="Kirby celebrating" style={{ height: 200 }}/>
                </div>
            </div>

            <div className="pt-4 pb-3">
                <h2 className="text-center">Play again?</h2>
            </div>

            {/* <!-- Quiz Form --> */}
            <QuizForm />
        </Container>
    )
}

export default ResultsPage