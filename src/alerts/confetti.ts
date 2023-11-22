import confetti from "canvas-confetti";

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
