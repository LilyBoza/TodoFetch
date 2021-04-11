import React, { useState } from "react";

//create your first component
export function Home() {
	const FetchUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/usuarioLilianaPBN";
	const [todos, setTodos] = useState([]);

	const addTodo = async e => {
		if (e.key == "Enter") {
			if (e.target === "") {
				alert("ingrese la tarea");
			} else {
				const NuevoTodo = { label: e.target.value, done: false };
				await fetch(FetchUrl, {
					method: "PUT",
					body: JSON.stringify([...todos, NuevoTodo]),
					headers: { "Content-Type": "application/json" }
				})
					.then(res => res.json())
					.then(data => console.log([data]));

				await fetch(FetchUrl)
					.then(res => res.json())
					.then(data => {
						setTodos(data);
						e.target.value = " ";
					});
			}
		}
	};

	//Función de eliminar todo sin API
	// const delTodo = key => {
	// 	setTodos(
	// 		todos.filter((item, index) => {
	// 			return key !== index ? item : null;
	// 		})
	// 	);
	// };

	const delTodo = async key => {
		if (todos.length === 1) {
			setTodos([]);
		} else {
			const listaNueva = todos.filter((item, index) => {
				return key !== index ? item : null;
			});

			await fetch(FetchUrl, {
				method: "PUT",
				body: JSON.stringify(listaNueva),
				headers: { "Content-Type": "application/json" }
			})
				.then(res => res.json())
				.then(data => console.log([data]));

			await fetch(FetchUrl)
				.then(res => res.json())
				.then(data => {
					setTodos(data);
					// e.target.value = " ";
				});
		}
	};

	return (
		<div className="text-center mt-5">
			<h1>TodoList</h1>
			<input onKeyDown={addTodo} />
			<ul>
				{todos.map((todo, key) => {
					return (
						<li key={key}>
							{todo.label}
							<button onClick={() => delTodo(key)}>x</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
