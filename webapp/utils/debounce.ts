const debounce = (callback: () => void, time: number) => {
  let interval: NodeJS.Timeout;
  if (interval) clearTimeout(interval);
  interval = setTimeout(() => {
    interval = null;
    callback();
  }, time);
};

export default debounce;
