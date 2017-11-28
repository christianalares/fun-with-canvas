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
	
	const colorRed   = randomFromTo(50, 255)
	const colorGreen = randomFromTo(50, 255)
	const colorBlue  = randomFromTo(50, 255)
	const colorAlpha = 1 || Math.random()

	const speedX     = randomFromTo(-5, 5, false)
	const speedY     = randomFromTo(-5, 5, false)

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
}, 2000)

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



			if( (ball.posX + ball.radius >= MOUSE_X - ship.size/2 && (ball.posX - ball.radius) <= (MOUSE_X + ship.size/2))
				&& (ball.posY + ball.radius >= MOUSE_Y - ship.size/2 && (ball.posY - ball.radius) <= (MOUSE_Y + ship.size/2)) 
				&& ( Math.sqrt( (Math.pow(ship.size, ship.size) * 2) )/2 <= ball.radius )) {
				// alert('collision')
			}
		})

		ship.spawn()

		lastTime = currentTime - (delta % interval)
	}
	
}

const clearScreen = () => {
	ctx.clearRect(0, 0, CONFIG.width, CONFIG.height)
	// ctx.fillStyle = 'rgba(255, 255, 255, .05)'
	// ctx.fillStyle = '#f6f6f6'
	// ctx.fillRect(0, 0, CONFIG.width, CONFIG.height)
}

window.requestAnimationFrame(gameLoop)