import Tooltip from '../Tooltip';

const tooltip = new Tooltip(document.createElement('div'));
tooltip.bindToDOM();

test('Выбросит ошибку если не передать HTML элемент', () => {
  expect(() => new Tooltip(4)).toThrow();
});

test('Метод bindToDOM подключает разметку в DOM', () => {
  expect(tooltip.container.innerHTML).toEqual(Tooltip.markup);
});

test('Геттер popoverContainer возвращает правильный элемент', () => {
  expect(tooltip.popoverContainer.classList.contains('popover')).toBeTruthy();
});

test('Геттер popoverTitle возвращает правильный элемент', () => {
  expect(tooltip.popoverTitle.classList.contains('popover-title')).toBeTruthy();
});

test('Геттер popoverBody возвращает правильный элемент', () => {
  expect(tooltip.popoverBody.classList.contains('popover-body')).toBeTruthy();
});

test('Метод showTooltip меняет значение this.show с false на true когда отображает модалку', () => {
  tooltip.showTooltip(document.createElement('div'));
  expect(tooltip.show).toBe(true);
});

test('Метод showTooltip меняет значение this.show с false на true когда отображает модалку', () => {
  tooltip.showTooltip(document.createElement('div'));
  expect(tooltip.show).toBe(false);
});

jest.useFakeTimers();
test('После того как отработае таймер содержимое тултипа очиститься', () => {
  tooltip.show = true;
  tooltip.showTooltip(document.createElement('div'));
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(tooltip.popoverTitle.textContent).toBe('');
  expect(tooltip.popoverBody.textContent).toBe('');
});
