import template from './table-component.html';

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
    return this.table;
  }
}
