const { Server, Origins } = require("boardgame.io/server").Server;
const { monopoly } = require("./game").monopoly;

const server = Server({
  games: [monopoly],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
