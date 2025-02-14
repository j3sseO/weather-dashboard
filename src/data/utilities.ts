export const celsiusToFahrenheit = (celsius: number): number =>
  Math.round((celsius * 9) / 5 + 32)

export const setActiveButton = (
  activeButton: HTMLElement[],
  inactiveButtons: HTMLElement[],
) => {
  activeButton.forEach(button => button.classList.add('bg-white/10'))
  inactiveButtons.forEach(button => button.classList.remove('bg-white/10'))
}
