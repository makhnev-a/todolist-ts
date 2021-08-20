import React, {useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropTypes = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<PropTypes> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')

        if (event.charCode === 13) {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                error={!!error}
                variant="outlined"
                value={title}
                onChange={onInputChange}
                onKeyPress={onEnterPress}
                label="Title"
                helperText={error}
            />
            <IconButton
                color="primary"
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm