import React, {useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: 'all' | 'active' | 'completed') => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: 'all' | 'active' | 'completed'
}

const TodoList = (props: PropType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle)
            setTaskTitle('')
        } else {
            setError("Title is required!")
        }
    }

    const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError('')

        if (event.charCode === 13) {
            addTask()
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)
    const changeFilterAll = () => props.changeFilter('all')
    const changeFilterCompleted = () => props.changeFilter('completed')
    const changeFilterActive = () => props.changeFilter('active')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onInputChange}
                    onKeyPress={onEnterPress}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task, index) => {
                        const removeTask = () => props.removeTask(task.id)
                        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked
                            props.changeStatus(task.id, newIsDoneValue)
                        }

                        return <li key={`${index}+${task.id}`} className={task.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={changeFilterAll}
                >All</button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={changeFilterActive}
                >Active</button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={changeFilterCompleted}
                >Completed</button>
            </div>
        </div>
    )
}

export default TodoList