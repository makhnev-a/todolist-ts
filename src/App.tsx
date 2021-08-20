import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

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

    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        const task = tasks[todoListID].find(task => task.id === taskID)

        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    const changeTodoListTitle = (todoListID: string, title: string) =>
        setTodoLists(todoLists.map(todoList => todoList.id === todoListID ? {...todoList, title} : todoList))

    const addTask = (title: string, todoListID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}

        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: 'all'
        }

        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    const changeTodoListFilter = (value: FilterType, todoListID: string) => {
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl, index) => {
                            const allTodoListTasks = tasks[tl.id]
                            let tasksForTodoList = allTodoListTasks

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodoListTasks.filter(atl => !atl.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTasks.filter(atl => atl.isDone)
                            }

                            return (
                                <Grid item key={`todolist-${index}`}>
                                    <Paper style={{padding: "10px"}}>
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
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
