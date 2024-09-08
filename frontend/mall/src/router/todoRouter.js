import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const Loading = <div>Loading....</div>
const TodoList = lazy(()=> import("../pages/todo/ListPage"))
const TodoRead = lazy(()=> import("../pages/todo/ReadPage"))
const TodoAdd = lazy(()=> import("../pages/todo/AddPage"))
const TodoModify = lazy(()=> import("../pages/todo/ModifyPage"))

const todoRouter = () => {
    return [
        {
            path: "list",
            element : <Suspense fallback={Loading}><TodoList></TodoList></Suspense>
        },
        {
            path : "",
            element : <Navigate replace to="list"></Navigate>
        }
        ,
        {
            path : "read/:tno",
            element : <Suspense fallback={Loading}><TodoRead></TodoRead></Suspense>
        }
        ,
        {
            path : "add",
            element : <Suspense fallback={Loading}><TodoAdd></TodoAdd></Suspense>
        }
        ,
        {
            path : "modify/:tno",
            element : <Suspense fallback={Loading}><TodoModify></TodoModify></Suspense>
        }
    ]
}

export default todoRouter;