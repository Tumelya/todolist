import React, {MouseEvent} from "react";
import '../App.css';
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";

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
    addItem: (title: string, todolistId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    currentTasks: Array<TaskType>
    onClickFilterButton: (filterButt: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.onClickFilterButton("All", props.id);
    const onActiveClickHandler = () => props.onClickFilterButton("Active", props.id);
    const onCompleteClickHandler = () => props.onClickFilterButton("Completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const addItem = (title: string) => {
        props.addItem(title, props.id);
    }

    return (
        <div className="todo">
            <h3>
                <button onClick={removeTodolist}>x</button>
                {"   " + props.title}
            </h3>
            <AddItemForm addItem={addItem}/>
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