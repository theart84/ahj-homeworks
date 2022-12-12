import Game from './Game';

const root = document.getElementById('root');

const app = new Game(root, 4);

try {
  app.init();
} catch (e) {
  console.log(e.message);
}
