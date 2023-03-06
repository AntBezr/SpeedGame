const circles = document.querySelectorAll('.circle')
const scoreOtp = document.querySelector('#score')
const finalScore = document.querySelector('#finalScore')
const startBtn = document.querySelector('.startBtn')
const endBtn = document.querySelector('.endBtn')
const closeBtn = document.querySelector('.closeBtn')
const overlay = document.querySelector('.overlay')
const phrase = document.querySelector('#endPhrase')
const endGameSound = new Audio('sounds/endGame.mp3');
const catchSound = new Audio('sounds/catch.mp3');
const startSound = new Audio('sounds/startGame.mp3');

let score = 0
let lastCircleNumber = 0
let timer
let lives = 4
let pace = 1000

const clickBtn = (i) => {
  if (i !== lastCircleNumber) {
    return (endGame())
  }
  catchSound.play()
  disableCircles()
  lives += 1
  score += 1
  scoreOtp.textContent = score
}

const enableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}
const disableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'none'
  })
}

const randomiser = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const game = () => {
  if (pace === 1000) {
    startSound.play()
  }
  const pickNew = (lastCircleNumber) => {
    const newNumb = randomiser(0, 3)
    if (newNumb !== lastCircleNumber) {
      return (newNumb)
    }
    return (pickNew(lastCircleNumber))
  }
  enableCircles()
  startBtn.classList.add('hidden')
  endBtn.classList.remove('hidden')

  const newCircleNumber = pickNew(lastCircleNumber)

  circles[newCircleNumber].classList.toggle('activeCircle')
  circles[lastCircleNumber].classList.remove('activeCircle')
  lives -= 1
  if (lives <= 0) {
    return (endGame())
  }
  lastCircleNumber = newCircleNumber
  timer = setTimeout(game, pace)
  pace -= 10
}

const endGame = () => {
  endGameSound.play()
  if ((score >= 5) && (score < 10)) {
    phrase.textContent = 'Vot is the point of being an international Quidditch player if all the good-looking girls are taken?'
  } else if ((score >= 10) && (score < 20)) {
    phrase.textContent = "I don't care if you fall off your broom as long as you catch the Snitch first."
  } else if (score >= 20) {
    phrase.textContent = 'The long game was ended, the Snitch had been caught, it was time to leave the air…'
  }
  overlay.style.visibility = 'visible'
  finalScore.textContent = score
}

const resetGame = () => {
  window.location.reload()
}

circles.forEach((btn, i) => {
  btn.addEventListener('click', () => clickBtn(i))
})

startBtn.addEventListener('click', game)
closeBtn.addEventListener('click', resetGame)
endBtn.addEventListener('click', endGame)
