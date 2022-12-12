import Validator from './Validator';
import paymentSystems from './paymentSystem';

const root = document.querySelector('#root');

const app = new Validator(root, paymentSystems);

app.init();
