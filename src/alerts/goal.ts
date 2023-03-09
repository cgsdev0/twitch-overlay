import { $ } from "dom";

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
