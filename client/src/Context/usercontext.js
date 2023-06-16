import { useState } from "react";
import { createContext } from "react";

export const Usercontext = createContext({}); 

export function Usercontextprovider({children}) {
    const[userinfo, setuserinfo] = useState({}); 

   return(
    <Usercontext.Provider value={{userinfo,setuserinfo}}>
      {children}
   </Usercontext.Provider>
   )
}