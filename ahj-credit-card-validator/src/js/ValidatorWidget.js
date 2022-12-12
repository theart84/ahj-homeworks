export default class ValidatorWidget {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
    this.submitListeners = [];
    this.inputListeners = [];
  }

  static get markup() {
    return `
      <div class="container">
        <div class="row mb-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="text-center">Credit Card Validator</h1>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="card shadow-sm p20">
            <div class="card-body">
            <div class="row">
              <ul class="card-types">
               <li><span class="card-item mir"></span></li>              
               <li><span class="card-item visa"></span></li>              
               <li><span class="card-item master"></span></li>              
               <li><span class="card-item amex"></span></li>              
               <li><span class="card-item jcb"></span></li>              
              </ul>
             <div class="row">
              <form id="formValidation" class="row align-items-end justify-content-between">
                <div class="col-8">                  
                    <label for="cardNumber" class="form-label">Введите номер карты</label>
                    <input type="number" class="form-control" id="cardNumber" placeholder="Введите номер карты">                  
                </div> 
                <div class="col-4">
                  <button type="submit" class="btn btn-success">Click to Validate</button>
                </div>
              </form>
             </div>             
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', this.constructor.markup);
    const formElement = this.container.querySelector(this.constructor.formID);
    const inputElement = this.container.querySelector(this.constructor.inputID);
    this.cards = [...this.container.querySelectorAll('.card-item')];

    formElement.addEventListener('submit', (event) => this.onSubmit(event, inputElement.value));
    inputElement.addEventListener('input', (event) => this.onInput(event));
  }

  static get inputID() {
    return '#cardNumber';
  }

  static get formID() {
    return '#formValidation';
  }

  subscribeOnSubmit(cb) {
    this.submitListeners.push(cb);
  }

  subscribeOnInput(cb) {
    this.inputListeners.push(cb);
  }

  onSubmit(event, value) {
    event.preventDefault();
    this.submitListeners.forEach((cb) => cb.call(null, value));
  }

  onInput(event) {
    event.preventDefault();
    this.inputListeners.forEach((cb) => cb.call(null, event.target.value));
  }

  showPaySystem(identifier) {
    this.cards.forEach((card) => {
      if (!identifier) {
        card.classList.remove('hidden');
        return;
      }
      if (!card.classList.contains(identifier)) {
        card.classList.add('hidden');
      }
    });
  }
}
