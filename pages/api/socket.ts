// Next.js Edge API routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const config = {
  runtime: "experimental-edge",
};

export default function handler(request: Request) {
  // @ts-ignore -- Cloudflare specific class
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair) as [unknown, { accept: () => void } & WebSocket];

  server.accept();

  server.addEventListener('message', event => {
    const message = event.data;
    server.send(`received: ${message}`);
  });

  return new Response(null, {
    status: 101,
    // @ts-ignore
    webSocket: client,
  });

}