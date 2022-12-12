import Modal from '../Modal';

const modal = new Modal(document.createElement('div'));

test('Метод removeModal удаляет модальное окно', () => {
  modal.showModal('test');
  modal.removeModal();
  expect(modal.container.firstElementChild).toBe(null);
});

test('Модальное окно вставляется в DOM', () => {
  modal.showModal('test');
  expect(modal.container.firstElementChild.classList.contains('modal-container')).toBeTruthy();
});
