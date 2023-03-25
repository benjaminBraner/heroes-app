import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { useForm } from "../../hooks/useForm";
import { types } from "../../types/types";


export const LoginScreen = () => {

     /*en la v5 de react-router-dom se recibia en los props un history y otros elementos que me ayudaban al redireccionamiento
     entre pantallas, pero ahora en la v6 se hace mediante el useNavigate*/
     const navigate = useNavigate();
     const { dispatch } = useContext( AuthContext );

     const [ { inputName }, handleInputChange ] = useForm( { inputName: "" } );

     const handleLogin = () => {    
          if ( inputName ) {
               dispatch({
                    type: types.login,
                    payload: {
                         name: inputName
                    }
               })
               /* localStorage.getItem("lastPath") ese lastPath lo defiini en el <PrivateRoute/> si es que existe seria la ultima url 
               que el usuario visito antes de hacer el logout*/
               const path = localStorage.getItem( "lastPath" ) || "/marvel";
               /*navigate( path, { replace: true } );   dentro de los parentesis es la ruta a la que quiero redireccionar, la diferencia 
               es que esta en vez de redireccionar, remplaza la pagina actual, osea como si no hubiera visitado la pagina en la que estaba*/
               navigate( path, { replace: true } );
          }
          
          
     }

     return (
          <div className="container mt-5">
               <h1>Login Screen</h1>
               <hr />

                    <form>
                         <input
                              type="text"
                              name="inputName"
                              onChange={ handleInputChange }
                              value={ inputName }
                              autoComplete="off"
                         />

                         <button 
                              type="submit"
                              className="btn btn-primary"
                              onClick={ handleLogin }
                         >
                              Login
                         </button>

                    </form>

          </div>
     )
}
