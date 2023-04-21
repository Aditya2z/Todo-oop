let container = document.querySelector(".root");

class Todolist {
    constructor(root, list = []) {
        this.todos = list;
        this.root =root;
    }
    add(text) {
        let todo = new Todo(text);
        this.todos.push(todo);
        this.createUI();
        return this.todos.length;
    }
    handleDelete(id) {
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        this.createUI();
        return this.todos.length;
    }
    createUI() {
        this.root.innerHTML = "";
        this.todos.forEach(todo => {
            let li = todo.createUI();
            li.querySelector("span").addEventListener("click", this.handleDelete.bind(this, todo.id));
            container.append(li);
        })
    }
}
//
class Todo {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.id = `id-${Date.now()}`;
    }
    handleCheck() {
        this.isDone = !this.isDone;
        this.createUI();
    }
    createUI() {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.addEventListener("click", this.handleCheck.bind(this));
        let p = document.createElement("p");
        p.innerText = this.text;
        if(this.isDone) p.style.opacity = ".75";
        let span = document.createElement("span");
        span.classList.add("closeBtn");
        span.innerText = "X";
        li.append(input, p, span);  
        return li;
    }
}

let myTodo = new Todolist(document.querySelector(".todos"));
myTodo.add('play');
myTodo.add("no");

let inputValue = document.querySelector("input[type=text]");
let active = document.querySelector(".active-btn");
let completed = document.querySelector(".completed-btn");
let all = document.querySelector(".all-btn");
let clear = document.querySelector(".clear-btn");
let selectAll = document.querySelector(".selectAll");

let enterBtn = document.querySelector(".enterBtn");

// addEventListeners
inputValue.addEventListener("keyup", (event) => {
    if(event.keyCode === 13) {
        myTodo.add(event.target.value);
        event.target.value = "";
    }
});