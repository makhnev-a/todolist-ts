import React, {useState} from "react"
import {TextField} from "@material-ui/core";

type PropTypes = {
    value: string
    onChange: (newValue: string) => void
}

const EditableSpan: React.FC<PropTypes> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const removeEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)

    return (
        <>
            {
                editMode
                    ? <TextField
                        variant="outlined"
                        autoFocus={true}
                        type="text"
                        value={title}
                        onBlur={removeEditMode}
                        onChange={changeTitle}
                    />
                    : <span onDoubleClick={activateEditMode}>{props.value}</span>
            }
        </>
    )
}

export default EditableSpan