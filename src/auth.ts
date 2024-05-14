type SecretType =
  | "TAU_TOKEN"
  | "SPOTIFY_CLIENT_ID"
  | "SPOTIFY_CLIENT_SECRET"
  | "SPOTIFY_REFRESH_TOKEN"
  | "ELEVEN_LABS_SECRET";

export const getSecret = (key: SecretType) => {
  return (
    new URLSearchParams(window.location.search).get(key) ||
    import.meta.env[`VITE_${key}`]
  );
};

const HELIX_URL_BASE = "https://tau.cgs.dev/api/twitch/helix";

type RelativeEndpoint = `/${string}`;

export const makeHelixRequest = (endpoint: RelativeEndpoint) => {
  return fetch(`${HELIX_URL_BASE}${endpoint}`, {
    headers: { Authorization: `Token ${getSecret("TAU_TOKEN")}` },
  });
};

const fetchSpotifyAccessToken = async () => {
  const clientId = getSecret("SPOTIFY_CLIENT_ID");
  const clientSecret = getSecret("SPOTIFY_CLIENT_SECRET");
  const refreshToken = getSecret("SPOTIFY_REFRESH_TOKEN");
  const data = new URLSearchParams();
  data.append("grant_type", "refresh_token");
  data.append("refresh_token", refreshToken);
  data.append("client_id", clientId);
  const result = await window.fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
  });
  const { access_token } = await result.json();
  return access_token;
};

let spotify_access_token: string | null = null;
export const makeSpotifyRequest = async <T>(
  endpoint: RelativeEndpoint,
): Promise<T | null> => {
  const tryFetch = () =>
    window.fetch(`https://api.spotify.com${endpoint}`, {
      headers: { Authorization: `Bearer ${spotify_access_token}` },
    });
  let result = await tryFetch();
  if (result.status === 401) {
    // unauthorized, let's fetch a new access token and retry
    spotify_access_token = await fetchSpotifyAccessToken();
    result = await tryFetch();
  }
  if (!result.ok) {
    throw new Error("Spotify API error", { cause: result });
  }
  if (result.status === 204) {
    return null;
  }
  return await result.json();
};
