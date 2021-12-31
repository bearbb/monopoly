import { monopoly } from "./game";
import { Server, Origins } from "boardgame.io/server";

const server = Server({
  games: [monopoly],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});

server.run(8000);

export {};
