import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableComponent from './table-component/table-component';

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then((data) => {
    const table = new TableComponent(data);
    container.appendChild(table.getTable());
  });
