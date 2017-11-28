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
			if(this.speedY > 0 && this.speedY < CONFIG.maxSpeed) {
				this.speedY += randomFromTo(0.5, 1, false)
			} else {
				this.speedY += randomFromTo(-1, -0.5, false)
			}
			this.speedX *= -1
		}

		if(this.posY + this.radius >= CONFIG.height || this.posY - this.radius <= 0) {
			if(this.speedX > 0 && this.speedX < CONFIG.maxSpeed) {
				this.speedX += randomFromTo(0.5, 1, false)
			} else {
				this.speedX += randomFromTo(-1, -0.5, false)
			}
			this.speedY *= -1
		}
	}
}