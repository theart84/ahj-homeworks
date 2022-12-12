import Game from '../Game';

test('Выброс ошибки если передать не html элемент', () => {
  expect(() => new Game({ test: 'test' }, 4)).toThrowError();
});

test('Выброс ошибки, если передать не числовой тип', () => {
  expect(() => new Game(document.createElement('div'), '4')).toThrowError();
});

test('Метод init() вызывает методы generateGameField и start', () => {
  const app = new Game(document.createElement('div'), 4);
  app.board.drawUI = jest.fn();
  app.board.addCellClickListener = jest.fn();
  app.board.renderNPC = jest.fn();
  app.start = jest.fn();
  app.init();
  expect(app.board.drawUI).toBeCalled();
  expect(app.board.addCellClickListener).toBeCalled();
  expect(app.board.renderNPC).toBeCalled();
  expect(app.start).toBeCalled();
});

test('Метод onClickMouse вызывает нужные методы', () => {
  const app = new Game(document.createElement('div'), 4);
  app.npc.currentPosition = 0;
  app.board.changeCursor = jest.fn();
  app.board.removeNPC = jest.fn();
  app.board.successfulHit = jest.fn();
  app.onClickMouse(0);
  expect(app.board.changeCursor).toBeCalled();
  expect(app.board.removeNPC).toBeCalled();
  expect(app.board.successfulHit).toBeCalled();
});

test('Метод onClickMouse вызовет модальное окно и метод для обнуления очков, если удачных ударов будет 10', () => {
  const app = new Game(document.createElement('div'), 4);
  app.successfulHit = 9;
  app.modal.showModal = jest.fn();
  app.board.resetScore = jest.fn();
  app.onClickMouse(0);
  expect(app.modal.showModal).toBeCalled();
  expect(app.board.resetScore).toBeCalled();
  expect(app.successfulHit).toBe(0);
});

test('Метод onClickMouse вызовет модальное окно и метод для обнуления очков, если неудачных ударов будет 5', () => {
  const app = new Game(document.createElement('div'), 4);
  app.npc.currentPosition = 4;
  app.missHit = 4;
  app.modal.showModal = jest.fn();
  app.board.resetScore = jest.fn();
  app.onClickMouse(0);
  expect(app.modal.showModal).toBeCalled();
  expect(app.board.resetScore).toBeCalled();
  expect(app.missHit).toBe(0);
});

test('Метод onClickMouse вызовет метод miss, если в ячейке нет персонажа', () => {
  const app = new Game(document.createElement('div'), 4);
  app.npc.currentPosition = 4;
  app.board.miss = jest.fn();
  app.onClickMouse(0);
  expect(app.board.miss).toBeCalled();
});

test('Метод generateRandomPosition генериует позицию и вызывает нужные методы', () => {
  const app = new Game(document.createElement('div'), 4);
  app.board.cells = [1, 2, 3];
  app.board.removeNPC = jest.fn();
  app.board.renderNPC = jest.fn();
  app.board.setCursor = jest.fn();
  app.generateRandomPosition();
  expect(app.board.removeNPC).toBeCalled();
  expect(app.board.renderNPC).toBeCalled();
  expect(app.board.setCursor).toBeCalled();
});

test('Метод newGame очищает timerId и вызывает метод start', () => {
  const app = new Game(document.createElement('div'), 4);
  app.start = jest.fn();
  app.timerId = 5;
  app.newGame();
  expect(app.start).toBeCalled();
  expect(app.timerId).toBe(null);
});

test('Метод start запускает таймер', () => {
  const app = new Game(document.createElement('div'), 4);
  app.start();
  expect(app.timerId).not.toBe(null);
});
