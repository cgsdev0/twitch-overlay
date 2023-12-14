import { $ } from "dom";

export interface XkcdDescription {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export const setupXkcdAlerts = () => {
  // https://corsproxy.io/?https://xkcd.com/1000/info.0.json

  $.listen("irc-message", async (e) => {
    const data = e.detail;

    if (data.command !== "PRIVMSG") {
      return;
    }
    if (!data.tags) {
      return;
    }
    const messageText = data.sections.slice(1).join(" ").slice(1);
    const match = messageText.match(/https:\/\/xkcd\.com\/(?:([0-9]+)\/)?/);
    if (match) {
      const num = match[1];
      let requestUrl = "https://corsproxy.io/?https://xkcd.com/";
      if (num) {
        requestUrl += `${num}/`;
      }
      requestUrl += "info.0.json";
      const result = await window.fetch(requestUrl);
      const data: XkcdDescription = await result.json();
      $("#xkcd")!.innerHTML = "";
      $("#xkcd")!.append(
        $.expire(20000, $.attr($.img)({ src: data.img }), "fade-out")
      );
    }
  });
};
