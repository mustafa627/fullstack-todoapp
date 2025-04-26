const parent = document.getElementById("todolist");
// console.log(todoData, "todoData")
let todoList   = [];


const addTodo = () => {
    try{
       const input = document.querySelector("#input")
        console.log(input);
        const body ={
            todo: input.value,
        }
        const response = fetch("http://localhost:5500/createTodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        alert("todo added successfully")
        input.value = ""
        getTodos()
    }catch(err){
        console.log("err", err.message)
    }
    
}
 

const getTodos = async () => {
    try{
     todoList = "";
        const todoData = await fetch("http://localhost:5500/getTodos")
        .then(res => res.json()) 
        // console.log(todoData.data);      
        todoList = todoData.data
        parent.innerHTML = "";
        console.log(todoList, "todoList")
        todoData.data.map((obj) => {
            parent.innerHTML += `
                <p>${obj.todo}</p>
                <button id="${obj._id}" onclick="editTodo(this)">Edit</button>
                <button id="${obj._id}" onclick="deleteTodo(this)">delete</button>
            `;
        });
        
    }catch(err){
        console.log("err", err.message)
    }
}
getTodos()

const editTodo = async (ele) => {
    console.log("ele edit", ele)
    try {
        var editValue = prompt("enter edit value")
        const obj = {
            todo: editValue
        }
        const response = await fetch(`http://localhost:5500/updateTodo/${ele.id}`, {
            method: "PUT",
            headers: {

                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
        console.log("response", response)
      getTodos()
    } catch (error) {
        alert(error.message)
    }

}

const deleteTodo = async (ele) =>{
    console.log("ele delete", ele)
    try{
        const response = await fetch(`http://localhost:5500/deleteTodo?id=${ele.id}`, {
            method: "DELETE", 
            headers: {
                "content-type": "application/json"
            },
        })
        alert("todo deleted successfully")
        getTodos()
    }catch(err){
        console.log("err", err.message)
    }
}

const allDelete = async () => {
    try{
        const response = await fetch(`http://localhost:5500/deleteAllTodo`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })
        alert("all todo deleted successfully")
        getTodos()
    }catch(err){
        console.log("err", err.message)
    }
}

window.allDelete = allDelete
window.getTodos = getTodos
window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.addTodo = addTodo