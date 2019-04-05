export const setSliderValue = (slider, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  nativeInputValueSetter.call(slider, value);
  slider.dispatchEvent(new Event('change', { value, bubbles: true }));
};
