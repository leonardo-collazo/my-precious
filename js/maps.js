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
	HEART: '💗',
	BROKEN_HEART: '💔',
	TIME: '⏱',
	RECORD: '🏁',
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
  P--DXXXXXX
  XD-DXXXXXX
  XX----DXXX
  D--XX-XXXX
  X-DXX--DXX
  X-XXXD-XXX
  XD--XD--DX
  XX--XXD-DX
  XXXX---GXX
  XXXXXXXXXX
  `);
maps.push(`
  G-----DXXX
  XXDXX-DXXX
  XD----DXXX
  XD-XXXDXXX
  XD-----DXX
  XXDXXX-DXX
  XD-----DXX
  XD-XXXXXXX
  XD-----PXX
  XXXXXXXXXX
`);
