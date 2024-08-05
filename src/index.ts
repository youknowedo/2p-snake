/*
@title: 2P Snake
@author: Sigfredo
@tags: ["snake", "multiplayer"]
@addedOn: 2024-00-00
*/

// Probably the worst code I've ever written, but it works ¯\_(ツ)_/¯

const p1 = "1";
const p2 = "2";
const p1Apple = "a";
const p2Apple = "A";

const grass = "g";
const grassWithStraws = "G";

const borderL = "l";
const borderR = "r";
const borderT = "t";
const borderB = "b";
const borderLT = "c";
const borderRT = "T";
const borderLB = "C";
const borderRB = "B";

const bg = "q";

type Player = {
    sprite: string;
    facing: [number, number];
    parts: [number, number][];
    food: string;
    antiFood: string;
};

setLegend(
    [
        p1,
        bitmap`
.55555555555555.
5555555555555555
555..........555
55..55555555..55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55.5555555555.55
55..55555555..55
555..........555
5555555555555555
.55555555555555.`,
    ],
    [
        p2,
        bitmap`
.33333333333333.
3333333333333333
333..........333
33..33333333..33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33.3333333333.33
33..33333333..33
333..........333
3333333333333333
.33333333333333.`,
    ],
    [
        p1Apple,
        bitmap`
................
........7.......
.......77.......
....55575555....
...5255555555...
..525555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
...5555555555...
.....557755.....
................
................`,
    ],
    [
        p2Apple,
        bitmap`
................
........C.......
.......CC.......
....333C3333....
...3233333333...
..323333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....33CC33.....
................
................`,
    ],
    [
        grass,
        bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`,
    ],
    [
        grassWithStraws,
        bitmap`
4444444444444444
4444444444444444
444444D444444DD4
4444444444444444
444D44444DD44444
4444DD44DD444444
44444DD4D4444444
44444DD444444444
44D444DD444DD444
44DD44DD44DD4444
444D44DD44D44444
444D44DD4DD44444
4444444D4DD44444
444444444DD44444
4444444444444444
4444444444444444`,
    ],
    [
        borderL,
        bitmap`
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220000
0000000000220000
0000000000002200
0000000000002200`,
    ],
    [
        borderR,
        bitmap`
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000`,
    ],
    [
        borderT,
        bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
2200220022002200
2200220022002200
0022002200220022
0022002200220022
0000000000000000
0000000000000000`,
    ],
    [
        borderB,
        bitmap`
0000000000000000
0000000000000000
2200220022002200
2200220022002200
0022002200220022
0022002200220022
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    ],
    [
        borderLT,
        bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002200
0000000000002200
0000000000220022
0000000000220022
0000000000002200
0000000000002200`,
    ],
    [
        borderRT,
        bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
2200220000000000
2200220000000000
0022000000000000
0022000000000000
0000220000000000
0000220000000000`,
    ],
    [
        borderLB,
        bitmap`
0000000000220000
0000000000220000
0000000000002200
0000000000002200
0000000000220022
0000000000220022
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    ],
    [
        borderRB,
        bitmap`
0022000000000000
0022000000000000
2200220000000000
2200220000000000
0022000000000000
0022000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    ],
    [
        bg,
        bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
    ]
);

setSolids([p1, p2]);

let level = 0;
const levels = [
    map`
qqqqqqqqqqqqqqqqqqqq
qqqqqqqqqqqqqqqqqqqq
cttttttttttttttttttT
lgGggggggGgGGggggggr
lggGggggggggggGggGGr
lgggggggGggggGgggggr
lggggGggggggGggggGgr
lgggggggGggggggggggr
lgggggggGggGgggggggr
lggGgGggggggGggGgggr
lggggggggGggGggggGgr
lGggggGggggggggggggr
lggggGggggggGggggggr
lggGgggGggGggggggGgr
lgggggggggggggGggggr
CbbbbbbbbbbbbbbbbbbB`,
];
setMap(levels[level]);

setPushables({
    [p1]: [],
});

onInput("w", () => player1.facing[1] != 1 && (player1.facing = [0, -1]));
onInput("s", () => player1.facing[1] != -1 && (player1.facing = [0, 1]));
onInput("a", () => player1.facing[0] != 1 && (player1.facing = [-1, 0]));
onInput("d", () => player1.facing[0] != -1 && (player1.facing = [1, 0]));

onInput("i", () => player2.facing[1] != 1 && (player2.facing = [0, -1]));
onInput("k", () => player2.facing[1] != -1 && (player2.facing = [0, 1]));
onInput("j", () => player2.facing[0] != 1 && (player2.facing = [-1, 0]));
onInput("l", () => {
    if (!gameStarted) {
        gameStarted = true;

        const tilesToClear = [
            ...tilesWith(p1),
            ...tilesWith(p2),
            ...tilesWith(p1Apple),
            ...tilesWith(p2Apple),
        ];
        tilesToClear.map((tile) => {
            clearTile(tile[0].x, tile[0].y);
        });
        setMap(levels[level]);

        setupGame();
        update = setInterval(onUpdate, 500);
    } else player2.facing[0] != -1 && (player2.facing = [1, 0]);
});

afterInput(() => {});

const player1: Player = {
    sprite: p1,
    facing: [0, 0],
    parts: [],
    food: p1Apple,
    antiFood: p2Apple,
};
const player2: Player = {
    sprite: p2,
    facing: [0, 0],
    parts: [],
    food: p2Apple,
    antiFood: p1Apple,
};

const setupGame = () => {
    player1.parts = [
        [3, 8],
        [3, 7],
        [3, 6],
    ];
    player1.facing = [0, 1];
    player1.parts.map((part) => {
        addSprite(part[0], part[1], p1);
    });
    player2.facing = [0, -1];
    player2.parts = [
        [16, 9],
        [16, 10],
        [16, 11],
    ];
    player2.parts.map((part) => {
        addSprite(part[0], part[1], p2);
    });

    addSprite(10, 8, p1Apple);
    addSprite(9, 9, p2Apple);

    clearText();
    addText(`2P SNAKE       ${("00" + points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: color`2`,
    });

    points = 0;
};

let points = 0;

const onUpdate = () => {
    clearText();
    addText(`2P SNAKE       ${("00" + points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: color`2`,
    });

    if (updatePlayer(player1) == -1) return gameOver(p1);
    if (updatePlayer(player2) == -1) return gameOver(p2);
};

let update: Timer;

const updatePlayer = (player: Player) => {
    const tail = player.parts[player.parts.length - 1];
    const nextTail = player.parts[player.parts.length - 2];

    const tileUnderTail = getTile(tail[0], tail[1]);

    if (!tileUnderTail.find((v) => v.type == player.food)) {
        player.parts.pop();
        if (tileUnderTail.find((v) => v.type == player.antiFood)) {
            player.parts.pop();

            if (player.parts.length < 3) return -1;

            spawnFood(player.food);

            const tileUnderNextTail = getTile(nextTail[0], nextTail[1]);

            clearTile(nextTail[0], nextTail[1]);

            addSprite(
                nextTail[0],
                nextTail[1],
                tileUnderNextTail.find(
                    (v) => v.type == grass || v.type == grassWithStraws
                )?.type ?? ""
            );

            if (player.parts.length < 3) return -1;

            points--;
        }
    } else {
        addSprite(tail[0], tail[1], player.sprite);

        spawnFood(player.food);

        points++;
    }

    const newHead: [number, number] = [
        1 + ((17 + player.parts[0][0] + player.facing[0]) % 18),
        3 + ((9 + player.parts[0][1] + player.facing[1]) % 12),
    ];

    const tilesOnNewHead = getTile(newHead[0], newHead[1]);
    if (
        tilesOnNewHead.length > 0 &&
        !tilesOnNewHead.every(
            (v) =>
                v.type == p1Apple ||
                v.type == p2Apple ||
                v.type == grass ||
                v.type == grassWithStraws
        )
    )
        return -1;

    player.parts.unshift(newHead);
    addSprite(newHead[0], newHead[1], player.sprite);

    clearTile(tail[0], tail[1]);
    addSprite(
        tail[0],
        tail[1],
        tileUnderTail.find((v) => v.type == grass || v.type == grassWithStraws)
            ?.type ?? ""
    );

    return 0;
};

const spawnFood = (food: string) => {
    while (true) {
        const nextPosition = [
            Math.round(Math.random() * 18) + 1,
            Math.round(Math.random() * 12) + 3,
        ];

        if (getTile(nextPosition[0], nextPosition[1]).length == 1) {
            addSprite(nextPosition[0], nextPosition[1], food);
            break;
        }
    }
};

let gameStarted = false;
const gameOver = (winner: string) => {
    gameStarted = false;
    clearInterval(update);

    clearText();
    addText(`Game Over      ${("00" + points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: winner == p1 ? color`5` : color`3`,
    });
    addText("'L' TO TRY AGAIN", {
        y: 13,
        color: color`2`,
    });
};

setupGame();
addText("'L' TO START", {
    y: 13,
    color: color`2`,
});
