let blockSize = 25
let rows = 20
let cols = 20
let board
let context
let snakeX = blockSize * 5
let snakeY = blockSize * 5
let snakeBody = []
let velocityX = 0
let velocityY = 0
let foodX
let foodY
let gameOver = false
let score = 0
let highScore = 5

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d");
    placeFood();
    displayScore()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000 / 10)

}

function update() {

    if (gameOver) {
        if (score > highScore){
            score = highScore
        alert(`Congrats you set a new high score, your high score is : ${highScore}`)} 
        return
    }
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (foodX == snakeX && foodY == snakeY) {
        snakeBody.push([foodX, foodY])
        score++
        displayScore()
        placeFood()
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];

    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle = "lime";
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)

    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true
        alert("Game Over")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY) {
            gameOver = true
            alert("Game Over")
        }
    }
    console.log(highScore);
}

function displayScore(){
    document.getElementById("score").innerHTML= score
}

function changeDirection(e) {

    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1

    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1

    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0

    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0

    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}