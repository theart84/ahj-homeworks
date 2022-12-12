import Tooltip from './Tooltip';

const root = document.querySelector('#root');

const tooltip = new Tooltip(root);

tooltip.bindToDOM();

const buttonElement = document.querySelector('button');

buttonElement.addEventListener('click', () => {
  tooltip.showTooltip(buttonElement);
});
