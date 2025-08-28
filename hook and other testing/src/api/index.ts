import axios from "axios";
import type { Todo } from "../entities/Todo";

const todos = [
  {
    id: 1,
    title: "Learn HTML",
    completed: false,
  },
  {
    id: 2,
    title: "Learn CSS",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Javascript",
    completed: false,
  },
  {
    id: 4,
    title: "Learn React",
    completed: false,
  },
  {
    id: 5,
    title: "Learn Next.js",
    completed: false,
  },
];

export const fetchTodos = async (query = ""): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //   const filteredTodos = todos.filter((todo) => {
  //     todo.title.toLowerCase().includes(query.toLocaleLowerCase());
  //   });
  const filteredTodos = todos;

  console.log("Fetech Todos");
  return [...filteredTodos];
};

export const fetchTodo = async (id = 0): Promise<Todo | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  var todo = todos.find((todo) => todo.id == id);

  console.log("Fetech Todo", todo, id);
  return todo;
};

export const addTodo = async (title: string): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newTodo = {
    id: todos.length + 1,
    title: title,
    completed: false,
  };

  // Todo is stored in memory and cleared on page reload
  todos.push(newTodo);
  console.log("New Todo List::", todos);
  return newTodo;
};

export const fetchEmployee = async (pageNumber=1,pageSize = 5)=>{
  
  try {
    let res = await axios.get(`https://localhost:7133/Employee/GetAllEmployee?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    return res.data
  } catch (error) {
    alert(error)
  }
  
}
