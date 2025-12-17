import "./style.css";
import { setupChatWebsocket, setupWebsocket } from "./websocket";
import { setupSubAlerts } from "./alerts/subs";
import { setupChatAlerts } from "./alerts/chat";
import { setupRaidAlerts } from "./alerts/raids";
import { setupFollowAlerts } from "./alerts/follows";
import { setupCheerAlerts } from "./alerts/cheers";
import { setupFishAlerts } from "./alerts/fish";
import { setupSpotifyAlerts } from "./alerts/spotify";
import { setupXkcdAlerts } from "./alerts/xkcd";
import { setupPngTuber } from "./pngtuber";
import { setupArena } from "./alerts/arena";

// TODO:
// something fancy if the goal is met??
// BTTV emotes?
// make raids nicer
// make sub alerts better
// goals
// make follows nicer
// sounds?

// TODO: refactor this AWFUL router
if (window.location.pathname === "/") {
  setupWebsocket();
  setupChatWebsocket();

  // Alerts
  setupSubAlerts();
  setupRaidAlerts();
  setupFollowAlerts();
  setupCheerAlerts();
  setupFishAlerts();
  setupSpotifyAlerts();
  setupXkcdAlerts();
} else if (window.location.pathname === "/chat") {
  setupChatWebsocket();
  setupChatAlerts();
} else if (window.location.pathname === "/arena") {
  setupArena();
} else if (window.location.pathname === "/pngtuber") {
  setupPngTuber();
}
