export default class Modal {
  constructor(container) {
    this.container = container;
  }

  showModal(message) {
    const template = `
      <div class='modal-container'>
        <div class='modal-background'></div>
        <div class='modal-body'>
          <h2 class='modal-text'>${message}</h2>
          <button class='modal-button'>Ok</button>
        </div>        
      </div>
    `;
    this.container.insertAdjacentHTML('afterbegin', template);

    this.setClickListener();
  }

  removeModal() {
    const modal = this.container.querySelector('.modal-container');
    modal.remove();
  }

  setClickListener() {
    const buttonElement = this.container.querySelector('.modal-button');
    buttonElement.addEventListener('click', this.removeModal.bind(this));
  }
}
