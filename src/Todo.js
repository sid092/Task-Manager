import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { AiFillEdit } from "react-icons/ai";

const Todo = () => {
    const [isCompletedScreen, setIsCompletedScreen] = useState(false)
    const [allTodos,setTodos] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const [newDescription,setNewDescription] = useState("")
    const [completedTodos ,setCompletedTodos] = useState([])
    const [editmode , setEditmode] = useState(false)

    // function to add Task

    const handleAddToDo =()=>{
        let newTodoItem ={
            title:newTitle,
            description:newDescription
        }
        let updatedTodo = [...allTodos]
        updatedTodo.push(newTodoItem)
        setTodos(updatedTodo)
        localStorage.setItem("todolist",JSON.stringify(updatedTodo))
        setNewTitle("")
        setNewDescription("")
        setEditmode(false)
    }

    // Function to Edit Task

    const handelEdit=(index)=>{
        // const tempData = [...allTodos]
        const tempData=allTodos[index]
        console.log(tempData)
        setNewTitle(tempData.title)
        setNewDescription(tempData.description)
        handleDeleteTodo(index)
        setEditmode(true)

    }

    // Function to delete incomplete Tasks

    const handleDeleteTodo =(index)=>{
        let reducedTodo = [...allTodos]
        const updatedListData = reducedTodo.filter((ele, id) => {
            return index !== id})
        localStorage.setItem("todolist",JSON.stringify(updatedListData))
        setTodos(updatedListData)
    }

    // Function to delete completed Tasks

    const handleDeleteCompletedTodo =(index)=>{
        let reducedCompletedTodo=[...completedTodos]
        const updatedListData = reducedCompletedTodo.filter((ele, id) => {
            return index !== id})
        localStorage.setItem("todolist",JSON.stringify(updatedListData))
        setCompletedTodos(updatedListData)
    }

    // Function to complete Task

    const handleComplete =(index)=> {
        let filteredItem = {
            ...allTodos[index],
        }
        let updatedCompletedArr=[...completedTodos]
        updatedCompletedArr.push(filteredItem)
        setCompletedTodos(updatedCompletedArr)
        handleDeleteTodo(index)
        localStorage.setItem("completedtodo",JSON.stringify(updatedCompletedArr))

    }

    useEffect(()=>{
        let savedTodo= JSON.parse(localStorage.getItem("todolist"))
        let savedCompletedTodo= JSON.parse(localStorage.getItem("completedtodo"))
        if(savedTodo){
            setTodos(savedTodo)
        }
        if(savedCompletedTodo){
            setCompletedTodos(savedCompletedTodo)
        }
    },[])



    return (
        <>
            <div className='todo-wrapper'>
            <h1>Tasks To Do!</h1>
                <div className='todo-input'>
                    <div className='todo-input-items'>
                        <label>Title</label>
                        <input type="text" placeholder='Enter title'
                        value={newTitle}
                        onChange={(e)=>setNewTitle(e.target.value)} />
                    </div>
                    <div className='todo-input-items'>
                        <label>Description</label>
                        <input type="text" placeholder='Enter description'
                        value={newDescription}
                        onChange={(e)=>setNewDescription(e.target.value)} />
                    </div>
                    <div className='todo-input-items'>
                    {!editmode?
                        <button type="button" className='primaryBtn' onClick={handleAddToDo}>Add</button>:
                        <button type="button" className='primaryBtn' onClick={handleAddToDo}>Update</button>}
                    </div>
                </div>
                <div className='btn-area'>
                    <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
                        onClick={() => setIsCompletedScreen(false)}>ToDo</button>
                    <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
                        onClick={() => setIsCompletedScreen(true)}>completed</button>
                </div>
                <div className='todo-list'>
                    {isCompletedScreen===false && allTodos.map((item,index)=>{
                        return(
                            <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <AiFillEdit
                                title = "Edit"
                                className='edit-icon'
                                onClick={()=>handelEdit(index)}/>
                                <AiOutlineDelete
                                    title="Delete?"
                                    className="icon"
                                    onClick={()=>handleDeleteTodo(index)}
                                />
                                <BsCheckLg
                                    title="Completed?"
                                    className=" check-icon"
                                    onClick={()=>handleComplete(index)}
                                />
                            </div>
                    </div>
                        )
                    })}

                    {isCompletedScreen===true && completedTodos.map((item,index)=>{
                        return(
                            <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>                          
                            </div>
                            <div>
                                <AiOutlineDelete
                                    title="Delete?"
                                    className="icon"
                                    onClick={()=>handleDeleteCompletedTodo(index)}
                                />
                            </div>
                    </div>
                        )
                    })}
                   
                </div>
            </div>
        </>
    )
}

export default Todo
