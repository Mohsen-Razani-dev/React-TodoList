import TodoLayout from "../Component/TodoLayout";
import AddTodo from "../Component/AddTodo";
import AllTodos from "../Component/AllTodos";

export const routes = [
    {
        path: "/",
        component:TodoLayout,
        exact: true
    },
    {
        path: "/addTodo",
        component:AddTodo,
        exact:true

    },
    {
        path: "/allTodo",
        component:AllTodos,
        exact:true
    }
];
