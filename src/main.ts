(window as any).global ||= window;

import "./style.css";
import { $ } from "dom";
import { setupChatWebsocket, setupWebsocket } from "./websocket";

setupWebsocket();
setupChatWebsocket();

const follow = $.className($.div, "follow");
document.addEventListener("channel-follow", (e) => {
  $("#app")!.append(
    $.expire(
      1000,
      follow(`${(e as any).detail.event_data.user_name} followed!`)
    )
  );
});

const chatbox = $.className($.div, "chat-msg");
document.addEventListener("chat-message", (e) => {
  console.warn((e as any).detail);
  $("#chat")!.append(
    $.expire(10000, chatbox(`${(e as any).detail.data["message-text"]}`))
  );
});
