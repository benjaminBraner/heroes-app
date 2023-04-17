import { HeroCard } from "./HeroCard";
import { getHeroesByPublisher } from "../../helpers/getHeroesByPublisher"
import { useMemo } from "react";
import '../../styles/components/hero/HeroList.css'
export const HeroList = ({ publisher }) => {


     //volvera a memorizar el nuevo valor solo si publisher cambia, de lo contrario no se volvera a llamar el getHeroesByPublisher
     const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);


     return (
          <div className="heroes">
               <div className="heroes-container">
                    {
                         heroes.map(hero => (
                              <HeroCard
                                   key={hero.id}
                                   {...hero}    //cada propiedad del objeto, sera una prop del HeroCard 
                              />


                         ))
                    }
               </div>

          </div>
     )
}
