import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

const App = () => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'Html&Css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const addTask = (title: string) => {
        const task = {id: v1(), title: title, isDone: false}
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (id: string) => {
        const newTasks: TaskType[] = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(newTasks)
    }

    const changeFilter = (value: 'all' | 'active' | 'completed') => setFilter(value)

    const changeStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === id)

        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList
                title="what to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
