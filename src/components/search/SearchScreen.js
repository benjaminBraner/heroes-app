import { useNavigate, useLocation } from "react-router-dom";
/*para manejar mas facil los query parameters que vienen de la url instalar "query-string" desde
la consola: npm i query-string */
import queryString from "query-string";
import { getHeroByName } from "../../helpers/getHeroByName";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../hero/HeroCard";
import { useMemo } from "react";
import '../../styles/components/search/SearchScreen.css'
import '../../styles/components/hero/HeroList.css'

export const SearchScreen = () => {

     const navigate = useNavigate();

     /*el useLocation() me muestra la URL en la que me encuentro, y si dicha url se actualiza, tambien lo hara useLocation, dentro viene:
     {
          hash: ""
          key: "wyfydxso"
          pathname: "aqui viene la url en la que me encuentro"
          search: "aqui viene el queryString ( empieza con un "?" )"
          state: null 
     } */
     const location = useLocation();
     
     /*la funcion queryString.parse separara queryParameters, por ejemplo si en mi url tengo los queryParameters asi:
     ?q=superman&publisher=dc&nacionalidad=criptoniana

     queryString.parse los ordenaria asi:
     {
          nacionalidad: "criptoniana",
          publisher: "dc",
          q: "superman"
     } 
     
     ahora voy a desestructurar los query params directamente que le voy a mandar en el handleSearch, al principio si no viene nada
     ya sea porque es la primera vez que se renderiza, etc,  sera igual a un string vacio, y  sera el valor inicial del searchText, porque
     si actualizo la pagina manualmente, la url no cambiara y quiero que si se actualiza, el campo de texto "searchText" tenga el valor
     que tiene "q" que el valor de "q" que esta en la url porque como dije antes, al actualizar la pagina, los queryParams no cambian*/
     const { q = "" } = queryString.parse( location.search ); 

     const [ { searchText }, handleInputChange ] = useForm( { searchText: q } );
     
     const heroesFiltered = useMemo( () => getHeroByName(q) ,[q]);

     const handleSearch = (e) => {

          e.preventDefault();
          //al añadir este queryString estoy actualizando el URL por lo tanto el componente igual lo hara
          navigate( `?q=${ searchText }` );  //este string es mi queryString se lo identifica por el "?"
     }

     return (
               <div className="SearchScreen">
                    <div className="search-container">
                         <h1>Search</h1>
                         <hr />
                         <form onSubmit={ handleSearch }>
                              <input
                                   type="text"
                                   placeholder="Search a hero"
                                   className="search-input"
                                   name="searchText"
                                   autoComplete="off"
                                   onChange={handleInputChange}
                                   value={ searchText }
                              />

                              <button
                                   type="submit"
                                   className="search-btn"
                              >
                                   Search...
                              </button>

                         </form>
                    </div>

                    <div className="search-results-container">
                         <h4>Results</h4>
                         <hr />

                         {
                              (q === "") 
                                   ? true      
                                   : ( heroesFiltered.length === 0) 
                                   &&  <div className="no-found-search">No results for : {q}</div>         
                         }

                         <div className="heroes">
                              <div className="heroes-container">
                                   {
                                        heroesFiltered.map( hero => (
                                             <HeroCard 
                                                  key={ hero.id }
                                                  { ...hero }
                                             />
                                        ) )
                                   }

                              </div>

                         </div>
                    </div>
               </div>
     )
}
