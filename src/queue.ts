import { $ } from "dom";

type Alert = {
  element: HTMLElement;
  destination: string;
  durationMs: number;
  onShow?: () => void;
};

type AlertQueue = {
  queue: Alert[];
  active: boolean;
};

const makeDefaultQueue = () => {
  return { queue: [], active: false } as AlertQueue;
};

const alertQueues = {
  subs: makeDefaultQueue(),
  fish: makeDefaultQueue(),
  center: makeDefaultQueue(),
} satisfies Record<string, AlertQueue>;

type QueueId = keyof typeof alertQueues;

export const enqueueAlert = (queueId: QueueId, alert: Alert) => {
  const { queue, active } = alertQueues[queueId];
  if (!active) {
    showAlert(queueId, alert);
    return;
  }
  queue.push(alert);
};

const showNextAlert = (queueId: QueueId, toRemove: HTMLElement) => () => {
  toRemove.remove();
  if (!alertQueues[queueId].queue.length) {
    alertQueues[queueId].active = false;
    return;
  }
  const alert = alertQueues[queueId].queue.shift()!;
  showAlert(queueId, alert);
};

const showAlert = (queueId: QueueId, alert: Alert) => {
  alertQueues[queueId].active = true;
  $(alert.destination)!.append(alert.element);
  if (alert.onShow) alert.onShow();
  setTimeout(showNextAlert(queueId, alert.element), alert.durationMs);
};
