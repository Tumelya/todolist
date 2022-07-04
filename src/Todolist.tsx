import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (elId: number) => void
    onClickFilterButton: (filterButt: FilterType)=> void
}

export type FilterType = "All" | "Active" | "Completed"

export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <button onClick={()=>{props.removeTasks(el.id)}}>x</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.onClickFilterButton("All")}}>All</button>
                <button onClick={() => {props.onClickFilterButton("Active")}}>Active</button>
                <button onClick={() => {props.onClickFilterButton("Completed")}}>Completed</button>
            </div>
        </div>
    )
}