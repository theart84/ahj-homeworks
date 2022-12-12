class Game {
  constructor(container, boardSize) {
    this.container = container;
    this.boardSize = boardSize;
    this.currentPosition = null;
  }

  init() {
    this.generateGameField();
    this.start();
  }

  generateGameField() {
    const gameContainer = this.createElement('div', '', 'game-container');

    const gameTitle = this.createElement('h1', 'Hit the Demon', 'game-title');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellElement = this.createElement('div', '', 'cell');
      gameContainer.appendChild(cellElement);
    }
    this.cells = [...gameContainer.children];
    this.container.appendChild(gameTitle);
    this.container.appendChild(gameContainer);
  }

  createElement(type, message, ...className) {
    const element = document.createElement(type);
    element.className = className.join(' ');
    element.textContent = message;
    return element;
  }

  generateRandomPosition() {
    const positionIndex = Math.floor(Math.random() * this.cells.length);
    if (positionIndex === this.currentPosition) {
      this.generateRandomPosition();
      return;
    }
    this.removeNPC();
    this.currentPosition = positionIndex;
    this.showNPC(positionIndex);
  }

  showNPC(index) {
    const npcElement = this.createElement('div', '', 'cell-npc');
    this.cells[index].appendChild(npcElement);
  }

  removeNPC() {
    if (this.currentPosition === null) {
      return;
    }
    this.cells[this.currentPosition].firstChild.remove();
  }

  start() {
    setInterval(() => {
      this.generateRandomPosition();
    }, 2000);
  }
}

export default Game;
