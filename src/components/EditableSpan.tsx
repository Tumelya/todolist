import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    return editMode
        ? <TextField size="small" value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>


}