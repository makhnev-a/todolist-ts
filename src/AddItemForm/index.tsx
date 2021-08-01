import React, {useState} from "react";

type PropTypes = {
    addItem: (title: string) => void
}

const AddItemForm:React.FC<PropTypes> = (props) => {
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
            <input
                value={title}
                onChange={onInputChange}
                onKeyPress={onEnterPress}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm