import React from 'react';
import './App.css';
import TodoList from "./TodoList";

const task1 = [
    {id: 1, title: 'Html&Css', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false},
]

const task2 = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
]

const App = () => {
    return (
        <div className="App">
            <TodoList title="what to learn" tasks={task1}/>
            <TodoList title="songs" tasks={task2}/>
        </div>
    );
}

export default App;
