import { Link } from "react-router-dom";
import '../../styles/components/hero/HeroCard.css'
const heroImages = require.context('../../assets/heroes', true)

export const HeroCard = ({
     id,
     superhero,
}) => {

     const imagePath = heroImages(`./${id}.jpg`).default;

     return (
          <div className='hero-card'>

               <img alt={id} src={imagePath}/>

               <div className='plant__features'>

                    <div className='features'>
                         <h2>{superhero}</h2>
                         <Link to={`/hero/${id}`}>
                              <button>
                                   More..
                              </button>
                         </Link>
                    </div>

               </div>

          </div>
     )
}
