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
            <input class="form-check-input checkbox" type="checkbox"${todo.status ? 'checked' : ''} onclick="Store.statusTodoLs(${todo.id})" value="">
        </td>
        <td><button type="button" onclick="ui.removeTodo(event , ${todo.id})" class="btn btn-danger">Delet</button></td>
        `;
        tbody.appendChild(tr);
    }
    removeTodo(event, id) {
        var _a, _b;
        // console.log(event.target);
        const elelment = event.target;
        (_b = (_a = elelment.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
        Store.removeTodoLs(id);
    }
}
class Store {
    static getTodo() {
        let todos;
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        else {
            todos = [];
        }
        return todos;
    }
    static addTodoLs(todo) {
        let todos = Store.getTodo();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    static displayTodo() {
        const todos = Store.getTodo();
        const ui = new Ui();
        todos.forEach((todo) => {
            ui.addTodoList(todo);
        });
    }
    static removeTodoLs(id) {
        const todos = Store.getTodo();
        // console.log(todos);
        // console.log(id);
        let newTodos = todos.filter(todo => todo.id !== id);
        // console.log(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    static statusTodoLs(id) {
        let todos = JSON.parse(localStorage.getItem('todos'));
        // console.log(todos);
        // console.log(status);
        // console.log(id);
        const newTodos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { status: !todo.status }) : todo);
        localStorage.setItem('todos', JSON.stringify(newTodos));
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
document.addEventListener('DOMContentLoaded', () => { Store.displayTodo(); });
