import React from "react";
import {FilterType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

const TodoList = (props: PropType) => {
    const changeFilterAll = () => props.changeFilter('all', props.id)
    const changeFilterCompleted = () => props.changeFilter('completed', props.id)
    const changeFilterActive = () => props.changeFilter('active', props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const editTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title)

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={editTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((task, index) => {
                        const removeTask = () => props.removeTask(task.id, props.id)
                        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked
                            props.changeStatus(task.id, newIsDoneValue, props.id)
                        }
                        const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, task.id, title)

                        return <div key={`${index}+${task.id}`} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox
                                color="primary"
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                            <IconButton onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeFilterAll}
                    color="default"
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeFilterActive}
                    color="primary"
                >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeFilterCompleted}
                    color="secondary"
                >Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList