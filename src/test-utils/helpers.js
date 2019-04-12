export const setSliderValue = (slider, value) => {
  // React sliders overwrite the value setter, so we reach to get it from the window
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  // We call and dispatch that action as a new event
  nativeInputValueSetter.call(slider, value);
  slider.dispatchEvent(new Event('change', { value, bubbles: true }));
};
