import React, {ChangeEvent, KeyboardEvent, useState, MouseEvent} from "react";
import './App.css';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (elId: string, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    currentTasks: Array<TaskType>
    onClickFilterButton: (filterButt: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            props.addTasks(newTaskTitle, props.id);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTasks(newTaskTitle.trim(), props.id);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onAllClickHandler = () => props.onClickFilterButton("All", props.id);
    const onActiveClickHandler = () => props.onClickFilterButton("Active", props.id);
    const onCompleteClickHandler = () => props.onClickFilterButton("Completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    return (
        <div className="todo">
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input className={error ? "error" : ""}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button className="plusButton" onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.currentTasks.map(el => {
                    const onRemoveHandler = () => {
                        props.removeTasks(el.id, props.id);
                    }
                    const onChangeHandler = (e: MouseEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? "isDone" : ""}>
                            <button onClick={onRemoveHandler}>x</button>
                            <input onClick={onChangeHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "All" ? "priorityButtonActive" : "priorityButton"}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "Active" ? "priorityButtonActive" : "priorityButton"}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "Completed" ? "priorityButtonActive" : "priorityButton"}
                        onClick={onCompleteClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}