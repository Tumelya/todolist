import React, {useState} from 'react';
import './App.css';
import {TaskType} from "./components/Todolist";
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterType = "All" | "Active" | "Completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    /*
        let tasks3: Array<TaskType> = [
            {id: v1(), title: "Football", isDone: false},
            {id: v1(), title: "Squash", isDone: true},
            {id: v1(), title: "Volleyball", isDone: false},
            {id: v1(), title: "Tennis", isDone: true},
            {id: v1(), title: "Golf", isDone: false},
        ]*/

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to watch", filter: "All"}
    ]);
    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "TypeScript", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Harry Potter", isDone: true},
            {id: v1(), title: "Dune", isDone: false},
            {id: v1(), title: "Shawshank Redemption", isDone: true},
            {id: v1(), title: "Hustle", isDone: true},
            {id: v1(), title: "Game of Thrones", isDone: true}]
    });

    const removeTasks = (elId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter((el) => el.id !== elId);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }
    const addItem = (title: string, todolistId: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }
    const onClickFilterButton = (filterButt: FilterType, todolistId: string) => {
        let todolist = todolists.find(todo => todo.id === todolistId);
        if (todolist) {
            todolist.filter = filterButt;
            setTodolists([...todolists]);
        }
    }
    const changeStatus = (tasksId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === tasksId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }
    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(todo => todo.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistsType = {
            id: v1(), title: title, filter: "All"
        };
        setTodolists([todolist, ...todolists]);
        setTasks({...tasksObj, [todolist.id]: []});
    }

    return (
        <div>
            <div className="todoInput">
                <AddItemForm addItem={addTodolist}/>
            </div>
            <div className="App">
                {todolists.map((todo) => {
                    let currentTasks = tasksObj[todo.id];
                    if (todo.filter === "Active") {
                        currentTasks = tasksObj[todo.id].filter((el) => !el.isDone);
                    }
                    if (todo.filter === "Completed") {
                        currentTasks = tasksObj[todo.id].filter((el) => el.isDone);
                    }
                    return (
                        <Todolist key={todo.id}
                                  id={todo.id}
                                  title={todo.title}
                                  tasks={currentTasks}
                                  removeTasks={removeTasks}
                                  addItem={addItem}
                                  changeTaskStatus={changeStatus}
                                  filter={todo.filter}
                                  currentTasks={currentTasks}
                                  onClickFilterButton={onClickFilterButton}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
