import { $ } from "dom";
import { enqueueAlert } from "../queue";
import { makeHelixRequest } from "../auth";

export const setupRaidAlerts = () => {
  const raid = $.className($.div, "raid");
  const sound = new Audio("/sounds/raid.ogg");
  sound.volume = 0.2;
  $.listen("channel-raid", async (e) => {
    if (e.detail.event_data.from_broadcaster_user_name === "badcop_") return;
    const result = await makeHelixRequest(
      `/users?login=${e.detail.event_data.from_broadcaster_user_login}`
    );
    const { data } = await result.json();
    const [twitchUser] = data;
    enqueueAlert("center", {
      durationMs: 7200,
      destination: "#raid",
      onShow: () => sound.play(),
      transitionOut: { className: "fade-out-500ms", durationMs: 800 },
      element: raid(
        $.attr($.img)({ src: twitchUser.profile_image_url }),
        $.p(
          `${e.detail.event_data.from_broadcaster_user_name} is raiding with ${e.detail.event_data.viewers} viewers!`
        )
      ),
    });
  });
};
