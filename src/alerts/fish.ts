import { $ } from "dom";
import { enqueueAlert } from "../queue";
export const setupFishAlerts = () => {
  const fishImgUrl = (fish: string) => {
    return `/fish/${encodeURIComponent(fish.toLowerCase())}.png`;
  };
  const fishImg = (fish: string) => $.wattr($.img, { src: fishImgUrl(fish) })();

  const plop = new Audio("/sounds/fish_plop.mp3");
  plop.volume = 0.2;

  const legendary = new Audio("/sounds/fish_legendary.mp3");
  legendary.volume = 0.3;

  const nullfish = new Audio("/sounds/fish_null.mp3");
  nullfish.volume = 0.3;

  $.listen("chat-message", (e) => {
    const { data } = e.detail;
    if (data.tags["display-name"] !== "goodcop_") return;
    if (data["message-text"].match(/ \([a-zA-Z]* rod used\)$/)) {
      const fish = data["message-text"]
        .toLowerCase()
        .split(" ")
        .slice(3)
        .filter((word) => word !== "first")
        .join(" ")
        .split(" (")[0];

      const rarity = data["message-text"]
        .match(/\(([a-zA-Z ]*)\)/)![1]
        .toLowerCase();

      enqueueAlert("fish", {
        element: fishImg(fish),
        onShow: () =>
          setTimeout(
            () =>
              fish === "{null}fish"
                ? nullfish.play()
                : rarity === "legendary"
                ? legendary.play()
                : plop.play(),
            100
          ),
        destination: "#pond",
        durationMs: 3000,
      });
    }
  });
};
