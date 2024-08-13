import { game, level, onUpdate, setupGame } from "./game";
import { players } from "./player";
import { p1, p1Apple, p2, p2Apple } from "./sprites";

export const registerInputs = () => {
    onInput(
        "w",
        () => players[0].facing[1] != 1 && (players[0].newFacing = [0, -1])
    );
    onInput(
        "s",
        () => players[0].facing[1] != -1 && (players[0].newFacing = [0, 1])
    );
    onInput(
        "a",
        () => players[0].facing[0] != 1 && (players[0].newFacing = [-1, 0])
    );
    onInput(
        "d",
        () => players[0].facing[0] != -1 && (players[0].newFacing = [1, 0])
    );

    onInput(
        "i",
        () => players[1].facing[1] != 1 && (players[1].newFacing = [0, -1])
    );
    onInput(
        "k",
        () => players[1].facing[1] != -1 && (players[1].newFacing = [0, 1])
    );
    onInput(
        "j",
        () => players[1].facing[0] != 1 && (players[1].newFacing = [-1, 0])
    );
    onInput("l", () => {
        if (!game.started) {
            game.started = true;

            const tilesToClear = [
                ...tilesWith(p1),
                ...tilesWith(p2),
                ...tilesWith(p1Apple),
                ...tilesWith(p2Apple),
            ];
            tilesToClear.map((tile) => {
                clearTile(tile[0].x, tile[0].y);
            });
            setMap(level);

            setupGame();
            game.tick = setInterval(onUpdate, 200);
        } else players[1].facing[0] != -1 && (players[1].newFacing = [1, 0]);
    });

    afterInput(() => {});
};
