export default class Modal {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
  }

  static get markup() {
    return `
    <div class="modal-container">
      <div class="modal-background"></div>
      <div class="modal-body">
        <h2 class="modal-text"></h2>
        <button class="btn btn-success modal-button">Ok</button>
      </div>        
    </div>
    `;
  }

  render() {
    this.container.insertAdjacentHTML('afterbegin', this.constructor.markup);
    this.modalButtonElement.addEventListener('click', () => this.removeModal());
    this.modalBackGroundElement.addEventListener('click', () => this.removeModal());
  }

  showModal(message) {
    this.modalContainerElement.classList.add('active');
    this.modalText = message;
  }

  get modalButtonElement() {
    return this.container.querySelector('.modal-button');
  }

  get modalContainerElement() {
    return this.container.querySelector('.modal-container');
  }

  get modalBackGroundElement() {
    return this.container.querySelector('.modal-background');
  }

  get modalText() {
    return this.container.querySelector('.modal-text').textContent;
  }

  set modalText(value) {
    this.container.querySelector('.modal-text').textContent = value;
  }

  removeModal() {
    this.modalContainerElement.classList.remove('active');
  }
}
