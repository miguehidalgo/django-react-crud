import { loginButton } from "../components/login"
import React from "react"


export function TaskLogin(){
   

    return (

        <div className="max-w-xl mx-auto" >
        <h1 className="font-bold text-5xl mb-0 bg-gray- p-2 rounded-lg ">
            Login
        </h1>

        <form className="bg-zinc-800 p-10 rounded-lg mt-2"
              
        >

                 <input className="bg-zinc-700 p-3 rounded-lg
                  block w-full mb-3" type="text"
                 
                  /> 

                 <input className="bg-zinc-700 p-3 rounded-lg
                  block w-full mb-3" type="password"
                  
                  />

                 <button className="bg-indigo-500 p-3 rounded-lg
                  block w-full mt-3">Iniciar sesion</button>
                  <loginButton/>
        


        </form>
        
        </div>







    )

   

}
