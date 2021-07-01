import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import { TaskType } from "./TodoList";

const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: 1, title: 'Html&Css', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'React', isDone: false },
	])

	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')

	let tasksForTodolist = tasks

	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => task.isDone === false)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone === true)
	}

	const removeTask = (id: Number) => {
		const newTasks: TaskType[] = tasks.filter((task: TaskType) => task.id !== id)
		setTasks(newTasks)
	}

	const changeFilter = (value: 'all' | 'active' | 'completed') => setFilter(value)

	return (
		<div className="App">
			<TodoList
				title="what to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
			/>
		</div>
	);
}

export default App;
