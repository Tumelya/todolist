import React, {useState} from 'react';
import './App.css';
//import {FilterType, TaskType, Todolist} from "./Todolist";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    let [tasks1, setTasks1] = useState([
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "TypeScript", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    /*let tasks2: Array<TaskType> = [
        {id: 1, title: "Harry Potter", isDone: true},
        {id: 2, title: "Dune", isDone: false},
        {id: 3, title: "Shawshank Redemption", isDone: true}
    ]

    let tasks3: Array<TaskType> = [
        {id: 1, title: "Football", isDone: false},
        {id: 2, title: "Squash", isDone: true},
        {id: 3, title: "Volleyball", isDone: true}
    ]*/

    const removeTasks = (elId: string) => {
        //tasks1=tasks1.filter((el) => el.id!==elId);
        setTasks1(tasks1.filter((el) => el.id !== elId));
    }

    const addTasks = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasksArr = [newTask, ...tasks1];
        setTasks1(newTasksArr);
    }

    /*let [filter, setFilter] = useState<FilterType>("All");
    let currentTasks = tasks1;
    if (filter === "Active") {
        currentTasks = tasks1.filter((el) => !el.isDone);
    }
    if (filter === "Completed") {
        currentTasks = tasks1.filter((el) => el.isDone);
    }

    const onClickFilterButton = (filterButt: FilterType) => {
        setFilter(filterButt);
    }*/

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      removeTasks={removeTasks}
                      addTasks={addTasks}
                //onClickFilterButton={onClickFilterButton}
            />
            {/*<Todolist title = "Movies" tasks = {tasks2}/>
            <Todolist title = "Games" tasks = {tasks3}/>*/}
        </div>
    );
}

export default App;
