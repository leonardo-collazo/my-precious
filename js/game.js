//***************************
//*  VARIABLES
//***************************
const hud = document.querySelector('.hud');
const livesP = document.querySelector('#lives');
const timeP = document.querySelector('#time');
const recordP = document.querySelector('#record');

const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

const btnContainer = document.querySelector('.button-container');
const btnUp = document.querySelector('#up-button');
const btnLeft = document.querySelector('#left-button');
const btnRight = document.querySelector('#right-button');
const btnDown = document.querySelector('#down-button');

const recordKeyName = 'record';

let canvasSize = undefined;
let elementSize = undefined;
let startingLevel = 1;
let currentLevel = startingLevel;
let maxLives = 3;
let lives = maxLives;
let startingTime = undefined;
let time = 0;
let timeInterval = undefined;
let record = 0;

// 10x10 tile map
let currentMap = undefined;

// Player's initial position, it will only be modified when changing level
const playerStartingPos = {
	col: undefined,
	row: undefined,
};

// Player's current position (column and row)
const playerCurrentPos = {
	col: undefined,
	row: undefined,
};

//***************************
//*  EVENTS
//***************************
window.addEventListener('load', startGame);
window.addEventListener('resize', () => {
	resizeAll();
	renderMap(currentLevel);
});
window.addEventListener('keydown', (event) => {
	movePlayerByKey(event.code);
});

btnUp.addEventListener('click', () => managePlayerMovement(0, -1));
btnLeft.addEventListener('click', () => managePlayerMovement(-1, 0));
btnRight.addEventListener('click', () => managePlayerMovement(1, 0));
btnDown.addEventListener('click', () => managePlayerMovement(0, 1));

//***************************
//*  FUNCTIONS
//***************************
function clearElement(col, row) {
	const elementPos = getPositionInMap(col, row);

	// Responsive player movement
	// Offset and resize to fit the player's size
	ctx.clearRect(
		elementPos.x - canvasSize * 0.0002,
		elementPos.y - canvasSize * 0.075,
		elementSize * 1.28,
		elementSize * 1.18
	);
}

function convertMilisecondsToSeconds(miliseconds) {
	return miliseconds / 1000;
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

function isFinalLevel() {
	return currentLevel == maps.length;
}

function isInsideMap(col, row) {
	return (
		col >= 0 &&
		col <= currentMap[0].length &&
		row >= 0 &&
		row <= currentMap.length - 1
	);
}

function loadNextLevel() {
	currentLevel += 1;
	startGame();
}

function loadRecord() {
	// Load record from local storage
	const savedRecord = parseFloat(localStorage.getItem(recordKeyName));

	// If there is no record then set it to zero
	if (!savedRecord) {
		setRecord(0);
	} else {
		setRecord(savedRecord);
	}
}

function managePlayerMovement(cols, rows) {
	const newPlayerPos = {
		col: playerCurrentPos.col + cols,
		row: playerCurrentPos.row + rows,
	};

	if (isInsideMap(newPlayerPos.col, newPlayerPos.row)) {
		if (currentMap[newPlayerPos.row][newPlayerPos.col] == 'D') {
			processPlayerFailure();
		} else if (currentMap[newPlayerPos.row][newPlayerPos.col] == 'G') {
			processVictory();
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
	clearElement(playerCurrentPos.col, playerCurrentPos.row);

	// Update player's current position
	setPlayerCurrentPos(
		Math.min(Math.max(playerCurrentPos.col + cols, 0), 9),
		Math.min(Math.max(playerCurrentPos.row + rows, 0), 9)
	);

	// Get new player position
	const newPlayerPos = getPositionInMap(
		playerCurrentPos.col,
		playerCurrentPos.row
	);
	const newX = newPlayerPos.x;
	const newY = newPlayerPos.y;

	// Render player in new position
	ctx.fillText(emojisPerLevel[currentLevel - 1]['P'], newX, newY);
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

function processPlayerFailure() {
	setLives(lives - 1);

	if (lives > 0) {
		resetLevel();
	} else {
		currentLevel = startingLevel;
		lives = maxLives;

		stopUpdatingTime();
		startGame();
	}
}

function processVictory() {
	if (isFinalLevel()) {
		if (!record) {
			setRecord(time);
			localStorage.setItem(recordKeyName, time);
		} else {
			const newRecord = Math.min(time, record);
			setRecord(newRecord);
			localStorage.setItem(recordKeyName, newRecord);
		}

		stopUpdatingTime();
	} else {
		loadNextLevel();
	}
}

function renderMap(level) {
	currentMap = getMap(level);
	let posInMap = undefined;

	currentMap.forEach((arr, row) => {
		arr.forEach((element, col) => {
			posInMap = getPositionInMap(col, row);
			ctx.fillText(emojisPerLevel[level - 1][element], posInMap.x, posInMap.y);

			if (element == 'P') {
				setPlayerStartingPos(col, row);
				setPlayerCurrentPos(col, row);
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
	clearElement(playerCurrentPos.col, playerCurrentPos.row);

	// Render player in his starting position
	ctx.fillText(
		emojisPerLevel[currentLevel - 1]['P'],
		newPlayerPos.x,
		newPlayerPos.y
	);

	// Update player's current position
	setPlayerCurrentPos(playerStartingPos.col, playerStartingPos.row);
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

function setLives(amount) {
	lives = amount;

	const redHeartAmount = lives;
	const brokenHeartAmount = maxLives - lives;

	livesP.innerText = '';
	livesP.innerText += ` ${emojis.HEART} `.repeat(redHeartAmount);
	livesP.innerText += ` ${emojis.BROKEN_HEART} `.repeat(brokenHeartAmount);
}

function setPlayerCurrentPos(col, row) {
	playerCurrentPos.col = col;
	playerCurrentPos.row = row;
}

function setPlayerStartingPos(col, row) {
	playerStartingPos.col = col;
	playerStartingPos.row = row;
}

function setRecord(amount) {
	record = amount;
	recordP.innerText = `${emojis.RECORD}${record.toFixed(2)}s`;
}

function setTime(amount) {
	time = amount;
	timeP.innerText = `${emojis.TIME}${time.toFixed(2)}s`;
}

function startGame() {
	resizeAll();
	renderMap(currentLevel);
	setLives(lives);
	loadRecord();

	// Start running time
	if (!startingTime) {
		startUpdatingTime();
	}
}

function startUpdatingTime() {
	startingTime = Date.now();
	timeInterval = setInterval(updateElapsedTime, 10);
}

function stopUpdatingTime() {
	clearInterval(timeInterval);
	timeInterval = undefined;
	startingTime = undefined;
}

function updateElapsedTime() {
	const elapsedTime = Date.now() - startingTime;
	setTime(convertMilisecondsToSeconds(elapsedTime));
}
