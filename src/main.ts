import "./style.css";
import { $ } from "dom";
import { setupChatWebsocket, setupWebsocket } from "./websocket";

setupWebsocket();
setupChatWebsocket();

const follow = $.className($.div, "follow");
$.listen("channel-follow", (e) => {
  $("#app")!.append(
    $.expire(1000, follow(`${e.detail.event_data.user_name} followed!`))
  );
});

const chatbox = $.className($.div, "chat-msg");
$.listen("chat-message", (e) => {
  console.warn(e.detail);
  $("#chat")!.append(
    $.expire(10000, chatbox(`${e.detail.data["message-text"]}`))
  );
});
