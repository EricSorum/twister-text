// src/utils/textUtils.js

export const parseText = (text) => {
  // Remove any extra whitespace and split the text into words
  return text.trim().split(/\s+/);
};

export const TEXT_CONTENT = `Lorem ipsum odor amet, consectetuer adipiscing elit. Sapien augue iaculis potenti, cubilia lacinia senectus aenean integer vehicula. Donec turpis ut venenatis velit netus, magnis lacinia.`;