// Seleção de elementos
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let oldInputValue

//Funções
const carregarLista = () => {
  fetch('http://127.0.0.1:3000/listar')
    .then(function (data) {
      return data.json()
    })
    .then(function (data) {
      data.forEach(function (todoitem) {
        mostrarTodo(todoitem)
      })
    })
}
carregarLista()

const saveTodo = text => {
  fetch("http://127.0.0.1:3000/salvar",{method:"POST",headers: {'Content-Type':'application/json'},body:JSON.stringify({item:text})})
  mostrarTodo(text)
}

const mostrarTodo = text => {
  const todo = document.createElement('div')
  todo.classList.add('todo')

  const todoTitle = document.createElement('h3')
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement('Button')
  doneBtn.classList.add('finish-todo')
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement('Button')
  editBtn.classList.add('edit-todo')
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement('Button')
  deleteBtn.classList.add('remove-todo')
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(deleteBtn)

  todoList.appendChild(todo)

  todoInput.value = ''
  todoInput.focus()
}

const toggleForms = () => {
  editForm.classList.toggle('hide')
  todoForm.classList.toggle('hide')
  todoList.classList.toggle('hide')
}

const updateTodo = text => {
  const todos = document.querySelectorAll('.todo')

  todos.forEach(todo => {
    let todoTitle = todo.querySelector('h3')

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text
    }
  })
}
//Eventos

todoForm.addEventListener('submit', e => {
  e.preventDefault()

  const inputValue = todoInput.value

  if (inputValue) {
    saveTodo(inputValue)
  }
})

document.addEventListener('click', e => {
  const targetEl = e.target
  const parentEl = targetEl.closest('div')
  let todoTitle

  if (parentEl && parentEl.querySelector('h3')) {
    todoTitle = parentEl.querySelector('h3').innerText
  }

  if (targetEl.classList.contains('finish-todo')) {
    parentEl.classList.toggle('done')
  }

  if (targetEl.classList.contains('remove-todo')) {
    parentEl.remove()
  }

  if (targetEl.classList.contains('edit-todo')) {
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

cancelEditBtn.addEventListener('click', e => {
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener('submit', e => {
  e.preventDefault()

  const editInputValue = editInput.value
  if (editInputValue) {
    updateTodo(editInputValue)
  }

  toggleForms()
})
