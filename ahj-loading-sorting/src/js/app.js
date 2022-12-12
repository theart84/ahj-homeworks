import data from './data';

const root = document.getElementById('root');
let directionSort = true;

const templateTableHead = `
  <thead>
    <tr class='table-row--head'>
      <th scope='col' class='table-cell--head' data-type='id'>Id <span class='arrow'></span></th>
      <th scope='col' class='table-cell--head' data-type='title'>Title <span class='arrow'></span></th>
      <th scope='col' class='table-cell--head' data-type='year'>Year <span class='arrow'></span></th>
      <th scope='col' class='table-cell--head' data-type='imdb'>Imdb <span class='arrow'></span></th>
    </tr>
  </thead>
`;

const templateRowTable = ({ id, title, year, imdb }) => `
    <tr data-id='${id}' data-title='${title}' data-year='${year}' data-imdb='${imdb}' class='table-row'>
      <td class='table-cell'>${id}</td>
      <td class='table-cell'>${title}</td>
      <td class='table-cell'>(${year})</td>
      <td class='table-cell'>imdb: ${imdb.toFixed(2)}</td>
    </tr>
  `;

const sortTable = (type) => {
  const tbodyElement = document.querySelector('tbody');
  const tableRowElements = [...document.querySelectorAll('.table-row')];
  if (directionSort) {
    tableRowElements.sort((a, b) => {
      if (type === 'title') {
        return a.dataset[type] < b.dataset[type] ? -1 : 1;
      }
      return a.dataset[type] - b.dataset[type];
    });
    directionSort = !directionSort;
  } else {
    tableRowElements.sort((a, b) => {
      if (type === 'title') {
        return a.dataset[type] > b.dataset[type] ? -1 : 1;
      }
      return b.dataset[type] - a.dataset[type];
    });
    directionSort = !directionSort;
  }
  tbodyElement.innerText = '';
  tableRowElements.forEach((element) => {
    tbodyElement.appendChild(element);
  });
};

const renderArrow = (target) => {
  const currentTarget = target;
  const spanElements = document.querySelectorAll('.arrow');
  spanElements.forEach((element) => {
    const spanElement = element;
    spanElement.innerHTML = '';
  });
  if (directionSort) {
    currentTarget.children[0].innerHTML = '&#8593';
  } else {
    currentTarget.children[0].innerHTML = '&#8595';
  }
};

const clickHandler = (event) => {
  const { currentTarget } = event;
  const typeCell = currentTarget.dataset.type;
  renderArrow(currentTarget);
  sortTable(typeCell);
};

const generateTable = (source) => {
  const tableContainer = document.createElement('div');
  const tableElement = document.createElement('table');
  const tableBodyElement = document.createElement('tbody');
  tableElement.insertAdjacentHTML('afterbegin', templateTableHead);
  tableElement.insertAdjacentElement('beforeend', tableBodyElement);
  tableContainer.className = 'table-container';
  tableContainer.appendChild(tableElement);
  root.appendChild(tableContainer);
  const template = source.map((tableRow) => templateRowTable(tableRow)).join(' ');
  tableBodyElement.insertAdjacentHTML('afterbegin', template);
  const tableHeadCellElements = document.querySelectorAll('.table-cell--head');
  tableHeadCellElements.forEach((cell) => {
    cell.addEventListener('click', (event) => clickHandler(event));
  });
};

generateTable(data);
