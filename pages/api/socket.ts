// Next.js Edge API routes: https://nextjs.org/docs/api-routes/edge-api-routes

import { Response, WebSocketPair } from '@cloudflare/workers-types';

export const config = {
  runtime: "experimental-edge",
};

export default function handler() {
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  server.accept();

  server.addEventListener('message', event => {
    const message = event.data;
    server.send(`received: ${message}`);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}