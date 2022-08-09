import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input className={error ? "error" : ""}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button className="plusButton" onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}