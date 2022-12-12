import ValidatorWidget from './ValidatorWidget';
import Modal from './Modal';

export default class Validator {
  constructor(container, paySystem) {
    this.validatorWidget = new ValidatorWidget(container);
    this.modal = new Modal(container);
    this.paySystem = paySystem;
    this.currentPaymentSystem = null;
  }

  init() {
    this.validatorWidget.render();
    this.modal.render();
    this.validatorWidget.subscribeOnSubmit(this.validateNumbers.bind(this));
    this.validatorWidget.subscribeOnInput(this.identVendors.bind(this));
  }

  validateNumbers(cardNumber) {
    if (cardNumber.length < 15) {
      this.modal.showModal('This card is not valid');
      return;
    }
    this.validateCardNumbers(cardNumber)
      ? this.modal.showModal(`This is a ${this.currentPaymentSystem} card and it is valid`)
      : this.modal.showModal('This card is not valid');
  }

  identVendors(numbers) {
    let id = numbers.slice(0, 2);
    if (!this.paySystem[id]) {
      id = numbers.slice(0, 1);
    }
    let identifier = null;
    if (this.paySystem[id]) {
      identifier = this.paySystem[id].short;
      this.currentPaymentSystem = this.paySystem[id].full;
    }
    this.validatorWidget.showPaySystem(identifier);
  }

  validateCardNumbers(value) {
    value = value.replace(/\D/g, '');
    let nCheck = 0;
    let bEven = false;
    for (let n = value.length - 1; n >= 0; n--) {
      let nDigit = parseInt(value.charAt(n), 10);
      if (bEven && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 === 0;
  }
}
