/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2P Snake
@author: 
@tags: []
@addedOn: 2024-00-00
*/

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
onInput("l", () => player2.facing[0] != -1 && (player2.facing = [1, 0]));

afterInput(() => {});

const player1 = {
    sprite: p1,
    facing: [1, 0],
    parts: [
        [5, 5],
        [4, 5],
        [3, 5],
    ],
    food: p1Apple,
    antiFood: p2Apple,
};
player1.parts.map((part) => {
    addSprite(part[0], part[1], p1);
});
const player2 = {
    sprite: p2,
    facing: [-1, 0],
    parts: [
        [14, 12],
        [15, 12],
        [16, 12],
    ],
    food: p2Apple,
    antiFood: p1Apple,
};
player2.parts.map((part) => {
    addSprite(part[0], part[1], p2);
});

addSprite(10, 9, p1Apple);
addSprite(9, 8, p2Apple);

let points = 0;

const update = setInterval(() => {
    updatePlayer(player1);
    updatePlayer(player2);

    clearText();
    addText(`2P Snake       ${("00" + points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: color`2`,
    });
}, 500);

const updatePlayer = (player) => {
    const tail = player.parts[player.parts.length - 1];
    const nextTail = player.parts[player.parts.length - 2];

    const tileUnderTail = getTile(tail[0], tail[1]);

    if (!tileUnderTail.find((v) => v._type == player.food)) {
        player.parts.pop();
        if (tileUnderTail.find((v) => v._type == player.antiFood)) {
            player.parts.pop();

            if (player.parts.length < 3) {
                clearInterval(update);
                return;
            }

            while (true) {
                const nextPosition = [
                    Math.round(Math.random() * 18) + 1,
                    Math.round(Math.random() * 12) + 3,
                ];
                console.log(getTile(nextPosition[0], nextPosition[1]));
                if (getTile(nextPosition[0], nextPosition[1]).length == 1) {
                    addSprite(
                        nextPosition[0],
                        nextPosition[1],
                        player.antiFood
                    );
                    break;
                }
            }

            const tileUnderNextTail = getTile(nextTail[0], nextTail[1]);

            clearTile(nextTail[0], nextTail[1]);

            addSprite(
                nextTail[0],
                nextTail[1],
                tileUnderNextTail.find(
                    (v) => v._type == grass || v._type == grassWithStraws
                )._type
            );

            if (player.parts.length < 3) {
                clearInterval(update);
                return;
            }

            points--;
        }
    } else {
        addSprite(tail[0], tail[1], player.sprite);

        while (true) {
            const nextPosition = [
                Math.round(Math.random() * 18) + 1,
                Math.round(Math.random() * 12) + 3,
            ];
            console.log(getTile(nextPosition[0], nextPosition[1]));
            if (getTile(nextPosition[0], nextPosition[1]).length == 1) {
                addSprite(nextPosition[0], nextPosition[1], player.food);
                break;
            }
        }

        points++;
    }

    const newHead = [
        1 + ((17 + player.parts[0][0] + player.facing[0]) % 18),
        3 + ((9 + player.parts[0][1] + player.facing[1]) % 12),
    ];

    const tilesOnNewHead = getTile(newHead[0], newHead[1]);
    if (
        tilesOnNewHead.length > 0 &&
        !tilesOnNewHead.every(
            (v) =>
                v._type == p1Apple ||
                v._type == p2Apple ||
                v._type == grass ||
                v._type == grassWithStraws
        )
    ) {
        console.log(tilesOnNewHead);
        clearInterval(update);
        return;
    }
    player.parts.unshift(newHead);
    addSprite(newHead[0], newHead[1], player.sprite);

    clearTile(tail[0], tail[1]);
    addSprite(
        tail[0],
        tail[1],
        tileUnderTail.find(
            (v) => v._type == grass || v._type == grassWithStraws
        )._type
    );
};
