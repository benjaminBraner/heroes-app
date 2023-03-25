import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/authContext"


/*como este es un higher order component osea que es un componente padre, automaticamente se le agrega una prop llamada
children que son sus componentes hijos (osea en este caso children seria el <DashboardRoutes />)*/
export const PrivateRoute = ( { children } ) => {

     const { user } = useContext( AuthContext );
     const location = useLocation();
     // console.log("PrivateRoute fue renderizado");
     
     /*aqui no necesito encerrar esto en un useEffect, osea cada vez que el lastPath cambie, volver a guardar en el localStorage, porque
     el useLocation ya tiene un state interno que redibuja este componente cuando el location cambia, osea si en el <dashboardRoutes/>
     cambio de url, como el <DashboardRoutes/> es un children del <PrivateRoute/>, el PrivateRoute se volvera a dibujar con un nuevo
     location cuando el url cambie, en pocas palabras es como actualizar un state desde los componentes hijos*/
     localStorage.setItem( "lastPath", location.pathname ) 

     return user.logged
          ? children
          : <Navigate to="/login" />
}
