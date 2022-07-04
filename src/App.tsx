import React, {useState} from 'react';
import './App.css';
//import {FilterType, TaskType, Todolist} from "./Todolist";
import {FilterType, Todolist} from "./Todolist";

function App() {

    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JavaScript", isDone: true},
        {id: 3, title: "TypeScript", isDone: false},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "Redux", isDone: false}
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

    const removeTasks = (elId: number) => {
        //tasks1=tasks1.filter((el) => el.id!==elId);
        setTasks1(tasks1.filter((el) => el.id !== elId));
    }

    let [filter, setFilter] = useState<FilterType>("All");
    let currentTasks = tasks1;
    if (filter === "Active") {
        currentTasks = tasks1.filter((el) => !el.isDone);
    }
    if (filter === "Completed") {
        currentTasks = tasks1.filter((el) => el.isDone);
    }

    const onClickFilterButton = (filterButt: FilterType) => {
        setFilter(filterButt);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={currentTasks}
                      removeTasks={removeTasks}
                      onClickFilterButton={onClickFilterButton}/>
            {/*<Todolist title = "Movies" tasks = {tasks2}/>
            <Todolist title = "Games" tasks = {tasks3}/>*/}
        </div>
    );
}

export default App;
