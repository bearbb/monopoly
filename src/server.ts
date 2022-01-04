import { monopoly } from "./game";
import { Server, Origins } from "boardgame.io/server";

const server = Server({
  games: [monopoly],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});

const PORT = process.env.PORT || 8000;

server.run(6969);

export {};
