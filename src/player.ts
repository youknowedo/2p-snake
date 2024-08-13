import { game, spawnFood } from "./game";
import { foodSound } from "./music";
import { grass, grassWithStraws, p1, p1Apple, p2, p2Apple } from "./sprites";

export type Player = {
    sprite: string;
    facing: [number, number];
    newFacing?: [number, number];
    parts: [number, number][];
    food: string;
    antiFood: string;
};

export const players: [Player, Player] = [
    {
        sprite: p1,
        facing: [0, 0],
        parts: [],
        food: p1Apple,
        antiFood: p2Apple,
    },
    {
        sprite: p2,
        facing: [0, 0],
        parts: [],
        food: p2Apple,
        antiFood: p1Apple,
    },
];

export const setupPlayer = (
    player: Player,
    parts: [number, number][],
    facing: [number, number]
) => {
    player.parts = parts;
    player.facing = facing;
    player.newFacing = undefined;
    player.parts.map((part) => {
        addSprite(part[0], part[1], player.sprite);
    });
};

export const updatePlayer = (player: Player) => {
    if (player.newFacing) {
        player.facing = player.newFacing;
        player.newFacing = undefined;
    }

    const tail = player.parts[player.parts.length - 1];
    const tileUnderTail = getTile(tail[0], tail[1]);

    clearTile(tail[0], tail[1]);
    addSprite(
        tail[0],
        tail[1],
        tileUnderTail.find((v) => v.type == grass || v.type == grassWithStraws)
            ?.type ?? ""
    );

    const nextTail = player.parts[player.parts.length - 2];

    if (!tileUnderTail.find((v) => v.type == player.food)) {
        player.parts.pop();
        if (tileUnderTail.find((v) => v.type == player.antiFood)) {
            player.parts.pop();

            spawnFood(player.antiFood);

            const tileUnderNextTail = getTile(nextTail[0], nextTail[1]);

            clearTile(nextTail[0], nextTail[1]);

            addSprite(
                nextTail[0],
                nextTail[1],
                tileUnderNextTail.find(
                    (v) => v.type == grass || v.type == grassWithStraws
                )?.type ?? ""
            );

            game.points--;
        }
    } else {
        addSprite(tail[0], tail[1], player.sprite);

        spawnFood(player.food);

        game.points++;
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

    if (tilesOnNewHead.find((v) => v.type == player.food))
        playTune(foodSound, 1);
    else if (tilesOnNewHead.find((v) => v.type == player.antiFood))
        playTune(foodSound, 1);

    player.parts.unshift(newHead);
    addSprite(newHead[0], newHead[1], player.sprite);

    if (player.parts.length < 3) return -1;

    return 0;
};
