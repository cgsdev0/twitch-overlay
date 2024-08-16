import { $, TauMessage } from "dom";
import {
  ChannelSubscriptionMessage,
  ChannelSubscribe,
  ChannelSubscriptionGift,
} from "tau-types";
import { makeHelixRequest } from "../auth";
import { getDominantColors, pickPaletteColor } from "../colors";
import { enqueueAlert } from "../queue";

export const setupSubAlerts = () => {
  const plop = new Audio("/sounds/fish_plop.mp3");
  plop.volume = 0.2;

  const casting = new Audio("/sounds/casting1.wav");
  casting.volume = 0.3;

  const whip = new Audio("/sounds/whip1.wav");
  whip.volume = 0.3;

  const ding = new Audio("/sounds/ding.wav");
  ding.volume = 0.3;

  const fisherImg = $.wattr($.img, {
    src: "./pngtuber/fish.png",
    class: "fisher",
  })();
  $("#app")?.append(fisherImg);
  const subscribe = $.attr($.className($.div, "subscribe"));
  const subscribeText = $.className($.p, "subscribe");
  const tierMap = {
    "1000": 1,
    "2000": 2,
    "3000": 3,
  };
  // $.listen("channel-subscribe", (e) => {
  //   const { event_data: data } = e.detail;
  //   enqueueAlert("subs", {
  //     element: subscribe(
  //       `${data.user_name} just subscribed with tier ${
  //         tierMap[data.tier as keyof typeof tierMap]
  //       }!`
  //     ),
  //     destination: "#app",
  //     durationMs: 8000,
  //   });
  // });

  const catchSubscriber = async <
    T extends
      | CustomEvent<TauMessage<ChannelSubscribe, "channel-subscribe">>
      | CustomEvent<
          TauMessage<ChannelSubscriptionGift, "channel-subscription-gift">
        >
      | CustomEvent<
          TauMessage<ChannelSubscriptionMessage, "channel-subscription-message">
        >,
  >(
    e: T,
  ) => {
    const { event_data } = e.detail;
    const result = await makeHelixRequest(
      `/users?login=${e.detail.event_data.user_login}`,
    );
    const { data } = await result.json();
    const [twitchUser] = data;
    const fish = subscribe({
      style: $.styles({
        "background-image": `url("${twitchUser.profile_image_url}")`,
      }),
    });
    const profileImg = $.wattr($.img, {
      src: twitchUser.profile_image_url,
      crossOrigin: "anonymous",
    })();
    profileImg.addEventListener("load", () => {
      const color = pickPaletteColor(getDominantColors(profileImg));
      (fish.style as any)["border-color"] = color;
    });
    enqueueAlert("subs", {
      onShow: () => {
        setTimeout(() => {
          whip.play();
          casting.play();
        }, 500);
        $(".fisher")?.classList.remove("unreeling");
        $(".fisher")?.classList.add("reeling");
        setTimeout(() => {
          fish.classList.add("swim-away");
        }, 6000);
        setTimeout(() => {
          $(".fisher")?.classList.add("unreeling");
          $(".fisher")?.classList.remove("reeling");
        }, 2000);
        setTimeout(() => {
          ding.play();
        }, 3200);
        setTimeout(() => {
          plop.play();
        }, 1350);
      },
      element: $.div(
        fish,
        subscribeText(
          e.detail.event_type === "channel-subscription-gift"
            ? `${event_data.user_name} just gifted ${event_data.total} tier ${
                tierMap[event_data.tier as keyof typeof tierMap]
              } subs!`
            : `${event_data.user_name} just subscribed with tier ${
                tierMap[event_data.tier as keyof typeof tierMap]
              }!`,
        ),
      ),
      destination: "#app",
      durationMs: 8000,
    });
  };
  $.listen("channel-subscription-message", (e) => {
    catchSubscriber(e);
  });
  $.listen("channel-subscription-gift", (e) => {
    if (e.detail.event_data.is_anonymous) return;
    catchSubscriber(e);
  });

  // const banned = [
  //   "she",
  //   "her",
  //   "girl",
  //   "man",
  //   "ugly",
  //   "woman",
  //   "gender",
  //   "cop",
  //   "suck",
  //   "boob",
  //   "tit",
  //   "fk",
  //   "you",
  //   "cop",
  //   "him",
  //   "his",
  // ];
  // $.listen("channel-subscribe", (e) => {
  //   catchSubscriber(e);
  // });
};
