import { AppRouter } from "./routers/AppRouter"
import { AuthContext } from "./auth/authContext"
import { authReducer } from "./auth/authReducer"
import { useEffect, useReducer } from "react"

const init = () => {
     /*si el user existe deberia ser algo asi:
          user: {
               name: "Benjamin"
          }
     
     si existe lo retorno si no, retorno un { logged: false}
     */
     return JSON.parse( localStorage.getItem( "user" ) ) || { logged: false }
}

export const HeroesApp = () => {

     const [ user, dispatch ] = useReducer( authReducer, {}, init );

     useEffect(() => {
          console.log(user, dispatch);
          /* la primera vez que se ejecute no habra un user, por lo tanto el init devolvera un  { logged: false }, y este objeto
          pasara a ser el user */
          if( !user ) return

          /* ese { logged: false } sera lo que se guarde en el localStorage primeramente, y cuando se cambie el user,(osea ya haya
          un usuario autenticado) se volvera a ejecutar este useEffect y esta vez el user pasara a ser un objeto con propiedades del
          usuario que se autentico y se guardara en el localStorage */
          localStorage.setItem( "user", JSON.stringify( user ) )
     }, [ user ])

     return (
          <AuthContext.Provider value={{
               user,
               dispatch
          }}>

               <AppRouter />

          </AuthContext.Provider>
     )
}
