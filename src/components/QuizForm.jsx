import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

const QuizForm = () => {
    const [number, setNumber] = useState(10)
    const [category, setCategory] = useState('0')
    const navigate = useNavigate()

    const handleStart = (e) => {
        e.preventDefault()
        navigate('/quiz', { state: { number, category } })
    }

    return (
        <div>
            {/* <!-- Quiz Controls --> */}
            <Form onSubmit={handleStart}>
                <Row className="mb-4">
                    {/* <!-- numberSelect --> */}
                    <Col md={6}>
                        <Form.Group controlId="numberSelect">
                            <Form.Label>Number of Questions:</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="20"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    {/* <!-- categorySelect --> */}
                    <Col md={6}>
                        <Form.Group controlId="categorySelect">
                            <Form.Label>Select Category:</Form.Label>
                            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="0">Any category</option>
                                <option value="9">General knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals & Theatres</option>
                                <option value="14">Entertainment: Television</option>
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option>
                                <option value="17">Science & Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">Entertainment: Comics</option>
                                <option value="30">Science: Gadgets</option>
                                <option value="31">Entertainment: Japanese Anime & Manga</option>
                                <option value="32">Entertainment: Cartoon & Animations</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* <!-- Start Quiz --> */}
                <div className="text-center pt-2">
                    <Button variant="primary" size="lg" type="submit">Start Quiz</Button>
                </div>
            </Form>
        </div>
    );
};

export default QuizForm;