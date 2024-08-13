import { game, startGame } from "./game";
import { players } from "./player";

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
        if (!game.started) startGame();
        else players[1].facing[0] != -1 && (players[1].newFacing = [1, 0]);
    });

    afterInput(() => {});
};
