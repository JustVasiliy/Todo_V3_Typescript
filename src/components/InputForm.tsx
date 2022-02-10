import React, { useRef, useState } from "react";
import "../../dist/css/style.css";

type PropsInputForm ={
  placeholder: string,
  name?: string,
  type: string,
  labelText: string,
  fun: (value:string, name:any)=>void,
  forInput: string,
  style: string
}
function InputForm ({placeholder, name, type, labelText, fun, forInput, style}: PropsInputForm){
  const [dataInput, setDataInput] = useState({
    inputValue: ''
});

  const inputRef = useRef<HTMLInputElement>(null)
  function setInputValue (e:any){
    const {value} = e.target;
   
    setDataInput((prevState) => {
      const newState = {
        inputValue: value,
      };
      fun(newState.inputValue, inputRef.current?.name);
      return newState;
    });
   
    
  }
  
  return (
    <>
    <label className={style}>{labelText} </label>
    <input
      className={style}
      id={forInput}
      placeholder={placeholder}
      name={forInput}
      type={type}
      required
      ref={inputRef}
      onChange={setInputValue}
    ></input>
  </>
  )
}


export default InputForm;
