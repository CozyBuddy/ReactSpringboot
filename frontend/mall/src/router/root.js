import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";



const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const TodoList = lazy(() => import("../pages/todo/ListPage"))
const root = createBrowserRouter([
    // suspense 와 lazy 를 활용하는 이유는 해당 컴포넌트가 필요한 순간전에는 로딩되지 않도록 하는 방식임.
    // 당장의 사용자가 필요로 할때만 해당 컴포넌트를 호출하는 방식인듯 (코드 분할)
    //그래서 새로고침의 방식으로 모두 다 로딩되기 보다는 link 같은 태그를 활용해야함. 그래야 규모가 커져도 로딩이 오래걸리지 않음

  {
    path: "",
    element : <Suspense fallback={Loading}><Main></Main></Suspense>
  },
  {
    path: "about",
    element : <Suspense fallback={Loading}><About></About></Suspense>
  },
  {
    path: "todo",
    element : <Suspense fallback={Loading}><TodoIndex></TodoIndex></Suspense>,
    children : todoRouter()
  }
  // 리액트는 router 방식의 spa 방식으로 동작하기 때문에 a태그는 쓰지 않도록함 대신 Link 태그 활용
])
export default root;