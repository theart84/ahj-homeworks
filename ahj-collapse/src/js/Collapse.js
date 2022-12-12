import templateEngine from './TemplateEngine';

export default class Collapse {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.bindTODOM();
  }

  markup() {
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['collapse__container'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['collapse__button'],
          },
          content: {
            type: 'button',
            attr: {
              class: ['btn', 'btn-primary'],
              'data-aria-expanded': 'false',
            },
            listener: {
              type: 'click',
              cb: (event) => this.onClickHandler(event),
            },
            content: 'Collapse',
          },
        },
        {
          type: 'div',
          attr: {
            class: ['collapse__body'],
          },
          content: [
            {
              type: 'p',
              attr: {
                class: ['collapse__text'],
              },
              content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi beatae commodi doloribus impedit' +
                ' molestias non officiis quasi repellendus reprehenderit ut.' +
                ' Aliquam at autem dolorum illo nulla optio quaerat recusandae sequi!',
            },
          ],
        },
      ],
    });
  }

  bindTODOM() {
    this.container.appendChild(this.markup());
    this.collapseBodyElement = this.container.querySelector('.collapse__body');
  }

  onClickHandler(event) {
    const { currentTarget } = event;
    if (currentTarget.dataset.ariaExpanded === 'false') {
      this.collapseBodyElement.style.display = 'block';
      const textParams = this.collapseBodyElement
        .querySelector('.collapse__text')
        .getBoundingClientRect();
      this.collapseBodyElement.style.height = `${textParams.height}px`;
      currentTarget.dataset.ariaExpanded = 'true';
    } else {
      currentTarget.dataset.ariaExpanded = 'false';
      this.collapseBodyElement.style.height = 0;
      setTimeout(() => {
        this.collapseBodyElement.style.display = 'none';
      }, 250);
    }
  }
}
