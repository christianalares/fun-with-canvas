const randomFromTo = (min, max, canBeZero = true) => {
	let numberToReturn = Math.floor(Math.random() * (max - min + 1)) + min
	
	return (!canBeZero && numberToReturn === 0)
		? randomFromTo(min, max, false)
		: numberToReturn
}

const CONFIG = {
	width: window.innerWidth,
	height: window.innerHeight,
	fps: 60
}

const canvas = document.querySelector('#canvas')

canvas.width = CONFIG.width
canvas.height = CONFIG.height

const ctx = canvas.getContext('2d')

let MOUSE_X = CONFIG.width/2
let MOUSE_Y = CONFIG.height/2

canvas.addEventListener('mousemove', (e) => {
    MOUSE_X = e.clientX
	MOUSE_Y = e.clientY
})

class Ball {
	// ----------------------------------------
	// Constructor...
	// ----------------------------------------
	constructor(posX = 50, posY = 50, radius = 50, speedX = 1, speedY = 1, color = '#000') {
		this.posX = posX
		this.posY = posY
		this.radius = radius
		this.color = color

		this.speedX = speedX
		this.speedY = speedY
	}

	// ----------------------------------------
	// Render the ball on the canvas
	// ----------------------------------------
	spawn() {
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

class Ship {
	constructor() {
		this.size = 50
	}
	spawn() {
		ctx.fillStyle = '#000'
		// ctx.fillRect((CONFIG.width/2) - (this.size/2), (CONFIG.height/2) - (this.size/2), this.size, this.size)
		ctx.fillRect(MOUSE_X - (this.size/2), MOUSE_Y - (this.size/2), this.size, this.size)
	}
}
const balls = []
const ship = new Ship()

// Draw a Ball every second
setInterval( () => {
	const isVertical = Math.random() > 0.5
	const onLeftSide = Math.random() > 0.5
	const onTopSide  = Math.random() > 0.5

	const radius     = randomFromTo(5, 30)
	const posX       = isVertical ? (onLeftSide ? radius + 20 : (CONFIG.width - radius) - 20) : randomFromTo(radius + 20, (CONFIG.width - radius) - 20)
	const posY       = isVertical ? randomFromTo(radius + 20, (CONFIG.height - radius) - 20) : onTopSide ? radius + 20 : (CONFIG.height - radius) - 20
	
	const colorRed   = randomFromTo(50, 240)
	const colorGreen = randomFromTo(50, 240)
	const colorBlue  = randomFromTo(50, 240)
	const colorAlpha = 1 || Math.random()

	const speedX     = randomFromTo(-1, 1, false)
	const speedY     = randomFromTo(-1, 1, false)

	balls.push(
		new Ball(
			posX,
			posY,
			radius,
			speedX,
			speedY,
			`rgba(${colorRed}, ${colorGreen}, ${colorBlue}, ${colorAlpha})`
		)
	)
}, 1000)

let fps = CONFIG.fps
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
			ball.spawn()
			ball.move()
		})

		ship.spawn()

		lastTime = currentTime - (delta % interval)
	}
	
}

const clearScreen = () => {
	ctx.clearRect(0, 0, CONFIG.width, CONFIG.height)
}

window.requestAnimationFrame(gameLoop)