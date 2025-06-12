import { Button } from 'react-bootstrap'
import '../App.css'

const ChoiceButton = ({ answer, isCorrect, isSelected, showCorrect, onClick }) => {
  let style = { }

  if (showCorrect) {
    if (isCorrect) style = { backgroundColor: 'green', color: 'white' }
    else if (isSelected) style = { backgroundColor: 'red', color: 'white' }
    else style = { backgroundColor: 'white' }
  }

  return (
    <Button
      className="text-wrap white-background my-1"
      style={style}
      variant="outline-primary"
      onClick={onClick}
      disabled={showCorrect}
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  )
}

export default ChoiceButton