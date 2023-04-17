//Primero se instala el react-router-dom desde la terminal
import { Link, NavLink } from 'react-router-dom'
import '../../styles/components/ui/Navbar.css'
import menuLogo from '../../assets/logos/menu-logo.svg'

export const Navbar = () => {


     const clickMenu = () => {
          const navbarMenu = document.querySelector(".nav-links");
          const menuIcon = document.querySelector(".menu-logo");
          navbarMenu.classList.toggle("active");
          menuIcon.classList.toggle("active");
     }


     

     
     return (
          <nav className='navbar'>
               <Link
                    className="navbar-brand"
                    to="/"
               >
                    <h2 className='nav-title'>Heroes App</h2>
               </Link>
               <div className='nav-links'>
                    <NavLink
                         /* activeClassName="active" 
                         si estoy en el path "/marvel" se le añade la clase "active" 
                         
                         en react-router-dom v6 ya no hay la propiedad activeClassName pero hay otras formas de hacer esto
                         por ejm: 
                         aqui el parametro "isActive" es un booleano que viene de un objeto y lo proporcina react-router-dom
                         
                         si isActive es true, añade la clase active, sino no pasa nada*/
                         className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                         exact="true"
                         to="/marvel"
                         onClick={clickMenu}
                    >
                         Marvel
                    </NavLink>
                    <NavLink
                         className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                         exact="true"
                         to="/dc"
                         onClick={clickMenu}
                    >
                         DC
                    </NavLink>

                    <NavLink
                         className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                         exact="true"
                         to="/search"
                         onClick={clickMenu}
                    >
                         Search
                    </NavLink>
               </div>

               <img src={menuLogo} 
                    alt='menu' 
                    className='menu-logo' 
                    onClick={clickMenu}
               />

          </nav>
     )
}