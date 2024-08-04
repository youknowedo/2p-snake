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
const apple = "A";
const grass = "g";
const grassWithStraws = "G";

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
        apple,
        bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
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
    ]
);

setSolids([p1, p2]);

let level = 0;
const levels = [
    map`
ggggggGggggggggggggg
gggGgggggggGgggGggGg
gGggggggggGggggggggg
ggggGggggggggggggggg
ggggggggggggggGggggG
GgggggggGggggGgggggg
gggggGggggggGggggGgg
ggggggggGggggggggggg
ggggggggGggGgggggggg
gggGgGggggggGggGgggg
GggggggggGggGggggGgg
ggggggGggggggggggggg
gggggGggggggGggggggg
gGgGgggGggGggggggGgg
gggggggggGggggGggggg
gggggggggggggggggggG`,
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

afterInput(() => {
    console.log(JSON.stringify(getTile(0, 0)));
    console.log(JSON.stringify(p1));
});

const player1 = {
    facing: [1, 0],
    parts: [
        [4, 2],
        [3, 2],
        [2, 2],
    ],
};
player1.parts.map((part) => {
    addSprite(part[0], part[1], p1);
});
const player2 = {
    facing: [-1, 0],
    parts: [
        [15, 13],
        [16, 13],
        [17, 13],
    ],
};
player2.parts.map((part) => {
    addSprite(part[0], part[1], p2);
});

const update = setInterval(() => {
    const p1NewHead = [
        (20 + player1.parts[0][0] + player1.facing[0]) % 20,
        (16 + player1.parts[0][1] + player1.facing[1]) % 16,
    ];
    const p2NewHead = [
        (20 + player2.parts[0][0] + player2.facing[0]) % 20,
        (16 + player2.parts[0][1] + player2.facing[1]) % 16,
    ];

    const tilesOnP1NewHead = getTile(p1NewHead[0], p1NewHead[1]);
    if (
        tilesOnP1NewHead.length > 0 &&
        !tilesOnP1NewHead.every(
            (v) =>
                v._type == apple ||
                v._type == grass ||
                v._type == grassWithStraws
        )
    ) {
        clearInterval(update);
        return;
    }
    player1.parts.unshift(p1NewHead);
    addSprite(p1NewHead[0], p1NewHead[1], p1);

    const tilesOnP2NewHead = getTile(p2NewHead[0], p2NewHead[1]);
    if (
        tilesOnP1NewHead.length > 0 &&
        !tilesOnP2NewHead.every(
            (v) =>
                v._type == apple ||
                v._type == grass ||
                v._type == grassWithStraws
        )
    ) {
        clearInterval(update);
        return;
    }
    player2.parts.unshift(p2NewHead);
    addSprite(p2NewHead[0], p2NewHead[1], p2);

    const p1Tail = player1.parts.pop();
    const p2Tail = player2.parts.pop();

    // Find out what type of grass was on the tile and replace it with the same type after clearInterval
    const tileUnderP1Tail = getTile(p1Tail[0], p1Tail[1]);
    const tileUnderP2Tail = getTile(p2Tail[0], p2Tail[1]);

    clearTile(p1Tail[0], p1Tail[1]);
    clearTile(p2Tail[0], p2Tail[1]);

    if (tileUnderP1Tail.length > 0) {
        addSprite(
            p1Tail[0],
            p1Tail[1],
            tileUnderP1Tail.find(
                (v) => v._type == grass || v._type == grassWithStraws
            )._type
        );
    }
    if (tileUnderP2Tail.length > 0) {
        addSprite(
            p2Tail[0],
            p2Tail[1],
            tileUnderP2Tail.find(
                (v) => v._type == grass || v._type == grassWithStraws
            )._type
        );
    }
}, 500);
