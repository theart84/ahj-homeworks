import GameBoard from '../GameBoard';

test('Метод miss увеличивает значение поля miss', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  board.missPointsElement.textContent = 1;
  board.miss();
  expect(board.missPointsElement.textContent).toBe('2');
});

test('Метод successfulHit увеличивает значение поля success', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  board.successfulPointsElement.textContent = 1;
  board.successfulHit();
  expect(board.successfulPointsElement.textContent).toBe('2');
});

test('Метод resetScore обнуляет поля success и miss', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  board.missPointsElement.textContent = 1;
  board.successfulPointsElement.textContent = 1;
  board.resetScore();
  expect(board.successfulPointsElement.textContent).toBe('0');
  expect(board.missPointsElement.textContent).toBe('0');
});

test('Метод changeCursor вызывает метод removeCursor и по таймеру вызывает setCursor', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  board.removeCursor = jest.fn();
  board.changeCursor();
  expect(board.removeCursor).toBeCalled();
});

test('Метод removeCursor устанавливает курсор в виде молотка', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  const gameContainerElement = board.container.querySelector('.game-container');
  board.removeCursor();
  expect(gameContainerElement.classList.contains('hammer')).not.toBeTruthy();
  expect(gameContainerElement.classList.contains('hammer-click')).toBeTruthy();
});

jest.useFakeTimers();
test('Метод changeCursor вызовет метод setCursor', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.drawUI();
  board.removeCursor = jest.fn();
  board.setCursor = jest.fn();

  board.changeCursor();

  expect(board.setCursor).not.toBeCalled();

  jest.runAllTimers();

  expect(board.setCursor).toBeCalled();
  expect(board.setCursor).toHaveBeenCalledTimes(1);
});

test('Метод addCellClickListener пушит коллбек в массив', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.addCellClickListener(() => {});
  expect(board.cellClickListener.length).toBe(1);
});

test('Метод addCellClickListener пушит коллбек в массив', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.addButtonClickListener(() => {});
  expect(board.buttonClickListener.length).toBe(1);
});

test('Метод renderNPC добавляет персонажа', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.createElement = jest.fn(() => document.createElement('div'));
  board.drawUI();
  board.renderNPC(1);
  expect(board.cells[1].firstElementChild).toBeDefined();
});

test('Метод renderNPC добавляет персонажа', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.createElement = jest.fn(() => document.createElement('div'));
  board.drawUI();
  board.renderNPC(1);
  board.removeNPC(1);
  expect(board.cells[1].firstElementChild).toBe(null);
  board.removeNPC(2);
  expect(board.cells[1].firstElementChild).toBe(null);
});

test('Метод onButtonClick запускает коллбеки', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  const event = new Event('click');
  let fn = () => {};
  fn = jest.fn();
  board.addButtonClickListener(fn);
  board.onButtonClick(event);
  expect(fn).toBeCalled();
});

test('Метод onCellClick запускает коллбеки', () => {
  const board = new GameBoard(document.createElement('div'), 4);
  board.cells = [document.createElement('div')];
  const event = {
    preventDefault() {},
    currentTarget: 1,
  };
  let fn = () => {};
  fn = jest.fn();
  board.addCellClickListener(fn);
  board.onCellClick(event, 1);
  expect(fn).toBeCalled();
});
