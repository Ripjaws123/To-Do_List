import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const saveToLS= (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const [showfinished, setshowFinished] = useState(true)

  const togglefinished = (e) => {
    setshowFinished(!showfinished)
  }
  
  

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }
  const handleedit = (e, id) => {
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newtodos)
    saveToLS()
    
    }
  const handledelete = (e, id) => {
    let newtodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newtodos)
    saveToLS()
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
  }
  const handlecheckbox = (e) => {
    let id= e.target.name;
    let index = todos.findIndex(item=>{
      return item.id==id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-blue-200 w-[45%] h-[88vh] p-5 mt-5 rounded-2xl">
        <div className="heading flex justify-center mt-4">
          <h1 className="font-bold text-5xl underline text-blue-900">TO-DO LIST</h1>
        </div>
        <div className="addtask mt-16 flex items-center justify-center gap-5">
          <input type="text" onChange={handlechange} value={todo} placeholder="Enter The Tasks" className="w-[30rem] h-10 rounded-md text-center" />
          <button className="py-3 px-6 bg-green-600 rounded-lg" disabled={todo.length<=3} onClick={handleadd}><MdLibraryAdd /></button>
        </div>
        <div className='p-7 flex gap-3 items-center'>
        <input type="checkbox" onChange={togglefinished} name="" checked={showfinished} id="" />
        <span className='text-base font-bold'>Show Finished</span>
        </div>
        <div className="hed">
          <h3 className='font-bold text-xl'>Your To-Do's</h3>
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="info mt-3">
              <div className="tasks flex bg-green-300 p-5 rounded-lg gap-6 w-[643px]">
                <input onChange={handlecheckbox} name={item.id} type="checkbox" checked={todo.isCompleted} id="" />
                <div className="info w-[448px] flex items-center justify-center">
                  <span className={item.isCompleted ? "line-through" : ""}>{item.todo}
                  </span>
                </div>
                <button className="p-[14px] bg-green-600 rounded-lg" onClick={(e)=>{handleedit(e, item.id)}}><MdEditDocument /></button>
                <button className="p-[14px] bg-green-600 rounded-lg mr-2" onClick={(e)=>{handledelete(e, item.id)}}><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App