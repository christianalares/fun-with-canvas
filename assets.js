const randomFromTo = (min, max, canBeZero = true) => {
	let numberToReturn = Math.floor(Math.random() * (max - min + 1)) + min
	
	return (!canBeZero && numberToReturn === 0)
		? randomFromTo(min, max, false)
		: numberToReturn
}

const CONFIG = {
	width: window.innerWidth,
	height: window.innerHeight,
    fps: 60,
    maxSpeed: 10
}