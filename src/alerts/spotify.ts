import { $ } from "dom";
import { makeSpotifyRequest } from "../auth";
export const setupSpotifyAlerts = async () => {
  let listening_to:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.EpisodeObject
    | null
    | undefined = undefined;

  let hideTimer: NodeJS.Timeout | number | null = null;

  // Create UI
  const icon = $.className($.div, "bars")($.span(), $.span(), $.span());
  const songName = $.className($.p, "song")();
  const artistName = $.className($.p, "artist")();
  const albumArt = $.className($.img, "album")();
  const toast = $.className($.div, "toast")(
    icon,
    albumArt,
    $.div(songName, artistName)
  );
  toast.classList.add("hide");
  $("#spotify")!.append(toast);
  const songChange = (song: NonNullable<typeof listening_to>) => {
    if (song.type === "episode") {
      // ew why am i listening to a podcast on stream
      return;
    }
    songName.innerText = song.name;
    artistName.innerText = song.artists[0].name;
    albumArt.src = song.album?.images[1]?.url;
    toast.classList.remove("hide");
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    hideTimer = setTimeout(() => {
      toast.classList.add("hide");
    }, 5000);
  };

  // API stuff
  const checkPlayerState = async () => {
    const playerState =
      await makeSpotifyRequest<SpotifyApi.CurrentPlaybackResponse>(
        "/v1/me/player"
      );
    const { item } = playerState;
    if (listening_to === undefined) {
      listening_to = item;
    }
    if (!playerState.is_playing) {
      listening_to = null;
    } else if (listening_to?.id !== item?.id) {
      if (item) {
        songChange(item);
        listening_to = item;
      }
    }
    setTimeout(checkPlayerState, 1000);
  };
  checkPlayerState();
};
