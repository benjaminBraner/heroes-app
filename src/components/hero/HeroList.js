import { HeroCard } from "./HeroCard";
import { getHeroesByPublisher } from "../../helpers/getHeroesByPublisher"
import { useMemo } from "react";

export const HeroList = ( { publisher } ) => {


     //volvera a memorizar el nuevo valor solo si publisher cambia, de lo contrario no se volvera a llamar el getHeroesByPublisher
     const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ publisher ] );


     return (
          <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn">
                    {
                         heroes.map(hero => (
                              <HeroCard 
                                   key={ hero.id } 
                                   {...hero}    //cada propiedad del objeto, sera una prop del HeroCard 
                              />


                         ))                         
                    }
          </div>
     )
}
