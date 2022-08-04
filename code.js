// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
let currentClue = {}
let userInput = document.querySelector('#input')
let button = document.querySelector('#button')
let result = ''
let scoreCont = document.querySelector('.score')
let playerScore = 0
let message = document.querySelector('.answer')

let jServiceUrl = function () {
    fetch('https://jservice.kenzie.academy/api/random-clue?valid=true')
        .then(response => response.json())
        .then(payload => {
            currentClue = payload
            console.log(currentClue.answer)
            console.log(currentClue)
            rendercategory(currentClue)
            renderQuestion(currentClue)
            renderValue(currentClue)
        })
}



function rendercategory(obj) {
    let categoryContainer = document.querySelector('.category')
    categoryContainer.innerHTML = `Category: <p>${obj.category.title}</p>`
}

function renderQuestion(obj) {
    let questionContainer = document.querySelector('.question')
    questionContainer.innerHTML = `Question: <p>${obj.question}</p>`
}

function renderValue(obj) {
    let valueContainer = document.querySelector('.value')
    valueContainer.innerHTML = `Value: <p>$${obj.value}</p>`
}

function updateScore() {
    playerScore += currentClue.value
    scoreCont.innerHTML = `Score: ${playerScore}`
}

function resetScore() {
    playerScore = 0
    scoreCont.innerHTML = `Score: ${playerScore}`
}

jServiceUrl()

button.addEventListener('click', () => {
    result = userInput.value.toLowerCase()
    if (result === currentClue.answer.toLowerCase()) {
        updateScore()
        message.innerHTML = `Your Anser is: Correct`
    }
    else  {
        resetScore()
        message.innerHTML = `Your Answer is: Wrong!! You lost`
    }
    userInput.value = ''
    jServiceUrl()
})

