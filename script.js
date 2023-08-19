const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const evenButton = document.getElementById("even-button");
const oddButton = document.getElementById("odd-button");
const removeLastButton = document.getElementById("remove-last-button");
const removeFirstButton = document.getElementById("remove-first-button");

let todos = [];
let evenHighlighted = false;
let oddHighlighted = false;

// Функция для загрузки заданий из local storage
function loadTodos() {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todoList.innerHTML = "";
        for (let i = 0; i < todos.length; i++) {
            addTodoToDOM(todos[i]);
        }
    }
}

// Функция для сохранения заданий в local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Функция для добавления нового задания на страницу
function addTodoToDOM(todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
        li.classList.add("completed");
    }

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function () {
        const index = todos.indexOf(todo);
        todos[index].completed = !todos[index].completed;
        if (todos[index].completed) {
            todos.push(todo);
            todos.splice(index, 1);
        } else {
            todos.splice(index, 1);
            todos.unshift(todo);
        }
        saveTodos();
        loadTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete');
    deleteButton.addEventListener("click", function () {
        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        saveTodos();
        loadTodos();
    });
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

// Функция для добавления нового задания в массив
function addTodoToArray(text) {
    const todo = {
        text: text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    loadTodos();
}

// Функция для выделения чётных элементов списка
function highlightEven() {
    const items = todoList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (i % 2 === 1) {
            if (evenHighlighted) {
                items[i].classList.remove("even");
            } else {
                items[i].classList.add("even");
            }
        }
    }

    evenHighlighted = !evenHighlighted;
}

// Функция для выделения нечётных элементов списка
function highlightOdd() {
    const items = todoList.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (i % 2 === 0) {
            if (oddHighlighted) {
                items[i].classList.remove("odd");
            } else {
                items[i].classList.add("odd");
            }
        }
    }

    oddHighlighted = !oddHighlighted;
}

// Функция для удаления последнего элемента списка
function removeLast() {
    if (todos.length > 0) {
        todos.pop();
        saveTodos();
        loadTodos();
    }
}

// Функция для удаления первого элемента списка
function removeFirst() {
    if (todos.length > 0) {
        todos.shift();
        saveTodos();
        loadTodos();
    }
}

// Загружаем данные из local storage при загрузке страницы
window.onload = loadTodos;

// Добавляем обработчик на кнопку добавления задания
addButton.addEventListener("click", function () {
    const text = todoInput.value;
    if (text) {
        addTodoToArray(text);
        todoInput.value = "";
        todoInput.focus();
    }
});

evenButton.addEventListener("click", highlightEven);

oddButton.addEventListener("click", highlightOdd);

removeLastButton.addEventListener("click", removeLast);

removeFirstButton.addEventListener("click", removeFirst);

