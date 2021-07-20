import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

const App = () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {
            id: todoListID_1,
            title: 'What to learn?',
            filter: 'all'
        },
        {
            id: todoListID_2,
            title: 'What to buy?',
            filter: 'all'
        }
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'Html&Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
        ]
    })

    // let tasksForTodolist = tasks
    //
    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    //
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone)
    // }

    const addTask = (title: string, todoListID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}

        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    const changeTodoListFilter = (value: FilterType, todoListID: string) => {
        debugger
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const task = tasks[todoListID].find(task => task.id === taskID)

        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    const allTodoListTasks = tasks[tl.id]
                    let tasksForTodoList = allTodoListTasks

                    if (tl.filter === 'active') {
                        tasksForTodoList = allTodoListTasks.filter(atl => !atl.isDone)
                    }

                    if (tl.filter === 'completed') {
                        tasksForTodoList = allTodoListTasks.filter(atl => atl.isDone)
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeTodoListFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
