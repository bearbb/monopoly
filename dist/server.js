"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const server_1 = require("boardgame.io/server");
const server = (0, server_1.Server)({
    games: [game_1.monopoly],
    origins: [server_1.Origins.LOCALHOST_IN_DEVELOPMENT],
});
server.run(8000);
