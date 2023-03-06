import "./style.css";
import { $ } from "dom";
import { setupChatWebsocket, setupWebsocket } from "./websocket";

setupWebsocket();
setupChatWebsocket();

// TODO:
// raids
// goals
// make follows nicer
// cheers
// subscribers
// hype train?
// spotify?
// sounds?

const findClip = async (broadcaster_id: string) => {
  const start = new Date(Date.now() - 60 * 60 * 24 * 365 * 1000);
  const end = new Date();
  const result = await window.fetch(
    `https://tau.cgs.dev/api/twitch/helix/clips?broadcaster_id=${broadcaster_id}&first=100&started_at=${start.toISOString()}&ended_at=${end.toISOString()}`,
    {
      headers: {
        Authorization: `Token ${$.tauKey()}`,
      },
    }
  );
  const data = await result.json();
  function get_random<T>(list: Array<T>): T {
    return list[Math.floor(Math.random() * list.length)];
  }
  return get_random(data.data);
};

const follow = $.className($.div, "follow");
$.listen("channel-follow", (e) => {
  $("#app")!.append(
    $.expire(5000, follow(`${e.detail.event_data.user_name} followed!`))
  );
});

const chatbox = $.attr($.slideUp($.className($.div, "chat-msg")));
const username = $.className($.p, "username");
const msg = $.className($.p, "msg");
const twitchEmote = (id: string, size: number) =>
  $.wattr($.img, {
    src: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
    width: size,
    height: size,
  })();

const shoutout = $.className($.div, "shoutout");
$.listen("channel-shoutout-create", async (e) => {
  const data = e.detail;
  const clip: any = await findClip(data.event_data.to_broadcaster_user_id);
  $("#shoutout")!.append(
    $.expire(
      Math.min(clip.duration, 20) * 1000,
      shoutout(
        $.h1(data.event_data.to_broadcaster_user_name),
        $.wattr($.iframe, {
          src: `${clip.embed_url}&parent=${window.location.host}&autoplay=true&controls=false`,
          width: 720,
          height: 405,
        })()
      )
    )
  );
});

$.listen("chat-message", (e) => {
  const { data } = e.detail;
  if (data["message-text"].startsWith("!")) {
    return;
  }
  // if (data.tags["display-name"] === "goodcop_") {
  //   return;
  // }
  const emotes = data.tags.emotes
    .map((emote) =>
      emote.positions.map(([start, end]) => ({ start, end, id: emote.id }))
    )
    .flat();
  emotes.sort((a, b) => b.end - a.end);
  const msgText = data["message-text"];
  let msgSliced: Array<string | Node> = [];
  let end = msgText.length;
  emotes.forEach((emote) => {
    msgSliced.push(msgText.slice(emote.end + 1, end));
    end = emote.start;
    msgSliced.push(
      twitchEmote(
        emote.id,
        data.tags["emote-only"] === "1" ? (emotes.length === 1 ? 90 : 50) : 22
      )
    );
  });
  msgSliced.push(msgText.slice(0, end));
  msgSliced.reverse();
  const isSub = data.tags.subscriber === "1";
  $("#chat")!.append(
    $.expire(
      60000,
      chatbox(
        {
          style: $.styles({
            border: `3px solid ${data.tags.color}`,
            "box-shadow": isSub ? `0px 0px 36px 7px ${data.tags.color}` : "",
          }),
        },
        username(data.tags["display-name"]),
        msg(...msgSliced.filter((s) => s !== ""))
      ),
      "fade-out"
    )
  );
});
