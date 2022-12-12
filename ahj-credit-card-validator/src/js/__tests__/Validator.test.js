import Validator from '../Validator';
import paymentSystems from '../paymentSystem';

const root = document.createElement('div');
const validator = new Validator(root, paymentSystems);

test('Метод validateCardNumbers корректно валидирует входные данные', () => {
  expect(validator.validateCardNumbers('347936689175690')).toBeTruthy();
});

test.each([
  ['Mir', '2201382000000013', 'Mir'],
  ['Visa', '4012888888881881', 'Visa'],
  ['MasterCard', '5155555555554444', 'MasterCard'],
  ['MasterCard', '5255555555554444', 'MasterCard'],
  ['MasterCard', '5355555555554444', 'MasterCard'],
  ['MasterCard', '5455555555554444', 'MasterCard'],
  ['MasterCard', '5555555555554444', 'MasterCard'],
  ['Amex', '347936689175690', 'American Express'],
  ['Amex', '371456244162991', 'American Express'],
  ['JCB', '3530111333300000', 'JCB International'],
])('Метод identVendors верно идентифицирует платежную систему %s', (_, cardNumber, expected) => {
  validator.validatorWidget.showPaySystem = jest.fn();
  validator.identVendors(cardNumber);
  expect(validator.currentPaymentSystem).toBe(expected);
});

test('Метод init должен вызвать нужные методы', () => {
  validator.validatorWidget.render = jest.fn();
  validator.modal.render = jest.fn();
  validator.validatorWidget.subscribeOnSubmit = jest.fn();
  validator.validatorWidget.subscribeOnInput = jest.fn();
  validator.init();
  expect(validator.validatorWidget.render).toBeCalled();
  expect(validator.modal.render).toBeCalled();
  expect(validator.validatorWidget.subscribeOnSubmit).toBeCalled();
  expect(validator.validatorWidget.subscribeOnInput).toBeCalled();
});

test('Если длина номера карты меньше 15, метод validateNumbers вызывает модальное окно и завершает работу', () => {
  validator.modal.showModal = jest.fn();
  validator.validateNumbers('42423');
  expect(validator.modal.showModal).toBeCalledWith('This card is not valid');
});

test('Метод validateNumbers вызывает метод validateCardNumbers, если номер валиден, показывает модальное окно', () => {
  validator.currentPaymentSystem = 'MasterCard';
  validator.modal.showModal = jest.fn((value) => value);
  validator.validateNumbers('5555555555554444');
  expect(validator.modal.showModal).toBeCalledWith('This is a MasterCard card and it is valid');
});

test('Метод validateNumbers вызывает метод validateCardNumbers, если номер валиден, показывает модальное окно', () => {
  validator.modal.showModal = jest.fn();
  validator.validateNumbers('5555555655554444');
  expect(validator.modal.showModal).toBeCalledWith('This card is not valid');
});
