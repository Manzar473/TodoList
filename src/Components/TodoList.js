import React,{useState} from 'react'
function TodoList() {
    const [inputValue,setinputValue]=useState("")
    const[todos,setTodos]=useState([])
   const[error,seterror]=useState("")
   const[index,setindex]=useState()
   const todoClr={
    color:"black"
   }
   const todoRed={
    color:"red"
   }

  
   const ChangeInput=(e)=>{
    setinputValue(e.target.value)
    if(todos.includes(e.target.value))
    {
        seterror("Task has already been Added!")
        todos.filter((todo,id)=>{
            if(todo===e.target.value){
               
                    setindex(id)
                }
            
        })
    }
    else{
        seterror("")
        todos.filter((todo,id)=>{
           
               
                    setindex()})
            

    }
   }


     const addTodos=()=>{ 

        if(inputValue==="")
        {
            seterror("First type Something!")
        }
   
       else if(todos.includes(inputValue))
       {
        seterror("Task has already been Added!")
    
       }    

        else {
            setTodos((oldarr)=>{
                return [...oldarr,inputValue]
               })
        }
       
     }




  return (
    <div>
        <h1>TODOs List</h1>
        <input style={{marginTop: "25px"}} type="text" placeholder='Add a Task' onChange={ChangeInput}></input>
        <button onClick={addTodos}>Add Todo</button>
        <p style={{color:"red" ,fontWeight:"500"}}>{error}</p>
        
       
        {todos.map((todo,pos)=>{
        return (
            <>
            <h4 style={pos===index ? todoRed:todoClr} >{todo}</h4>
            <hr style={{width:"40%"}}></hr>
            </>
        )
        
        
        })}
      
    </div>
  )
}

export default TodoList