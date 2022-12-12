import ValidatorWidget from '../ValidatorWidget';

const container = document.createElement('div');
const validatorWidget = new ValidatorWidget(container);
validatorWidget.render();

test('Метод onSubmit запускает коллбеки', () => {
  const event = new Event('click');
  let fn = () => {};
  fn = jest.fn();
  validatorWidget.subscribeOnSubmit(fn);
  validatorWidget.onSubmit(event, 1);
  expect(fn).toBeCalled();
});

test('Метод onInput запускает коллбеки', () => {
  const event = {
    preventDefault: () => {},
    target: {
      value: 'test',
    },
  };
  let fn1 = () => {};
  fn1 = jest.fn();
  validatorWidget.subscribeOnInput(fn1);
  validatorWidget.onInput(event);
  expect(fn1).toBeCalled();
});

test('Выбросит ошибку если не передать HTML элемент', () => {
  expect(() => new ValidatorWidget(4)).toThrow();
});

test('Метод render подключает разметку в DOM', () => {
  expect(validatorWidget.container.innerHTML).toEqual(ValidatorWidget.markup);
});

test('Метод subscribeOnSubmit добавляет коллбек в массив слушателей', () => {
  validatorWidget.subscribeOnSubmit(() => {});
  expect(validatorWidget.submitListeners.length).toBe(2);
});

test('Метод subscribeOnInput добавляет коллбек в массив слушателей', () => {
  validatorWidget.subscribeOnInput(() => {});
  expect(validatorWidget.inputListeners.length).toBe(2);
});

test('Тест события submit на форме', () => {
  const event = new Event('submit');
  validatorWidget.onSubmit = jest.fn();
  const formElement = validatorWidget.container.querySelector(ValidatorWidget.formID);
  formElement.dispatchEvent(event);
  expect(validatorWidget.onSubmit).toBeCalled();
});

test('Тест события input на форме', () => {
  const event = new Event('input');
  validatorWidget.onInput = jest.fn();
  const inputElement = validatorWidget.container.querySelector(ValidatorWidget.inputID);
  inputElement.dispatchEvent(event);
  expect(validatorWidget.onInput).toBeCalled();
});

test('Тест метода showPaySystem', () => {
  const testPaySystem = 'mir';
  validatorWidget.showPaySystem(testPaySystem);
  const paySystemElement = validatorWidget.cards.find((card) =>
    card.classList.contains(testPaySystem)
  );
  expect(paySystemElement.classList.contains('hidden')).toBeFalsy();
  validatorWidget.showPaySystem();
  expect(validatorWidget.cards.every((card) => card.classList.contains('hidden'))).toBeFalsy();
});

// test('Метод onSubmit запускает коллбеки', () => {
//   const event = new Event('click');
//   let fn = () => {};
//   fn = jest.fn();
//   validatorWidget.subscribeOnSubmit(fn);
//   validatorWidget.onSubmit(event, 1);
//   expect(fn).toBeCalled();
// });
//
// test('Метод onInput запускает коллбеки', () => {
//   const event = {
//     preventDefault: () => {},
//     target: {
//       value: 'test',
//     },
//   };
//   let fn1 = () => {};
//   fn1 = jest.fn();
//   validatorWidget.subscribeOnInput(fn1);
//   validatorWidget.onInput(event);
//   expect(fn1).toBeCalled();
// });
