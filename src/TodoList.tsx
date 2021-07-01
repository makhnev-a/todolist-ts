import React from "react";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type PropType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: Number) => void
	changeFilter: (value: 'all' | 'active' | 'completed') => void
}

const TodoList = (props: PropType) => {
	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{
					props.tasks.map((task, index) =>
						<li key={`${index}+${task.id}`}>
							<input type="checkbox" defaultChecked={task.isDone} />
							<span>{task.title}</span>
							<button onClick={() => props.removeTask(task.id)}>x</button>
						</li>
					)
				}
			</ul>
			<div>
				<button onClick={() => props.changeFilter('all')}>All</button>
				<button onClick={() => props.changeFilter('active')}>Active</button>
				<button onClick={() => props.changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}

export default TodoList