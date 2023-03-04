const makeReconnectingWebsocket = (
  name: string,
  uri: string,
  onMessage: (e: MessageEvent) => void
) => {
  const openSocket = () => {
    const socket = new WebSocket(uri);
    socket.addEventListener("open", () => {
      console.log(`[${name}] socket opened!`);
      socket.send(
        JSON.stringify({
          token:
            window.location.hash.slice(1) || localStorage.getItem("tau-key"),
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
