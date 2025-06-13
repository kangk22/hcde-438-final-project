# Kirby's Brain Buffet

My final project for HCDE 438.

## Project overview and purpose

 “Kirby’s Brain Buffet” is a trivia app that gives users the ability to generate and play trivia quizzes on demand.
 This app is a fun way for people to test their knowledge of random trivia and learn new things.
 It allows the user to control the number of questions and category when creating each quiz,
 and it gives immediate feedback if the guessed answer was correct or incorrect.
 Each quiz will keep track the user’s score and number of correct answers, and 
 users can also register for or login to a profile where they can save interesting any trivia questions.

## Technologies used

- **Frontend**: React (with Vite)
- **Routing**: React Router
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Styling**: React Bootstrap
- **Deployment**: Firebase Hosting

## Setup and installation instructions

**Run this application locally**:
- Download the files and open them in an IDE like Visual Studio Code
- In your terminal, type "npm run dev"
- Open the link (http://localhost:5173/) in a browser

**Run this application online**:
- Simply direct yourself to this website link: https://hcde-438-trivia-app.web.app/

## Usage guidelines

You can use this app however you'd like.

## API documentation

I used API from Open Trivia Database (https://opentdb.com/api_config.php).

## Future enhancements or known issues
The biggest known issue in the website right now is with the SaveTrivia component.
It is able to display your saved trivia if you go to to your profile straight after saving quesitons from a quiz,
but if you reload the page, the saved trivia will not load those questions.
In other words, it doesn't actually show the whole history of your saved trivia questions, but will only
display the questions you saved in one session or without reloading the page.
I'm not sure why this is the case, but since it seems that all the saved trivia remain in the Firestore database,
it is likely due to a bug in my SavedTrivia.jsx file.
<br/>
Besides that, some other future enchancements I would like to make if I were to continue developing this website
is to also track the user's highest score, both overall and within certain categories. I would also add a warning
if the user presses on Register, Login, or Profile while in the middle of a quiz, since that would cause them to
lose thier progress in that particular quiz. Finally, I think it would be nice to add a "hint" button for each question
that would elimate one incorrect answer but only give half the points of the question's difficulty value.