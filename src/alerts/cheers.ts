import { $ } from "dom";
import { enqueueAlert } from "../queue";

interface ScaledCheermotes {
  1: string;
  1.5: string;
  2: string;
  3: string;
  4: string;
}

interface CheermoteImage {
  animated: ScaledCheermotes;
  static: ScaledCheermotes;
}

interface CheermotesData {
  data: Array<{
    is_charitable: boolean;
    last_updated: string;
    order: number;
    prefix: string;
    type: string;
    tiers: Array<{
      can_cheer: boolean;
      color: string;
      id: string;
      min_bits: number;
      show_in_bits_card: boolean;
      images: {
        dark: CheermoteImage;
        light: CheermoteImage;
      };
    }>;
  }>;
}

export const getCheermotes = async (
  broadcaster_id: string
): Promise<CheermotesData> => {
  let cheermoteCache = null;
  const refetch = async (broadcaster_id: string) => {
    const result = await window.fetch(
      `https://tau.cgs.dev/api/twitch/helix/bits/cheermotes?broadcaster_id=${broadcaster_id}`,
      {
        headers: {
          Authorization: `Token ${$.tauKey()}`,
        },
      }
    );
    const data = await result.json();
    return data;
  };
  if (!cheermoteCache) {
    const data = await refetch(broadcaster_id);
    cheermoteCache = data;
  }
  return cheermoteCache;
};

export const cheermoteParser =
  (cheermotes: CheermotesData, size?: number) =>
  (word: string): Node | string => {
    const matched = word.trim().match(/[0-9]+$/);
    if (!matched || !matched.index) return `${word} `;
    const bits = Number(matched[0]);
    const prefix = word.slice(0, matched.index);
    const cheermote = cheermotes.data.find(
      (cheermote) => prefix === cheermote.prefix
    );
    if (!cheermote) return `${word} `;
    let index = cheermote.tiers.findIndex((tier) => tier.min_bits > bits);
    if (index < 0) index += cheermote.tiers.length;
    const tier = cheermote.tiers[index];
    const imageUrl = tier.images.dark.animated[3];
    return $.wattr($.img, { src: imageUrl, width: size, height: size })();
  };

const parseCheermotes = (
  message: string,
  cheermotes: CheermotesData,
  size?: number
): Array<Node | string> => {
  const parser = cheermoteParser(cheermotes, size);
  return message.split(" ").map(parser);
};

export const setupCheerAlerts = () => {
  const cheer = $.className($.div, "cheer");
  $.listen("channel-cheer", async (e) => {
    const { event_data: data } = e.detail;
    const cheermotes = await getCheermotes(data.broadcaster_user_id);
    enqueueAlert("center", {
      element: cheer(
        `${e.detail.event_data.user_name} cheered with ${e.detail.event_data.bits} bits!`,
        $.div(
          ...parseCheermotes(data.message, cheermotes).filter(
            (node) => typeof node !== "string"
          )
        )
      ),
      durationMs: 10000,
      destination: "#cheer",
    });
  });
};
