"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const react_1 = require("boardgame.io/react");
const Board_1 = require("src/Board");
const game_1 = require("src/game");
require("src/App.css");
//server
const multiplayer_1 = require("boardgame.io/multiplayer");
const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;
exports.Client = (0, react_1.Client)({
    game: game_1.monopoly,
    numPlayers: 4,
    board: Board_1.Board,
    // multiplayer: SocketIO({ server: "https://gameapi.swanoogie.me" }),
    multiplayer: (0, multiplayer_1.SocketIO)({ server }),
    debug: false,
});
exports.default = exports.Client;
