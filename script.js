const randomFromTo = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CONFIG = {
	width: window.innerWidth,
	height: window.innerHeight
}

const canvas = document.querySelector('#canvas')

canvas.width = CONFIG.width
canvas.height = CONFIG.height

const ctx = canvas.getContext('2d')

class Ball {
	// ----------------------------------------
	// Constructor...
	// ----------------------------------------
	constructor(posX, posY, radius, color) {
		this.posX = posX
		this.posY = posY
		this.radius = radius
		this.color = color

		this.speedX = 1
		this.speedY = 1
	}

	// ----------------------------------------
	// Render the ball on the canvas
	// ----------------------------------------
	render() {
		ctx.beginPath()
		ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, true)
		ctx.fillStyle = this.color
		ctx.closePath()
		ctx.fill()
	}

	// ----------------------------------------
	// This moves the balls position with the speed
	// ----------------------------------------
	move() {
		this.posX += this.speedX
		this.posY += this.speedY
		
		this.checkWalls()
	}

	// ----------------------------------------
	// If we want to change the speed we can do it here
	// ----------------------------------------
	setSpeed(speedX, speedY) {
		this.speedX = speedX
		this.speedY = speedY
	}

	// ----------------------------------------
	// Check collision
	// ----------------------------------------
	checkWalls() {
		if(this.posX + this.radius >= CONFIG.width || this.posX - this.radius <= 0) {
			this.speedX *= -1
		}

		if(this.posY + this.radius >= CONFIG.height || this.posY - this.radius <= 0) {
			this.speedY *= -1
		}
	}
}


const balls = []

for (let i = 0; i < 100; i++) {
	const size = randomFromTo(20, 60)
	balls.push(new Ball(CONFIG.width/2, CONFIG.height/2, size, `rgba(${randomFromTo(0, 255)}, ${randomFromTo(0, 255)}, ${randomFromTo(0, 255)}, ${Math.random()})`))
	balls[i].setSpeed(randomFromTo(-10, 10), randomFromTo(-10, 10))
}

let fps = 60
let interval = 1000/fps
let lastTime = (new Date()).getTime()
let currentTime = 0
let delta = 0

const gameLoop = () => {
	window.requestAnimationFrame(gameLoop)

	currentTime = ( new Date() ).getTime()
	delta = (currentTime - lastTime)

	if(delta > interval) {
		clearScreen()

		balls.forEach(ball => {
			ball.render()
			ball.move()
		})

		lastTime = currentTime - (delta % interval)
	}
	
}

const clearScreen = () => {
	ctx.clearRect(0, 0, CONFIG.width, CONFIG.height)
}

window.requestAnimationFrame(gameLoop)