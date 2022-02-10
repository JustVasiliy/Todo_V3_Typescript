import React from "react";

type GlobalContext = {
    token: string
    getToken:(text:string) => void
  }
export const TokenContext = React.createContext<GlobalContext>({token: "", getToken: () => {}});