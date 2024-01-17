"use strict";
const formTodo = document.getElementById('form-todo');
const textTodo = document.getElementById('title-form');
const textErorr = document.getElementById('text-error');
const tbody = document.getElementById('tbody');
class Todo {
    constructor(todo) {
        this.id = todo.id,
            this.title = todo.title,
            this.status = todo.status;
    }
}
class Ui {
    addTodoList(todo) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${todo.id}</th>
        <td>${todo.title}</td>
        <td>
            <input class="form-check-input checkbox" type="checkbox" value="">
        </td>
        <td><button type="button" onclick=(ui.removeTodo(event)) class="btn btn-danger">Danger</button></td>
        `;
        tbody.appendChild(tr);
    }
    removeTodo(event) {
        var _a, _b;
        // console.log(event.target);
        const elelment = event.target;
        (_b = (_a = elelment.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    }
}
class Store {
    static addTodoLs(todo) {
        let todos;
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        else {
            todos = [];
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
let ui = new Ui();
formTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    if (textTodo.value.trim() === '') {
        textErorr.innerHTML = 'لطفا متنی را وارد کنید';
    }
    else {
        // console.log(textTodo.value);
        textErorr.innerHTML = '';
        const value = {
            id: Math.round(Math.random() * 100),
            title: textTodo.value.trim(),
            status: false
        };
        // console.log(value);
        const todoObj = new Todo(value);
        // console.log(todoObj);
        ui.addTodoList(todoObj);
        //add todoObject in localstorage
        Store.addTodoLs(todoObj);
    }
    textTodo.value = '';
});
