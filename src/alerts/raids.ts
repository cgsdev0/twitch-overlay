import { $ } from "dom";

export const setupRaidAlerts = () => {
  const raid = $.className($.div, "raid");
  $.listen("channel-raid", (e) => {
    $("#app")!.append(
      $.expire(
        5000,
        raid(
          `${e.detail.event_data.from_broadcaster_user_name} raided with ${e.detail.event_data.viewers} viewers!`
        )
      )
    );
  });
};
