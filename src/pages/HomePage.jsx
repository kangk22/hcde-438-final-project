import { useAuth } from "../context/AuthContext";
import { Container, Row, Col } from 'react-bootstrap';
import QuizForm from "../components/QuizForm";
import kirbyHappy from '../assets/kirby-happy.gif';
import kirbyInvite from '../assets/kirby-invite.gif';
import kirbyConfused from '../assets/kirby-confused.gif'

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="my-4 w-75">
      {/* <!-- Welcome Message --> */}
      <div className="py-3">
        {currentUser ? (
          <>
            <h1 className="text-center mb-4">★ Welcome back, {currentUser?.displayName}! ★</h1>
            <div className="text-center mb-4">
              <img src={kirbyHappy} alt="Kirby Rolling Around" style={{ height: 250 }} />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center mb-4">★ Welcome to Kirby's Brain Buffet! ★</h1>
            <h3 className="text-center mb-4 text-muted">Feed your mind, one trivia question at a time.</h3>
            <div className="text-center mb-4">
              <img src={kirbyInvite} alt="Kirby Inviting You" style={{ height: 200 }} />
            </div>
          </>
        )}
      </div>

      {/* <!-- How to Play --> */}
      <div className="bg-light py-3 px-4 rounded-2 mb-4">
        <h3 className="px-3">How to play:</h3>
        <Row>
          <Col sm={7}>
            <ul>
              <li className="pb-1 px-2">Select the number of questions and category, then click "Start Quiz"</li>
              <li className="pb-1 px-2">Your score will be calculated on the questions you get right</li>
              <ul>
                <li className="pb-1 px-2">Easy questions = 50 points</li>
                <li className="pb-1 px-2">Medium questions = 100 points</li>
                <li className="pb-1 px-2">Hard questions = 200 points</li>
              </ul>
              <li className="pb-1 px-2">If you are logged in, you can save interesting trivia to your profile</li>
              <li className="pb-1 px-2">You only get to press an answer once, so guess wisely!</li>
              <li className="pb-1 px-2">Have fun and good luck .☘︎ ݁˖</li>
            </ul>
          </Col>
          {/* <!-- Confused Kirby Gif --> */}
          <Col sm={3} className="d-flex flex-column justify-content-end">
            <div className="text-center pb-5 pr-5 mr-5">
              <img src={kirbyConfused} alt="Confused Kirby" style={{ height: 150 }} />
            </div>
          </Col>
        </Row>
      </div>

      {/* <!-- Quiz Form --> */}
      <QuizForm />
    </Container>
  );
}

export default HomePage;