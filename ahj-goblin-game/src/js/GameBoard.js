export default class GameBoard {
  constructor(container, boardSize) {
    this.container = container;
    this.boardSize = boardSize;
    this.cellClickListener = [];
    this.buttonClickListener = [];
  }

  drawUI() {
    const gameContainer = this.createElement('div', '', 'game-container');
    const gameTitle = this.createElement('h1', 'Hit the Goblin', 'game-title');
    const successfulHit = this.createElement('h2', 'Successful hit: ', 'game-score-success');
    this.successfulPointsElement = this.createElement('span', '0', 'game-score-points-success');
    const missHit = this.createElement('h2', 'Miss hit: ', 'game-score-miss');
    this.missPointsElement = this.createElement('span', '0', 'game-score-points-miss');
    const newGameButton = this.createElement('button', 'New Game', 'game-button-new-game');
    newGameButton.addEventListener('click', (event) => this.onButtonClick(event));

    for (let i = 0; i < this.boardSize ** 2; i++) {
      const cellElement = this.createElement('div', '', 'cell');
      cellElement.setAttribute('data-cell-id', i);
      cellElement.addEventListener('click', (event) => this.onCellClick(event));
      gameContainer.appendChild(cellElement);
    }
    this.cells = [...gameContainer.children];
    this.container.appendChild(gameTitle);
    successfulHit.appendChild(this.successfulPointsElement);
    this.container.appendChild(successfulHit);
    this.container.appendChild(missHit);
    missHit.appendChild(this.missPointsElement);
    this.container.appendChild(newGameButton);
    this.container.appendChild(gameContainer);
  }

  createElement(type, message, ...className) {
    const element = document.createElement(type);
    element.className = className.join(' ');
    element.textContent = message;
    return element;
  }

  addCellClickListener(callback) {
    this.cellClickListener.push(callback);
  }

  addButtonClickListener(callback) {
    this.buttonClickListener.push(callback);
  }

  onButtonClick(event) {
    event.preventDefault();
    this.buttonClickListener.forEach((cb) => cb());
  }

  onCellClick(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListener.forEach((cb) => cb.call(null, index));
  }

  renderNPC(index) {
    const npcElement = this.createElement('div', '', 'cell-npc');
    this.cells[index].appendChild(npcElement);
  }

  removeNPC(index) {
    if (index === null || this.cells[index].firstElementChild === null) {
      return;
    }
    this.cells[index].firstElementChild.remove();
  }

  setCursor() {
    const gameContainerElement = this.container.querySelector('.game-container');
    gameContainerElement.classList.remove('hammer-click');
    gameContainerElement.classList.add('hammer');
  }

  removeCursor() {
    const gameContainerElement = this.container.querySelector('.game-container');
    gameContainerElement.classList.remove('hammer');
    gameContainerElement.classList.add('hammer-click');
  }

  changeCursor() {
    this.removeCursor();
    setTimeout(() => {
      this.setCursor();
    }, 300);
  }

  miss() {
    ++this.missPointsElement.textContent;
  }

  successfulHit() {
    ++this.successfulPointsElement.textContent;
  }

  resetScore() {
    this.missPointsElement.textContent = 0;
    this.successfulPointsElement.textContent = 0;
  }
}
