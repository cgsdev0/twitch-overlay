import "./style.css";
import {
  setupChatWebsocket,
  setupMessageBrokerWebsocket,
  setupWebsocket,
} from "./websocket";
import { setupSubAlerts } from "./alerts/subs";
import { setupChatAlerts } from "./alerts/chat";
import { setupShoutoutAlerts } from "./alerts/shoutouts";
import { setupRaidAlerts } from "./alerts/raids";
import { setupFollowAlerts } from "./alerts/follows";
import { setupCheerAlerts } from "./alerts/cheers";
import { setupFishAlerts } from "./alerts/fish";
import { setupFollowGoalAlerts, setupSubGoalAlerts } from "./alerts/goal";
import { setupSpotifyAlerts } from "./alerts/spotify";
import { setupXkcdAlerts } from "./alerts/xkcd";
import { setupWheel } from "./alerts/wheel";
import { setupPngTuber } from "./pngtuber";
import { setupArena } from "./alerts/arena";
import { setupLicense } from "./alerts/license";

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
  setupLicense();
  setupWebsocket();
  setupMessageBrokerWebsocket();
  setupChatWebsocket();

  // Alerts
  setupSubAlerts();
  setupShoutoutAlerts();
  setupRaidAlerts();
  setupFollowAlerts();
  setupCheerAlerts();
  setupFishAlerts();
  // setupSubGoalAlerts();
  // setupFollowGoalAlerts();
  setupSpotifyAlerts();
  setupWheel();
  setupXkcdAlerts();
} else if (window.location.pathname === "/chat") {
  setupChatWebsocket();
  setupChatAlerts();
} else if (window.location.pathname === "/arena") {
  setupMessageBrokerWebsocket();
  setupArena();
} else if (window.location.pathname === "/pngtuber") {
  setupPngTuber();
}
