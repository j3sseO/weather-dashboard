export const celsiusToFahrenheit = (celsius: number): number =>
  Math.round((celsius * 9) / 5 + 32)

export const setActiveButton = (
  activeButton: HTMLElement,
  inactiveButton: HTMLElement,
) => {
  activeButton.classList.add('bg-white/10')
  inactiveButton.classList.remove('bg-white/10')
}
