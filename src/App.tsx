

import React from "react";
import Authorization from "./components/authorization/Authorization";
import Registration from "./components/registration/Registration";
import MainForm from "./components/todo/MainForm";
import RegistrOrAuth from "./components/RegistrOrAuth";
import { getCookie } from "./service/getCookie";
import { useState, useEffect, useContext } from "react";
import {  TokenContext } from "./service/context";
const App = () => {
 
  const [token, setToken] = useState({ token: "" });
  
  const getTokenFromСhildComponent = (token:string) => {
    setToken({ token: token});
  }

  useEffect(() => {
    setToken({ token: `${getCookie("token")}` });
  }, []);
  
  if (
    token.token === "Invalid token" ||
    token.token === "" ||
    token.token === undefined ||
    token.token === "error"
  ) {
    return <RegistrOrAuth />;
  } else if (token.token === "registration") {
    return <Registration/>;
  } else if (token.token === "authorization") {
    return <Authorization token={token.token} />;
  } else {
    return (
      <TokenContext.Provider value = {{
        token: token.token,
        getToken: getTokenFromСhildComponent,
      }}>
        
        <MainForm/>
      </TokenContext.Provider>
    );
  }
}

export default App;