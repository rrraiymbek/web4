
const express = require("express");
const router = express.Router();

const quizQuestions = [
    {
      question: "What type of footwear is designed for athletic or casual wear, usually featuring a rubber sole and comfortable fit?",
      options: ["High Heels", "Sneakers", "Boots"],
      correctAnswer: "Sneakers",
    },
    {
      question: "Which fabric is commonly associated with a rugged, casual style and is often used to make jackets and pants?",
      options: ["Cotton", "Denim", "Silk"],
      correctAnswer: "Denim",
    },
    {
      question: "In fashion, what is the term for a small, decorative item worn on clothing, such as for aesthetic or identification purposes?",
      options: ["Brooch", "Belt", "Necklace"],
      correctAnswer: "Brooch",
    },
    {
      question: "Which headgear, typically made of straw or fabric, is associated with sunny weather and often worn at outdoor events?",
      options: ["Top Hat", "Baseball Cap", "Sun Hat"],
      correctAnswer: "Sun Hat",
    },
    {
      question: "What is the name for a long, flowing outer garment worn over other clothing, often associated with formal events or chilly weather?",
      options: ["Cape", "Poncho", "Shawl"],
      correctAnswer: "Cape",
    },
  ];
const correctAnswers = quizQuestions.map((question) => question.correctAnswer);

router.get("/quiz", async (req, res) => {
  res.render("quiz", { questions: quizQuestions });
});

router.post("/submit-quiz", (req, res) => {
  try {
    // Assuming req.body contains user answers, you should adjust this based on your form structure
    const userAnswers = quizQuestions.map(
      (question, index) => req.body[`answer${index}`]
    );

    const score = calculateScore(userAnswers, correctAnswers);

    res.redirect(`/quiz-results?score=${score}`);
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).send("Error submitting quiz. Please try again.");
  }
});

router.get("/quiz-results", (req, res) => {
  const score = req.query.score;

  res.render("quiz-result", { score });
});
function calculateScore(userAnswers, correctAnswers) {
  let score = 0;

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }

  return score;
}

module.exports = router;
