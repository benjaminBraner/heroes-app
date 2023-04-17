import { HeroList } from "../hero/HeroList"
import "../../styles/components/marvel/MarvelScreen.css"
export const MarvelScreen= () => {
     return (
          <div className="Publisher-list">
               <h1>Marvel Screen</h1>
               <HeroList publisher="Marvel Comics"/>
          </div>
     )
}
