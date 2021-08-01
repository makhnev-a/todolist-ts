import React, {useState} from "react";
import {FilterType} from "./App";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todolist: string) => void
}

const TodoList = (props: PropType) => {
    const changeFilterAll = () => props.changeFilter('all', props.id)
    const changeFilterCompleted = () => props.changeFilter('completed', props.id)
    const changeFilterActive = () => props.changeFilter('active', props.id)

    const addTask = (title: string) => props.addTask(title, props.id)

    return (
        <div>
            <h3>{props.title} <button onClick={() => props.removeTodoList(props.id)}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task, index) => {
                        const removeTask = () => props.removeTask(task.id, props.id)
                        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked
                            props.changeStatus(task.id, newIsDoneValue, props.id)
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