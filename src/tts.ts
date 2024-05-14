import { getSecret } from "./auth";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const requestQueue: Array<Promise<any>> = [];
export async function requestTts(text: string) {
  if (requestQueue.length) {
    try {
      await requestQueue[requestQueue.length - 1];
    } catch (e) {
      // it do be like that sometimes
    }
  }
  const secret = getSecret("ELEVEN_LABS_SECRET");
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": secret },
    body: `{"text":"${text.replaceAll('"', '\\"')}","model_id":"eleven_monolingual_v1","voice_settings":{"stability":0.5,"similarity_boost":0.5}}`,
  };

  const fetcher = () =>
    fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/NSHdM56mgP2LnAfwCgqE",
      options,
    );
  let promise = fetcher();
  requestQueue.push(promise);
  promise.finally(() => requestQueue.shift());
  let result = await promise;
  if (result.status === 429) {
    // wait and retry
    console.log("waiting...");
    await timeout(2000);
    console.log("retrying!");
    promise = fetcher();
    requestQueue.push(promise);
    promise.finally(() => requestQueue.shift());
    result = await promise;
  }
  return window.URL.createObjectURL(await result.blob());
}

export async function playTts(url: string, after?: Promise<any>) {
  if (after) {
    await after;
  }
  const audio = new Audio();
  audio.src = url;
  return await new Promise((res) => {
    audio.play();
    audio.onended = res;
  });
}

const queue: Array<Promise<unknown>> = [];
export async function queueTts(text: string) {
  // get the sound as soon as possible
  const url = await requestTts(text);
  if (queue.length === 0) {
    const promise = playTts(url);
    queue.push(promise);
    promise.finally(() => queue.shift());
  } else {
    const after = queue[queue.length - 1];
    const promise = playTts(url, after);
    queue.push(promise);
    promise.finally(() => queue.shift());
  }
}
