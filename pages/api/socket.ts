// Next.js Edge API routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const config = {
  runtime: "experimental-edge",
};

export default function handler() {
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);

  (server as WebSocket & { accept: () => void }).accept();

  server.addEventListener('message', event => {
    const message = event.data;
    server.send(`received: ${message}`);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}