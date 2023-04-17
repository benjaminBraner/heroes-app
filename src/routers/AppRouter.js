import { Routes, Route, BrowserRouter  } from "react-router-dom";
// import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
// import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {
     return (
          /*se debe envolver todas las rutas, es decir desde el punto mas alto hay que envolverlo dentro del BrowserRouter, si dentro
          de este router padre tengo routers hijos, no es necesario poner en esos routers hijos el BrowserRouter*/
          <BrowserRouter >

               
               <Routes>

                    {/* <Route path="/login" element={
                         <PublicRoute>
                              <LoginScreen />
                         </PublicRoute>
                         } 
                    /> */}

                    {/* el path es "/*" porque con eso le digo que si la ruta es cualquier otra despues del "/" muestre el DashboardRoutes,
                    y ahi es donde esta el navbar porque no quiero que me muestre el navbar en el login */}
                    <Route path="/*" element={
                         /*pero antes de pasar al <DashboardRoutes/> debo asegurarme de que la persona que quiere entrar aqui
                         ya esta autenticada, porque no cualquier persona puede entrar ahi, por eso antes de pasar al <DashboardRoutes/>
                         pasara por el <PrivateRoute/> para ver si el usuario esta autenticado o no */
                         <PrivateRoute>
                              <DashboardRoutes />
                         </PrivateRoute>
                         }
                     />

               </Routes>
          </BrowserRouter >
     )
}
