import confetti from "canvas-confetti";

export const arenaConfetti = () => {
  var duration = 500;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      spread: 45,
      startVelocity: -40,
      ticks: 100,
      gravity: 1,
      angle: 270 + 30,
      scalar: 1,
      decay: 0.91,
      origin: { y: 0.62, x: 1.01 },
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
export const shootConfetti = () => {
  var duration = 1 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      spread: 90,
      startVelocity: -120,
      ticks: 400,
      gravity: 3,
      angle: 270,
      scalar: 3,
      decay: 0.92,
      origin: { y: 1.3 },
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
