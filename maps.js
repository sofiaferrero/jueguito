const emojis = {
    "-": " ",
    O: "๐ช",
    X: "๐ณโ",
    I: "๐ฅโ",
    PLAYER: "๐ฐโ",
    BOMB_COLLISION: "๐ฅ",
    GAME_OVER: "๐",
    WIN: "๐",
    HEART: 'โค',
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

maps.push(`
    OXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    ---XXXXXXX
    X-XXXXXXXX
    X---XXXX-I
    XXX-XX---X
    XXX-X--XXX
    XXX---XXXX
    XXXXXXXXXX
`);

// Hacer mรกs mapas