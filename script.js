 

  fetch("quiz-data.json")
  .then((response) => response.json())
  .then((data) => {
    let currentQuestion = 0;
    let score = 0;
    const questions = data;
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");
    const resultElement = document.getElementById("result");

    function loadQuestion() {
      const questionData = questions[currentQuestion];
      questionElement.textContent = questionData.question;
      optionsElement.innerHTML = "";
      questionData.options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        optionLabel.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
        optionsElement.appendChild(optionLabel);
      });
    }

    loadQuestion();

    submitButton.addEventListener("click", () => {
      const selectedAnswer = document.querySelector('input[name="answer"]:checked');
      if (selectedAnswer) {
        if (selectedAnswer.value === questions[currentQuestion].answer) {
          score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion();
        } else {
          resultElement.textContent = `You scored ${score} out of ${questions.length}.`;
          if (score === questions.length) {
            resultElement.textContent += " Excellent!";
          }
          submitButton.disabled = true;
        }
      }
    });
  });
