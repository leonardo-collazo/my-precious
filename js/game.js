const hud = document.querySelector('.hud');
const canvas = document.querySelector('#game-board');
const game = canvas.getContext('2d');
const btnContainer = document.querySelector('.button-container');
const btnUp = document.querySelector('#up-button');
const btnLeft = document.querySelector('#left-button');
const btnRight = document.querySelector('#right-button');
const btnDown = document.querySelector('#down-button');

let canvasSize = 0;
let elementSize = 0;

let currentLevel = 1;

window.addEventListener('load', startGame);
window.addEventListener('resize', () => {
	resizeAll();
	renderMap(currentLevel);
});

btnUp.addEventListener('click', () => movePlayer(0, 1));
btnLeft.addEventListener('click', () => movePlayer(-1, 0));
btnRight.addEventListener('click', () => movePlayer(1, 0));
btnDown.addEventListener('click', () => movePlayer(0, -1));

window.addEventListener('keydown', (event) => {
	console.log(event);
	movePlayerByKey(event.code);
});

function movePlayer(x, y) {
	console.log({ x, y });
}

function movePlayerByKey(keyCode) {
	if (keyCode == 'KeyW' || keyCode == 'ArrowUp') movePlayer(0, 1);
	else if (keyCode == 'KeyA' || keyCode == 'ArrowLeft') movePlayer(-1, 0);
	else if (keyCode == 'KeyD' || keyCode == 'ArrowRight') movePlayer(1, 0);
	else if (keyCode == 'KeyS' || keyCode == 'ArrowDown') movePlayer(0, -1);
}

function renderMap(level) {
	// Get the map corresponding to the level
	const map = maps[level - 1]
		// Remove spaces
		.trim()
		// Get each row of elements
		.split('\n')
		// Remove spaces and get elements
		.map((row) => row.trim().split(''));

	map.forEach((arr, row) => {
		arr.forEach((element, col) => {
			game.fillText(
				emojis[element],
				// Initial x-position to render an element
				elementSize * col +
					// Space between columns
					col * canvasSize * 0.02,

				// Initial y-position to render an element
				elementSize * (row + 1) +
					// Space between rows
					(row + 1) * canvasSize * 0.02 -
					// Space between canvas top and elements
					canvasSize * 0.018
			);
		});
	});
}

function resizeAll() {
	// Responsive canvas
	canvasSize = Math.min(window.innerWidth * 0.875, window.innerHeight - 190);

	// HUD with same width as canvas
	hud.setAttribute('style', `width: ${canvasSize}px`);

	// Square canvas
	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	// Button container with same width as canvas
	btnContainer.setAttribute('style', `width: ${canvasSize}px`);

	// 10x10 tile map
	elementSize = canvasSize / 12.65;
	game.font = elementSize + 'px Verdana';
}

function startGame() {
	resizeAll();
	renderMap(currentLevel);

	console.log({ canvasSize, elementSize });
}
