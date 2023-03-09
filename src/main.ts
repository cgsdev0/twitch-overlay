import "./style.css";
import { setupChatWebsocket, setupWebsocket } from "./websocket";
import { setupSubAlerts } from "./alerts/subs";
import { setupChatAlerts } from "./alerts/chat";
import { setupShoutoutAlerts } from "./alerts/shoutouts";
import { setupRaidAlerts } from "./alerts/raids";
import { setupFollowAlerts } from "./alerts/follows";
import { setupCheerAlerts } from "./alerts/cheers";
import { setupFishAlerts } from "./alerts/fish";
import { setupSubGoalAlerts } from "./alerts/goal";
import { setupSpotifyAlerts } from "./alerts/spotify";

// TODO:
// something fancy if the goal is met??
// BTTV emotes?
// make raids nicer
// make sub alerts better
// goals
// make follows nicer
// spotify?
// sounds?

setupWebsocket();
setupChatWebsocket();

// Alerts
setupSubAlerts();
setupChatAlerts();
setupShoutoutAlerts();
setupRaidAlerts();
setupFollowAlerts();
setupCheerAlerts();
setupFishAlerts();
setupSubGoalAlerts();
setupSpotifyAlerts();
