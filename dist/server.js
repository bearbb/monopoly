"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const server_1 = require("boardgame.io/server");
const path_1 = __importDefault(require("path"));
const koa_static_1 = __importDefault(require("koa-static"));
const server = (0, server_1.Server)({
    games: [game_1.monopoly],
    origins: [server_1.Origins.LOCALHOST_IN_DEVELOPMENT],
});
// Build path relative to the server.js file
const frontEndAppBuildPath = path_1.default.resolve(__dirname, "../build");
server.app.use((0, koa_static_1.default)(frontEndAppBuildPath));
const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 8000;
server.run(PORT, () => {
    server.app.use(async (ctx, next) => await (0, koa_static_1.default)(frontEndAppBuildPath)(Object.assign(ctx, { path: "index.html" }), next));
});
