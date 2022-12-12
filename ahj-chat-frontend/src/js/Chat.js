import templateEngine from './TemplateEngine';
import ModalWithForm from './ModalWithForm';
import eventBus from './EventBus';
import ChatAPI from './api/ChatAPI';

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  init() {
    this.bindToDOM();
    this.registerEvents();
    this.modalWithForm = new ModalWithForm(this.container);
    this.modalWithForm.bindToDOM();
    this.subscribeOnEvents();
  }

  bindToDOM() {
    const template = templateEngine.generate({
      type: 'div',
      attr: {
        class: ['container'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['chat__header'],
          },
          content: {
            type: 'h1',
            attr: {
              class: ['chat__title'],
            },
            content: 'AstroMessenger',
          },
        },
        {
          type: 'div',
          attr: {
            class: ['chat__connect'],
          },
          content: 'Chat connect',
        },
        {
          type: 'div',
          attr: {
            class: ['chat__container'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['chat__area'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['chat__messages-container'],
                  },
                  content: '',
                },

                {
                  type: 'div',
                  attr: {
                    class: ['chat__messages-input'],
                  },
                  content: {
                    type: 'div',
                    attr: {
                      class: ['form__group'],
                    },
                    content: {
                      type: 'input',
                      attr: {
                        class: ['form__input'],
                        type: 'text',
                        id: 'message-field',
                        name: 'message',
                        placeholder: 'Please enter your message...',
                        disabled: true,
                      },
                      content: '',
                    },
                  },
                },
              ],
            },
            {
              type: 'div',
              attr: {
                class: ['chat__userlist'],
              },
              content: '',
            },
          ],
        },
      ],
    });
    this.container.appendChild(template);
    this.userListContainer = this.container.querySelector('.chat__userlist');
    this.inputElement = this.container.querySelector('.form__input');
    this.connectButton = this.container.querySelector('.chat__connect');
    this.messageContainer = this.container.querySelector('.chat__messages-container');
  }

  registerEvents() {
    this.connectButton.addEventListener('click', () => this.modalWithForm.showModal());
    this.inputElement.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    });
  }

  subscribeOnEvents() {
    eventBus.subscribe('connect-chat', this.onEnterChatHandler, this);
  }

  async onEnterChatHandler(newUser) {
    const response = await this.api.create(newUser);
    if (response.status === 'ok') {
      this.modalWithForm.hideHint();
      this.modalWithForm.close();
      this.connectButton.classList.add('hidden');
      this.user = response.user;
      this.inputElement.disabled = false;
      this.websocket = new WebSocket('wss://astro-messenger.herokuapp.com/chat');
      this.websocket.addEventListener('message', (event) => this.renderMessage(event));
      window.addEventListener('beforeunload', () =>
        this.websocket.send(
          JSON.stringify({
            type: 'exit',
            user: this.user,
          })
        )
      );
    } else {
      this.modalWithForm.showHint(response.message);
    }
  }

  sendMessage() {
    const { value } = this.inputElement;
    this.websocket.send(JSON.stringify({ type: 'send', message: value, user: this.user }));
    this.inputElement.value = '';
  }

  renderMessage(event) {
    const receivedData = JSON.parse(event.data);
    if (Array.isArray(receivedData)) {
      this.userListContainer.textContent = '';
      receivedData.forEach((user) => {
        const template = templateEngine.generate({
          type: 'div',
          attr: {
            class: ['chat__user'],
            'data-user-id': user.id,
          },
          content: user.name === this.user.name ? 'You' : user.name,
        });
        this.userListContainer.appendChild(template);
      });
      return;
    }
    const sourceDate = new Date();
    const date = `${sourceDate
      .toLocaleTimeString()
      .slice(0, 5)} ${sourceDate.toLocaleDateString()} `;
    const template = templateEngine.generate({
      type: 'div',
      attr: {
        class: [
          'message__container',
          `${
            receivedData.user.name === this.user.name
              ? 'message__container-yourself'
              : 'message__container-interlocutor'
          }`,
        ],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['message__header'],
          },
          content: `${
            receivedData.user.name === this.user.name ? 'You' : receivedData.user.name
          }, ${date}`,
        },
        {
          type: 'div',
          attr: {
            class: ['message__body'],
          },
          content: receivedData.message,
        },
      ],
    });
    this.messageContainer.appendChild(template);
    this.messageContainer.lastElementChild.scrollIntoView();
  }
}
