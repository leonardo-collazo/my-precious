/*
 * Rules:
 * The end of each level should be the beginning of the next level.
 */

const emojis = {
	'-': ' ',
	P: '🐺',
	G: '🍖',
	D: '💣',
	X: '🌳',
	BOMB_COLLISION: '🔥',
	GAME_OVER: '😞',
	WIN: '😋',
};

const maps = [];
maps.push(`
  GXXXXXXXXX
  -XXXXXXXXX
  -DXXXXXXXX
  --DXXXXXXX
  D-XXXXXXXX
  D-XXXXXXXX
  --DXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  PXXXXXXXXX
`);
maps.push(`
  P--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---GXX
  XXXXXXXXXX
  `);
maps.push(`
  G-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----PXX
  XXXXXXXXXX
`);
