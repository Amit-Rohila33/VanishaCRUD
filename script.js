document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const titleInput = document.getElementById('title');
  const dueDateInput = document.getElementById('due-date');
  const descriptionInput = document.getElementById('description');
  const indexInput = document.getElementById('index');
  const tbody = document.querySelector('#todo-table tbody');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const renderTable = () => {
      tbody.innerHTML = '';
      todos.forEach((todo, index) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${todo.title}</td>
              <td>${todo.dueDate}</td>
              <td>${todo.description}</td>
              <td class="actions">
                  <button class="edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                  <button class="delete" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
              </td>
          `;
          tbody.appendChild(tr);
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const dueDate = dueDateInput.value;
      const description = descriptionInput.value;
      const index = indexInput.value;

      if (index === '') {
          todos.push({ title, dueDate, description });
      } else {
          todos[index] = { title, dueDate, description };
      }

      titleInput.value = '';
      dueDateInput.value = '';
      descriptionInput.value = '';
      indexInput.value = '';
      saveTodos();
      renderTable();
  };

  const handleEdit = (index) => {
      const todo = todos[index];
      titleInput.value = todo.title;
      dueDateInput.value = todo.dueDate;
      descriptionInput.value = todo.description;
      indexInput.value = index;
  };

  const handleDelete = (index) => {
      todos.splice(index, 1);
      saveTodos();
      renderTable();
  };

  form.addEventListener('submit', handleSubmit);

  tbody.addEventListener('click', (e) => {
      if (e.target.closest('.edit')) {
          handleEdit(e.target.closest('.edit').dataset.index);
      } else if (e.target.closest('.delete')) {
          handleDelete(e.target.closest('.delete').dataset.index);
      }
  });

  renderTable();
});
