import { playGameOverSound } from "./music";
import { players, setupPlayer, updatePlayer } from "./player";
import { p1, p1Apple, p2, p2Apple } from "./sprites";

export const game: {
    started: boolean;
    points: number;
    speed: number;
    tick?: number;
} = {
    started: false,
    points: 0,
    speed: 200,
};

export let level = map`
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
CbbbbbbbbbbbbbbbbbbB`;
setMap(level);

export const setupGame = () => {
    setupPlayer(
        players[0],
        [
            [3, 8],
            [3, 7],
            [3, 6],
        ],
        [0, 1]
    );
    setupPlayer(
        players[1],
        [
            [16, 9],
            [16, 10],
            [16, 11],
        ],
        [0, -1]
    );

    addSprite(10, 8, p1Apple);
    addSprite(9, 9, p2Apple);

    clearText();
    addText(`2P SNAKE       ${("00" + game.points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: color`2`,
    });

    game.points = 0;
    game.speed = 200;
};

export const onUpdate = () => {
    clearText();
    addText(`2P SNAKE       ${("00" + game.points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: color`2`,
    });

    if (updatePlayer(players[0]) == -1) return gameOver(p1);
    if (updatePlayer(players[1]) == -1) return gameOver(p2);
};

export const gameOver = (winner: string) => {
    playGameOverSound();

    game.started = false;
    clearInterval(game.tick);

    clearText();
    addText(`Game Over      ${("00" + game.points).slice(-3)}`, {
        x: 1,
        y: 1,
        color: winner == p1 ? color`3` : color`5`,
    });
    addText("'L' TO TRY AGAIN", {
        y: 13,
        color: color`2`,
    });
};
