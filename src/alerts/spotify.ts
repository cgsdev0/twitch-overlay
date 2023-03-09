import { $ } from "dom";
export const setupSpotifyAlerts = async () => {
  let listening_to: any = null;

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
  const songChange = (song: any) => {
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
  const fetchAccessToken = async () => {
    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN);
    data.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const result = await window.fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );
    const { access_token } = await result.json();
    return access_token;
  };
  const access_token = await fetchAccessToken();

  const checkPlayerState = async () => {
    const result = await window.fetch("https://api.spotify.com/v1/me/player", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const playerState = await result.json();
    const { item } = playerState;
    if (!listening_to) {
      listening_to = item;
    }
    if (listening_to.id !== item.id) {
      songChange(item);
      listening_to = item;
    }
    setTimeout(checkPlayerState, 1000);
  };
  checkPlayerState();
};
