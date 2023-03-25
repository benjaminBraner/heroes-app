//Primero se instala el react-router-dom desde la terminal
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {

     const navigate = useNavigate();

     const {user,dispatch} = useContext(AuthContext);
     
     const handleLogout = () => {
          dispatch({
               type: types.logout
          })
          navigate("/login", {replace: true});
     }


     return (
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

               <Link
                    className="navbar-brand"
                    to="/"
               >
                    Asociaciones
               </Link>

               <div className="navbar-collapse">
                    <div className="navbar-nav">

                         <NavLink
                              /* activeClassName="active" 
                              si estoy en el path "/marvel" se le añade la clase "active" 
                              
                              en react-router-dom v6 ya no hay la propiedad activeClassName pero hay otras formas de hacer esto
                              por ejm: 
                              aqui el parametro "isActive" es un booleano que viene de un objeto y lo proporcina react-router-dom
                              
                              si isActive es true, añade la clase active, sino no pasa nada*/
                              className={ ({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "") }
                              exact="true"
                              to="/marvel"
                         >
                              Marvel
                         </NavLink>

                         <NavLink
                              className={ ({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "") }
                              exact="true"
                              to="/dc"
                         >
                              DC
                         </NavLink>

                         <NavLink
                              className={ ({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "") }
                              exact="true"
                              to="/search"
                         >
                              Search
                         </NavLink>
                    </div>
               </div>

               <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">

                         <span className="nav-item nav-link text-info">{ user.name }</span>

                         <button
                              className="nav-item nav-link btn"
                              onClick={ handleLogout }
                         >
                              Logout
                         </button>
                    </ul>
               </div>
          </nav>
     )
}