
import { useEffect, useState } from 'react';
import ModifyPage from './../../pages/todo/ModifyPage';
import { getOne } from '../../api/todoApi';
const initState = {
    tno : 0 ,
    title : '',
    writer : '' ,
    dueDate : '' ,
    complete : false 
}

const ModifyComponent = ({tno , moveList, moveRead}) => {
    const [todo,setTodo] = useState({...initState})

    useEffect(() => {
        getOne(tno).then(data => setTodo(data))
    },[tno])

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value

        setTodo({...todo})
    }
    const handleChangeTodoComplete = (e) => {
        const value = e.target.value

        todo.complete = (value ==='Y')

        setTodo({...todo})
        }
    return (
        <div className='border-2 border-sky-200 mt-10 m-2 p-4'>
            <div className='flex justify-center mt-10'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>TNO</div>
                    <div className='w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100'>
                    {todo.tno}
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>WRITER</div>
                    <div className='w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100'>
                    {todo.writer}
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>TITLE</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'
                    name="title" type="text"  value={todo.title} onChange={handleChangeTodo}/>
                    </div>
                </div>

                <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>DUEDATE</div>
                    <input className='w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md '
                    name="dueDate" type="date"  value={todo.dueDate} onChange={handleChangeTodo}/>
                    </div>
                </div>

                <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>COMPLETE</div>
                    <select name="status" className='border-solid border-2 rounded m-1 p-2' 
                    onChange={handleChangeTodoComplete} value = {todo.complete ? 'Y' : 'N'}>
                        <option value="Y">Completed</option>
                        <option value="N">Not Yet</option>
                    </select>
                    </div>
                </div>
           


            <div className='flex justify-end p-4'>
                <button type='button' className='inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500'>
                Delete
                </button>
                <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'>
                Modify
                </button>
            </div>
        </div>
    )
}

export default ModifyComponent;