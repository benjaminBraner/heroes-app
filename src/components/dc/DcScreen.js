import { HeroList } from "../hero/HeroList"
import "../../styles/components/marvel/MarvelScreen.css"

export const DcScreen = () => {
     return (
          <div className="Publisher-list">
               <h1>DC Screen</h1>
               <HeroList publisher="DC Comics"/>
          </div>
     )
}
