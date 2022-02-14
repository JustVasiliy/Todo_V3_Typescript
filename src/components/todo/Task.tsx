import React, { useContext, useEffect, useState } from "react";
import "../../../dist/css/style.css";
//@ts-ignore
import { API } from "../../API/API";
import { url } from "../../service/index";
import { TokenContext } from "../../service/context";
const api = new API(url);
type PropsTask = {
  name: string,
  checked: boolean,
  id: string,
  
}
const Task = ({ name, checked, id }:PropsTask)=>{
  const { token, getToken } = useContext(TokenContext);
  const [dataTask, setDataTask] = useState({
    checked: checked,
    changeDisplay: "none",
    name: name,
    delete: false,
  });

  const completeTask = async ()=>{
    let isCheck = dataTask.checked;
    setDataTask({ ...dataTask, checked: !isCheck });

    const callAPI = await api.callAPI("api/task/put", "PUT", token, {
      id: id,
      name: name,
      checked: !isCheck,
      deleted: false,
    });
    const status = await callAPI.json();
    if ((await status.message) === "Invalid token") {
      document.cookie = "token=Invalid token";
      getToken("Invalid token");
    }
  }

  const saveTaskСhanges = async()=> {
    setDataTask({ ...dataTask, changeDisplay: "none" });
    const text:string|undefined = (document.getElementById(id)?.children[3] as HTMLInputElement).value;

    if (text.trim() !== "") {
      setDataTask(() => {
        const newState = { ...dataTask, changeDisplay: "none", name: text };
        return newState;
      });

      const callAPI = await api.callAPI("api/task/put", "PUT", token, {
        id: id,
        name: text,
        checked: dataTask.checked,
        deleted: false,
        editing: false,
      });
      const status = await callAPI.json();

      if ((await status.message) === "Invalid token") {
        document.cookie = "token=Invalid token";
        
      }
    }
  }
  const changeTask = () => {
    setDataTask({ ...dataTask, changeDisplay: "block" });
  }
  const deleteTask = async() => {
    setDataTask({ ...dataTask, delete: true });

    const callAPI = await api.callAPI("api/task/delete", "DELETE", token, {
      id: id,
    });
    const status = await callAPI.json();
    if ((await status.message) === "Invalid token") {
      document.cookie = "token=Invalid token";
      // setDataTask("Invalid token");
    }
  }

  return (
    <>
      <li
        id={id}

        //`parentPosition ${ }`
        className={dataTask.delete ? "deleted parentPosition" : "parentPosition"}>
        <p className={dataTask.checked ? "pCheck" : undefined}>{dataTask.name}</p>
        <input
          className="check"
          type="checkbox"
          onClick={() => completeTask()}
          checked={dataTask.checked}></input>
        <div className="ButtonGroup parentPosition">
          <button
            className="saveBtn"
            style={{ display: dataTask.changeDisplay }}
            onClick={saveTaskСhanges}>
            save
          </button>
          <button className="change" onClick={changeTask}>
            Change
          </button>
          <button className="delete" onClick={() => deleteTask()}>
            Delete
          </button>
        </div>
        <input
          className="inputChange"
          type="text"
          style={{ display: dataTask.changeDisplay }}></input>
      </li>
    </>
  );
}

export default Task;
