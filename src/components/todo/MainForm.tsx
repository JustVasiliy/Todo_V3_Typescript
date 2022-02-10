import React, { useEffect, useState, useRef, useContext } from "react";
import "../../../dist/css/style.css";
import Task from "./Task";
//@ts-ignore
import { API } from "../../API/API";
import { url } from "../../service/index";
import { TokenContext } from "../../service/context";


type obj = {
  name:string,
  id:string,
  key: string
  checked: boolean,
  
}
const api = new API(url);

function MainForm (){
  const {getToken, token} = useContext(TokenContext);
  
  const [dataTodos, setDataTodos] = useState({cheked: false, todos:[]});
  const ref = useRef<HTMLInputElement>(null)
  function catchToken (text:string){
    getToken(text);
  }
  async function getTasks (){
    const callAPI = await api.callAPI("api/task/get", "GET", token);
    if (callAPI.message === "Invalid token") {
      document.cookie = "token=Invalid token";
      catchToken("Invalid token");
    } else {
      setDataTodos({ ...dataTodos, todos: await callAPI });
    }
  }

  async function createTask () {
    const input:string|undefined = ref.current?.value;
    if (input.trim() !== "") {
      
      await api.callAPI("api/task/create", "POST", token, {
        name: input.trim(),
        checked: false,
        deleted: false,
        token: token,
      });
      const callAPI = await api.callAPI("api/task/get", "GET", token);
      if (callAPI.message === "Invalid token") {
        document.cookie = `token=${callAPI.message}`;
        catchToken("Invalid token");
      } else {
        setDataTodos({...dataTodos,  todos: await callAPI });
      }
    }
    (ref.current as HTMLInputElement).value  = "";
  }
  function logOut (){
    document.cookie = "token=Invalid token";
    catchToken("Invalid token");
  }
   
   useEffect(()=>{
    getTasks()
  }, [])
  
    return(
      <>
        <button className="logout" onClick={()=>logOut()}>
          Log Out
        </button>

        <section>
          <h1>Todo List</h1>
          <ul className="listItems">
            {dataTodos.todos.map((el:obj) => {
              return (
                <Task
                  name={el.name}
                  id={el.id}
                  key={el.id}
                  checked={el.checked}
                  // token={token}
                  // getToken={catchToken}
                />
              );
            })}
          </ul>
          <div className="createNewItem">
            <input
            ref={ref}
              className="inputCreateName"
              type="text"
              placeholder="Write todo..."></input>
            <button className="btnCreate" onClick={()=>createTask()}>
              Create
            </button>
          </div>
        </section>
      </>
    )
}

export default MainForm;
