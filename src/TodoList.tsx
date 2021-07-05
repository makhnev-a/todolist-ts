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
}

const TodoList = (props: PropType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const addTask = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task, index) => {
                        const removeTask = () => props.removeTask(task.id)

                        return <li key={`${index}+${task.id}`}>
                            <input type="checkbox" defaultChecked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={changeFilterAll}>All</button>
                <button onClick={changeFilterActive}>Active</button>
                <button onClick={changeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList