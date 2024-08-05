/*
@title: 2P Snake
@author: Sigfredo
@tags: ["snake", "multiplayer"]
@addedOn: 2024-00-00
*/

import { setupGame } from "./game";
import { registerInputs } from "./inputs";

// Probably the worst code I've ever written, but it works ¯\_(ツ)_/¯

registerInputs();

setupGame();
addText("'L' TO START", {
    y: 13,
    color: color`2`,
});
