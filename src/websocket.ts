import { getSecret } from "./auth";
const makeReconnectingWebsocket = (
  name: string,
  uri: string,
  onMessage: (e: MessageEvent) => void,
  opts?: {
    dontParseLmao?: boolean;
    dontAuthenticate?: boolean;
  },
  cb?: (ws: WebSocket) => void,
) => {
  const openSocket = () => {
    const socket = new WebSocket(uri);
    socket.addEventListener("open", () => {
      console.log(`[${name}] socket opened!`);
      if (!opts?.dontAuthenticate) {
        socket.send(
          JSON.stringify({
            token: getSecret("TAU_TOKEN"),
          }),
        );
      }
    });
    socket.addEventListener("message", (e) => {
      if (!opts?.dontParseLmao) {
        const data = JSON.parse(e.data);
        if (data["event"] === "keep_alive") {
          return;
        }
        console.log(`[${name}] message received`, data);
      }
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
      const event = new CustomEvent(data.event_type, {
        detail: data,
      });
      if (data.source !== "overlay") {
        document.dispatchEvent(event);
      }
    },
    {},
    (socket) => {
      const loopback = (key: string) => {
        const listener = (e: any) => {
          socket.send(
            JSON.stringify({
              message_type: key,
              data: e.detail,
              source: "overlay",
            }),
          );
        };
        document.addEventListener(key, listener);
        socket.addEventListener("close", () =>
          document.removeEventListener(key, listener),
        );
      };
      loopback("wheel-result");
      loopback("fish-champion");
    },
  );
};

export const setupChatWebsocket = () => {
  makeReconnectingWebsocket(
    "chat",
    "wss://irc-ws.chat.twitch.tv",
    (e) => {
      const data = e.data;
      const sections = data.split(" ");
      let tags: any;
      if (sections.length && sections[0].startsWith("@")) {
        tags = {};
        sections
          .shift()
          .slice(1)
          .split(";")
          .forEach((tag: string) => {
            const [key, val] = tag.split("=");
            tags[key] = val;
          });

        if (tags.emotes) {
          tags.emotes = tags.emotes.split("/").map((em: string) => {
            // emotesv2_72fa36312c28427198a2090f93342bcc:0-11,13-24
            const [id, pstring] = em.split(":");
            const positions = pstring.split(",").map((pos: string) => {
              const [start, end] = pos.split("-");
              return [Number.parseInt(start), Number.parseInt(end) + 1];
            });
            return { id, positions };
          });
        } else {
          tags.emotes = [];
        }
        console.log(tags);
      }
      const prefix = sections.shift();
      const command = sections.shift();
      const detail = { sections, tags: tags, prefix, command };
      const event = new CustomEvent("irc-message", { detail });
      document.dispatchEvent(event);
    },
    { dontParseLmao: true, dontAuthenticate: true },
    (ws) => {
      ws.addEventListener("open", (e) => {
        ws.send("CAP REQ :twitch.tv/commands twitch.tv/tags");
        ws.send("PASS yourmom");
        ws.send("NICK justinfan123456");
        ws.send("JOIN #badcop_");
      });
    },
  );
};
