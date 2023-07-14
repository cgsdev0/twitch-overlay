import { $ } from "dom";
import { throttle } from "./debounce";

export const setupPngTuber = async () => {
  const png = $.attr($.img)({ src: "/pngtuber/thinking.png" });

  const setActive = throttle((b: boolean) => {
    if (b) {
      png.classList.add("active");
    } else {
      png.classList.remove("active");
    }
  }, 150);

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  const audioContext = new AudioContext();
  const mediaStreamAudioSourceNode =
    audioContext.createMediaStreamSource(stream);
  const analyserNode = audioContext.createAnalyser();
  mediaStreamAudioSourceNode.connect(analyserNode);

  const pcmData = new Float32Array(analyserNode.fftSize);
  const onFrame = () => {
    analyserNode.getFloatTimeDomainData(pcmData);
    let sumSquares = 0.0;
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude;
    }
    setActive(sumSquares > 0.1);

    window.requestAnimationFrame(onFrame);
  };
  window.requestAnimationFrame(onFrame);
  $("#pngtuber")!.append(png);
};
