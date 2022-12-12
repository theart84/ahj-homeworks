export default class Tooltip {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
    this.show = false;
  }

  static get markup() {
    return `
      <div class="popover hidden fade">
        <div class="popover-arrow"></div>
        <h3 class="popover-title"></h3>
        <div class="popover-body"></div>
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.constructor.markup);
  }

  get popoverContainer() {
    return this.container.querySelector('.popover');
  }

  get popoverTitle() {
    return this.container.querySelector('.popover-title');
  }

  get popoverBody() {
    return this.container.querySelector('.popover-body');
  }

  showTooltip(element) {
    if (this.show) {
      this.popoverContainer.classList.remove('show');
      setTimeout(() => {
        this.popoverContainer.classList.add('hidden');
        this.popoverTitle.textContent = '';
        this.popoverBody.textContent = '';
      }, 500);
      this.show = !this.show;
      return;
    }
    this.show = !this.show;
    this.popoverTitle.textContent = element.dataset.ttTitle;
    this.popoverBody.textContent = element.dataset.ttMessage;
    const baseElementCoord = element.getBoundingClientRect();
    this.popoverContainer.classList.remove('hidden');
    const tooltipElementCoord = this.popoverContainer.getBoundingClientRect();
    this.popoverContainer.style.top = `
    ${baseElementCoord.top - tooltipElementCoord.height - 10}px
    `;
    this.popoverContainer.style.left = `
    ${baseElementCoord.left + baseElementCoord.width / 2 - tooltipElementCoord.width / 2}px
    `;
    this.popoverContainer.classList.add('show');
  }
}
