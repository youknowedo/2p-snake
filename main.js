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

setLegend(
    [
        p1,
        bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`,
    ],
    [
        p2,
        bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
    ]
);

setSolids([p1, p2]);

let level = 0;
const levels = [
    map`
............
............
............
............
............
............
............
............
............
............`,
];

setMap(levels[level]);

setPushables({
    [p1]: [],
});

onInput("w", () => (player1.facing = [0, -1]));
onInput("s", () => (player1.facing = [0, 1]));
onInput("a", () => (player1.facing = [-1, 0]));
onInput("d", () => (player1.facing = [1, 0]));

onInput("i", () => (player2.facing = [0, -1]));
onInput("k", () => (player2.facing = [0, 1]));
onInput("j", () => (player2.facing = [-1, 0]));
onInput("l", () => (player2.facing = [1, 0]));

afterInput(() => {});

const player1 = {
    facing: [1, 0],
    parts: [
        [2, 0],
        [1, 0],
        [0, 0],
    ],
};
player1.parts.map((part) => {
    addSprite(part[0], part[1], p1);
});
const player2 = {
    facing: [-1, 0],
    parts: [
        [9, 9],
        [10, 9],
        [11, 9],
    ],
};
player2.parts.map((part) => {
    addSprite(part[0], part[1], p2);
});

setInterval(() => {
    player1.parts.map((part) => {
        clearTile(part[0], part[1]);
    });
    player2.parts.map((part) => {
        clearTile(part[0], part[1]);
    });

    player1.parts.pop();
    player1.parts.unshift([
        player1.parts[0][0] + player1.facing[0],
        player1.parts[0][1] + player1.facing[1],
    ]);
    player2.parts.pop();
    player2.parts.unshift([
        player2.parts[0][0] + player2.facing[0],
        player2.parts[0][1] + player2.facing[1],
    ]);

    player1.parts.map((part) => {
        addSprite(part[0], part[1], p1);
    });
    player2.parts.map((part) => {
        addSprite(part[0], part[1], p2);
    });
}, 500);
