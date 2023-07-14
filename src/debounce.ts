export function throttle(cb: any, delay: number) {
  let wait = false;

  return (...args: any[]) => {
    if (wait) {
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}
