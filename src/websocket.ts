import { getSecret } from "./auth";
const makeReconnectingWebsocket = (
  name: string,
  uri: string,
  onMessage: (e: MessageEvent) => void,
  cb?: (ws: WebSocket) => void
) => {
  const openSocket = () => {
    const socket = new WebSocket(uri);
    socket.addEventListener("open", () => {
      console.log(`[${name}] socket opened!`);
      socket.send(
        JSON.stringify({
          token: getSecret("TAU_TOKEN"),
        })
      );
    });
    socket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      if (data["event"] === "keep_alive") {
        return;
      }
      console.log(`[${name}] message received`, data);
      onMessage(e);
    });
    socket.addEventListener("close", (e) => {
      console.error("Socket closed!", e);
      setTimeout(openSocket, 1000);
    });
    if (cb) cb(socket);
  };
  openSocket();
};

export const setupWebsocket = () => {
  makeReconnectingWebsocket(
    "twitch-events",
    "wss://tau.cgs.dev/ws/twitch-events/",
    (e) => {
      const data = JSON.parse(e.data);
      const event = new CustomEvent(data.event_type, { detail: data });
      document.dispatchEvent(event);
    }
  );
};

export const setupMessageBrokerWebsocket = () => {
  makeReconnectingWebsocket(
    "message-broker",
    "wss://tau.cgs.dev/ws/message-broker/",
    (e) => {
      const data = JSON.parse(e.data);
      const event = new CustomEvent(data.message_type, { detail: data });
      if (data.source !== "overlay") {
        document.dispatchEvent(event);
      }
    },
    (socket) => {
      const listener = (e: any) => {
        socket.send(
          JSON.stringify({
            message_type: "wheel-result",
            data: e.detail,
            source: "overlay",
          })
        );
      };
      document.addEventListener("wheel-result", listener);
      socket.addEventListener("close", () =>
        document.removeEventListener("wheel-result", listener)
      );
    }
  );
};

export const setupChatWebsocket = () => {
  makeReconnectingWebsocket(
    "chat",
    "wss://tau.cgs.dev/ws/chat-bots/badcop_/",
    (e) => {
      const data = JSON.parse(e.data);
      const event = new CustomEvent("chat-message", { detail: data });
      document.dispatchEvent(event);
    }
  );
};
