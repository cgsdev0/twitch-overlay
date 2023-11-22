import { $ } from "dom";
import { ChannelGoalProgress } from "tau-types";
import { shootConfetti } from "./confetti";

export const setupFollowGoalAlerts = () => {
  let persisted: undefined | ChannelGoalProgress;
  let startedAt = 0;
  const fromStorage = localStorage.getItem("follow-goal");
  if (fromStorage) {
    persisted = JSON.parse(fromStorage) as ChannelGoalProgress;
  }
  const fromStorageStartedAt = localStorage.getItem("follow-goal-started-at");
  if (fromStorageStartedAt) {
    startedAt = Number.parseInt(fromStorageStartedAt);
  }
  const text = $.p("");
  const bar = $.className($.div, "progress-bar-inner")();
  const outerBar = $.className($.div, "progress-bar")(bar, text);
  const goal = $.className($.div, "follow-goal-container")(outerBar);
  $("#follow-goal")!.append(goal);
  goal.classList.add("hide");

  let hideTimer: NodeJS.Timeout | number | null = null;

  const show = () => {
    goal.classList.remove("hide");
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    hideTimer = setTimeout(() => {
      goal.classList.add("hide");
    }, 8000);
  };

  $.listen("stream-online", (_) => {
    show();
  });

  $.listen("channel-goal-begin", (e) => {
    startedAt = Math.floor(e.detail.event_data.current_amount / 100.0) * 100;
    localStorage.setItem("follow-goal-started-at", startedAt.toString());
    if (persisted) updateText(persisted);
  });

  const updateText = (data: ChannelGoalProgress) => {
    text.innerText = `Current goal: ${data.description}\n${data.current_amount} / ${data.target_amount} followers`;
    setTimeout(() => {
      bar.style.width = `calc(${
        Math.min(
          1.0,
          (data.current_amount - startedAt) / (data.target_amount - startedAt)
        ) * 100
      }% - 4px)`;
    }, 1000);
  };
  if (persisted) {
    updateText(persisted);
  }

  $.listen("channel-goal-progress", (e) => {
    const { event_data: data } = e.detail;
    if (!data.type.includes("follow")) return;
    localStorage.setItem("follow-goal", JSON.stringify(data));
    updateText(data);
    setTimeout(() => {
      if (data.target_amount === data.current_amount) {
        shootConfetti();
      }
    }, 1000);
    show();
  });
};

export const setupSubGoalAlerts = () => {
  const text = $.p("");
  const bar = $.className($.div, "progress-bar-inner")();
  const outerBar = $.className($.div, "progress-bar")(bar, text);
  const goal = $.className($.div, "goal-container")($.h1("Sub Goal"), outerBar);
  $("#goal")!.append(goal);
  goal.classList.add("hide");

  let hideTimer: NodeJS.Timeout | number | null = null;

  $.listen("channel-goal-progress", (e) => {
    const { event_data: data } = e.detail;
    if (!data.type.includes("subscription")) return;
    text.innerText = `${data.current_amount} / ${data.target_amount}`;
    goal.classList.remove("hide");
    bar.style.width = `calc(${
      Math.min(1.0, data.current_amount / data.target_amount) * 100
    }% - 4px)`;
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    hideTimer = setTimeout(() => {
      goal.classList.add("hide");
    }, 8000);
  });
};
