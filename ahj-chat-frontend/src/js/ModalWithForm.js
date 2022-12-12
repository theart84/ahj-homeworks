import templateEngine from './TemplateEngine';
import eventBus from './EventBus';

export default class ModalWithForm {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
  }

  render() {
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['modal__form'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['modal__background'],
          },
          content: '',
        },
        {
          type: 'div',
          attr: {
            class: ['modal__content'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['modal__header'],
              },
              content: '',
            },
            {
              type: 'div',
              attr: {
                class: ['modal__body'],
              },
              content: {
                type: 'form',
                attr: {
                  class: ['modal__form'],
                  name: 'modal-form',
                },
                listener: {
                  type: 'submit',
                  cb: (event) => this.submit(event),
                },
                content: [
                  {
                    type: 'div',
                    attr: {
                      class: ['form__group'],
                    },
                    content: [
                      {
                        type: 'label',
                        attr: {
                          class: ['form__label'],
                          for: 'username-field',
                        },
                        content: 'Username',
                      },
                      {
                        type: 'input',
                        attr: {
                          class: ['form__input'],
                          id: 'username-field',
                          name: 'name',
                          placeholder: 'Please enter your name...',
                        },
                        content: '',
                      },
                      {
                        type: 'div',
                        attr: {
                          class: ['form__hint', 'hidden'],
                        },
                        content: '',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'div',
              attr: {
                class: ['modal__footer'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['modal__close'],
                  },
                  listener: {
                    type: 'click',
                    cb: (event) => this.close(event),
                  },
                  content: 'Close',
                },
                {
                  type: 'div',
                  attr: {
                    class: ['modal__ok'],
                  },
                  listener: {
                    type: 'click',
                    cb: (event) => this.submit(event),
                  },
                  content: 'Ok',
                },
              ],
            },
          ],
        },
      ],
    });
  }

  bindToDOM() {
    this.container.appendChild(this.render());
    this.modalElement = this.container.querySelector('.modal__form');
    this.formElement = this.modalElement.querySelector('form');
  }

  submit(event) {
    event.preventDefault();
    const { formElement } = this;
    if (formElement.elements.name.value === '') {
      return;
    }
    const data = {
      name: formElement.elements.name.value,
    };
    this.modalElement.querySelector('.modal__header').textContent = '';
    eventBus.emit('connect-chat', data);
  }

  close() {
    this.clearForm();
    this.modalElement.classList.remove('active');
  }

  showModal() {
    this.hideHint();
    this.modalElement.classList.add('active');
  }

  showHint(message) {
    const hintElement = this.formElement.querySelector('.form__hint');
    hintElement.textContent = message;
    hintElement.classList.remove('hidden');
  }

  hideHint() {
    const hintElement = this.formElement.querySelector('.form__hint');
    hintElement.textContent = '';
    hintElement.classList.add('hidden');
  }

  clearForm() {
    const { formElement } = this;
    formElement.elements.name.value = '';
  }
}
