//***************************
//*  VARIABLES
//***************************
const hud = document.querySelector('.hud');
const livesP = document.querySelector('#lives');
const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');
const btnContainer = document.querySelector('.button-container');
const btnUp = document.querySelector('#up-button');
const btnLeft = document.querySelector('#left-button');
const btnRight = document.querySelector('#right-button');
const btnDown = document.querySelector('#down-button');

let canvasSize = 0;
let elementSize = 0;
let currentLevel = 1;
let lives = 3;

// 10x10 tile map
let currentMap = undefined;

// Player's initial position, it will only be modified when changing level
const playerStartingPos = {
	col: undefined,
	row: undefined,
};

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
	movePlayerByKey(event.code);
});

btnUp.addEventListener('click', () => movePlayer(0, -1));
btnLeft.addEventListener('click', () => movePlayer(-1, 0));
btnRight.addEventListener('click', () => movePlayer(1, 0));
btnDown.addEventListener('click', () => movePlayer(0, 1));

//***************************
//*  FUNCTIONS
//***************************
function clearElement(col, row) {
	const elementPos = getPositionInMap(col, row);

	// Responsive player movement
	// Offset and resize to fit the player's size
	ctx.clearRect(
		elementPos.x + canvasSize * 0.0095,
		elementPos.y - canvasSize * 0.075,
		elementSize * 1.15,
		elementSize * 1.18
	);
}

function getPositionInMap(col, row) {
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

function isInsideMap(col, row) {
	return (
		col >= 0 &&
		col <= currentMap[0].length &&
		row >= 0 &&
		row <= currentMap.length - 1
	);
}

function managePlayerMovement(cols, rows) {
	const newPlayerPos = {
		col: playerPos.col + cols,
		row: playerPos.row + rows,
	};

	if (isInsideMap(newPlayerPos.col, newPlayerPos.row)) {
		if (currentMap[newPlayerPos.row][newPlayerPos.col] == 'D') {
			lives -= 1;
			resetLevel();
		} else if (currentMap[newPlayerPos.row][newPlayerPos.col] == 'G') {
			currentLevel += 1;
			startGame();
		} else if (currentMap[newPlayerPos.row][newPlayerPos.col] != 'X') {
			movePlayer(cols, rows);
		}
	}
}

/**
 * Move the player horizontally and vertically.
 * @param {Number} cols Number of columns to move.
 * If negative it moves to the left, otherwise, it moves to the right.
 * @param {Number} rows Number of rows to move.
 * If negative it moves down, otherwise, it moves up.
 */
function movePlayer(cols, rows) {
	// Clear player
	clearElement(playerPos.col, playerPos.row);

	playerPos.col = Math.min(Math.max(playerPos.col + cols, 0), 9);
	playerPos.row = Math.min(Math.max(playerPos.row + rows, 0), 9);

	// Get new player position
	const newPlayerPos = getPositionInMap(playerPos.col, playerPos.row);
	const newX = newPlayerPos.x;
	const newY = newPlayerPos.y;

	// Render player in new position
	ctx.fillText(emojis['P'], newX, newY);
}

function movePlayerByKey(keyCode) {
	if (keyCode == 'KeyW' || keyCode == 'ArrowUp') managePlayerMovement(0, -1);
	else if (keyCode == 'KeyA' || keyCode == 'ArrowLeft')
		managePlayerMovement(-1, 0);
	else if (keyCode == 'KeyD' || keyCode == 'ArrowRight')
		managePlayerMovement(1, 0);
	else if (keyCode == 'KeyS' || keyCode == 'ArrowDown')
		managePlayerMovement(0, 1);
}

function renderMap(level) {
	currentMap = getMap(level);
	let posInMap = undefined;

	currentMap.forEach((arr, row) => {
		arr.forEach((element, col) => {
			posInMap = getPositionInMap(col, row);
			ctx.fillText(emojis[element], posInMap.x, posInMap.y);

			if (element == 'P') {
				playerStartingPos.col = col;
				playerStartingPos.row = row;
				playerPos.col = col;
				playerPos.row = row;
			}
		});
	});
}

function resetLevel() {
	// Get player's starting position in the map
	const newPlayerPos = getPositionInMap(
		playerStartingPos.col,
		playerStartingPos.row
	);

	// Clear player in his current position
	clearElement(playerPos.col, playerPos.row);

	// Render player in his starting position
	ctx.fillText(emojis['P'], newPlayerPos.x, newPlayerPos.y);

	// Update lives
	updateLives();

	// Update player's current position
	playerPos.col = playerStartingPos.col;
	playerPos.row = playerStartingPos.row;
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

	// Element size needed to fit on a 10x10 tile map
	elementSize = canvasSize / 12.65;
	ctx.font = elementSize + 'px Verdana';
}

function startGame() {
	resizeAll();
	renderMap(currentLevel);
	updateLives();
}

function updateLives() {
	livesP.innerText = `Lives: ${lives}`;
}
