/*
 * Rules:
 * The end of each level should be the beginning of the next level.
 */

const emojis = {
	'-': ' ',
	O: 'ðŸšª',
	X: 'ðŸ’£',
	I: 'ðŸŽ',
	PLAYER: 'ðŸ’€',
	BOMB_COLLISION: 'ðŸ”¥',
	GAME_OVER: 'ðŸ‘Ž',
	WIN: 'ðŸ†',
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
