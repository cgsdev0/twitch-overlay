import { $ } from "dom";
import { enqueueAlert } from "../queue";

export const setupSubAlerts = () => {
  const subscribe = $.className($.div, "subscribe");
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

  $.listen("channel-subscription-message", (e) => {
    const { event_data: data } = e.detail;
    enqueueAlert("subs", {
      onShow: () => {},
      element: subscribe(
        `${data.user_name} just subscribed with tier ${
          tierMap[data.tier as keyof typeof tierMap]
        }!`
      ),
      destination: "#app",
      durationMs: 8000,
    });
  });

  const gift = $.className($.div, "gift");
  $.listen("channel-subscription-gift", (e) => {
    const { event_data: data } = e.detail;
    enqueueAlert("subs", {
      element: gift(
        `${data.user_name} just gifted ${data.total} tier ${
          tierMap[data.tier as keyof typeof tierMap]
        } subs!`
      ),
      destination: "#app",
      durationMs: 5000,
    });
  });
};
