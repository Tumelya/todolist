import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let tasks1: Array<TaskType> = [
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: "Harry Potter", isDone: true},
        {id: 2, title: "Dune", isDone: false},
        {id: 3, title: "Shawshank Redemption", isDone: true}
    ]

    let tasks3: Array<TaskType> = [
        {id: 1, title: "Football", isDone: false},
        {id: 2, title: "Squash", isDone: true},
        {id: 3, title: "Volleyball", isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title = "What to learn" tasks = {tasks1}/>
            <Todolist title = "Movies" tasks = {tasks2}/>
            <Todolist title = "Games" tasks = {tasks3}/>
        </div>
    );
}

export default App;
