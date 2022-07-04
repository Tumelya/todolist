import React, {useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (elId: string) => void
    addTasks: (title: string) => void
    //onClickFilterButton: (filterButt: FilterType)=> void
}

export type FilterType = "All" | "Active" | "Completed"

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterType>("All");
    let currentTasks = props.tasks;
    if (filter === "Active") {
        currentTasks = props.tasks.filter((el) => !el.isDone);
    }
    if (filter === "Completed") {
        currentTasks = props.tasks.filter((el) => el.isDone);
    }

    const onClickFilterButton = (filterButt: FilterType) => {
        setFilter(filterButt);
    }

    const [newTaskTitle, setNewTaskTitle] = useState("");


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e) => {
                           setNewTaskTitle(e.currentTarget.value);
                       }}
                />
                <button onClick={() => {
                    props.addTasks(newTaskTitle);
                    setNewTaskTitle("");
                }}>+
                </button>
            </div>
            <ul>
                {currentTasks.map(el => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => {
                                props.removeTasks(el.id)
                            }}>x
                            </button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    onClickFilterButton("All")
                }}>All
                </button>
                <button onClick={() => {
                    onClickFilterButton("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    onClickFilterButton("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}