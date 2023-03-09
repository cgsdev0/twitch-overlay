import { $ } from "dom";
import { cheermoteParser, getCheermotes } from "./cheers";

export const setupChatAlerts = () => {
  const chatbox = $.attr($.slideUp($.className($.div, "chat-msg")));
  const username = $.className($.p, "username");
  const msg = $.className($.p, "msg");
  const twitchEmote = (id: string, size: number) =>
    $.wattr($.img, {
      src: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0`,
      width: size,
      height: size,
    })();

  $.listen("chat-message", async (e) => {
    const { data } = e.detail;
    if (data["message-text"].startsWith("!")) {
      return;
    }
    if (data.tags["display-name"] === "goodcop_") {
      return;
    }
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

    if (data.tags.bits) {
      const cheermotes = await getCheermotes(data.tags["room-id"]);
      const parser = cheermoteParser(cheermotes, 22);
      msgSliced = msgSliced
        .map((segment) => {
          if (typeof segment !== "string") return segment;
          return segment.split(" ").map(parser);
        })
        .flat();
    }
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
};
