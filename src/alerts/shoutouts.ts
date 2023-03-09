import { $ } from "dom";
import { enqueueAlert } from "../queue";

export const setupShoutoutAlerts = () => {
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
  const shoutout = $.className($.div, "shoutout");
  $.listen("channel-shoutout-create", async (e) => {
    const data = e.detail;
    const clip: any = await findClip(data.event_data.to_broadcaster_user_id);
    enqueueAlert("center", {
      durationMs: Math.min(clip.duration, 20) * 1000,
      destination: "#shoutout",
      element: shoutout(
        $.h1(data.event_data.to_broadcaster_user_name),
        $.wattr($.iframe, {
          src: `${clip.embed_url}&parent=${window.location.host}&autoplay=true&controls=false`,
          width: 720,
          height: 405,
        })()
      ),
    });
  });
};
