import template from './table-component.html';
import './table-component.css';

export default class TableComponent {
  constructor(data) {
    this.data = data;
    this.table = null;
  }

  getTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table', 'table-hover', 'table-striped');
    this.table.innerHTML = template;
    const tbody = this.table.getElementsByTagName('tbody')[0];
    const propertys = ['id', 'name', 'username', 'email', 'address.city', 'website', 'company.name'];
    const tableRows = [];
    this.data.forEach((user, index) => {
      tableRows[index] = document.createElement('tr');
      // get the necessary data
      propertys.forEach((property) => {
        const tableItem = document.createElement('td');
        const path = property.split('.');
        let userProperty = user;
        while (path.length !== 0) {
          userProperty = userProperty[path.shift()];
        }
        tableItem.innerHTML = userProperty;
        tableRows[index].appendChild(tableItem);
      });
    });
    tableRows.forEach((row) => {
      tbody.appendChild(row);
    });
    this.addEvents();
    return this.table;
  }

  addEvents() {
    this.table.getElementsByTagName('thead')[0].onclick = (event) => {
      if (event.target.classList.contains('fas')) {
        if (!event.target.classList.contains('current-sorting')) {
          this.table.querySelector('.current-sorting').classList.remove('current-sorting');
          // eslint-disable-next-line prefer-destructuring
          const cellIndex = event.target.offsetParent.cellIndex;
          if (event.target.classList.contains('fa-sort-up')) {
            this.sortTable(cellIndex, '>');
          } else if (event.target.classList.contains('fa-sort-down')) {
            this.sortTable(cellIndex, '<');
          }
          event.target.classList.add('current-sorting');
        }
      }
    };
  }

  sortTable(numberColumn, comparator) {
    window.console.log(numberColumn);
    const len = this.table.getElementsByTagName('tbody')[0].children.length;
    const array = Array.from(this.table.getElementsByTagName('tbody')[0].rows);
    if (comparator === '>') {
      if (numberColumn === 0) {
        // eslint-disable-next-line max-len
        array.sort((a, b) => +a.children[numberColumn].innerHTML - +b.children[numberColumn].innerHTML);
      } else {
        array.sort((a, b) => {
          if (a.children[numberColumn].innerHTML > b.children[numberColumn].innerHTML) {
            return 1;
          }
          if (a.children[numberColumn].innerHTML < b.children[numberColumn].innerHTML) {
            return -1;
          }
          return 0;
        });
      }
    } else if (comparator === '<') {
      if (numberColumn === 0) {
        // eslint-disable-next-line max-len
        array.sort((a, b) => +a.children[numberColumn].innerHTML + +b.children[numberColumn].innerHTML);
      } else {
        array.sort((a, b) => {
          if (a.children[numberColumn].innerHTML < b.children[numberColumn].innerHTML) {
            return 1;
          }
          if (a.children[numberColumn].innerHTML > b.children[numberColumn].innerHTML) {
            return -1;
          }
          return 0;
        });
      }
    }
    const tmp = [];
    array.forEach((item, index) => {
      tmp[index] = item.innerHTML;
    });
    for (let i = 0; i < len; i += 1) {
      this.table.getElementsByTagName('tbody')[0].querySelector(`tr:nth-child(${i + 1})`).innerHTML = tmp[i];
    }
  }
}
