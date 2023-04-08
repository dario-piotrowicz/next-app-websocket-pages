// Next.js Edge API routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const config = {
  runtime: "experimental-edge",
};

export default function handler(request: Request) {
  // @ts-ignore -- Cloudflare specific class
  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair) as [unknown, { accept: () => void } & WebSocket];

  server.accept();

  (async () => {
    setTimeout(() => {
      console.log('sending ----------------> a');
      server.send(' ----------------> a');
    }, 1000);

    setTimeout(() => {
      console.log('sending ----------------> b');
      server.send(' ----------------> b');
    }, 2000);

    setTimeout(() => {
      console.log('sending ----------------> c');
      server.send(' ----------------> c');
    }, 3000);

    setTimeout(() => {
      console.log('sending ----------------> d');
      server.send(' ----------------> d');
    }, 4000);

    setTimeout(() => {
      console.log('sending ----------------> e');
      server.send(' ----------------> e');
    }, 5000);

  })();

  return new Response(null, {
    status: 101,
    // @ts-ignore
    webSocket: client,
  });

}