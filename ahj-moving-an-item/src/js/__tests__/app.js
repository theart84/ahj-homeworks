import Game from '../Game';

const app = new Game(document.createElement('div'), 4);

jest.useFakeTimers();
test('Метод start вызывает setInterval', () => {
  app.start();
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
});

test('Метод generateGameField создает контейнер с нужными элементами', () => {
  app.generateGameField();

  expect(app.container.children[0].tagName).toBe('H1');
});
test('Метод createElement должен создавать html элемент', () => {
  expect(app.createElement('div', 'test', 'test')).toBeDefined();
});

test('Метод init() вызывает методы generateGameField и start', () => {
  app.generateGameField = jest.fn();
  app.start = jest.fn();
  app.init();
  expect(app.generateGameField).toBeCalled();
  expect(app.start).toBeCalled();
});

test('Метод createElement должен создавать html элемент', () => {
  expect(app.createElement('div', 'test', 'test')).toBeDefined();
});
test('Метод showNPC добавляет дочерний элемент', () => {
  const cell = document.createElement('div');
  app.cells = [];
  app.cells.push(cell);
  app.showNPC(0);
  expect(app.cells[0].firstChild.tagName).toBe('DIV');
});

test('Метод removeNPC делает return, если currentPosition равно  null', () => {
  app.currentPosition = null;
  expect(app.removeNPC()).toBe(undefined);
});

test('Метод removeNPC удаляет дочерний элемент', () => {
  const cell = document.createElement('div');
  app.cells = [];
  app.cells.push(cell);
  app.currentPosition = 0;
  app.showNPC(0);
  app.removeNPC();
  expect(app.cells[0].firstChild).toBe(null);
});

test('Метод generateRandomPosition вызывает метод showNPC', () => {
  app.cells = [1, 2, 3, 4];
  app.showNPC = jest.fn();
  app.removeNPC = jest.fn();
  app.generateRandomPosition();
  expect(app.showNPC).toBeCalled();
});
