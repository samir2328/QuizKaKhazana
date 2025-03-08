let score = 0;
let currentQuestion = {};

// Generate random numbers between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a new math question
function generateQuestion() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = getRandomNumber(1, 20);
    const num2 = getRandomNumber(1, 20);
    
    let answer;
    switch(operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
    }

    currentQuestion = {
        question: `${num1} ${operation} ${num2} = ?`,
        answer: answer
    };

    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedback = document.getElementById('feedback');
    
    if (isNaN(userAnswer)) {
        feedback.textContent = 'Please enter a valid number!';
        feedback.className = 'incorrect';
        return;
    }

    if (userAnswer === currentQuestion.answer) {
        score++;
        feedback.textContent = 'Correct! 🎉';
        feedback.className = 'correct';
    } else {
        feedback.textContent = `Wrong! The correct answer was ${currentQuestion.answer}`;
        feedback.className = 'incorrect';
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    
    // Generate a new question after a short delay
    setTimeout(generateQuestion, 1500);
}

// Start the quiz when the page loads
generateQuestion();

// Allow Enter key to submit answer
document.getElementById('answer').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
}); 