import { monopoly } from "./game";
import { Server, Origins } from "boardgame.io/server";

import path from "path";
import serve from "koa-static";

const server = Server({
  games: [monopoly],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT],
});

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, "../build");
server.app.use(serve(frontEndAppBuildPath));

const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 8000;

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) =>
      await serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: "index.html" }),
        next
      )
  );
});

export {};
