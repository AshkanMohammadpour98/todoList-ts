const formTodo = document.getElementById('form-todo') as HTMLFormElement ;
const textTodo = document.getElementById('title-form') as HTMLInputElement;
const textErorr = document.getElementById('text-error') as HTMLDivElement;
const tbody = document.getElementById('tbody')!

interface TodoInterface{
    id: number;
    title: string;
    status: boolean;
}
class Todo implements TodoInterface{
    id: number
    title: string
    status: boolean

    constructor(todo: TodoInterface){
        this.id = todo.id,
        this.title = todo.title,
        this.status = todo.status
    }
}
class Ui{
    addTodoList(todo: TodoInterface){
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <th scope="row">${todo.id}</th>
        <td>${todo.title}</td>
        <td>
            <input class="form-check-input checkbox" type="checkbox" value="">
        </td>
        <td><button type="button" onclick=(ui.removeTodo(event)) class="btn btn-danger">Danger</button></td>
        `
        tbody.appendChild(tr)
    }
    removeTodo(event: Event){
        // console.log(event.target);
        const elelment = event.target as HTMLElement;
        elelment.parentElement?.parentElement?.remove();
        
    }
}

let ui = new Ui()

formTodo!.addEventListener('submit' , (e: Event)=>{
    e.preventDefault()
    if(textTodo.value.trim() === ''){
        
        textErorr.innerHTML = 'لطفا متنی را وارد کنید'
        
    }else{
        // console.log(textTodo.value);
        textErorr.innerHTML = ''
        const value: TodoInterface = {
            id: Math.round(Math.random() * 100),
            title: textTodo.value.trim(),
            status: false
        }
        // console.log(value);
        const todoObj = new Todo(value)
        // console.log(todoObj);
        const todo = ui.addTodoList(todoObj);
        
        
       
        
        
        
        
    }
    textTodo.value = ''
    
    
}) 