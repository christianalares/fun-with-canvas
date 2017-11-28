class Ship {
	constructor() {
		this.size = 30
	}
	spawn() {
		this.posX = MOUSE_X
		this.posY = MOUSE_Y

		ctx.fillStyle = '#f00'

		if(MOUSE_X <= this.size/2) {
			this.posX = this.size/2
		} else if(MOUSE_X >= CONFIG.width - this.size/2) {
			this.posX = CONFIG.width - this.size/2
		}

		if(MOUSE_Y <= this.size/2) {
			this.posY = this.size/2
		} else if(MOUSE_Y >= CONFIG.height - this.size/2) {
			this.posY = CONFIG.height - this.size/2
		}
		ctx.fillRect(this.posX - (this.size/2), this.posY - (this.size/2), this.size, this.size)
	}
}