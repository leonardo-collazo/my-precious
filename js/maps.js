/*
 * Rules:
 * The end of each level should be the beginning of the next level.
 */

const emojis = {
	BOMB_COLLISION: '🔥',
	HEART: '💗',
	BROKEN_HEART: '💔',
	TIME: '⏱',
	RECORD: '🏁',
};

const emojisPerLevel = [
	{
		'-': ' ',
		P: '🐺',
		G: '🍖',
		X: '🌲',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🤠',
		G: '🐎',
		X: '🌵',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🧛🏻‍♂️',
		G: '🩸',
		X: '💀',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🧙🏻‍♂️',
		G: '🧪',
		X: '🎃',
		D: '💣',
	},
	{
		'-': ' ',
		P: '👨🏻‍💻',
		G: '🎮',
		X: '🌴',
		D: '💣',
	},
	{
		'-': ' ',
		P: '👨🏻',
		G: '🍄',
		X: '🧱',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🧝🏻‍♂️',
		G: '🏹',
		X: '🌳',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🤴🏻',
		G: '👸🏻',
		X: '🗻',
		D: '💣',
	},
	{
		'-': ' ',
		P: '🧟‍♂️',
		G: '🧠',
		X: '🏠',
		D: '💣',
	},
	{
		'-': ' ',
		P: '👨🏻‍🦱',
		G: '💍',
		X: '🌋',
		D: '💣',
	},
];

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
  XXXD---GXX
  XXXXXXXXXX
  `);
maps.push(`
  XG----DXXX
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
maps.push(`
  -PXXXXXXXX
  -DXXXXXXXX
  --DXXXXXXX
  D--DXXXXXX
  XD-XXXXXXX
  XX--DXXXXX
  XXD-XXGXXX
  XXX-XD-DXX
  X---DD---X
  XXD----DXX
`);
maps.push(`
  X-----XXXX
  XXXXD----D
  ------DD--
  -DXXXDXXD-
  -XD-------
  -XX-DX-XXX
  --D-XXPXXX
  D-X-XXXXXX
  D-X-XXXXXX
  XGXXXXXXXX
`);
maps.push(`
  G-DXXXXXXX
  D--DXXXXXX
  XD--DXXXXX
  XXD--DXXXX
  XXXD--DXXX
  XXXXD--DXX
  XXXXXD--DX
  XXXXXXD--D
  XXXXXXXD-D
  XP-------D
`);
maps.push(`
  PXG-------
  -XXXXXXXD-
  ----DD----
  DXX-XXXXD-
  ----DXDXX-
  -DX-XX-XX-
  DXX-XX-XX-
  ----XX-XD-
  XXD-DX-D--
  XXX------D
`);
maps.push(`
  XXP------D
  XXDXXXXD-D
  XX-----D-X
  XX-DDD-X-X
  XX-DGD-X-X
  XX-D-D-X-X
  XX-X---X-X
  XX-DXXDD-X
  XD-------D
  XXDXXXXXDX
`);
maps.push(`
  D---------
  -XXD-DXXD-
  -XXX-XXXX-
  -XXX-XXXX-
  ----P---D-
  -XXX-XXXX-
  -XXX-XXXX-
  -XXX-XXXD-
  -DGDXXD---
  DD------DD
`);
maps.push(`
  XD-----DXX
  XD-DXD--GX
  X--XX--DXX
  X-DXX-XX-X
  X-XXX-XX-X
  X-DXX-XD-X
  D--XD----X
  XD-DXXXD-X
  XXP------D
  XXXXXXXXXX
`);
