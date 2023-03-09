import { $ } from "dom";

export const setupFollowAlerts = () => {
  const follow = $.className($.div, "follow");
  $.listen("channel-follow", (e) => {
    $("#app")!.append(
      $.expire(5000, follow(`${e.detail.event_data.user_name} followed!`))
    );
  });
};
