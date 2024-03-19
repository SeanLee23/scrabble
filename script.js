const letters = {
    A: { value: 1 },
    B: { value: 3 },
    C: { value: 3 },
    D: { value: 2 },
    E: { value: 1 },
    F: { value: 4 },
    G: { value: 2 },
    H: { value: 4 },
    I: { value: 1 },
    J: { value: 8 },
    K: { value: 5 },
    L: { value: 1 },
    M: { value: 3 },
    N: { value: 1 },
    O: { value: 1 },
    P: { value: 3 },
    Q: { value: 10 },
    R: { value: 1 },
    S: { value: 1 },
    T: { value: 1 },
    U: { value: 1 },
    V: { value: 4 },
    W: { value: 4 },
    X: { value: 8 },
    Y: { value: 4 },
    Z: { value: 10 }
};

const letterKeys = Object.keys(letters);

let generatedLetters = [];

// Function to generate random letters
function generateLetters() {
    for (let i = 0; i < 7; i++) { // Generate 7 letters
        const randomIndex = Math.floor(Math.random() * letterKeys.length);
        const letter = letterKeys[randomIndex];
        generatedLetters.push(letter);
    }
    displayLetters();
}

// Function to display generated letters
function displayLetters() {
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.innerHTML = '';
    generatedLetters.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;
        lettersContainer.appendChild(letterElement);
    });
}

// Function to check if the submitted word is valid
function checkWord(word) {
    // Here you can implement word validation logic (e.g., using a dictionary)
    // For simplicity, let's assume all words are valid
    return true;
}

// Function to calculate the score of a word
function calculateScore(word) {
    let score = 0;
    for (const letter of word) {
        score += letters[letter].value;
    }
    return score;
}

// Function to display a message
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

// Function to update the score display
function updateScore(score) {
    const scoreValueElement = document.getElementById('score-value');
    scoreValueElement.textContent = score;
}

// Function to handle word submission
document.getElementById('submit-word-button').addEventListener('click', () => {
    const wordInput = document.getElementById('word');
    const word = wordInput.value.trim().toUpperCase();
    if (word.length === 0) {
        showMessage('Please enter a word.');
        return;
    }

    if (validateWordWithLetters(word)) {
        if (checkWord(word)) {
            const score = calculateScore(word);
            showMessage(`"${word}" is a valid word!`);
            updateScore(score);
        } else {
            showMessage(`"${word}" is not a valid word.`);
        }
    } else {
        showMessage(`"${word}" contains letters not found in the generated pool.`);
    }

    // Clear input field
    wordInput.value = '';
});

// Function to check if the submitted word contains only letters from the generated pool
function validateWordWithLetters(word) {
    const wordLetters = word.split('');
    const availableLetters = [...generatedLetters]; // Create a copy of generated letters
    for (const letter of wordLetters) {
        const index = availableLetters.indexOf(letter);
        if (index === -1) {
            return false; // Letter not found in the available letters
        }
        availableLetters.splice(index, 1); // Remove the letter from available letters
    }
    return true; // All letters in the word are found in the generated pool
}

// Generate initial set of letters
generateLetters();