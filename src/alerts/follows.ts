import { $ } from "dom";
import { makeHelixRequest } from "../auth";

const follow = $.className($.div, "follow");

const user = (username: string, avatar: string) =>
  $.className($.div, "user")(
    $.section(
      $.attr($.img)({ src: "/img/profile.png" }),
      $.attr($.img)({ src: avatar })
    ),
    $.className($.div, "text")($.p(username), $.p("has just followed!"))
  );

const content = (username: string, avatar: string) =>
  $.className($.div, "content")(
    user(username, avatar),
    $.className($.div, "options")("Options")
  );

const header = () =>
  $.header(
    $.span(
      $.attr($.img)({ src: "/img/msn.png" }),
      $.p("Windows Live Messenger")
    ),
    $.attr($.img)({ src: "/img/close.svg" })
  );

export const setupFollowAlerts = () => {
  const sound = new Audio("/sounds/msn_messenger.mp3");
  sound.volume = 0.2;
  $.listen("channel-follow", async (e) => {
    const dupeKey = `followed-by-${e.detail.event_data.user_login}`;
    if (localStorage.getItem(dupeKey)) return;
    localStorage.setItem(dupeKey, true);
    const result = await makeHelixRequest(
      `/users?login=${e.detail.event_data.user_login}`
    );
    const { data } = await result.json();
    const [twitchUser] = data;
    sound.play();
    $("#app")!.append(
      $.expire(
        8000,
        follow(
          header(),
          content(e.detail.event_data.user_name, twitchUser.profile_image_url)
        ),
        "go_away"
      )
    );
  });
};
