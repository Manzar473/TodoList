import React, { useState, useEffect } from 'react'



const getTodos = () => {
    let list = localStorage.getItem("todos")
    if (list) {

        return JSON.parse(localStorage.getItem("todos"))
    }
    else {
        return [];
    }
}

function TodoList() {
    const [inputValue, setinputValue] = useState("")
    const [todos, setTodos] = useState(getTodos())
    const [error, seterror] = useState("")
    const [index, setindex] = useState()
    const [btnText, setbtText] = useState("Add")
    const [isEditing, setisEditing] = useState(false)
    const [EditPos, setEditPOs] = useState()
    const [isDarkModOn, SetisDarkMOdOn] = useState(false)
    const [showModeBtn, setShowModeBtn] = useState(false)
    const password = "enable modes";
    const password2 = "disable modes";
    const todoClr = {
        color: isDarkModOn ? "white" : "black"
    }
    const todoRed = {
        color: "red"
    }





    const ChangeInput = (e) => {
        setinputValue(e.target.value)
        if (e.target.value === password) {
            setShowModeBtn(true)
            setinputValue("")
        }
        else if (e.target.value === password2) {
            setShowModeBtn(false)
            setinputValue("")
        }

        else if (todos.includes(e.target.value)) {
            seterror("ERROR! Task has already been Added")
            todos.filter((todo, id) => {
                if (todo === e.target.value) {

                    setindex(id)
                }

            })
        }
        else {
            seterror("")
            todos.filter((todo, id) => {


                setindex()
            })


        }
    }


    const addTodos = () => {
        if (isEditing === false) {

            if (inputValue === "") {
                seterror("ERROR! First type Something")
            }

            else if (todos.includes(inputValue)) {
                seterror("ERROR! Task has already been Added")

            }

            else {
                setTodos((oldarr) => {
                    return [...oldarr, inputValue]
                })
            }

            setinputValue("")
        }

        else {

            setTodos((previousarr) => {
                return previousarr.map((arrEle, loc) => {
                    return loc === EditPos ? arrEle = inputValue : arrEle = arrEle



                })
            })
            setinputValue("")
            setisEditing(false)
            setbtText("Add")

        }
    }


    const deleteTask = (pos) => {
        setTodos((previousarr) => {
            return previousarr.filter((arrEle, loc) => {
                return loc !== pos
            })
        })

    }
    const editTask = (pos) => {

        todos.filter((element, loc) => {
            if (loc === pos) {
                setinputValue(element)
                setbtText("Update")
                setEditPOs(pos)
                setisEditing(true)
            }
        })

    }
    const chnageMode = () => {
        return isDarkModOn ? SetisDarkMOdOn(false) : SetisDarkMOdOn(true)

    }
    useEffect(() => {

        localStorage.setItem("todos", JSON.stringify(todos))

    }, [todos]);



    return (
        <>
            <div className='WholeBody' style={isDarkModOn ? { backgroundColor: "black" } : { backgroundColor: "rgb(5, 166, 206)" }} >
                <button className={showModeBtn ? ((isDarkModOn) ? "ModeBtnWhte" : "ModeBtnBlck") : "dontShow"} onClick={chnageMode}>{(isDarkModOn) ? "Light Mode" : "Dark Mode"}</button>
                <div className='firstContainer' style={isDarkModOn ? { backgroundColor: "black" } : { backgroundColor: "rgb(5, 166, 206)" }} >
                    <h1 className={isDarkModOn ? "titleWhite" : "titleBlack"}  >TODOs List</h1>
                    <input className={isDarkModOn ? "inputBlack" : "inPutWhite"} style={{ marginTop: "25px" }} type="text" value={inputValue} placeholder='Add a Task' onChange={ChangeInput}></input>
                    <button className={isDarkModOn ? "AddBtnBlack" : "AddBtnLight"} onClick={addTodos}>{btnText}</button>
                    <p className='errorLine' style={{ color: "#B30000", fontWeight: "500" }}>{error}</p>
                </div>
                <div className='items'>
                    <h1 className={isDarkModOn ? "titleWhite taskHead" : "titleBlack taskHead"} >Tasks</h1>
                    <h3 style={isDarkModOn ? { color: "gray" } : { color: "rgb(9, 74, 90)" }} className='NoList'>{(todos.length === 0) ? "No List to Show" : ""}</h3>
                    {todos.map((todo, pos) => {
                        return (
                            <>
                                <div className='toDOContainer'>
                                    <div className={isDarkModOn ? "sepTodoBlack" : "sepTodoWhite"}>
                                        <div className='taskTitle'>
                                            <h4 className='todos' style={pos === index ? todoRed : todoClr} >{todo}</h4>
                                        </div>
                                        <div className='BtnDiv'>
                                            <button style={isDarkModOn ? { backgroundColor: "white", color: "black" } : { backgroundColor: "rgb(223, 139, 13)" }} className='edit' onClick={() => { editTask(pos) }}><ion-icon name="create"></ion-icon></button>
                                            <button className='del' onClick={() => { deleteTask(pos) }}><ion-icon name="trash"></ion-icon></button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='footer'>
                <p>Copyright ©2022, Manzar Abbas. All rights reserved.</p>
            </div>
            {/* <div className='footer'>
                <p>Copyright ©2022, Manzar Abbas. All rights reserved.</p>
            </div> */}
        </>

    )
}

export default TodoList