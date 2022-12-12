import Modal from '../Modal';

const container = document.createElement('div');
const modal = new Modal(container);
modal.render();

test('Выбросит ошибку если не передать HTML элемент', () => {
  expect(() => new Modal(4)).toThrow();
});

test('Метод render подключает разметку в DOM', () => {
  expect(modal.container.innerHTML).toEqual(Modal.markup);
});

test('Геттер modalContainerElement возвращает правильный элемент', () => {
  expect(modal.modalContainerElement.classList.contains('modal-container')).toBeTruthy();
});

test('Сеттер и геттер modalText устанавливает и считывают правильное значение', () => {
  modal.modalText = 'test';
  expect(modal.modalText).toBe('test');
});

test('Метод removeModal удаляет класс active', () => {
  modal.showModal('');
  modal.removeModal();
  expect(modal.modalContainerElement.classList.contains('active')).toBeFalsy();
});

test('Метод showModal добавляет класс active', () => {
  modal.showModal('');
  expect(modal.modalContainerElement.classList.contains('active')).toBeTruthy();
});

test('Тест клика по кнопке', () => {
  modal.showModal('');
  modal.modalButtonElement.click();
  expect(modal.modalContainerElement.classList.contains('active')).toBeFalsy();
});

test('Тест клика по свободному полю', () => {
  modal.showModal('');
  modal.modalBackGroundElement.click();
  expect(modal.modalContainerElement.classList.contains('active')).toBeFalsy();
});
