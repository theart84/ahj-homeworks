import GameBoard from './GameBoard';
import Character from './Character';
import Modal from './Modal';

export default class Game {
  constructor(container, boardSize) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент!');
    }
    if (!Number.isInteger(boardSize)) {
      throw new Error('Необходимо передать число!');
    }
    this.board = new GameBoard(container, boardSize);
    this.modal = new Modal(container);
    this.npc = new Character('goblin', boardSize);
    this.successfulHit = null;
    this.missHit = null;
    this.timerId = null;
  }

  init() {
    this.board.drawUI();
    this.board.addCellClickListener(this.onClickMouse.bind(this));
    this.board.addButtonClickListener(this.newGame.bind(this));
    this.board.renderNPC(this.npc.currentPosition);
    this.start();
  }

  onClickMouse(index) {
    if (++this.successfulHit === 10) {
      this.modal.showModal('Поздравляем, Вы победили!');
      this.successfulHit = 0;
      this.missHit = 0;
      this.board.resetScore();
      clearInterval(this.timerId);
      return;
    }
    if (this.npc.currentPosition !== index) {
      if (++this.missHit === 5) {
        this.modal.showModal('Печаль, беда, Вы проиграли ;-(');
        this.successfulHit = 0;
        this.missHit = 0;
        this.board.resetScore();
        clearInterval(this.timerId);
        return;
      }
      this.board.miss();
      return;
    }
    this.board.changeCursor();
    this.board.removeNPC(index);
    this.board.successfulHit();
  }

  generateRandomPosition() {
    const newPosition = this.npc.position;
    if (this.npc.currentPosition === newPosition) {
      this.generateRandomPosition();
      return;
    }

    this.board.removeNPC(this.npc.currentPosition);
    this.npc.currentPosition = newPosition;
    this.board.renderNPC(this.npc.currentPosition);
    this.board.setCursor();
  }

  start() {
    this.timerId = setInterval(() => {
      this.generateRandomPosition();
    }, 1000);
  }

  newGame() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.start();
  }
}
