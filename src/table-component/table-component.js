import template from './table-component.html';
import searchbox from './search-box.html';
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

  getSearchBox() {
    this.searchBox = document.createElement('div');
    this.searchBox.innerHTML = searchbox;
    return this.searchBox;
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

    this.searchBox.getElementsByTagName('input')[0].onkeyup = () => {
      const table = this.table.getElementsByTagName('tbody')[0].rows;
      const string = this.searchBox.getElementsByTagName('input')[0].value.toLowerCase();
      for (let i = 0; i < table.length; i += 1) {
        let displayStyle = 'none';
        for (let j = 0; j < table[i].children.length; j += 1) {
          if (table[i].children[j].innerHTML.toLowerCase().indexOf(string) >= 0) {
            displayStyle = '';
            break;
          } else {
            displayStyle = 'none';
          }
        }
        if (displayStyle === 'none') {
          this.table.getElementsByTagName('tbody')[0].rows[i].classList.add('disable-tr');
        } else {
          this.table.getElementsByTagName('tbody')[0].rows[i].classList.remove('disable-tr');
        }
      }
    };

    this.table.getElementsByTagName('tbody')[0].ondblclick = (event) => {
      const item = event.path[0];
      const input = document.createElement('input');
      input.classList.add('edit-data');
      const oldValue = item.innerHTML;
      input.value = oldValue;
      item.innerHTML = '';
      item.appendChild(input);
      input.focus();

      document.body.onclick = (clickEvent) => {
        if (clickEvent.path[0] !== input) {
          item.innerHTML = oldValue;
        }
      };

      input.onkeyup = (endEvent) => {
        if (endEvent.keyCode === 13) { // ENTER
          item.innerHTML = input.value;
        } else if (endEvent.keyCode === 27) { // ESC
          item.innerHTML = oldValue;
        }
      };
    };
  }

  sortTable(numberColumn, comparator) {
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
        array.sort((a, b) => +b.children[numberColumn].innerHTML - +a.children[numberColumn].innerHTML);
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
    for (let i = len - 1; i >= 0; i -= 1) {
      this.table.getElementsByTagName('tbody')[0].removeChild(this.table.getElementsByTagName('tbody')[0].children[i]);
    }
    for (let i = 0; i < len; i += 1) {
      this.table.getElementsByTagName('tbody')[0].appendChild(array[i]);
    }
  }
}
