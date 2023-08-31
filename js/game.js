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

// Player position (column and row)
const playerPos = {
	col: undefined,
	row: undefined,
};

window.addEventListener('load', startGame);
window.addEventListener('resize', () => {
	resizeAll();
	renderMap(currentLevel);
});
window.addEventListener('keydown', (event) => {
	console.log(event);
	movePlayerByKey(event.code);
});

btnUp.addEventListener('click', () => movePlayer(0, -1));
btnLeft.addEventListener('click', () => movePlayer(-1, 0));
btnRight.addEventListener('click', () => movePlayer(1, 0));
btnDown.addEventListener('click', () => movePlayer(0, 1));

function getPositionInCanvas(col, row) {
	return {
		x:
			// Initial x-position to render an element
			elementSize * col +
			// Space between columns
			col * canvasSize * 0.02,

		y:
			// Initial y-position to render an element
			elementSize * (row + 1) +
			// Space between rows
			(row + 1) * canvasSize * 0.02 -
			// Space between canvas top and elements
			canvasSize * 0.018,
	};
}

function getMap(level) {
	// Get the map corresponding to the level
	return (
		maps[level - 1]
			// Remove spaces
			.trim()
			// Get rows with elements
			.split('\n')
			// Remove spaces and get elements individually
			.map((row) => row.trim().split(''))
	);
}

/**
 * Move the player horizontally and vertically.
 * @param {Number} cols Number of columns to move.
 * If negative it moves to the left, otherwise, it moves to the right.
 * @param {Number} rows Number of rows to move.
 * If negative it moves down, otherwise, it moves up.
 */
function movePlayer(cols, rows) {
	playerPos.col += cols;
	playerPos.row += rows;

	const posInCanvas = getPositionInCanvas(playerPos.col, playerPos.row);
	const newX = posInCanvas.x;
	const newY = posInCanvas.y;

	game.fillText(emojis['P'], newX, newY);
}

function movePlayerByKey(keyCode) {
	if (keyCode == 'KeyW' || keyCode == 'ArrowUp') movePlayer(0, -1);
	else if (keyCode == 'KeyA' || keyCode == 'ArrowLeft') movePlayer(-1, 0);
	else if (keyCode == 'KeyD' || keyCode == 'ArrowRight') movePlayer(1, 0);
	else if (keyCode == 'KeyS' || keyCode == 'ArrowDown') movePlayer(0, 1);
}

function renderMap(level) {
	const map = getMap(level);

	let posInCanvas = undefined;
	let x = undefined;
	let y = undefined;

	map.forEach((arr, row) => {
		arr.forEach((element, col) => {
			posInCanvas = getPositionInCanvas(col, row);
			x = posInCanvas.x;
			y = posInCanvas.y;

			game.fillText(emojis[element], x, y);

			if (element == 'P') {
				playerPos.col = col;
				playerPos.row = row;
			}
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

	console.log(playerPos);
}
